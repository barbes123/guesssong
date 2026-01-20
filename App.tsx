
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { translations } from './translations';
import { Player, GameState, Page, Language, PlayerR5Progress } from './types';
	//import { ROUND_DATA, SCREEN_BGM, SFX, INITIAL_POINTS, shuffle } from './constants';
import { ROUND_DATA, SCREEN_BGM, SFX, INITIAL_POINTS, shuffle, getRoundData, getAvailableSets } from './data/index_data';
import SettingsOverlay from './components/SettingsOverlay';
import PlayerBoard from './components/PlayerBoard';
import ConfirmationModal from './components/ConfirmationModal';
import ControlPanel from './components/ControlPanel';
import VolumeBar from './components/VolumeBar';
import RoundSetSelector from './components/RoundSetSelector';
import { Music as MusicIcon, ChevronRight, ChevronLeft, Users, Trophy, Star, PartyPopper, RotateCcw, PlayCircle, HelpCircle, CheckCircle, XCircle, Zap, Timer, SkipForward } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [{ id: 0, name: '', score: 0, stars: 0 }],
	    currentPlayerIndex: 0,
	    currentRound: 0,
	    isMusicEnabled: true,
	    language: 'en',
	    gameStarted: false,
	    activeRoundId: null,
	    roundProgress: {},
	    roundSets: { 1: 'default', 2: 'default', 3: 'default', 4: 'default', 5: 'default', 6: 'default' }
	  });

  // useEffect(() => {
  //   console.log('Round 1 data from new system:', ROUND_DATA[1]);
  //   console.log('Available sets for Round 1:', getAvailableSets(1));
  //   console.log('Round data via getRoundData:', getRoundData(1));
  // }, []);

	  const [currentPage, setCurrentPage] = useState<Page>('setup');
	  const [isFullscreen, setIsFullscreen] = useState(false);
	  const [roundSetSelectionModal, setRoundSetSelectionModal] = useState<number | null>(null); // Track which round's variant selection is open
	  const [modal, setModal] = useState<{ 
	    isOpen: boolean; 
	    title: string; 
	    message: string; 
	    onConfirm: () => void;
	    confirmLabel?: string;
	    cancelLabel?: string;
	    position?: 'center' | 'inline';
	  } | null>(null);
	  const [showScoreboard, setShowScoreboard] = useState(false);
	  const [showVictory, setShowVictory] = useState(false);
	  const [volume, setVolume] = useState(0.7);

	  const songRef = useRef<HTMLAudioElement | null>(null);
	  const bgmRef = useRef<HTMLAudioElement | null>(null);
	  const sfxRef = useRef<HTMLAudioElement | null>(null);
	  
	  const [isPlaying, setIsPlaying] = useState(false);
	  const [activeNote, setActiveNote] = useState<{ categoryId: string; noteIndex: number; isReveal?: boolean } | null>(null);
	  const [currentRoundPoints, setCurrentRoundPoints] = useState<number | undefined>(undefined);
	  const [audioProgress, setAudioProgress] = useState({ current: 0, total: 0 });
	  const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined);
	  
	  // R5 & R6 Specific States
	  const [selectedDuration, setSelectedDuration] = useState<number | null>(null); 
	  const [r6Selection, setR6Selection] = useState<number[]>([]);
	  const [isR6Finalized, setIsR6Finalized] = useState(false);
	  const [r5CurrentSongIdx, setR5CurrentSongIdx] = useState<number>(0);
	  const [r5IsActiveSession, setR5IsActiveSession] = useState(false);
	  const [selectedRow, setSelectedRow] = useState<number | null>(null);
	  const [timerDuration, setTimerDuration] = useState<number>(60);
	  const [showTimerSettings, setShowTimerSettings] = useState(false);
         const [playedButNotEvaluated, setPlayedButNotEvaluated] = useState<number[]>([]);
	  const roundPointsTimerRef = useRef<number | null>(null);
	  const autoStopTimerRef = useRef<number | null>(null);
	  const countdownIntervalRef = useRef<number | null>(null);

	  // Calculated scoreboard sorted by stars then score
	  const sortedPlayersScoreboard = [...gameState.players].sort((a, b) => {
	    const starsA = a.stars || 0;
	    const starsB = b.stars || 0;
	    if (starsB !== starsA) return starsB - starsA;
	    return b.score - a.score;
	  });

	  const t = translations[gameState.language] as any;

	  const playSFX = useCallback((url: string) => {
	    if (!gameState.isMusicEnabled) return;
	    if (sfxRef.current) {
	      sfxRef.current.pause();
	      sfxRef.current = null;
	    }
	    const audio = new Audio(url);
	    sfxRef.current = audio;
	    audio.volume = volume;
	    audio.play().catch(e => console.log("SFX block", e));
	  }, [gameState.isMusicEnabled]);

	  const handleVolumeChange = useCallback((newVolume: number) => {
	    setVolume(newVolume);
	    if (songRef.current) {
	      songRef.current.volume = newVolume;
	    }
	    if (bgmRef.current) {
	      bgmRef.current.volume = newVolume;
	    }
	    if (sfxRef.current) {
	      sfxRef.current.volume = newVolume;
	    }
	  }, []);

	  const stopBGM = useCallback(() => {
	    if (bgmRef.current) {
	      bgmRef.current.pause();
	      bgmRef.current = null;
	    }
	  }, []);

	  const stopSong = useCallback((fullyClear = true) => {
	    if (songRef.current) {
	      songRef.current.pause();
	      if (fullyClear) {
		songRef.current = null;
	      }
	    }
	    setIsPlaying(false);
	    
	    const roundId = gameState.activeRoundId;
	    const isR5 = roundId === 5;
	    
	    if (fullyClear || (!isR5 || !r5IsActiveSession)) {
	      if (roundPointsTimerRef.current) {
		window.clearInterval(roundPointsTimerRef.current);
		roundPointsTimerRef.current = null;
	      }
	      if (autoStopTimerRef.current) {
		window.clearTimeout(autoStopTimerRef.current);
		autoStopTimerRef.current = null;
	      }
	      if (countdownIntervalRef.current) {
		window.clearInterval(countdownIntervalRef.current);
		countdownIntervalRef.current = null;
	      }
	    }

	    if (fullyClear) {
	      setAudioProgress({ current: 0, total: 0 });
	      if (!isR5 || !r5IsActiveSession) {
		setTimeLeft(undefined);
	      }
	    }
	  }, [gameState.activeRoundId, r5IsActiveSession]);

	  const triggerBGM = useCallback((page: Page, roundId: number | null) => {
	    if (!gameState.isMusicEnabled) return;
	    stopBGM();
	    
	    let audioSrc = "";
	    let loop = true;
	    if (page === 'setup') {
	      audioSrc = SCREEN_BGM.setup;
	    } else if (page === 'start') {
	      audioSrc = SCREEN_BGM.start;
	      loop = false;
	    } else if (page === 'round' && roundId !== null) {
	      audioSrc = SCREEN_BGM[`round_${roundId}`] || SCREEN_BGM.start;
	      loop = false;
	    }

	    if (audioSrc) {
	      const audio = new Audio(audioSrc);
	      bgmRef.current = audio;
	      audio.loop = loop;
	      audio.volume = volume;
	      audio.play().catch(e => console.log("BGM block", e));
	    }
	  }, [gameState.isMusicEnabled, stopBGM]);

	  useEffect(() => {
	    triggerBGM(currentPage, gameState.activeRoundId);
	    return () => {
	      stopBGM();
	      stopSong();
	    };
	  }, [currentPage, gameState.activeRoundId, triggerBGM]);

	  const toggleLanguage = () => {
	    setGameState(prev => ({ ...prev, language: prev.language === 'en' ? 'ru' : 'en' }));
	  };

	  const toggleMusic = () => {
	    setGameState(prev => {
	      const next = !prev.isMusicEnabled;
	      if (!next) {
		stopSong();
		stopBGM();
	      } else {
		triggerBGM(currentPage, prev.activeRoundId);
	      }
	      return { ...prev, isMusicEnabled: next };
	    });
	  };

	  const toggleFullscreen = () => {
	    if (!document.fullscreenElement) {
	      document.documentElement.requestFullscreen();
	      setIsFullscreen(true);
	    } else {
	      if (document.exitFullscreen) {
		document.exitFullscreen();
		setIsFullscreen(false);
	      }
	    }
	  };

	  const handleUpdatePlayer = (id: number, name: string, score: number, stars?: number) => {
	    setGameState(prev => ({
	      ...prev,
	      players: prev.players.map(p => p.id === id ? { ...p, name, score, stars: stars ?? p.stars } : p)
	    }));
	  };

	  const showModal = (
	    title: string, 
	    message: string, 
	    onConfirm: () => void, 
	    confirmLabel?: string, 
	    cancelLabel?: string,
	    position: 'center' | 'inline' = 'center'
	  ) => {
	    setModal({ 
	      isOpen: true, 
	      title, 
	      message, 
	      onConfirm, 
	      confirmLabel: confirmLabel || t.yes, 
	      cancelLabel: cancelLabel || t.no,
	      position
	    });
	  };

	  const resetGameAction = () => {
	    setGameState(prev => ({
	      ...prev,
	      players: prev.players.map(p => ({ ...p, score: 0, stars: 0 })),
	      currentPlayerIndex: 0,
	      currentRound: 0,
	      activeRoundId: null,
	      roundProgress: {}
	    }));
	    setCurrentPage('setup');
	    setModal(null);
	    setShowVictory(false);
	    setIsR6Finalized(false);
	    setSelectedDuration(null);
	    setR5IsActiveSession(false);
	    setR5CurrentSongIdx(0);
	    setSelectedRow(null);
	    setTimerDuration(60);
	    setShowTimerSettings(false);
	    stopSong();
	    stopBGM();
	  };
	  
	  const navigateTo = (page: Page, roundId: number | null = null) => {
	    const action = () => {
	      if (roundId !== null) {
		initializeRound(roundId);
	      }
	      
	      stopSong();
	      setCurrentPage(page);
	      setGameState(prev => ({ ...prev, activeRoundId: roundId }));
	      setModal(null);
	      setActiveNote(null);
	      setCurrentRoundPoints(undefined);
	      
	      if (roundId === 6) {
		setActiveNote({ categoryId: 'r6_final', noteIndex: 0 });
		setSelectedDuration(null);
		setIsR6Finalized(false);
		setTimeLeft(undefined);
	      }
	      if (roundId === 5) {
		setR5IsActiveSession(false);
		setSelectedRow(null);
		setR5CurrentSongIdx(0);
		setTimeLeft(undefined);
		setShowTimerSettings(false);
               setPlayedButNotEvaluated([]); // ADD THIS
	      }
	    };

	    if (currentPage !== 'setup') {
	      let message = t.confirmNav; 
	      if (roundId !== null) message = `Go to Round ${roundId}`;
	      else if (page === 'start') message = "Go to Start Page";
	      else if (page === 'setup') message = "Go to Setup Page";
	      showModal(t.mainMenu, message, action);
	    } else {
	      action();
	    }
	  };

	  const handleStartGameFromSetup = () => {
	    setGameState(prev => ({
	      ...prev,
	      currentPlayerIndex: 0,
	      roundProgress: {},
	      activeRoundId: null,
	    }));
	    setCurrentPage('start');
	    stopSong();
	  };

	  const initializeRound = (roundId: number) => {
	    if (gameState.roundProgress[roundId] && roundId !== 6 && roundId !== 5) return;
	    const pointMap: { [categoryId: string]: number[] } = {};
	    const persistentPoints: { [noteId: string]: number } = {};
	    
	    // Get the selected variant for this round, fallback to 'default'
	    const selectedSetId = gameState.roundSets[roundId] || 'default';
	    const roundData = getRoundData(roundId, selectedSetId) || [];
	    
	    if (roundId === 6) {
	      let initialParticipants: number[] = [];
	      if (gameState.players.length <= 2) {
		initialParticipants = gameState.players.map(p => p.id);
		setR6Selection(initialParticipants);
		setGameState(prev => ({
		  ...prev,
		  roundProgress: {
		    ...prev.roundProgress,
		    [6]: {
		      usedNotes: new Set(),
		      activatedCategories: new Set(),
		      pointMap: {},
		      activationCounts: {},
		      results: {},
		      activePlayerIds: initialParticipants,
		      currentTurnIndex: 0
		    }
		  },
		  currentPlayerIndex: 0,
		  activeRoundId: 6
		}));
		setCurrentPage('round');
	      } else {
		setR6Selection([]);
		setCurrentPage('r6_select');
	      }
	      return;
	    }

	    if (roundId === 5) {
	      const initialR5Progress: { [playerId: number]: PlayerR5Progress } = {};
	      gameState.players.forEach(p => {
		initialR5Progress[p.id] = {
		  correctIndices: new Set(),
		  wrongIndex: null,
		  hasFinished: false,
		  timeSpent: 0
		};
	      });

	      setGameState(prev => ({
		...prev,
		roundProgress: {
		  ...prev.roundProgress,
		  [5]: {
		    usedNotes: new Set(),
		    activatedCategories: new Set(),
		    pointMap: {},
		    activationCounts: {},
		    results: {},
		    r5PlayerProgress: initialR5Progress,
		    usedRows: new Set()
		  }
		},
		currentPlayerIndex: 0,
		activeRoundId: 5
	      }));
	      setCurrentPage('round');
	      return;
	    }

	    const pointPool = [];
	    for (let i = 20; i <= 40; i++) pointPool.push(i);
	    const shuffledPool = shuffle(pointPool);

	    roundData.forEach((cat, idx) => {
	      if (roundId === 1 || roundId === 2) {
		pointMap[cat.id] = shuffle(INITIAL_POINTS);
	      } else if (roundId === 3 || roundId === 4) {
		persistentPoints[`${cat.id}-0`] = shuffledPool[idx];
	      }
	    });

	    setGameState(prev => ({
	      ...prev,
	      roundProgress: {
		...prev.roundProgress,
		[roundId]: {
		  usedNotes: new Set(),
		  activatedCategories: new Set(),
		  pointMap,
		  activationCounts: {},
		  persistentPoints,
		  results: {}
		}
	      }
	    }));
	  };

	  const handleNoteClick = (categoryId: string, noteIndex: number) => {
	    const roundId = gameState.activeRoundId;
	    if (roundId === null) return;
	    const progress = gameState.roundProgress[roundId];
	    if (!progress) return;
	    const isR34 = roundId === 3 || roundId === 4;
	    const isR5 = roundId === 5;
	    const isR6 = roundId === 6;

	    if (isR5) {
	      const pId = gameState.players[gameState.currentPlayerIndex].id;
	      const playerProg = progress.r5PlayerProgress?.[pId];
	      if (playerProg?.hasFinished) {
		stopSong();
		setActiveNote({ categoryId: 'r5_sprint', noteIndex, isReveal: true });
		setR5CurrentSongIdx(noteIndex);
		playSFX(SFX.select);
		return;
	      }
	   if (!r5IsActiveSession) {
  const row = Math.floor(noteIndex / 7);
  const usedRowsSet = progress.usedRows || new Set();
  if (usedRowsSet.has(row)) {
    showModal(t.round, t.rowAlreadyUsed || "This row has already been used. Please select a different row.", () => setModal(null), t.close, "");
    return;
  }
  
  // CHANGED: Add confirmation modal before selecting a row for the first time
  showModal(
    t.round, 
    `Choose row ${row + 1}?`,  // Changed to show "Choose row N"
    () => {
      setSelectedRow(row);
      setR5CurrentSongIdx(noteIndex);
      setActiveNote({ categoryId: 'r5_sprint', noteIndex });
      setR5IsActiveSession(true);
      setTimeLeft(timerDuration);
      stopBGM();
      playSFX(SFX.select);
      setModal(null);
    },
    t.confirmLabel || "Choose", 
    t.cancelLabel || "Cancel",
    'inline'
  );
  
  return;
}
	      if (selectedRow !== null) {
		const startIdx = selectedRow * 7;
		const endIdx = startIdx + 7;
		if (noteIndex >= startIdx && noteIndex < endIdx) {
		  if (playerProg?.correctIndices.has(noteIndex)) return;
		  
		  // ADD THIS CHECK: Prevent song selection while a song is playing
		    if (isPlaying) {
		      // Optional feedback
//		      playSFX(SFX.wrong);
		      return;
    }
		  stopSong();
		  setR5CurrentSongIdx(noteIndex);
		  setActiveNote({ categoryId: 'r5_sprint', noteIndex });
		  playSFX(SFX.select);
		}
	      }
	      return;
	    }

	    if (isR6) {
	      stopSong();
	      setActiveNote({ categoryId: 'r6_final', noteIndex, isReveal: true });
	      playSFX(SFX.select);
	      return;
	    }

	    if (isR34 && noteIndex > 0) {
	      const revealSongIdx = noteIndex - 1;
	      const currentActivationCount = progress.activationCounts[categoryId] || 0;
	      if (revealSongIdx >= currentActivationCount) return;

	      if (activeNote?.categoryId === categoryId && activeNote?.noteIndex === noteIndex && activeNote.isReveal) {
		setActiveNote(null);
		stopSong();
	      } else {
		stopSong();
		setActiveNote({ categoryId, noteIndex, isReveal: true });
	      }
	      return;
	    }

	    const noteId = `${categoryId}-${noteIndex}`;
	    if (!isR34 && progress.usedNotes.has(noteId)) {
	      if (activeNote?.categoryId === categoryId && activeNote?.noteIndex === noteIndex && activeNote.isReveal) {
		setActiveNote(null);
		stopSong();
	      } else {
		stopSong();
		setActiveNote({ categoryId, noteIndex, isReveal: true });
	      }
	      return;
	    }

	    if (activeNote) return;

	    showModal(t.round, t.confirmNote, () => {
	      playSFX(SFX.select);
	      stopBGM();
	      setActiveNote({ categoryId, noteIndex });
	      setTimeLeft(60); 
	      setModal(null);
	      if (roundId === 1 || roundId === 2) {
		setCurrentRoundPoints(progress.pointMap[categoryId][noteIndex]);
	      } else if (isR34) {
		setCurrentRoundPoints(progress.persistentPoints?.[`${categoryId}-0`] || 20);
	      }
	    }, undefined, undefined, 'inline');
	  };

	  const handleAudioControl = (action: 'start' | 'stop') => {
	    if (!activeNote) return;
	    const roundId = gameState.activeRoundId!;
	    const progress = gameState.roundProgress[roundId];
	    const selectedSetId = gameState.roundSets[roundId] || 'default';
	    const roundData = getRoundData(roundId, selectedSetId) || [];
	    const isR34 = roundId === 3 || roundId === 4;
	    const isR6 = roundId === 6;
	    const isR5 = roundId === 5;

	    const startPlayback = () => {
	      stopBGM();
	      let songIndex = 0;
	      if (isR34) {
		songIndex = activeNote.isReveal ? activeNote.noteIndex - 1 : (progress.activationCounts[activeNote.categoryId] || 0);
	      } else if (isR6) {
		songIndex = progress.currentTurnIndex || 0;
	      } else if (isR5) {
		songIndex = r5CurrentSongIdx;
	      } else {
		songIndex = activeNote.noteIndex;
	      }

	      const category = roundData.find(c => c.id === activeNote.categoryId);
	      const song = category?.songs[songIndex];
	      if (!song) return;

	      const isRevealMode = activeNote.isReveal || (isR5 && !r5IsActiveSession) || (isR6 && progress.currentTurnIndex !== songIndex);
	      const audioUrlToPlay = (isRevealMode || (isR6 && selectedDuration === null)) ? (song.audioUrlFull || song.audioUrl) : song.audioUrl;

	      if (!isRevealMode && (timeLeft === undefined || timeLeft <= 0)) {
		if (isR6) setTimeLeft(selectedDuration || 0);
		else if (isR5) setTimeLeft(timerDuration);
		else setTimeLeft(60);
	      }

	      if (!songRef.current) {
		songRef.current = new Audio(audioUrlToPlay);
		songRef.current.volume = volume;
	      } else if (songRef.current.src !== audioUrlToPlay) {
		songRef.current.pause();
		songRef.current = new Audio(audioUrlToPlay);
		songRef.current.volume = volume;
	      }

	      songRef.current.onloadedmetadata = () => {
		setAudioProgress({ current: 0, total: songRef.current?.duration || 0 });
	      };
	      songRef.current.ontimeupdate = () => {
		setAudioProgress({ current: songRef.current?.currentTime || 0, total: songRef.current?.duration || 0 });
	      };
	      
	      if (isR6 && selectedDuration === null) {
		songRef.current.onended = null;
	      } else if (isR5 && r5IsActiveSession) {
		songRef.current.onended = () => { setIsPlaying(false); };
	      } else {
		songRef.current.onended = () => { handleAudioControl('stop'); };
	      }

	      songRef.current.play();
	      setIsPlaying(true);

	   if (!isRevealMode && action === 'start') {
  if (countdownIntervalRef.current) window.clearInterval(countdownIntervalRef.current);
  
    // START COUNTDOWN FOR ROUNDS 1-4
  if ((roundId === 1 || roundId === 2 || roundId === 3 || roundId === 4) && !activeNote.isReveal) {
    countdownIntervalRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev === undefined || prev <= 0) {
          window.clearInterval(countdownIntervalRef.current!);
          countdownIntervalRef.current = null;
          
          // PLAY WRONG SOUND WHEN TIME RUNS OUT

          handleAudioControl('stop');
                    playSFX(SFX.wrong);
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }
  
  // KEEP EXISTING ROUND 5 LOGIC
  else if (isR5 && r5IsActiveSession) {
    countdownIntervalRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev === undefined) return prev;
        if (prev > 0) return prev - 1;
        window.clearInterval(countdownIntervalRef.current!);
        countdownIntervalRef.current = null;
        if (isR5 && r5IsActiveSession) handleFinalizeTurn('skip', true);
        else handleAudioControl('stop');
        return 0;
      });
    }, 1000);
  }
  
  // KEEP EXISTING ROUND 6 LOGIC
  else if (isR6 && selectedDuration !== null && !isR6Finalized) {
    countdownIntervalRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev === undefined) return prev;
        if (prev > 0) return prev - 1;
        window.clearInterval(countdownIntervalRef.current!);
        countdownIntervalRef.current = null;
        if (isR5 && r5IsActiveSession) handleFinalizeTurn('skip', true);
        else handleAudioControl('stop');
        return 0;
      });
    }, 1000);
  }
}

	      if (autoStopTimerRef.current) window.clearTimeout(autoStopTimerRef.current);
	      let durationMs = (isRevealMode || (isR5 && !r5IsActiveSession) || (isR6 && progress.currentTurnIndex !== songIndex)) ? 600000 : 120000;
	      if (isR6 && selectedDuration !== null && !isRevealMode) durationMs = (selectedDuration * 1000) + 1000;

	      if (!(isR6 && selectedDuration === null)) {
		autoStopTimerRef.current = window.setTimeout(() => {
		  handleAudioControl('stop');
		}, durationMs);
	      }

	      if (isR34 && !isRevealMode) {
		if (roundPointsTimerRef.current) window.clearInterval(roundPointsTimerRef.current);
		roundPointsTimerRef.current = window.setInterval(() => {
		  setCurrentRoundPoints(prev => (prev || 0) + 1);
		}, 1000);
	      }
	    };

	    if (action === 'start') {
	      if (isR6 && !isPlaying && !isR6Finalized && selectedDuration === null) {
		showModal(t.currentTurn, t.confirmPlayerActive, () => {
		  setModal(null);
		  startPlayback();
		});
		return;
	      }
	      startPlayback();
	    } else {
  if (isR5 && r5IsActiveSession) {
    if (songRef.current) songRef.current.pause();
    setIsPlaying(false);
    setPlayedButNotEvaluated(prev => {
      if (!prev.includes(r5CurrentSongIdx)) {
        return [...prev, r5CurrentSongIdx];
      }
      return prev;
    });
    if (countdownIntervalRef.current) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  } else {
    // ALSO CLEAR INTERVAL FOR ROUNDS 1-4 WHEN STOPPING
    if (!isR5 && !isR6 && countdownIntervalRef.current) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    stopSong(false);
  }
  playSFX(SFX.stop);
}
	  };

	  const handleFinalizeTurn = (status: 'correct' | 'wrong' | 'skip', isTimeOut = false) => {
	    if (!activeNote || activeNote.isReveal) return;
	    const roundId = gameState.activeRoundId!;
	    const progress = gameState.roundProgress[roundId];
	    const isR6 = roundId === 6;
	    const isR5 = roundId === 5;

	    if (isR5) {
	      const pId = gameState.players[gameState.currentPlayerIndex].id;
	      const playerProg = progress.r5PlayerProgress?.[pId];
	      if (!playerProg) return;

	      const finalizeR5Player = (finalStatus: 'wrong' | 'all_correct' | 'time_out') => {
		stopSong(true);
		const finalCorrectCount = playerProg.correctIndices.size + (status === 'correct' ? 1 : 0);
		const pointsAwarded = finalCorrectCount * 10 + (finalCorrectCount === 7 ? 300 : 0);
		
		//setPlayedButNotEvaluated(null); 		// CLEAR YELLOW MARK
		setPlayedButNotEvaluated([]);
		
		setGameState(prev => {
		  const newPlayers = prev.players.map(p => p.id === pId ? { ...p, score: p.score + pointsAwarded } : p);
		  const newR5Progs = { ...progress.r5PlayerProgress };
		  const usedRowsSet = new Set(progress.usedRows || []);
		  if (selectedRow !== null) usedRowsSet.add(selectedRow);
		  
		  newR5Progs[pId] = {
		    ...playerProg,
		    hasFinished: true,
		    wrongIndex: finalStatus === 'wrong' ? r5CurrentSongIdx : null,
		    timeSpent: playerProg.timeSpent + (timerDuration - (timeLeft || 0))
		  };
		  if (status === 'correct') newR5Progs[pId].correctIndices.add(r5CurrentSongIdx);

		  return {
		    ...prev,
		    roundProgress: {
		      ...prev.roundProgress,
		      [5]: { ...progress, r5PlayerProgress: newR5Progs, usedRows: usedRowsSet }
		    },
		    players: newPlayers
		  };
		});
		setR5IsActiveSession(false);
		setActiveNote({ categoryId: 'r5_sprint', noteIndex: r5CurrentSongIdx, isReveal: true });
		playSFX(finalStatus === 'wrong' ? SFX.wrong : SFX.correct);
	      };

	      if (isTimeOut) { finalizeR5Player('time_out'); return; }
	      if (status === 'wrong') {
		  showModal(t.wrong, t.confirmAction, () => { 
		    setModal(null); 
		    finalizeR5Player('wrong'); 
		    // CLEAR yellow mark
		   setPlayedButNotEvaluated(prev => prev.filter(id => id !== r5CurrentSongIdx));
		  }, undefined, undefined, 'inline');
		  return;
		}
	  if (status === 'correct') {
  // ADD CONFIRMATION MODAL
  showModal(
    t.correct || "Correct",
    t.confirmAction || "Mark this song as correct?",
    () => {
      setModal(null);
      const newSet = new Set(playerProg.correctIndices);
      newSet.add(r5CurrentSongIdx);
      // Clear yellow mark
      setPlayedButNotEvaluated(prev => prev.filter(id => id !== r5CurrentSongIdx));
      
      if (selectedRow !== null) {
        const startIdx = selectedRow * 7;
        if (newSet.size === 7) { 
          finalizeR5Player('all_correct'); 
          return; 
        }
        let nextIdx = r5CurrentSongIdx;
        for (let i = 1; i <= 7; i++) {
          const potential = startIdx + ((r5CurrentSongIdx - startIdx + i) % 7);
          if (!newSet.has(potential)) {
            nextIdx = potential;
            break;
          }
        }
        setGameState(prev => {
          const progs = { ...progress.r5PlayerProgress };
          progs[pId] = { 
            ...playerProg, 
            correctIndices: newSet, 
            timeSpent: playerProg.timeSpent + (timerDuration - (timeLeft || 0)) 
          };
          return { 
            ...prev, 
            roundProgress: { 
              ...prev.roundProgress, 
              [5]: { ...progress, r5PlayerProgress: progs } 
            } 
          };
        });
        setR5CurrentSongIdx(nextIdx);
        setActiveNote({ categoryId: 'r5_sprint', noteIndex: nextIdx });
        playSFX(SFX.correct);
        stopSong(true);
      }
    },
    undefined, // confirmLabel - will use default from showModal
    undefined, // cancelLabel - will use default from showModal
    'inline'   // position
  );
  return;
}
	      return;
	    }

	    if (isR6) {
	      const activePlayers = progress.activePlayerIds || [];
	      const currentPlayerId = gameState.players[gameState.currentPlayerIndex].id;
	      const opponentId = activePlayers.find(id => id !== currentPlayerId);
	      const opponent = gameState.players.find(p => p.id === opponentId);
	      const currentPlayer = gameState.players[gameState.currentPlayerIndex];
	      
	      const targetPlayer = status === 'correct' ? currentPlayer : opponent;
	      const targetName = targetPlayer?.name || (targetPlayer?.id !== undefined ? `Player ${targetPlayer.id + 1}` : 'Player');

	      const title = status === 'correct' ? t.correct : t.wrong;
	      const msg = `${t.confirmAssignStar} ${targetName}?`;

	      showModal(title, msg, () => {
		setGameState(prev => {
		  let targetPlayerIdToReward = currentPlayerId;
		  let nextPlayerIdx = prev.currentPlayerIndex;
		  
		  if (status === 'wrong') {
		    if (opponentId !== undefined) {
		      targetPlayerIdToReward = opponentId;
		      // Change active player to opponent automatically
		      const foundOpponentIdx = prev.players.findIndex(p => p.id === opponentId);
		      if (foundOpponentIdx !== -1) nextPlayerIdx = foundOpponentIdx;
		    }
		    playSFX(SFX.wrong);
		  } else if (status === 'correct') {
		    playSFX(SFX.correct);
		  }

		  const newPlayers = prev.players.map(p => 
		    p.id === targetPlayerIdToReward ? { ...p, stars: (p.stars || 0) + 1 } : p
		  );
		  
		  return { ...prev, players: newPlayers, currentPlayerIndex: nextPlayerIdx };
		});
		setIsR6Finalized(true);
		setSelectedDuration(null);
		setModal(null);
		stopSong(selectedDuration !== null);
	      }, undefined, undefined, 'inline');
	      return;
	    }

	    showModal(status === 'correct' ? t.correct : t.wrong, status === 'correct' ? t.confirmAssignPoints : t.confirmNoPoints, () => {
	      const addedPoints = status === 'correct' ? (currentRoundPoints || 0) : 0;
	      if (status === 'correct') playSFX(SFX.correct);
	      else playSFX(SFX.wrong);
	      setGameState(prev => {
		const newPlayers = prev.players.map((p, idx) => idx === prev.currentPlayerIndex ? { ...p, score: p.score + addedPoints } : p);
		const newUsedNotes = new Set(progress.usedNotes);
		const newActivationCounts = { ...progress.activationCounts };
		const newPersistentPoints = { ...progress.persistentPoints };
		const newResults = { ...progress.results };
		const catId = activeNote.categoryId;
		if (roundId === 3 || roundId === 4) {
		  const count = (newActivationCounts[catId] || 0) + 1;
		  newActivationCounts[catId] = count;
		  newPersistentPoints[`${catId}-0`] = currentRoundPoints || 20; 
		  if (count >= 4) { newUsedNotes.add(`${catId}-0`); newResults[`${catId}-0`] = status; }
		} else {
		  newUsedNotes.add(`${catId}-${activeNote.noteIndex}`);
		  newResults[`${catId}-${activeNote.noteIndex}`] = status;
		}
		const isCompleted = (roundId === 3 || roundId === 4) ? (newActivationCounts[catId] >= 4) : Array.from({length: 4}).every((_, i) => newUsedNotes.has(`${catId}-${i}`));
		const newActivatedCategories = new Set(progress.activatedCategories);
		if (isCompleted) newActivatedCategories.add(catId);
		return {
		  ...prev, players: newPlayers, currentPlayerIndex: (prev.currentPlayerIndex + 1) % prev.players.length,
		  roundProgress: { ...prev.roundProgress, [roundId]: { ...progress, usedNotes: newUsedNotes, activatedCategories: newActivatedCategories, activationCounts: newActivationCounts, persistentPoints: newPersistentPoints, results: newResults } }
		};
	      });
	      stopSong(true); setActiveNote(null); setCurrentRoundPoints(undefined); setTimeLeft(undefined); setModal(null);
	    }, status === 'correct' ? t.correct : t.noAssign, undefined, 'inline');
	  };

const handleNextTurnNav = () => {
  const roundId = gameState.activeRoundId!;
  const progress = gameState.roundProgress[roundId];
  
  if (roundId === 6) {
    const nextIdx = (progress.currentTurnIndex || 0) + 1;
    
    // CHANGED: Go to Victory page instead of Start page when all turns are done
    if (nextIdx >= 10) { 
      setShowVictory(true); // Go to victory/scores page
      return; 
    }
    
    setGameState(prev => ({ 
      ...prev, 
      roundProgress: { 
        ...prev.roundProgress, 
        [6]: { 
          ...progress, 
          currentTurnIndex: nextIdx,
          usedNotes: progress.usedNotes ? new Set([...progress.usedNotes, `r6_final-${progress.currentTurnIndex || 0}`]) : new Set()
        } 
      } 
    }));
    setIsR6Finalized(false);
    setSelectedDuration(null);
    stopSong(true);
    setActiveNote({ categoryId: 'r6_final', noteIndex: 0 });
    setTimeLeft(undefined);
  } else if (roundId === 5) {
    // ... keep Round 5 logic the same ...
  }
};

	  const resetTimer = () => { setTimeLeft(timerDuration); playSFX(SFX.button); };
	  const formatTime = (seconds: number | undefined) => {
	    if (seconds === undefined) return "0:00";
	    const m = Math.floor(Math.abs(seconds) / 60);
	    const s = Math.floor(Math.abs(seconds) % 60);
	    return `${m}:${s.toString().padStart(2, '0')}`;
	  };

	  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
	    if (songRef.current) {
	      const val = parseFloat(e.target.value);
	      songRef.current.currentTime = val;
	      setAudioProgress(prev => ({ ...prev, current: val }));
	    }
	  };

	  const MusicTimeline = () => {
	    if (!isPlaying && audioProgress.current === 0) return null;
	    return (
	      <div className="w-full bg-slate-800 rounded-3xl p-6 border-2 border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.2)] animate-in slide-in-from-top duration-300">
		<span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2 block text-center">  {activeNote?.isReveal ? t.fullVersionSeek : t.playbackProgress}</span>
		<input type="range" min="0" max={audioProgress.total || 0} value={audioProgress.current} onChange={handleSeek} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 mb-2" />
		<div className="flex justify-between text-[10px] font-black text-slate-500 uppercase"><span>{formatTime(audioProgress.current)}</span><span>{formatTime(audioProgress.total)}</span></div>
	      </div>
	    );
	  };

	  const TimerSettings = () => (
	    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
	      <div className="bg-slate-900 rounded-3xl p-8 max-w-md w-full border-2 border-slate-700">
		<h3 className="text-2xl font-black text-white mb-6">{t.timerSettings || "Timer Settings"}</h3>
		<div className="space-y-4 mb-6"><div><label className="block text-sm font-bold text-slate-400 mb-2">{t.timerDuration || "Timer Duration (seconds)"}</label><input type="number" min="10" max="300" value={timerDuration} onChange={(e) => setTimerDuration(parseInt(e.target.value) || 60)} className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl px-4 py-3 text-white text-xl font-bold outline-none focus:border-indigo-500" /></div></div>
		<div className="flex gap-4"><button onClick={() => setShowTimerSettings(false)} className="flex-1 py-3 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700">{t.cancel}</button><button onClick={() => { setShowTimerSettings(false); resetTimer(); }} className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500">{t.save || "Save"}</button></div>
	      </div>
	    </div>
	  );

const Round1to4View = () => {
  const roundId = gameState.activeRoundId!;
  const progress = gameState.roundProgress[roundId];
  const selectedSetId = gameState.roundSets[roundId] || 'default';
  const roundData = getRoundData(roundId, selectedSetId) || [];
  const isR34 = roundId === 3 || roundId === 4;
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  
  return (
    <div className="min-h-screen bg-slate-950 p-8 pt-24">
      <div className="max-w-[1600px] mx-auto flex gap-12">
        <div className="flex-1 flex flex-col gap-12">
          {/* Main game area - same size as Round 5 */}
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-[5rem] p-16 border-2 border-slate-800 text-center relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-6">
                <div className="bg-indigo-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center text-5xl font-black shadow-lg shadow-indigo-900/30 ring-4 ring-indigo-500/20">
                  {roundId}
                </div>
                <div>
                  <h2 className="text-6xl font-black text-white tracking-tighter uppercase">
                    {t.round} {roundId}
                  </h2>
                  <div className="text-xl font-black text-slate-400 uppercase tracking-[0.3em] mt-2">
  			{isR34 ? t.melodyGuess : t.songChallenge}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => { 
                    const pr = Math.max(1, roundId - 1); 
                    initializeRound(pr); 
                    navigateTo('round', pr); 
                  }} 
                  className="p-6 bg-slate-800 text-slate-300 rounded-2xl hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all shadow-lg"
                >
                  <ChevronLeft size={40} />
                </button>
                <button 
                  onClick={() => { 
                    if(roundId < 5) { 
                      const nxt = roundId + 1; 
                      initializeRound(nxt); 
                      navigateTo('round', nxt); 
                    }
                  }}
                  className="p-6 bg-slate-800 text-slate-300 rounded-2xl hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all shadow-lg"
                >
                  <ChevronRight size={40} />
                </button>
              </div>
            </div>
            
            {/* Categories grid - bigger like Round 5 */}
            <div className="grid grid-cols-1 gap-8">
              {roundData.map(cat => {
                const activatedCount = progress.activationCounts[cat.id] || 0;
                const isCategoryFinished = progress.activatedCategories.has(cat.id);
                const isPointsActiveInTurn = activeNote?.categoryId === cat.id && activeNote?.noteIndex === 0 && !activeNote.isReveal;

                return (
                  <div 
                    key={cat.id} 
                    className={`flex items-center gap-8 p-8 rounded-[3rem] border-4 transition-all ${
                      activeNote?.categoryId === cat.id ? 'bg-indigo-900/20 border-indigo-500/50' : 'bg-slate-800/20 border-slate-700'
                    } ${isCategoryFinished ? 'opacity-40' : ''}`}
                  >
                    {/* Category name - bigger */}
                    <div className={`w-64 h-36 flex items-center justify-center rounded-3xl border-3 font-black text-2xl text-center px-8 leading-tight ${
                      isCategoryFinished ? 'bg-slate-800 text-slate-600 border-slate-700' : 'bg-slate-800 text-slate-200 border-slate-700'
                    }`}>
                      {gameState.language === 'en' ? cat.name.en : cat.name.ru}
                    </div>
                    
                    {/* Points/songs grid - bigger buttons */}
                    <div className={`flex-1 grid ${isR34 ? 'grid-cols-5' : 'grid-cols-4'} gap-6`}>
                      {isR34 ? (
                        <>
                          {/* Bonus points button - bigger */}
                          <button 
                            onClick={() => handleNoteClick(cat.id, 0)}
                            className={`h-36 rounded-3xl transition-all flex flex-col items-center justify-center border-4 relative overflow-hidden ${
                              isPointsActiveInTurn ? 'bg-indigo-600 text-white scale-110 shadow-[0_0_40px_rgba(99,102,241,0.6)] border-indigo-400 z-10' : 
                              'bg-slate-800 border-slate-700 text-indigo-400 hover:border-indigo-500/50 hover:bg-slate-700'
                            }`}
                            disabled={isCategoryFinished}
                          >
                            {isPointsActiveInTurn && isPlaying && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
                            {(activatedCount === 0 && !isPointsActiveInTurn) ? (
                              <MusicIcon size={48} className="opacity-40" />
                            ) : (
                              <span className="text-6xl font-black tracking-tighter">
                                {isPointsActiveInTurn ? currentRoundPoints : (progress.persistentPoints?.[`${cat.id}-0`] || 0)}
                              </span>
                            )}
                            <div className="absolute top-3 right-3 text-xs font-black uppercase opacity-50 bg-slate-900/50 px-2 rounded-md">
                              {4 - activatedCount} L
                            </div>
                          </button>
                          
                          {/* Song buttons - bigger */}
                          {[1, 2, 3, 4].map((idx) => {
                            const songIdx = idx - 1;
                            const isUnlocked = songIdx < activatedCount;
                            const isSelectedReveal = activeNote?.categoryId === cat.id && activeNote?.noteIndex === idx && activeNote.isReveal;
                            const noteId = `${cat.id}-${idx}`;
                            const isUsed = progress.usedNotes.has(noteId);
                            const result = progress.results?.[noteId];
                            
                            let btnCls = `h-36 rounded-3xl border-4 flex items-center justify-center transition-all `;
                            
                            if (!isUnlocked) {
                              btnCls += `bg-slate-900/50 border-dashed border-slate-700 text-slate-800 cursor-not-allowed `;
                            } else if (isSelectedReveal) {
                              btnCls += `bg-indigo-800 border-white text-white animate-pulse shadow-[0_0_50px_rgba(99,102,241,0.7)] ring-4 ring-indigo-500/50 z-10 `;
                            } else if (isUsed) {
                              if (result === 'correct') {
                                btnCls += `bg-emerald-900/60 text-emerald-400 border-emerald-500/50 hover:bg-emerald-800/80 hover:border-emerald-400 `;
                              } else if (result === 'wrong') {
                                btnCls += `bg-rose-900/60 text-rose-400 border-rose-500/50 hover:bg-rose-800/80 hover:border-rose-400 `;
                              } else {
                                btnCls += `bg-slate-800 border-slate-600 text-slate-500 hover:bg-slate-700 hover:text-indigo-400 hover:border-slate-500 `;
                              }
                            } else {
                              btnCls += `bg-slate-800 border-slate-700 text-slate-500 hover:bg-slate-700 hover:text-indigo-400 `;
                            }
                            
                            return (
                              <button
                                key={idx}
                                onClick={() => isUnlocked && handleNoteClick(cat.id, idx)}
                                className={btnCls}
                                disabled={!isUnlocked}
                              >
                                {isSelectedReveal && isPlaying ? (
                                  <PlayCircle size={48} className="animate-spin" />
                                ) : (
                                  <MusicIcon size={isUnlocked ? 48 : 40} />
                                )}
                                
                                {/* Show play icon for used notes */}
                                {isUsed && !isSelectedReveal && (
                                  <div className="absolute bottom-3 right-3">
                                    <PlayCircle size={24} className="text-slate-400" />
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </>
                      ) : (
                        /* R1/R2 song buttons - bigger */
                        cat.songs.map((_, idx) => {
                          const noteId = `${cat.id}-${idx}`;
                          const isUsed = progress.usedNotes.has(noteId);
                          const isSelected = activeNote?.categoryId === cat.id && activeNote?.noteIndex === idx && !activeNote.isReveal;
                          const isRevealActive = activeNote?.categoryId === cat.id && activeNote?.noteIndex === idx && activeNote.isReveal;
                          const turnResult = progress.results[noteId];
                          const isCurrentlyPlayingThis = (isSelected || isRevealActive) && isPlaying;
                          let pts = null;
                          if (isSelected || (isUsed && !isRevealActive)) {
                            pts = isSelected ? currentRoundPoints : progress.pointMap?.[cat.id]?.[idx];
                          }
                          
                          let btnCls = `h-36 rounded-3xl transition-all flex flex-col items-center justify-center group relative overflow-hidden border-4 `;
                          
                          if (isSelected) {
                            btnCls += `bg-indigo-600 text-white shadow-[0_0_40px_rgba(99,102,241,0.6)] scale-110 border-indigo-400 z-10 `;
                          } else if (isRevealActive) {
                            btnCls += `bg-indigo-800 text-white border-white animate-pulse shadow-[0_0_50px_rgba(99,102,241,0.7)] ring-4 ring-indigo-500/50 z-10 `;
                          } else if (isUsed) {
                            if (turnResult === 'correct') {
                              btnCls += `bg-emerald-900/60 text-emerald-400 border-emerald-500/50 hover:bg-emerald-800/80 hover:border-emerald-400 `;
                            } else if (turnResult === 'wrong') {
                              btnCls += `bg-rose-900/60 text-rose-400 border-rose-500/50 hover:bg-rose-800/80 hover:border-rose-400 `;
                            } else {
                              btnCls += `bg-slate-800 border-slate-600 text-slate-500 hover:bg-slate-700 hover:text-indigo-400 hover:border-slate-500 `;
                            }
                          } else {
                            btnCls += `bg-slate-800 border-slate-700 text-indigo-400 hover:border-indigo-500/50 hover:bg-slate-700 hover:-translate-y-1 `;
                          }
                          
                          return (
                            <button 
                              key={idx} 
                              onClick={() => handleNoteClick(cat.id, idx)}
                              className={btnCls}
                              disabled={isCategoryFinished && !isUsed}
                            >
                              {isCurrentlyPlayingThis && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
                              {!pts ? (
                                <MusicIcon size={48} className={`${isSelected ? 'animate-bounce' : 'group-hover:rotate-12 transition-transform opacity-60'}`} />
                              ) : (
                                <span className="text-6xl font-black tracking-tighter">{pts}</span>
                              )}
                              
                              {/* Show play icon for used notes in reveal mode */}
                              {isRevealActive && (
                                <div className="absolute bottom-3 right-3">
                                  <PlayCircle size={28} className="text-white opacity-80" />
                                </div>
                              )}
                            </button>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Player board - same style as Round 5 */}
          <div className="bg-slate-900/50 p-12 rounded-[5rem] border-2 border-slate-800">
            <PlayerBoard 
              players={gameState.players} 
              currentPlayerIndex={gameState.currentPlayerIndex} 
              onUpdatePlayer={handleUpdatePlayer} 
              onSetCurrentPlayer={(idx) => showModal(t.playerName, t.confirmPlayerActive, () => { 
                setGameState(prev => ({ ...prev, currentPlayerIndex: idx })); 
                setModal(null); 
              })} 
              t={t} 
            />
          </div>
        </div>

        {/* Right sidebar - same width as Round 5 */}
        <div className="w-[450px] flex flex-col gap-10 relative">
          {/* Player info - same style as Round 5 */}
          <div className="bg-slate-800 rounded-[3rem] p-12 border-2 border-slate-700 shadow-2xl flex flex-col items-center gap-4 overflow-hidden">
            <span className="text-sm font-black text-slate-500 uppercase tracking-[0.4em] mb-2">{t.currentTurn}</span>
            <div className="text-4xl font-black text-white truncate text-center w-full mb-2 tracking-tight">
              {currentPlayer.name || `Player ${gameState.currentPlayerIndex + 1}`}
            </div>
            <div className="bg-indigo-900/40 px-10 py-4 rounded-3xl border-2 border-indigo-500/30 shadow-inner">
              <span className="text-4xl font-black text-indigo-400 tabular-nums">
                {currentPlayer.score} <span className="text-xs uppercase opacity-60 ml-2 tracking-widest">{t.points}</span>
              </span>
            </div>
          </div>
          
          
          
          
          
          
          
          
          

          {/* Control panel */}
          <ControlPanel 
            isPlaying={isPlaying} 
            onStart={() => handleAudioControl('start')} 
            onStop={() => handleAudioControl('stop')} 
            onCorrect={() => handleFinalizeTurn('correct')} 
            onWrong={() => handleFinalizeTurn('wrong')} 
            currentPoints={currentRoundPoints}
            timeLeft={timeLeft} 
            t={t} 
            disabledActions={!activeNote || activeNote.isReveal || progress.usedNotes.has(`${activeNote.categoryId}-${activeNote.noteIndex}`)} 
            isStartDisabled={!activeNote}
          />
          
          {/* Music timeline */}
          <MusicTimeline />
          
          {/* Inline modal */}
          {modal?.isOpen && modal.position === 'inline' && (
            <div className="w-full bg-slate-800 rounded-3xl p-8 border-2 border-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.3)] animate-in fade-in slide-in-from-top duration-300">
              <h3 className="text-sm font-black text-white mb-3 leading-tight uppercase tracking-widest text-center">{modal.title}</h3>
              <p className="text-slate-300 text-xs mb-6 font-medium text-center leading-relaxed">{modal.message}</p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={modal.onConfirm} 
                  className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all uppercase tracking-widest text-sm shadow-lg shadow-indigo-900/40"
                >
                  {modal.confirmLabel}
                </button>
                <button 
                  onClick={() => setModal(null)} 
                  className="w-full py-4 rounded-2xl bg-slate-700 text-slate-300 font-bold hover:bg-slate-600 transition-colors uppercase tracking-widest text-sm"
                >
                  {modal.cancelLabel}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

	  const RoundView = () => {
	    const roundId = gameState.activeRoundId;
	    if (roundId === null) return null;
	    const progress = gameState.roundProgress[roundId];
	    if (!progress) { initializeRound(roundId); return null; }
	    const isR5 = roundId === 5;
	    const isR6 = roundId === 6;

	    if (isR5) {
	      const selectedSetId = gameState.roundSets[roundId] || 'default';
	      const roundData = getRoundData(roundId, selectedSetId) || []; if (!roundData || roundData.length === 0) return null;
	      const currentPlayer = gameState.players[gameState.currentPlayerIndex];
	      const pId = currentPlayer.id; const playerProg = progress.r5PlayerProgress?.[pId]; const usedRowsSet = progress.usedRows || new Set();
	      if (!playerProg) return null;
	      return (
		<div className="min-h-screen bg-slate-950 p-8 pt-24">
		  <div className="max-w-[1600px] mx-auto flex gap-12">
		    <div className="flex-1 flex flex-col gap-12">
		      <div className="bg-slate-900/80 backdrop-blur-xl rounded-[5rem] p-16 border-2 border-slate-800 text-center relative overflow-hidden shadow-2xl">
		        <div className="flex items-center justify-between mb-10">
  <div className="flex items-center gap-6">
    <div className="bg-indigo-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center text-5xl font-black shadow-lg shadow-indigo-900/30 ring-4 ring-indigo-500/20">5</div>
    <div>
      <h2 className="text-6xl font-black text-white tracking-tighter uppercase">SPRINT</h2>
      <div className="text-xl font-black text-slate-400 uppercase tracking-[0.3em] mt-2">{t.round} 5</div>
    </div>
  </div>
  <div className="flex gap-4">
    {/* Back arrow to Round 4 - disabled when playing */}
  <button 
  onClick={() => { 
    if (isPlaying) return;
    
    // Immediate action without modal
    stopSong();
    initializeRound(4);
    navigateTo('round', 4);
  }} 
  className={`p-6 rounded-2xl transition-all ${
    isPlaying 
      ? 'opacity-20 cursor-not-allowed bg-slate-800' 
      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:scale-105 active:scale-95 shadow-lg'
  }`}
  disabled={isPlaying}
>
  <ChevronLeft size={40} />
</button>
    
    {/* Forward arrow to Round 6 - disabled when playing */}
    <button 
      onClick={() => { 
        // Don't navigate if currently playing
        if (isPlaying) return;
        
        // Show confirmation modal
        showModal(
          t.mainMenu, 
          "Go to Round 6?", 
          () => {
            stopSong(); // Stop any playing music FIRST
            initializeRound(6);
            navigateTo('round', 6);
            setModal(null);
          }
        );
      }} 
      className={`p-6 rounded-2xl transition-all ${
        isPlaying 
          ? 'opacity-20 cursor-not-allowed bg-slate-800' 
          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:scale-105 active:scale-95 shadow-lg'
      }`}
      disabled={isPlaying}
    >
      <ChevronRight size={40} />
    </button>
  </div>
</div>
		        {r5IsActiveSession && (
		          <div className="mb-10 flex items-center justify-center gap-6"><div className="bg-slate-800/50 px-10 py-6 rounded-3xl border-2 border-slate-700"><div className="text-sm font-black text-slate-500 uppercase tracking-widest mb-2">{t.timeLeft || "Time Left"}</div><div className={`text-6xl font-black tabular-nums ${timeLeft && timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-indigo-400'}`}>{formatTime(timeLeft)}</div></div><button onClick={() => setShowTimerSettings(true)} className="px-8 py-6 bg-slate-800 text-white rounded-3xl font-bold border-2 border-slate-700">{t.settings || "Settings"}</button></div>
		        )}
		        <div className="mb-16">{[0, 1, 2].map(row => {
		            const startIdx = row * 7; const isPlayerRow = selectedRow === row; const isRowUsed = usedRowsSet.has(row);
		            return (<div key={row} className={`mb-8 p-8 rounded-[3rem] border-4 ${isPlayerRow && r5IsActiveSession ? 'bg-slate-800/50 border-slate-600' : isRowUsed ? 'opacity-50' : 'bg-slate-900/30'}`}><div className="text-xl font-black text-slate-400 mb-6 uppercase">Row {row + 1}</div><div className="grid grid-cols-7 gap-4">{Array.from({length: 7}, (_, i) => startIdx + i).map(songIdx => {
		              const isCorrect = playerProg?.correctIndices.has(songIdx); const isWrong = playerProg?.wrongIndex === songIdx; const isActive = r5CurrentSongIdx === songIdx; const isSelectable = !playerProg?.hasFinished && !isRowUsed && (!r5IsActiveSession || (isPlayerRow && r5IsActiveSession && !isCorrect));
		              return (<button key={songIdx} onClick={() => { if (isSelectable || playerProg?.hasFinished || isCorrect || isWrong) handleNoteClick('r5_sprint', songIdx); }} className={`h-24 rounded-2xl border-3 transition-all flex flex-col items-center justify-center ${
  isActive && r5IsActiveSession ? 'bg-indigo-600 border-white scale-110 z-10' : 
  isCorrect ? 'bg-emerald-600 border-emerald-400' : 
  isWrong ? 'bg-rose-600 border-rose-400' : 
  playedButNotEvaluated.includes(songIdx) ? 'bg-yellow-600 border-yellow-400' :
  isSelectable ? 'bg-slate-800 border-slate-600 hover:bg-slate-700' : 
  'bg-slate-900/50 opacity-60'
}`}>{isCorrect ? <CheckCircle size={28} /> : isWrong ? <XCircle size={28} /> : <MusicIcon size={28} />}</button>);
		            })}</div></div>);
		          })}</div>
		        {!r5IsActiveSession && playerProg?.hasFinished && (<div className="flex flex-col items-center animate-in fade-in duration-700"><div className="text-3xl font-black text-indigo-400 mb-4 uppercase">{playerProg.correctIndices.size === 7 ? t.perfectRound || "Perfect Round!"  : `${playerProg.correctIndices.size} Correct`}</div><button onClick={() => { setR5IsActiveSession(false); setSelectedRow(null); setActiveNote(null); setTimeLeft(undefined);  setPlayedButNotEvaluated([]);}} className="py-8 px-20 rounded-[2.5rem] bg-indigo-600 text-white font-black text-3xl uppercase">{t.continue || "Continue"}</button></div>)}
		      </div>
		      <div className="bg-slate-900/50 p-12 rounded-[5rem] border-2 border-slate-800"><PlayerBoard players={gameState.players} currentPlayerIndex={gameState.currentPlayerIndex} onUpdatePlayer={handleUpdatePlayer} onSetCurrentPlayer={(idx) => { if (r5IsActiveSession) return; showModal(t.playerName, t.confirmPlayerActive, () => { setGameState(prev => ({ ...prev, currentPlayerIndex: idx })); setR5IsActiveSession(false); setModal(null); }); }} t={t} /></div>
		    </div>
		    
		    
		    
		    
<div className="w-[450px] flex flex-col gap-10 relative">
  {/* Current Player Info */}
  <div className="bg-slate-800 rounded-[3rem] p-12 border-2 border-slate-700 shadow-2xl flex flex-col items-center gap-4">
    <div className="text-4xl font-black text-white text-center truncate w-full">
      {currentPlayer.name || `Player ${gameState.currentPlayerIndex + 1}`}
    </div>
    <div className="bg-indigo-900/40 px-10 py-4 rounded-3xl border-2 border-indigo-500/30 shadow-inner">
      <span className="text-4xl font-black text-indigo-400 tabular-nums">
        {currentPlayer.score} <span className="text-xs uppercase opacity-60 ml-2 tracking-widest">PTS</span>
      </span>
    </div>
  </div>
  
  {/* ADD THIS: Round 5 Session Points Tracker */}
  <div className="bg-slate-800 rounded-[3rem] p-8 border-2 border-slate-700 shadow-2xl">
    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest text-center mb-6"> {t.round5Progress || "ROUND 5 PROGRESS"}
      
    </h3>
    
    {/* Points earned in this session */}
    <div className="bg-slate-900/60 rounded-2xl p-6 mb-4 border border-slate-700">
      <div className="flex justify-between items-center mb-2">
        <span className="text-slate-400 text-sm font-bold">  {t.sessionPoints || "Session Points"} </span>
        <span className="text-3xl font-black text-emerald-400">
          {(() => {
            const pId = currentPlayer.id;
            const playerProg = progress.r5PlayerProgress?.[pId];
            const correctCount = playerProg?.correctIndices?.size || 0;
            const isCurrentSongCorrect = playerProg?.correctIndices?.has(r5CurrentSongIdx);
            const currentBonus = correctCount === 7 ? 300 : 0;
            
            // Calculate current session points
            let sessionPoints = correctCount * 10;
            
            // If we're evaluating current song and it's correct, add it
            if (isCurrentSongCorrect && r5IsActiveSession) {
              sessionPoints += 10;
            }
            
            // Add bonus if all 7 are correct
            if (correctCount === 7 || (correctCount === 6 && isCurrentSongCorrect)) {
              sessionPoints += 300;
            }
            
            return sessionPoints;
          })()}
        </span>
      </div>
      <div className="text-xs text-slate-500 font-medium"> {t.tenPerCorrect || "+10 per correct song"}        
      </div>
    </div>
    

    
    {/* Bonus tracker */}
    <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-700">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-slate-400 text-sm font-bold block"> {t.perfectRoundBonus || "Perfect Round Bonus"}</span>
          <span className="text-xs text-slate-500">{t.all7Correct || "All 7 songs correct"}</span>
        </div>
        <div className={`text-2xl font-black ${(() => {
          const pId = currentPlayer.id;
          const playerProg = progress.r5PlayerProgress?.[pId];
          return (playerProg?.correctIndices?.size || 0) === 7 ? 'text-yellow-400' : 'text-slate-600';
        })()}`}>
          +300
        </div>
      </div>
      <div className="mt-4 flex gap-1">
        {Array.from({ length: 7 }).map((_, idx) => {
          const pId = currentPlayer.id;
          const playerProg = progress.r5PlayerProgress?.[pId];
          const isCorrect = playerProg?.correctIndices?.has(selectedRow !== null ? selectedRow * 7 + idx : idx);
          return (
            <div 
              key={idx}
              className={`flex-1 h-2 rounded-full ${
                isCorrect ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            />
          );
        })}
      </div>
    </div>
  </div>
  
  {/* Control Panel */}
  <ControlPanel 
    isPlaying={isPlaying} 
    onStart={() => handleAudioControl('start')} 
    onStop={() => handleAudioControl('stop')} 
    onCorrect={() => handleFinalizeTurn('correct')} 
    onWrong={() => handleFinalizeTurn('wrong')} 
    onSkip={() => handleFinalizeTurn('skip')} 
    timeLeft={timeLeft} 
    t={t} 
    disabledActions={!r5IsActiveSession || timeLeft === 0} 
    isStartDisabled={false} 
  />
  
  <MusicTimeline />
  
  {modal?.isOpen && modal.position === 'inline' && (
    <ConfirmationModal 
      isOpen={modal.isOpen} 
      title={modal.title} 
      message={modal.message} 
      onConfirm={modal.onConfirm} 
      onCancel={() => setModal(null)} 
      confirmLabel={modal.confirmLabel} 
      cancelLabel={modal.cancelLabel} 
      position={modal.position} 
    />
  )}
</div>		    
		    
		    
		    
		    
		    
		   
		  </div>
		</div>
	      );
	    }

	    if (isR6) {
	      const selectedSetId = gameState.roundSets[roundId] || 'default';
	      const roundData = getRoundData(roundId, selectedSetId) || [];
	      const turnIdx = progress.currentTurnIndex || 0; const song = roundData[0]?.songs[turnIdx]; const isSongUsed = progress.usedNotes?.has(`r6_final-${turnIdx}`); const currentPlayer = gameState.players[gameState.currentPlayerIndex];
	      return (
		<div className="min-h-screen bg-slate-950 p-8 pt-24">
		  <div className="max-w-[1600px] mx-auto flex gap-12">
		    <div className="flex-1 flex flex-col gap-12">
		      <div className="bg-slate-900/80 backdrop-blur-xl rounded-[5rem] p-16 border-2 border-slate-800 text-center relative overflow-hidden shadow-2xl">
		        <div className="absolute top-0 left-0 w-full h-4 bg-indigo-600/10"><div className="bg-indigo-600 h-full transition-all duration-1000" style={{ width: `${((turnIdx+1)/10)*100}%` }} /></div>
		       <div className="flex items-center justify-between mb-10">
  <div className="flex items-center gap-6">
    <div className="bg-indigo-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center text-5xl font-black shadow-lg shadow-indigo-900/30 ring-4 ring-indigo-500/20">6</div>
    <h2 className="text-6xl font-black text-white tracking-tighter uppercase">{t.categories.superGame}</h2>
  </div>
  <div className="flex gap-4">
    {/* Back arrow to Round 5 - disabled when playing */}
    <button 
      onClick={() => { 
        // Don't navigate if currently playing
        if (isPlaying) return;
        
        // Show confirmation modal
        showModal(
          t.mainMenu, 
          "Go back to Round 5?", 
          () => {
            stopSong(); // Stop any playing music FIRST
            initializeRound(5);
            navigateTo('round', 5);
            setModal(null);
          }
        );
      }} 
      className={`p-6 rounded-2xl transition-all ${
        isPlaying 
          ? 'opacity-20 cursor-not-allowed bg-slate-800' 
          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:scale-105 active:scale-95 shadow-lg'
      }`}
      disabled={isPlaying}
    >
      <ChevronLeft size={40} />
    </button>
    
    {/* Disabled forward arrow since Round 6 is last */}
    <button 
      className="p-6 bg-slate-800/20 text-slate-700 rounded-2xl cursor-not-allowed transition-all"
      disabled
    >
      <ChevronRight size={40} />
    </button>
  </div>
</div>
		        <div className="bg-slate-800/40 rounded-[4rem] p-16 border-2 border-slate-700/50 mb-14 shadow-inner group"><HelpCircle size={80} className="text-indigo-500 mx-auto mb-8" /><p className="text-5xl font-black text-white italic">"{gameState.language === 'en' ? song?.hint?.en : song?.hint?.ru}"</p></div>
		        <div className="flex justify-center gap-8">
		          {[1, 2, 3, 4, 5].map(s => (<button key={s} onClick={() => { setSelectedDuration(s); playSFX(SFX.button); }} className={`w-32 h-32 rounded-[2rem] border-4 transition-all ${selectedDuration === s ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}`}><span className="text-5xl font-black">{s}</span></button>))}
		         <div className="relative">
  <button 
    onClick={() => { 
      if (!isR6Finalized) {
        // Show a tooltip or play error sound
        return; 
      }
      setSelectedDuration(null); 
      playSFX(SFX.button); 
    }} 
    className={`px-14 h-32 rounded-[2rem] border-4 transition-all ${
      selectedDuration === null ? 'bg-indigo-800 border-white text-white scale-110 shadow-2xl z-10' : 
      !isR6Finalized ? 'bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed' :
      'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
    }`}
    disabled={!isR6Finalized}
  >
    <span className="text-4xl font-black uppercase tracking-widest">
      {t.full}
    </span>
  </button>
  
  {/* Tooltip when button is disabled */}
  {!isR6Finalized && (
    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded-xl border border-slate-700 whitespace-nowrap z-20 animate-pulse">
      ← First press CORRECT or WRONG
    </div>
  )}
</div>
		        </div>
		        {isR6Finalized && (<button onClick={handleNextTurnNav} className="mt-16 py-8 px-20 rounded-[2.5rem] bg-emerald-600 text-white font-black text-3xl uppercase">Next Turn</button>)}
		      </div>
		      <div className="bg-slate-900/50 p-12 rounded-[5rem] border-2 border-slate-800"><PlayerBoard players={gameState.players} currentPlayerIndex={gameState.currentPlayerIndex} onUpdatePlayer={handleUpdatePlayer} onSetCurrentPlayer={(idx) => { if(progress.activePlayerIds?.includes(gameState.players[idx].id)) showModal(t.playerName, t.confirmPlayerActive, () => { setGameState(prev => ({ ...prev, currentPlayerIndex: idx })); setModal(null); }); }} t={t} activePlayerIds={progress.activePlayerIds} /></div>
		    </div>
		    
		    
		    <div className="w-[450px] flex flex-col gap-10 relative">
		      <div className="bg-slate-800 rounded-[3rem] p-12 border-2 border-slate-700 shadow-2xl flex flex-col items-center gap-4">
		      
		       {/* Turn indicator */}
			  <span className="text-lg font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">
			    {t.turn || "TURN"} {turnIdx + 1} / 10
				  </span>

{/* Both players in a grid */}
<div className="grid grid-cols-2 gap-8 w-full">
  {/* Current Player */}
  <div className="flex flex-col items-center">
    <div className="text-2xl font-black text-indigo-300 mb-3 text-center break-words whitespace-normal w-full px-2 min-h-[4rem] flex items-center justify-center">
      <div className="leading-tight">
        {currentPlayer.name || `Player ${gameState.currentPlayerIndex + 1}`}
      </div>
    </div>
    <div className="bg-indigo-900/40 px-6 py-4 rounded-3xl border-2 border-indigo-500/30 shadow-inner flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-2">
        {/* Current player stars - 10 stars instead of 5 */}
        {(() => {
          const stars = currentPlayer.stars || 0;
          const elements = [];
          // Display up to 10 filled stars
          for (let i = 0; i < Math.min(stars, 10); i++) {
            elements.push(<Star key={i} size={28} className="text-yellow-400 fill-yellow-400" />);
          }
          // Display empty stars for the remaining up to 10
          for (let i = stars; i < 10; i++) {
            elements.push(<Star key={`empty-${i}`} size={28} className="text-indigo-900/40 fill-indigo-900/40" />);
          }
          return elements;
        })()}
      </div>
    </div>
  </div>
  
  {/* Opponent Player */}
  <div className="flex flex-col items-center">
    <div className="text-2xl font-black text-rose-300 mb-3 text-center break-words whitespace-normal w-full px-2 min-h-[4rem] flex items-center justify-center">
      <div className="leading-tight">
        {(() => {
          const activePlayers = progress.activePlayerIds || [];
          const currentPlayerId = currentPlayer.id;
          const opponentId = activePlayers.find(id => id !== currentPlayerId);
          const opponent = gameState.players.find(p => p.id === opponentId);
          return opponent?.name || `Player ${opponentId !== undefined ? opponentId + 1 : '?'}`;
        })()}
      </div>
    </div>
    <div className="bg-rose-900/40 px-6 py-4 rounded-3xl border-2 border-rose-500/30 shadow-inner flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-2">
        {/* Opponent stars - 10 stars instead of 5 */}
        {(() => {
          const activePlayers = progress.activePlayerIds || [];
          const currentPlayerId = currentPlayer.id;
          const opponentId = activePlayers.find(id => id !== currentPlayerId);
          const opponent = gameState.players.find(p => p.id === opponentId);
          const opponentStars = opponent?.stars || 0;
          
          // Display up to 10 filled stars for opponent
          const yellowStars = Array.from({ length: Math.min(opponentStars, 10) }).map((_, i) => (
            <Star key={i} size={28} className="text-yellow-400 fill-yellow-400" />
          ));
          
          // Display empty stars for the remaining up to 10
          const grayStars = Array.from({ length: Math.max(0, 10 - opponentStars) }).map((_, i) => (
            <Star key={`empty-${i}`} size={28} className="text-rose-900/40 fill-rose-900/40" />
          ));
          
          // Return the combined array
          return [...yellowStars, ...grayStars];
        })()}
    </div>
  </div>
</div>
  </div>    
		      
		      </div>
		      <ControlPanel isPlaying={isPlaying} onStart={() => handleAudioControl('start')} onStop={() => handleAudioControl('stop')} onCorrect={() => handleFinalizeTurn('correct')} onWrong={() => handleFinalizeTurn('wrong')} timeLeft={timeLeft} t={t} disabledActions={isR6Finalized || isSongUsed} isStartDisabled={!isR6Finalized && selectedDuration === null} />
		      <MusicTimeline />
		      {modal?.isOpen && modal.position === 'inline' && (
  <div className="w-full bg-slate-800 rounded-3xl p-6 border-2 border-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.3)] animate-in fade-in slide-in-from-top duration-300">
    <h3 className="text-xs font-black text-white mb-2 leading-tight uppercase tracking-widest text-center">{modal.title}</h3>
    <p className="text-slate-400 text-[10px] mb-4 font-medium text-center">{modal.message}</p>
    <div className="flex flex-col gap-2">
      <button 
        onClick={modal.onConfirm} 
        className="w-full py-3 rounded-xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-900/40"
      >
        {modal.confirmLabel}
      </button>
      <button 
        onClick={() => setModal(null)} 
        className="w-full py-3 rounded-xl bg-slate-700 text-slate-300 font-bold hover:bg-slate-600 transition-colors uppercase tracking-widest text-[10px]"
      >
        {modal.cancelLabel}
      </button>
    </div>
  </div>
)}
		    </div>
		  </div>
		</div>
	      );
	    }
	    return <Round1to4View />;
	  };

const SetupView = () => {
  // Use local state for player names that only updates SetupView
  const [localPlayers, setLocalPlayers] = useState(gameState.players);
  
  // Sync with gameState when players are added/removed
  useEffect(() => {
    setLocalPlayers(gameState.players);
  }, [gameState.players.length]); // Only update when number of players changes

  const handleLocalUpdate = (id: number, name: string, score: number) => {
    setLocalPlayers(prev => 
      prev.map(p => p.id === id ? { ...p, name, score } : p)
    );
  };

  const handleSaveAndBlur = (id: number) => {
    const localPlayer = localPlayers.find(p => p.id === id);
    const globalPlayer = gameState.players.find(p => p.id === id);
    
    if (localPlayer && globalPlayer && 
        (localPlayer.name !== globalPlayer.name || localPlayer.score !== globalPlayer.score)) {
      handleUpdatePlayer(id, localPlayer.name, localPlayer.score);
    }
  };

  const handleRemovePlayer = (id: number) => {
    const playerToRemove = localPlayers.find(p => p.id === id);
    if (playerToRemove) {
      setGameState(prev => ({
        ...prev,
        players: prev.players.filter(p => p.id !== id)
      }));
    }
  };

  const handleAddPlayer = () => {
    const newId = localPlayers.length > 0 
      ? Math.max(...localPlayers.map(p => p.id)) + 1 
      : 1;
    
    const newPlayer = { 
      id: newId, 
      name: '', 
      score: 0, 
      stars: 0 
    };
    
    setLocalPlayers(prev => [...prev, newPlayer]);
    setGameState(prev => ({
      ...prev,
      players: [...prev.players, newPlayer]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
      <div className="bg-slate-900/90 backdrop-blur-xl p-16 rounded-[4rem] border border-slate-800 max-w-4xl w-full text-center shadow-2xl">
        <Users size={80} className="text-indigo-500 mx-auto mb-10 animate-pulse" />
        <h1 className="text-6xl font-black text-white mb-12 uppercase tracking-tighter">{t.playerSetup}</h1>
        
        <div className="space-y-8 mb-14">
          {localPlayers.map((p, idx) => (
            <div key={p.id} className="flex gap-6 items-center">
              <input 
                type="text" 
                placeholder={`${t.playerName} ${idx + 1}`} 
                value={p.name}
                onChange={(e) => handleLocalUpdate(p.id, e.target.value, p.score)}
                onBlur={() => handleSaveAndBlur(p.id)}
                className="flex-1 bg-slate-800 border-2 border-slate-700 rounded-[2rem] px-10 py-6 text-white text-2xl font-black outline-none focus:border-indigo-500"
                autoComplete="off"
              />
              
              <div className="flex flex-col items-center">
                <span className="text-xs font-black text-slate-500 mb-2 uppercase">{t.points}</span>
                <input 
                  type="number" 
                  value={p.score}
                  onChange={(e) => handleLocalUpdate(p.id, p.name, parseInt(e.target.value) || 0)}
                  onBlur={() => handleSaveAndBlur(p.id)}
                  className="w-32 bg-slate-800 border-2 border-slate-700 rounded-[2rem] px-2 py-6 text-indigo-400 font-black text-3xl text-center outline-none focus:border-indigo-500"
                />
              </div>
              
              {localPlayers.length > 1 && (
                <button 
                  onClick={() => handleRemovePlayer(p.id)} 
                  className="p-7 bg-rose-900/20 text-rose-500 rounded-[2rem] hover:bg-rose-900/30 transition-colors"
                >
                  <XCircle size={36} />
                </button>
              )}
            </div>
          ))}
          
          {localPlayers.length < 3 && (
            <button 
              onClick={handleAddPlayer} 
              className="w-full py-8 border-2 border-dashed border-slate-700 rounded-[2rem] text-slate-500 font-black text-2xl hover:border-indigo-500 hover:text-indigo-400 transition-colors"
            >
              + {t.editPlayer}
            </button>
          )}
        </div>
        
        <button 
          onClick={handleStartGameFromSetup} 
          className="w-full py-10 rounded-[2.5rem] bg-indigo-600 text-white font-black text-3xl shadow-xl uppercase tracking-[0.2em] hover:bg-indigo-700 transition-colors"
        >
          {t.startGame}
        </button>
      </div>
    </div>
  );
};

	  const StartView = () => (
	    <div className="min-h-screen bg-slate-950 p-6 pt-20">
	      <div className="max-w-[1400px] mx-auto text-center">
	        <h1 className="text-7xl font-black text-white mb-6 tracking-tighter uppercase">{t.title}</h1>
	        <p className="text-xl text-slate-400 mb-10 font-bold uppercase tracking-[0.4em]">{t.chooseRound}</p>
	        <button onClick={() => { initializeRound(1); navigateTo('round', 1); }} className="mb-12 py-8 px-20 bg-indigo-600 text-white rounded-[2.5rem] font-black text-3xl shadow-xl flex items-center gap-6 mx-auto"><PlayCircle size={48} /> {t.startOrder}</button>
	        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
	          {[1, 2, 3, 4, 5, 6].map((num) => {
	            const availableSets = getAvailableSets(num);
	            const selectedSetId = gameState.roundSets[num] || 'default';
	            const selectedSet = availableSets.find(s => s.id === selectedSetId);
	            const hasMultipleSets = [1, 2, 3, 4].includes(num) && availableSets.length > 1;
	            
	            return (
	              <div key={num} className="flex flex-col gap-3">
	                <button 
	                  onClick={() => navigateTo('round', num)} 
	                  className="group w-full bg-slate-900 border-2 border-slate-800 p-10 rounded-[3rem] hover:border-indigo-500 transition-all hover:-translate-y-3 shadow-2xl"
	                >
	                  <MusicIcon size={60} className="text-slate-600 mx-auto mb-6" />
	                  <div className="text-5xl font-black text-white mb-2">
	                    {num === 6 ? t.categories.superGame : `${t.round} ${num}`}
	                  </div>
	                  <div className="text-base font-black text-slate-500 uppercase mt-3">
	                    {num === 6 ? 'FINAL' : num === 5 ? 'SPRINT' : 'CHALLENGE'}
	                  </div>
	                </button>
	                
	                {/* Dataset selector - prominently displayed */}
	                {hasMultipleSets ? (
	                  <button
	                    onClick={() => setRoundSetSelectionModal(num)}
	                    className="w-full px-6 py-3 bg-indigo-600/30 border-2 border-indigo-500 text-indigo-200 rounded-[1.5rem] hover:bg-indigo-600/50 hover:border-indigo-400 transition-all font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg"
	                    title="Select dataset for this round"
	                  >
	                    <span>📁 {selectedSet?.name[gameState.language] || 'Default'}</span>
	                    <ChevronRight size={16} />
	                  </button>
	                ) : (
	                  <div className="w-full px-6 py-3 bg-slate-800/50 border-2 border-slate-700 text-slate-400 rounded-[1.5rem] font-bold text-sm uppercase tracking-wide text-center">
	                    📁 {selectedSet?.name[gameState.language] || 'Default'}
	                  </div>
	                )}
	              </div>
	            );
	          })}
	          <div className="flex flex-col gap-3">
	            <button onClick={() => setShowScoreboard(true)} className="bg-slate-900 border-2 border-slate-800 p-10 rounded-[3rem] hover:border-yellow-500 transition-all shadow-2xl"><Trophy size={60} className="text-yellow-600 mx-auto mb-6" /><div className="text-5xl font-black text-white">{t.scorePanel}</div></button>
	          </div>
	        </div>
	        <button onClick={() => setShowVictory(true)} className="mt-20 px-16 py-6 border-4 border-rose-600/20 rounded-[2rem] text-rose-500 font-black text-xl hover:bg-rose-600 hover:text-white transition-all uppercase tracking-[0.3em]">{t.endGame}</button>
	      </div>
	    </div>
	  );

	  const R6SelectView = () => (
	    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
	      <div className="bg-slate-900/90 backdrop-blur-xl p-20 rounded-[5rem] border-2 border-slate-800 max-w-3xl w-full text-center shadow-2xl">
		<div className="mb-12"><h2 className="text-7xl font-black text-white mb-4 tracking-tighter uppercase">{t.selectTeams}</h2><p className="text-xl font-bold text-slate-400 uppercase tracking-widest">{t.selectTwo}</p></div>
		<div className="space-y-8 mb-16">{gameState.players.map(p => (<button key={p.id} onClick={() => setR6Selection(prev => prev.includes(p.id) ? prev.filter(i => i !== p.id) : prev.length < 2 ? [...prev, p.id] : prev)} className={`w-full p-10 rounded-[3rem] border-4 transition-all flex items-center justify-between ${r6Selection.includes(p.id) ? 'bg-indigo-600/20 border-indigo-500 scale-[1.03]' : 'bg-slate-800 border-slate-700 shadow-xl'}`}><div className="text-left"><div className="text-4xl font-black text-white">{p.name || `Player ${p.id+1}`}</div><div className="text-lg font-bold text-slate-500 uppercase">{p.score} {t.points}</div></div>{r6Selection.includes(p.id) && <CheckCircle size={48} className="text-indigo-500" />}</button>))}</div>
		<div className="grid grid-cols-2 gap-6"><button onClick={() => navigateTo('start')} className="py-10 rounded-[2.5rem] bg-slate-800 text-white font-black text-3xl uppercase">{t.cancel}</button><button onClick={() => { if(r6Selection.length !== 2) return; setGameState(prev => ({ ...prev, currentPlayerIndex: prev.players.findIndex(p => p.id === r6Selection[0]), roundProgress: { ...prev.roundProgress, [6]: { usedNotes: new Set(), activatedCategories: new Set(), pointMap: {}, activationCounts: {}, results: {}, activePlayerIds: r6Selection, currentTurnIndex: 0 } }, activeRoundId: 6 })); setCurrentPage('round'); setActiveNote({ categoryId: 'r6_final', noteIndex: 0 }); setSelectedDuration(null); setIsR6Finalized(false); }} className={`py-10 rounded-[2.5rem] font-black text-3xl uppercase ${r6Selection.length === 2 ? 'bg-indigo-600 text-white shadow-2xl' : 'bg-slate-900 text-slate-700 cursor-not-allowed'}`}>{t.startGame}</button></div>
	      </div>
	    </div>
	  );

const VictoryView = () => {
  // Sort players by stars first, then points for tie-breaking
  const sortedPlayers = [...gameState.players].sort((a, b) => {
    if (b.stars !== a.stars) return b.stars - a.stars; // Sort by stars first
    return b.score - a.score; // Then by points for tie-breaking
  });
  
  const winner = sortedPlayers[0]; // Player with most stars
  const secondPlace = sortedPlayers[1]; // Second player
  const thirdPlace = sortedPlayers[2]; // Third player

  // ADD: Victory sound effects
useEffect(() => {
    if (showVictory && gameState.isMusicEnabled) {
      playSFX(SFX.scoreboard);
      stopBGM();
    }
  }, [showVictory, gameState.isMusicEnabled]);

  const handleClose = () => {
    // STOP any playing sound when closing
    if (sfxRef.current) {
      sfxRef.current.pause();
      sfxRef.current = null;
    }
    
    setShowVictory(false);
    triggerBGM('start', null);
    navigateTo('start');
  };

   const handleReset = () => {
    // MANUALLY STOP VICTORY SOUND
    if (sfxRef.current) {
      sfxRef.current.pause();
      sfxRef.current = null;
    }
    
    resetGameAction();
  };


  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950 p-8 text-center animate-in zoom-in duration-1000">
      <div className="max-w-[900px] w-full">
        {/* ADD: Optional click sound for party popper */}
        <PartyPopper 
          size={120} 
          className="text-indigo-500 mx-auto mb-10 animate-bounce cursor-pointer"
          onClick={() => gameState.isMusicEnabled && playSFX(SFX.select)}
        />
        
        <h1 className="text-[6rem] font-black text-white mb-4 uppercase tracking-tighter leading-none">
          {t.victory || "VICTORY!"}
        </h1>
        <p className="text-2xl text-slate-400 mb-12 font-bold uppercase tracking-[0.3em] opacity-60">
          {t.congratulations || "CONGRATULATIONS!"}
        </p>
        
        {/* Winner Card */}
        <div className="bg-slate-900 p-12 rounded-[4rem] border-4 border-indigo-500/40 mb-6 shadow-[0_40px_80px_rgba(79,70,229,0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Trophy size={100} />
          </div>
          <div className="text-sm font-black text-indigo-500 uppercase tracking-[0.4em] mb-4">
            {t.winner || "WINNER"}
          </div>
          <div className="text-[5rem] font-black text-white mb-8 tracking-tighter leading-none">
            {winner.name || `Player ${winner.id+1}`}
          </div>
          <div className="flex justify-center gap-16">
            <div className="text-center">
              <div className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-3">
                {t.stars || "STARS"}
              </div>
              <div className="text-6xl font-black text-yellow-500 tabular-nums tracking-tighter">
                {winner.stars || 0}
              </div>
            </div>
            <div className="w-1 h-24 bg-slate-800 rounded-full" />
            <div className="text-center">
              <div className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-3">
                {t.points || "POINTS"}
              </div>
              <div className="text-6xl font-black text-indigo-400 tabular-nums tracking-tighter">
                {winner.score}
              </div>
            </div>
          </div>
        </div>
        
        {/* Second Place (only shown if there are at least 2 players) */}
        {gameState.players.length >= 2 && secondPlace && (
          <div className="bg-slate-900/60 p-8 rounded-[3rem] border-2 border-slate-700/40 mb-6 shadow-xl">
            <div className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] mb-4">
              {t.secondPlace || "Second Place"}
            </div>
            <div className="text-[3rem] font-black text-slate-300 mb-6 tracking-tight">
              {secondPlace.name || `Player ${secondPlace.id+1}`}
            </div>
            <div className="flex justify-center gap-12">
              <div className="text-center">
                <div className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-2">
                  {t.stars || "STARS"}
                </div>
                <div className="text-4xl font-black text-yellow-500/80 tabular-nums">
                  {secondPlace.stars || 0}
                </div>
              </div>
              <div className="w-1 h-16 bg-slate-800/50 rounded-full" />
              <div className="text-center">
                <div className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-2">
                  {t.points || "POINTS"}
                </div>
                <div className="text-4xl font-black text-indigo-400/80 tabular-nums">
                  {secondPlace.score}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Third Place (only shown if there are at least 3 players) */}
        {gameState.players.length >= 3 && thirdPlace && (
          <div className="bg-slate-900/40 p-8 rounded-[3rem] border-2 border-slate-700/30 mb-8 shadow-lg">
            <div className="text-sm font-black text-slate-500 uppercase tracking-[0.4em] mb-4">
              THIRD PLACE
            </div>
            <div className="text-[2.5rem] font-black text-slate-400 mb-6 tracking-tight">
              {thirdPlace.name || `Player ${thirdPlace.id+1}`}
            </div>
            <div className="flex justify-center gap-10">
              <div className="text-center">
                <div className="text-slate-600 text-xs font-black uppercase tracking-[0.2em] mb-2">
                  {t.stars || "STARS"}
                </div>
                <div className="text-3xl font-black text-yellow-500/60 tabular-nums">
                  {thirdPlace.stars || 0}
                </div>
              </div>
              <div className="w-1 h-12 bg-slate-800/40 rounded-full" />
              <div className="text-center">
                <div className="text-slate-600 text-xs font-black uppercase tracking-[0.2em] mb-2">
                  {t.points || "POINTS"}
                </div>
                <div className="text-3xl font-black text-indigo-400/60 tabular-nums">
                  {thirdPlace.score}
                </div>
              </div>
            </div>
          </div>
        )}
        
 {/* Button container - NO hover sounds */}
<div className="flex gap-6 justify-center">
  <button 
    onClick={handleClose} 
    className="px-10 py-6 bg-slate-800 text-white rounded-[2rem] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-slate-900/40 uppercase tracking-[0.2em] flex items-center gap-4"
  >
    <XCircle size={28} /> {t.close || "CLOSE"}
  </button>
  <button 
    onClick={() => resetGameAction()} 
    className="px-10 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-indigo-900/40 uppercase tracking-[0.2em] flex items-center gap-4"
  >
    <RotateCcw size={28} /> {t.reset || "RESET GAME"}
  </button>
</div>
      </div>
    </div>
  );
};
	  return (
	    <div className="font-sans text-slate-100 select-none bg-slate-950 min-h-screen selection:bg-indigo-500 selection:text-white">
	      <SettingsOverlay language={gameState.language} onLanguageToggle={toggleLanguage} isMusicEnabled={gameState.isMusicEnabled} onMusicToggle={toggleMusic} isFullscreen={isFullscreen} onFullscreenToggle={toggleFullscreen} onGoHome={() => navigateTo('setup')} onGoStart={() => navigateTo('start')} onReset={() => showModal(t.reset, t.confirmReset, resetGameAction)} volume={volume} onVolumeChange={handleVolumeChange} t={t} isLocked={!!activeNote && gameState.activeRoundId !== 6 && gameState.activeRoundId !== 5} />
	      {currentPage === 'setup' && <SetupView />}
	      {currentPage === 'start' && <StartView />}
	      {currentPage === 'round' && <RoundView />}
	      {currentPage === 'r6_select' && <R6SelectView />}
	      {modal && modal.position === 'center' && <ConfirmationModal isOpen={modal.isOpen} title={modal.title} message={modal.message} onConfirm={modal.onConfirm} onCancel={() => setModal(null)} confirmLabel={modal.confirmLabel} cancelLabel={modal.cancelLabel} position={modal.position} />}
	      {showTimerSettings && <TimerSettings />}
	      {showScoreboard && (
		<div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-10 animate-in fade-in duration-500">
		  <div className="bg-slate-900 rounded-[4rem] p-16 max-w-2xl w-full border-2 border-slate-800 shadow-2xl">
		    <h3 className="text-6xl font-black text-white mb-14 flex items-center gap-6 tracking-tighter uppercase"><Trophy className="text-yellow-500" size={64} /> {t.scorePanel}</h3>
		    <div className="space-y-6">{sortedPlayersScoreboard.map((p, idx) => (<div key={p.id} className="flex items-center justify-between p-8 bg-slate-800/60 rounded-[2.5rem] border-2 border-slate-700/50 shadow-xl"><div className="flex items-center gap-8"><span className="text-slate-600 font-black text-4xl w-10">{idx + 1}.</span><div><div className="text-white font-black text-3xl">{p.name || `Player ${p.id+1}`}</div><div className="text-yellow-500 text-sm font-black uppercase flex items-center gap-3 mt-2"><Star size={16} fill="currentColor" /> {p.stars || 0} {t.stars}</div></div></div><span className="text-5xl font-black text-indigo-400 tabular-nums">{p.score} <span className="text-xs opacity-40 uppercase ml-2">pts</span></span></div>))}</div>
		    <button onClick={() => setShowScoreboard(false)} className="w-full mt-14 py-8 bg-indigo-600 text-white font-black text-2xl rounded-[2rem] uppercase shadow-2xl">{t.close}</button>
		  </div>
		</div>
	      )}
	      {showVictory && <VictoryView />}
	      {roundSetSelectionModal !== null && (
	        <RoundSetSelector
	          roundId={roundSetSelectionModal}
	          availableSets={getAvailableSets(roundSetSelectionModal)}
	          selectedSetId={gameState.roundSets[roundSetSelectionModal] || 'default'}
	          onSelect={(setId) => {
	            if (setId) {
	              setGameState(prev => ({
	                ...prev,
	                roundSets: { ...prev.roundSets, [roundSetSelectionModal]: setId }
	              }));
	            }
	          }}
	          onConfirm={() => setRoundSetSelectionModal(null)}
	          language={gameState.language}
	          t={t}
	        />
	      )}
	    </div>
	  );
	};

	export default App;

