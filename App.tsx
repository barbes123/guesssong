import React, { useState, useEffect, useRef, useCallback } from 'react';
import { translations } from './translations';
import { Player, GameState, Page, Language } from './types';
import { ROUND_DATA, SCREEN_BGM, SFX, INITIAL_POINTS, shuffle, getRoundData, getAvailableSets } from './data/index_data';
import SettingsOverlay from './components/SettingsOverlay';
import PlayerBoard from './components/PlayerBoard';
import ConfirmationModal from './components/ConfirmationModal';
import ControlPanel from './components/ControlPanel';
import VolumeBar from './components/VolumeBar';
import RoundSetSelector from './components/RoundSetSelector';
import SetupView from './src/screens/SetupView';
import StartView from './src/screens/StartView';
import RoundStandard from './src/screens/RoundStandard';
import RoundDuel from './src/screens/RoundDuel'; // (Adjust path if necessary)
import RoundSprint from './src/screens/RoundSprint'; // (Adjust path if needed)
import MusicTimeline from './components/MusicTimeline'; // The file you just created

import PlayerScreen from './src/displays/PlayerScreen'; // Adjust path if needed

import { Music as MusicIcon, ChevronRight, ChevronLeft, Users, Trophy, Star, PartyPopper, RotateCcw, PlayCircle, HelpCircle, CheckCircle, XCircle, Zap, Timer, SkipForward } from 'lucide-react';

/////////// Buzz---------------------------
import configBuzz from './configBuzz.json';
import { io } from 'socket.io-client';
const socket = io(configBuzz.SOCKET_URL);
// ----------------------------------------


const App: React.FC = () => {
  const isPlayerScreen = window.location.pathname === '/display';
  // --- Connection to buzzer ---
  const [isBuzzerConnected, setIsBuzzerConnected] = useState(false);
  const [buzzerBuzzes, setBuzzerBuzzes] = useState<any[]>([]);

  const [hubPlayers, setHubPlayers] = useState<any[]>([]);
  const [buzzerMapping, setBuzzerMapping] = useState<Record<string, number>>({});


  const handleConnect = () => {
    if (socket) {
      socket.connect();
      socket.emit('register', { name: 'GameEngine', role: 'host', code: '' });
      setIsBuzzerConnected(true);
    }
  };

  const handleForceDisconnect = () => {
    if (socket) {
      socket.disconnect();
    }
    setIsBuzzerConnected(false);
    setHubPlayers([]);
  };


  useEffect(() => {
    socket.on('connect', () => {
      console.log("✅ Game linked to Hub");
      setIsBuzzerConnected(true);

      // FIX: Instead of a new command, we send a 'register' as a 'host' 
      // This usually forces the Hub to broadcast the 'playerListUpdate' to everyone
      socket.emit('register', {
        name: 'GameEngine',
        role: 'host',
        code: ''
      });
    });

    socket.on('connect_error', (err) => {
      console.error("❌ TASK 0: Link failed:", err.message);
      setIsBuzzerConnected(false);
    });

    socket.on('disconnect', () => {
      setIsBuzzerConnected(false);
    });

    const handleForceDisconnect = () => {
      if (socket) {
        socket.disconnect(); // Physically closes the socket
        setIsBuzzerConnected(false); // Forces UI to "Disconnected" mode
        setHubPlayers([]); // Clears the sliding list so it disappears
        console.log("🛑 Buzzer System Forcefully Disconnected");
      }
    };

    socket.on('playerListUpdate', (list) => {
      console.log("📥 RECEIVED PLAYER LIST:", list);
      setHubPlayers(list)
      // Filter out the 'Host' or 'GameEngine' so they don't appear in your sliding list
      // const onlyPlayers = list.filter((p: any) => p.role === 'player');
      // setHubPlayers(onlyPlayers);
    });
    // --- ADDED THIS PART ---
    socket.on('buzzer_pressed', (data: { playerId: string }) => {
      // 1. Check if the device that buzzed is in our mapping (1, 2, or 3)
      const mappedSlot = buzzerMapping[data.playerId];

      if (mappedSlot) {
        console.log(`🎯 SLOT ${mappedSlot} BUZZED!`);

        // 2. Stop the music
        if (songRef.current) {
          songRef.current.pause();
        }
      }
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('disconnect');
      socket.off('playerListUpdate');
      socket.off('buzzer_pressed'); // Clean up
    };
  }, []);
  // --------------------------------
  const [gameState, setGameState] = useState<GameState>({
    players: [{ id: 0, name: '', score: 0, stars: 0 }],
    currentPlayerIndex: 0,
    currentRound: 0,
    isMusicEnabled: true,
    language: 'en',
    gameStarted: false,
    activeRoundId: null,
    roundProgress: {},
    roundSets: { 1: 'default', 2: 'default', 3: 'default', 4: 'default' } // Updated: Only 4 rounds
  });

  const [currentPage, setCurrentPage] = useState<Page>('setup');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [roundSetSelectionModal, setRoundSetSelectionModal] = useState<number | null>(null);
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


  const [victoryContext, setVictoryContext] = useState<{ roundId: number | null, winnerId: number | null }>({
    roundId: null,
    winnerId: null
  });

  const songRef = useRef<HTMLAudioElement | null>(null);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const sfxRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNote, setActiveNote] = useState<{ categoryId: string; noteIndex: number; isReveal?: boolean } | null>(null);
  const [currentRoundPoints, setCurrentRoundPoints] = useState<number | undefined>(undefined);
  const [audioProgress, setAudioProgress] = useState({ current: 0, total: 0 });
  const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined);

  // R3 & R4 Specific States (previously R5 & R6)
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [r3Selection, setR3Selection] = useState<number[]>([]); // Round 3 is final
  const [isR3Finalized, setIsR3Finalized] = useState(false);
  const [r4CurrentSongIdx, setR4CurrentSongIdx] = useState<number>(0); // Round 4 is sprint
  const [r4IsActiveSession, setR4IsActiveSession] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [timerDuration, setTimerDuration] = useState<number>(60);
  const [showTimerSettings, setShowTimerSettings] = useState(false);
  const [playedButNotEvaluated, setPlayedButNotEvaluated] = useState<number[]>([]);
  const [playerWindow, setPlayerWindow] = useState<Window | null>(null);
  const [r4SelectedPlayerId, setR4SelectedPlayerId] = useState<number | null>(null);

  const roundPointsTimerRef = useRef<number | null>(null);
  const autoStopTimerRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);
  if (isPlayerScreen) {
    return <PlayerScreen />;
  }

  const sortedPlayersScoreboard = [...gameState.players].sort((a, b) => {
    const starsA = a.stars || 0;
    const starsB = b.stars || 0;
    if (starsB !== starsA) return starsB - starsA;
    return b.score - a.score;
  });

  const t = translations[gameState.language] as any;

  const isMusicEnabledRef = useRef(gameState.isMusicEnabled);

  useEffect(() => {
    isMusicEnabledRef.current = gameState.isMusicEnabled;
  }, [gameState.isMusicEnabled]);

  const playSFX = useCallback((url: string) => {
    if (!isMusicEnabledRef.current) return;
    if (sfxRef.current) {
      sfxRef.current.pause();
      sfxRef.current = null;
    }
    const audio = new Audio(url);
    sfxRef.current = audio;
    audio.volume = volume;
    audio.play().catch(e => console.log("SFX block", e));
  }, [volume]);

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
    const isR4 = roundId === 4; // Changed from isR5

    if (fullyClear || (!isR4 || !r4IsActiveSession)) {
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
      if (!isR4 || !r4IsActiveSession) {
        setTimeLeft(undefined);
      }
    }
  }, [gameState.activeRoundId, r4IsActiveSession]);

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

  // Ref to hold the latest state to share, preventing interval starvation
  const stateToShareRef = useRef<any>(null);

  useEffect(() => {
    const activeId = gameState.activeRoundId;

    // We create a "Serialized" version of progress to fix the Set -> Array issue
    const serializedRoundProgress = { ...gameState.roundProgress };

    if (activeId && serializedRoundProgress[activeId]) {
      const currentProg = serializedRoundProgress[activeId];

      serializedRoundProgress[activeId] = {
        ...currentProg,
        // Convert Sets to Arrays so they survive the JSON stringify process
        usedNotes: currentProg.usedNotes instanceof Set
          ? Array.from(currentProg.usedNotes)
          : (Array.isArray(currentProg.usedNotes) ? currentProg.usedNotes : []),

        activatedCategories: currentProg.activatedCategories instanceof Set
          ? Array.from(currentProg.activatedCategories)
          : (Array.isArray(currentProg.activatedCategories) ? currentProg.activatedCategories : []),

        usedRows: currentProg.usedRows instanceof Set
          ? Array.from(currentProg.usedRows)
          : (Array.isArray(currentProg.usedRows) ? currentProg.usedRows : []),

        // Handle Round 4 player progress Sets
        r4PlayerProgress: currentProg.r4PlayerProgress ? Object.fromEntries(
          Object.entries(currentProg.r4PlayerProgress).map(([pid, prog]: [string, any]) => [
            pid,
            {
              ...prog,
              correctIndices: prog.correctIndices instanceof Set
                ? Array.from(prog.correctIndices)
                : (Array.isArray(prog.correctIndices) ? prog.correctIndices : [])
            }
          ])
        ) : undefined
      };
    }

    stateToShareRef.current = {
      // Force victory page if showVictory is triggered
      currentPage: showVictory ? 'victory' : currentPage,
      activeRoundId: activeId,
      players: gameState.players,
      currentPlayerIndex: gameState.currentPlayerIndex,
      roundProgress: serializedRoundProgress, // Pass the fixed data
      roundSets: gameState.roundSets,
      timeLeft: timeLeft,
      audioProgress: audioProgress,
      isPlaying: isPlaying,
      activeNote: activeNote,
      currentRoundPoints: currentRoundPoints,
      r3Selection: r3Selection,
      isR3Finalized: isR3Finalized,
      selectedDuration: selectedDuration,
      r4CurrentSongIdx: r4CurrentSongIdx,
      r4IsActiveSession: r4IsActiveSession,
      selectedRow: selectedRow,
      timerDuration: timerDuration,
      playedButNotEvaluated: playedButNotEvaluated,
      victoryContext: victoryContext,
      showVictory: showVictory,
      showScoreboard: showScoreboard,
      r4SelectedPlayerId: r4SelectedPlayerId,
      language: gameState.language
    };
  }, [
    currentPage,
    gameState,
    timeLeft,
    audioProgress,
    isPlaying,
    activeNote,
    currentRoundPoints,
    r3Selection,
    isR3Finalized,
    selectedDuration,
    r4CurrentSongIdx,
    r4IsActiveSession,
    selectedRow,
    timerDuration,
    playedButNotEvaluated,
    victoryContext,
    showVictory,
    showScoreboard,
    r4SelectedPlayerId
  ]);

  useEffect(() => {
    // Share game state with player screen
    const interval = setInterval(() => {
      if (stateToShareRef.current) {
        try {
          localStorage.setItem('musicQuizPlayerState', JSON.stringify(stateToShareRef.current));
        } catch (error) {
          console.log('Error sharing state:', error);
        }
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);


  // useEffect(() => {
  //   // Share game state with player screen
  //   const shareState = () => {
  //     const stateToShare = {
  //       currentPage: showVictory ? 'victory' : currentPage,
  //       activeRoundId: gameState.activeRoundId,
  //       players: gameState.players,
  //       currentPlayerIndex: gameState.currentPlayerIndex,
  //       roundProgress: gameState.roundProgress,
  //       roundSets: gameState.roundSets,
  //       // Add round-specific states
  //       timeLeft: timeLeft,
  //       audioProgress: audioProgress,
  //       isPlaying: isPlaying,
  //       activeNote: activeNote,
  //       currentRoundPoints: currentRoundPoints,
  //       // Round 3 specific
  //       r3Selection: r3Selection,
  //       isR3Finalized: isR3Finalized,
  //       selectedDuration: selectedDuration,
  //       // Round 4 specific
  //       r4CurrentSongIdx: r4CurrentSongIdx,
  //       r4IsActiveSession: r4IsActiveSession,
  //       selectedRow: selectedRow,
  //       timerDuration: timerDuration,
  //       playedButNotEvaluated: playedButNotEvaluated,
  //       // Victory
  //       victoryContext: victoryContext,
  //       showVictory: showVictory,
  //       // Language
  //       language: gameState.language
  //     };

  //     // DEBUG: Log round progress when it changes
  //     if (gameState.activeRoundId && gameState.roundProgress[gameState.activeRoundId]) {
  //       const currentRound = gameState.activeRoundId;
  //       const roundProgress = gameState.roundProgress[currentRound];

  //       // Check if this is round 1 or 2 (where notes have results)
  //       // if (currentRound === 1 || currentRound === 2) {
  //       //   // Log only when results exist
  //       //   if (roundProgress.results && Object.keys(roundProgress.results).length > 0) {
  //       //     console.log('📤 [App → Player] Sharing state for round', currentRound);
  //       //     console.log('📤 Results:', roundProgress.results);
  //       //     console.log('📤 Used notes:', Array.from(roundProgress.usedNotes || []));
  //       //   }
  //       // }
  //     }

  //     try {
  //       localStorage.setItem('musicQuizPlayerState', JSON.stringify(stateToShare));
  //     } catch (error) {
  //       console.log('Error sharing state:', error);
  //     }
  //   };

  //   // Update every 300ms (fast enough for real-time updates)
  //   const interval = setInterval(shareState, 300);
  //   return () => clearInterval(interval);
  // }, [
  //   currentPage,
  //   gameState,
  //   timeLeft,
  //   audioProgress,
  //   isPlaying,
  //   activeNote,
  //   currentRoundPoints,
  //   r3Selection,
  //   isR3Finalized,
  //   selectedDuration,
  //   r4CurrentSongIdx,
  //   r4IsActiveSession,
  //   selectedRow,
  //   timerDuration,
  //   playedButNotEvaluated,
  //   victoryContext,
  //   showVictory
  // ]);
  //   // In App.js, add this useEffect after other useEffects
  // useEffect(() => {
  //   // Share game state with player screen
  //   const shareState = () => {
  //     const stateToShare = {
  //       currentPage,
  //       activeRoundId: gameState.activeRoundId,
  //       players: gameState.players,
  //       currentPlayerIndex: gameState.currentPlayerIndex,
  //       roundProgress: gameState.roundProgress,
  //       roundSets: gameState.roundSets,
  //       // Add round-specific states
  //       timeLeft: timeLeft,
  //       audioProgress: audioProgress,
  //       isPlaying: isPlaying,
  //       activeNote: activeNote,
  //       currentRoundPoints: currentRoundPoints,
  //       // Round 3 specific
  //       r3Selection: r3Selection,
  //       isR3Finalized: isR3Finalized,
  //       selectedDuration: selectedDuration,
  //       // Round 4 specific
  //       r4CurrentSongIdx: r4CurrentSongIdx,
  //       r4IsActiveSession: r4IsActiveSession,
  //       selectedRow: selectedRow,
  //       timerDuration: timerDuration,
  //       playedButNotEvaluated: playedButNotEvaluated,
  //       // Victory
  //       victoryContext: victoryContext,
  //       showVictory: showVictory,
  //       // Language
  //       language: gameState.language
  //     };

  //     try {
  //       localStorage.setItem('musicQuizPlayerState', JSON.stringify(stateToShare));
  //     } catch (error) {
  //       console.log('Error sharing state:', error);
  //     }
  //   };

  //   // Update state every 300ms
  //   const interval = setInterval(shareState, 300);

  //   return () => clearInterval(interval);
  //   }, [
  //     currentPage,
  //     gameState,
  //     timeLeft,
  //     audioProgress,
  //     isPlaying,
  //     activeNote,
  //     currentRoundPoints,
  //     r3Selection,
  //     isR3Finalized,
  //     selectedDuration,
  //     r4CurrentSongIdx,
  //     r4IsActiveSession,
  //     selectedRow,
  //     timerDuration,
  //     playedButNotEvaluated,
  //     victoryContext,
  //     showVictory
  //   ]);


  //also for playerscreen

  // Add this function to open/close player window
  const handleOpenPlayerWindow = () => {
    // Close existing window if open
    if (playerWindow && !playerWindow.closed) {
      playerWindow.close();
      setPlayerWindow(null);
      return;
    }

    // Open new player window
    const newWindow = window.open(
      '/display',
      'musicQuizPlayerScreen',
      'width=1200,height=800,left=100,top=100,toolbar=no,menubar=no,scrollbars=yes,resizable=yes'
    );

    if (newWindow) {
      setPlayerWindow(newWindow);
      newWindow.focus();

      // Monitor if window gets closed by user
      const checkClosed = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(checkClosed);
          setPlayerWindow(null);
        }
      }, 1000);
    } else {
      // If popup blocked, fallback to new tab
      window.open('/display', '_blank');
    }
  };

  const toggleLanguage = () => {
    setGameState(prev => ({ ...prev, language: prev.language === 'en' ? 'ru' : 'en' }));
  };

  const toggleMusic = () => {
    const next = !gameState.isMusicEnabled;

    if (!next) {
      isMusicEnabledRef.current = false;
      stopSong();
      stopBGM();
      if (sfxRef.current) {
        sfxRef.current.pause();
        sfxRef.current = null;
      }
    } else {
      // Delay enabling SFX ref slightly to prevent the unmute button click sound
      setTimeout(() => { isMusicEnabledRef.current = true; }, 500);
      // BGM will be triggered by the useEffect when state updates
    }
    setGameState(prev => ({ ...prev, isMusicEnabled: next }));
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

const handleAddPlayer = (nameOrEvent?: any, socketId?: string, slotNumber?: number) => {
  const actualName = typeof nameOrEvent === 'string' ? nameOrEvent : '';

  setGameState(prev => {
    // 1. Identify which slot we are targeting (1, 2, or 3)
    let targetId: number;
    
    if (slotNumber) {
      targetId = slotNumber;
    } else {
      // If manual "Add Player" was clicked, find the first slot without a name
      const emptySlot = [1, 2, 3].find(id => {
        const p = prev.players.find(player => player.id === id);
        return !p || !p.name;
      });
      targetId = emptySlot || 0;
    }

    if (targetId === 0 || targetId > 3) return prev;

    // 2. For buzz mode: ensure we have slots 1, 2, and 3 represented
    // For manual mode: only update the target slot
    if (socketId) {
      // BUZZ MODE: Create/update all 3 slots
      const slots = [1, 2, 3];
      const updatedPlayers = slots.map(id => {
        const existing = prev.players.find(p => p.id === id);
        
        if (id === targetId) {
          return {
            id: id,
            name: actualName,
            score: existing ? existing.score : 0,
            stars: existing ? existing.stars : 0,
            hubId: socketId,
          };
        }
        
        // If another slot has the same phone, clear it
        if (existing && existing.hubId === socketId) {
          return { id: id, name: '', score: 0, stars: 0, hubId: '' };
        }
        
        // Keep existing or empty
        return existing || { id: id, name: '', score: 0, stars: 0, hubId: '' };
      });

      setBuzzerMapping(prevMap => ({ ...prevMap, [socketId]: targetId }));
      return {
        ...prev,
        players: updatedPlayers
      };
    } else {
      // MANUAL MODE: Ensure all 3 slots exist, but only add names when user clicks "Add Player"
      if (prev.players.length >= 3) return prev;
      const nextId = prev.players.length + 1;
      const newPlayer = {
        id: nextId,
        name: actualName || '', // Start with empty name
        score: 0,
        stars: 0,
        hubId: '',
      };



      // const slots = [1, 2, 3];
      // const updatedPlayers = slots.map(id => {
      //   const existing = prev.players.find(p => p.id === id);
          
      //   if (id === targetId) {
      //     return {
      //       id: id,
      //       name: actualName || (existing ? existing.name : ''),
      //       score: existing ? existing.score : 0,
      //       stars: existing ? existing.stars : 0,
      //       hubId: '',
      //     };
      //   }
        
      //   // Return existing or empty
      //   return existing || { id: id, name: '', score: 0, stars: 0, hubId: '' };
      // });

      return {
        ...prev,
        players: [...prev.players, newPlayer]
      };

      // return {
      //   ...prev,
      //   players: updatedPlayers
      // };
    }
  });
};
  const handleRemovePlayer = (id: number) => {
    setGameState(prev => ({
      ...prev,
      players: prev.players.filter(p => p.id !== id)
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
    setIsR3Finalized(false); // Changed from isR6Finalized
    setSelectedDuration(null);
    setR4IsActiveSession(false); // Changed from r5IsActiveSession
    setR4CurrentSongIdx(0); // Changed from r5CurrentSongIdx
    setSelectedRow(null);
    setTimerDuration(60);
    setShowTimerSettings(false);
    setVictoryContext({ roundId: null, winnerId: null });
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

      if (page === 'setup' || page === 'start') {
        setVictoryContext({ roundId: null, winnerId: null });
      }

      if (roundId === 3) { // Round 3 is final (was round 6)
        setActiveNote({ categoryId: 'r3_final', noteIndex: 0 });
        setSelectedDuration(null);
        setIsR3Finalized(false); // Changed from isR6Finalized
        setTimeLeft(undefined);
      }
      if (roundId === 4) { // Round 4 is sprint (was round 5)
        setR4IsActiveSession(false); // Changed from r5IsActiveSession
        setSelectedRow(null);
        setR4CurrentSongIdx(0); // Changed from r5CurrentSongIdx
        setTimeLeft(undefined);
        setShowTimerSettings(false);
        setPlayedButNotEvaluated([]);
        setR4SelectedPlayerId(null);
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

  // UPDATED initializeRound function
  const initializeRound = (roundId: number) => {
    // Skip initialization if already initialized (except for rounds 3 & 4 which need special handling)
    if (gameState.roundProgress[roundId] && roundId !== 3 && roundId !== 4) return;

    const pointMap: { [categoryId: string]: number[] } = {};
    const persistentPoints: { [noteId: string]: number } = {};

    // Get the selected variant for this round, fallback to 'default'
    const selectedSetId = gameState.roundSets[roundId] || 'default';
    const roundData = getRoundData(roundId, selectedSetId) || [];

    // NEW ROUND 3 (Final - was old round 6)
    if (roundId === 3) {
      let initialParticipants: number[] = [];
      if (gameState.players.length <= 2) {
        initialParticipants = gameState.players.map(p => p.id);
        setR3Selection(initialParticipants);
        setGameState(prev => ({
          ...prev,
          roundProgress: {
            ...prev.roundProgress,
            [3]: {
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
          activeRoundId: 3
        }));
        setCurrentPage('round');
      } else {
        setR3Selection([]);
        setCurrentPage('r3_select');
      }
      return;
    }

    // NEW ROUND 4 (Sprint - was old round 5)
    if (roundId === 4) {
      const initialR4Progress: { [playerId: number]: { correctIndices: Set<number>; wrongIndex: number | null; hasFinished: boolean; timeSpent: number } } = {};
      gameState.players.forEach(p => {
        initialR4Progress[p.id] = {
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
          [4]: {
            usedNotes: new Set(),
            activatedCategories: new Set(),
            pointMap: {},
            activationCounts: {},
            results: {},
            r4PlayerProgress: initialR4Progress,
            usedRows: new Set()
          }
        },
        currentPlayerIndex: 0,
        activeRoundId: 4
      }));
      setCurrentPage('round');
      return;
    }

    // ROUNDS 1 & 2 (regular rounds)
    const pointPool = [];
    for (let i = 20; i <= 40; i++) pointPool.push(i);
    const shuffledPool = shuffle(pointPool);

    roundData.forEach((cat, idx) => {
      if (roundId === 1) {
        // Round 1: Song challenge (shuffle points)
        pointMap[cat.id] = shuffle(INITIAL_POINTS);
      } else if (roundId === 2) {
        // Round 2: Melody guess (persistent points) - was old round 4
        const score = shuffledPool[idx];
        persistentPoints[`${cat.id}-0`] = score;
        pointMap[cat.id] = [score, 0, 0, 0, 0];
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

  // UPDATED handleNoteClick function
  const handleNoteClick = (categoryId: string, noteIndex: number) => {
    const roundId = gameState.activeRoundId;
    if (roundId === null) return;
    const progress = gameState.roundProgress[roundId];
    if (!progress) return;

    const isMelodyRound = roundId === 2;
    const isSprintRound = roundId === 4;
    const isFinalRound = roundId === 3;

    if (isSprintRound) {
      const pId = gameState.players[gameState.currentPlayerIndex].id;
      const playerProg = progress.r4PlayerProgress?.[pId];
      if (playerProg?.hasFinished) {
        stopSong();
        setActiveNote({ categoryId: 'r4_sprint', noteIndex, isReveal: true });
        setR4CurrentSongIdx(noteIndex);
        playSFX(SFX.select);
        return;
      }
      if (!r4IsActiveSession) {
        const row = Math.floor(noteIndex / 7);
        const usedRowsSet = progress.usedRows || new Set();
        if (usedRowsSet.has(row)) {
          showModal(t.round, t.rowAlreadyUsed || "This row has already been used. Please select a different row.", () => setModal(null), t.close, "");
          return;
        }

        showModal(
          t.round,
          `Choose row ${row + 1}?`,
          () => {
            const firstNoteInRow = row * 7;
            setSelectedRow(row);
            setR4CurrentSongIdx(firstNoteInRow);
            setActiveNote({ categoryId: 'r4_sprint', noteIndex: firstNoteInRow });
            setR4IsActiveSession(true);
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

          if (isPlaying) {
            return;
          }
          stopSong();
          setR4CurrentSongIdx(noteIndex);
          setActiveNote({ categoryId: 'r4_sprint', noteIndex });
          playSFX(SFX.select);
        }
      }
      return;
    }

    if (isFinalRound) {
      stopSong();
      setActiveNote({ categoryId: 'r3_final', noteIndex, isReveal: true });
      playSFX(SFX.select);
      return;
    }

    if (isMelodyRound && noteIndex > 0) {
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
    if (!isMelodyRound && progress.usedNotes.has(noteId)) {
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
      if (roundId === 1) {
        setCurrentRoundPoints(progress.pointMap[categoryId][noteIndex]);
      } else if (isMelodyRound) {
        setCurrentRoundPoints(progress.persistentPoints?.[`${categoryId}-0`] || 20);
      }
    }, undefined, undefined, 'inline');
  };

  // UPDATED handleAudioControl function
  const handleAudioControl = (action: 'start' | 'stop') => {
    if (!activeNote) return;
    const roundId = gameState.activeRoundId!;
    const progress = gameState.roundProgress[roundId];
    const selectedSetId = gameState.roundSets[roundId] || 'default';

    let dataRoundId = roundId;
    if (roundId === 3) dataRoundId = 6; // New Round 3 uses old Round 6 data

    const roundData = getRoundData(roundId, selectedSetId) || [];
    const isMelodyRound = roundId === 2;
    const isFinalRound = roundId === 3;
    const isSprintRound = roundId === 4;

    const startPlayback = () => {
      stopBGM();
      let songIndex = 0;
      if (isMelodyRound) {
        songIndex = activeNote.isReveal ? activeNote.noteIndex - 1 : (progress.activationCounts[activeNote.categoryId] || 0);
      } else if (isFinalRound) {
        songIndex = progress.currentTurnIndex || 0;
      } else if (isSprintRound) {
        songIndex = r4CurrentSongIdx;
      } else {
        songIndex = activeNote.noteIndex;
      }

      const category = roundData.find(c => c.id === activeNote.categoryId);
      const song = category?.songs[songIndex];
      if (!song) return;

      const isRevealMode = activeNote.isReveal || (isSprintRound && !r4IsActiveSession) || (isFinalRound && progress.currentTurnIndex !== songIndex);
      const audioUrlToPlay = (isRevealMode || (isFinalRound && selectedDuration === null)) ? (song.audioUrlFull || song.audioUrl) : song.audioUrl;

      if (!isRevealMode && (timeLeft === undefined || timeLeft <= 0)) {
        if (isFinalRound) setTimeLeft(selectedDuration || 0);
        else if (isSprintRound) setTimeLeft(timerDuration);
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

      if (isFinalRound && selectedDuration === null) {
        songRef.current.onended = null;
      } else if (isSprintRound && r4IsActiveSession) {
        songRef.current.onended = () => { setIsPlaying(false); };
      } else {
        songRef.current.onended = () => { handleAudioControl('stop'); };
      }

      songRef.current.play();
      setIsPlaying(true);

      if (!isRevealMode && action === 'start') {
        if (countdownIntervalRef.current) window.clearInterval(countdownIntervalRef.current);

        if ((roundId === 1 || roundId === 2) && !activeNote.isReveal) {
          countdownIntervalRef.current = window.setInterval(() => {
            setTimeLeft(prev => {
              if (prev === undefined || prev <= 0) {
                window.clearInterval(countdownIntervalRef.current!);
                countdownIntervalRef.current = null;

                handleAudioControl('stop');
                playSFX(SFX.wrong);

                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
        else if (isSprintRound && r4IsActiveSession) {
          countdownIntervalRef.current = window.setInterval(() => {
            setTimeLeft(prev => {
              if (prev === undefined) return prev;
              if (prev > 0) return prev - 1;

              window.clearInterval(countdownIntervalRef.current!);
              countdownIntervalRef.current = null;

              if (isSprintRound && r4IsActiveSession) {
                stopSong(false);
                playSFX(SFX.wrong); // Play wrong sound once when time is up
              }
              else handleAudioControl('stop');
              return 0;
            });
          }, 1000);
        }
        else if (isFinalRound && selectedDuration !== null && !isR3Finalized) {
          countdownIntervalRef.current = window.setInterval(() => {
            setTimeLeft(prev => {
              if (prev === undefined) return prev;
              if (prev > 0) return prev - 1;
              window.clearInterval(countdownIntervalRef.current!);
              countdownIntervalRef.current = null;
              if (isSprintRound && r4IsActiveSession) handleFinalizeTurn('skip', true);
              else handleAudioControl('stop');
              return 0;
            });
          }, 1000);
        }
      }

      if (autoStopTimerRef.current) window.clearTimeout(autoStopTimerRef.current);
      let durationMs = (isRevealMode || (isSprintRound && !r4IsActiveSession) || (isFinalRound && progress.currentTurnIndex !== songIndex)) ? 600000 : 120000;
      if (isFinalRound && selectedDuration !== null && !isRevealMode) durationMs = (selectedDuration * 1000) + 1000;

      if (!(isFinalRound && selectedDuration === null)) {
        autoStopTimerRef.current = window.setTimeout(() => {
          handleAudioControl('stop');
        }, durationMs);
      }

      if (isMelodyRound && !isRevealMode) {
        if (roundPointsTimerRef.current) window.clearInterval(roundPointsTimerRef.current);
        roundPointsTimerRef.current = window.setInterval(() => {
          setCurrentRoundPoints(prev => (prev || 0) + 1);
        }, 1000);
      }
    };

    if (action === 'start') {
      if (isFinalRound && !isPlaying && !isR3Finalized && selectedDuration === null) {
        showModal(t.currentTurn, t.confirmPlayerActive, () => {
          setModal(null);
          startPlayback();
        });
        return;
      }
      startPlayback();
    } else {
      if (isSprintRound && r4IsActiveSession) {
        if (songRef.current) songRef.current.pause();
        setIsPlaying(false);
        setPlayedButNotEvaluated(prev => {
          if (!prev.includes(r4CurrentSongIdx)) {
            return [...prev, r4CurrentSongIdx];
          }
          return prev;
        });
        if (countdownIntervalRef.current) {
          window.clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
        }
      } else {
        if (!isSprintRound && !isFinalRound && countdownIntervalRef.current) {
          window.clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
        }
        stopSong(false);
      }
      playSFX(SFX.stop);
    }
  };

  // UPDATED handleFinalizeTurn function
  const handleFinalizeTurn = (status: 'correct' | 'wrong' | 'skip', isTimeOut = false) => {
    if (!activeNote || activeNote.isReveal) return;
    const roundId = gameState.activeRoundId!;
    const progress = gameState.roundProgress[roundId];
    if (!progress) return;

    const isFinalRound = roundId === 3;
    const isSprintRound = roundId === 4;

    // =========================================================
    // ROUND 4: SPRINT LOGIC (Update state, don't return JSX)
    // =========================================================
    if (isSprintRound) {
      const pId = gameState.players[gameState.currentPlayerIndex].id;
      const playerProg = progress.r4PlayerProgress?.[pId];
      if (!playerProg) return;

      const finalizeR4Player = (finalStatus: 'wrong' | 'all_correct' | 'time_out') => {
        stopSong(true);
        const finalCorrectCount = playerProg.correctIndices.size + (status === 'correct' ? 1 : 0);
        const pointsAwarded = finalCorrectCount * 10 + (finalCorrectCount === 7 ? 300 : 0);

        setPlayedButNotEvaluated([]);

        setGameState(prev => {
          const newPlayers = prev.players.map(p => p.id === pId ? { ...p, score: p.score + pointsAwarded } : p);
          const newR4Progs = { ...progress.r4PlayerProgress };
          const usedRowsSet = new Set(progress.usedRows || []);
          if (selectedRow !== null) usedRowsSet.add(selectedRow);

          newR4Progs[pId] = {
            ...playerProg,
            hasFinished: true,
            wrongIndex: finalStatus === 'wrong' ? r4CurrentSongIdx : null,
            timeSpent: playerProg.timeSpent + (timerDuration - (timeLeft || 0))
          };
          if (status === 'correct') newR4Progs[pId].correctIndices.add(r4CurrentSongIdx);

          return {
            ...prev,
            roundProgress: {
              ...prev.roundProgress,
              [4]: { ...progress, r4PlayerProgress: newR4Progs, usedRows: usedRowsSet }
            },
            players: newPlayers
          };
        });
        setR4IsActiveSession(false);
        setActiveNote({ categoryId: 'r4_sprint', noteIndex: r4CurrentSongIdx, isReveal: true });
        playSFX(finalStatus === 'wrong' ? SFX.wrong : SFX.correct);
        setTimeout(() => setShowScoreboard(true), 1000);
      };

      if (isTimeOut) { finalizeR4Player('time_out'); return; }

      if (status === 'wrong') {
        showModal(t.wrong, t.confirmAction, () => {
          setModal(null);
          finalizeR4Player('wrong');
          setPlayedButNotEvaluated(prev => prev.filter(id => id !== r4CurrentSongIdx));
        }, undefined, undefined, 'inline');
        return;
      }

      if (status === 'correct') {
        showModal(t.correct || "Correct", t.confirmAction || "Mark this song as correct?", () => {
          setModal(null);
          const newSet = new Set(playerProg.correctIndices);
          newSet.add(r4CurrentSongIdx);
          setPlayedButNotEvaluated(prev => prev.filter(id => id !== r4CurrentSongIdx));

          if (selectedRow !== null) {
            const startIdx = selectedRow * 7;
            if (newSet.size === 7 || (timeLeft !== undefined && timeLeft <= 0)) {
              finalizeR4Player('all_correct');
              return;
            }

            // Find next unplayed song in the row
            let nextIdx = r4CurrentSongIdx;
            for (let i = 1; i <= 7; i++) {
              const potential = startIdx + ((r4CurrentSongIdx - startIdx + i) % 7);
              if (!newSet.has(potential)) {
                nextIdx = potential;
                break;
              }
            }

            setGameState(prev => {
              const progs = { ...progress.r4PlayerProgress };
              progs[pId] = {
                ...playerProg,
                correctIndices: newSet,
                timeSpent: playerProg.timeSpent + (timerDuration - (timeLeft || 0))
              };
              return {
                ...prev,
                roundProgress: {
                  ...prev.roundProgress,
                  [4]: { ...progress, r4PlayerProgress: progs }
                }
              };
            });
            setR4CurrentSongIdx(nextIdx);
            setActiveNote({ categoryId: 'r4_sprint', noteIndex: nextIdx });
            playSFX(SFX.correct);
            stopSong(true);
          }
        }, undefined, undefined, 'inline');
        return;
      }
      return;
    }

    // =========================================================
    // ROUND 3: DUEL LOGIC (Update state, don't return JSX)
    // =========================================================
    if (isFinalRound) {
      showModal(status === 'correct' ? t.correct : t.wrong, t.confirmAction, () => {
        let winnerId: number | null = null;

        setGameState(prev => {
          const currentP = prev.players[prev.currentPlayerIndex];
          const progress = prev.roundProgress[3];
          const duelIds = progress.activePlayerIds || [];
          const opponentId = duelIds.find(id => id !== currentP.id);

          let newPlayers = [...prev.players];
          let nextPlayerIndex = prev.currentPlayerIndex;

          if (status === 'correct') {
            newPlayers = newPlayers.map(p => p.id === currentP.id ? { ...p, stars: (p.stars || 0) + 1 } : p);
          } else if (status === 'wrong' && opponentId !== undefined) {
            newPlayers = newPlayers.map(p => p.id === opponentId ? { ...p, stars: (p.stars || 0) + 1 } : p);
            // Switch active player on wrong answer
            const opponentIndex = prev.players.findIndex(p => p.id === opponentId);
            if (opponentIndex !== -1) nextPlayerIndex = opponentIndex;
          }

          // Check for winner (3 stars)
          const updatedCurrentP = newPlayers.find(p => p.id === currentP.id);
          const updatedOpponentP = opponentId !== undefined ? newPlayers.find(p => p.id === opponentId) : undefined;

          if ((updatedCurrentP?.stars || 0) >= 3) winnerId = updatedCurrentP!.id;
          if ((updatedOpponentP?.stars || 0) >= 3) winnerId = updatedOpponentP!.id;

          return {
            ...prev,
            players: newPlayers,
            currentPlayerIndex: nextPlayerIndex
          };
        });

        setIsR3Finalized(true); // Locks controls and enables "Next Turn"
        stopSong(true);
        setModal(null);
        playSFX(status === 'correct' ? SFX.correct : SFX.wrong);

        if (winnerId !== null) {
          setVictoryContext({ roundId: 3, winnerId });
          setTimeout(() => setShowVictory(true), 500);
        }
      }, undefined, undefined, 'inline');
      return;
    }

    // =========================================================
    // ROUNDS 1 & 2: STANDARD LOGIC
    // =========================================================
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
        const newPointMap = { ...progress.pointMap };
        const catId = activeNote.categoryId;

        if (roundId === 2) {
          const count = (newActivationCounts[catId] || 0) + 1;
          newActivationCounts[catId] = count;
          newPersistentPoints[`${catId}-0`] = currentRoundPoints || 20;

          if (newPointMap[catId]) {
            newPointMap[catId] = [...newPointMap[catId]];
            newPointMap[catId][0] = currentRoundPoints || 20;
          }

          const resultNoteId = `${catId}-${count}`;
          newUsedNotes.add(resultNoteId);
          newResults[resultNoteId] = status;

          if (count >= 4) {
            newUsedNotes.add(`${catId}-0`);
            newResults[`${catId}-0`] = status;
          }
        } else {
          newUsedNotes.add(`${catId}-${activeNote.noteIndex}`);
          newResults[`${catId}-${activeNote.noteIndex}`] = status;
        }

        const isCompleted = (roundId === 2)
          ? (newActivationCounts[catId] >= 4)
          : [0, 1, 2, 3].every(i => newUsedNotes.has(`${catId}-${i}`));

        const newActivatedCategories = new Set(progress.activatedCategories);
        if (isCompleted) newActivatedCategories.add(catId);

        return {
          ...prev,
          players: newPlayers,
          currentPlayerIndex: (prev.currentPlayerIndex + 1) % prev.players.length,
          roundProgress: {
            ...prev.roundProgress,
            [roundId]: {
              ...progress,
              usedNotes: newUsedNotes,
              activatedCategories: newActivatedCategories,
              activationCounts: newActivationCounts,
              persistentPoints: newPersistentPoints,
              results: newResults,
              pointMap: newPointMap
            }
          }
        };
      });

      stopSong(true);
      setActiveNote(null);
      setCurrentRoundPoints(undefined);
      setTimeLeft(undefined);
      setModal(null);
    }, status === 'correct' ? t.correct : t.noAssign, undefined, 'inline');
  };

  // UPDATED handleNextTurnNav function
  const handleNextTurnNav = () => {
    const roundId = gameState.activeRoundId!;
    const progress = gameState.roundProgress[roundId];

    if (roundId === 3) {
      const nextIdx = (progress.currentTurnIndex || 0) + 1;

      if (nextIdx >= 5) {
        // This is the end of Round 3 - find the winner
        const duelIds = progress.activePlayerIds || [];
        const leftId = duelIds[0];
        const rightId = duelIds[1];

        const leftPlayer = gameState.players.find(p => p.id === leftId);
        const rightPlayer = gameState.players.find(p => p.id === rightId);

        // Determine winner by stars, then score
        let winnerId = leftId;
        if (rightPlayer) {
          if ((rightPlayer.stars || 0) > (leftPlayer?.stars || 0)) {
            winnerId = rightId;
          } else if ((rightPlayer.stars || 0) === (leftPlayer?.stars || 0)) {
            if (rightPlayer.score > (leftPlayer?.score || 0)) {
              winnerId = rightId;
            }
          }
        }

        setVictoryContext({
          roundId: 3,
          winnerId: winnerId
        });
        setShowVictory(true);
        return;
        // setShowVictory(true);
        // return; 
      }

      setGameState(prev => ({
        ...prev,
        roundProgress: {
          ...prev.roundProgress,
          [3]: {
            ...progress,
            currentTurnIndex: nextIdx,
            usedNotes: progress.usedNotes ? new Set([...progress.usedNotes, `r3_final-${progress.currentTurnIndex || 0}`]) : new Set()
          }
        }
      }));
      setIsR3Finalized(false);
      setSelectedDuration(null);
      stopSong(true);
      setActiveNote({ categoryId: 'r3_final', noteIndex: 0 });
      setTimeLeft(undefined);
    } else if (roundId === 4) {
      // Sprint round logic
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

  const TimerSettings = () => (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-8">
      <div className="bg-slate-900 rounded-[3rem] p-12 max-w-lg w-full border-2 border-slate-700 shadow-2xl">
        <h3 className="text-4xl font-black text-white mb-8 text-center uppercase tracking-tight">{t.timerSettings || "Timer Settings"}</h3>
        <div className="space-y-6 mb-10">
          <div>
            <label className="block text-lg font-bold text-slate-400 mb-4 uppercase tracking-widest">{t.timerDuration || "Timer Duration (seconds)"}</label>
            <div className="flex items-center gap-4">
              <button onClick={() => setTimerDuration(Math.max(10, timerDuration - 10))} className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-2xl font-black hover:bg-slate-700">-</button>
              <div className="flex-1 bg-slate-800 border-2 border-slate-700 rounded-2xl px-4 py-4 text-white text-4xl font-black text-center tabular-nums">
                {timerDuration}
              </div>
              <button onClick={() => setTimerDuration(Math.min(300, timerDuration + 10))} className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-2xl font-black hover:bg-slate-700">+</button>
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          <button onClick={() => setShowTimerSettings(false)} className="flex-1 py-6 bg-slate-800 text-white font-black text-xl rounded-[2rem] hover:bg-slate-700 uppercase tracking-widest">{t.cancel}</button>
          <button onClick={() => { setShowTimerSettings(false); resetTimer(); }} className="flex-1 py-6 bg-indigo-600 text-white font-black text-xl rounded-[2rem] hover:bg-indigo-500 uppercase tracking-widest shadow-lg">{t.save || "Save"}</button>
        </div>
      </div>
    </div>
  );

  // UPDATED RoundView component
  const RoundView = () => {
    const roundId = gameState.activeRoundId;
    if (roundId === null) return null;
    const progress = gameState.roundProgress[roundId];
    if (!progress) { initializeRound(roundId); return null; }
    const isSprintRound = roundId === 4;
    const isFinalRound = roundId === 3;

    if (isSprintRound) {
      const selectedSetId = gameState.roundSets[roundId] || 'default';
      const roundData = getRoundData(roundId, selectedSetId) || [];
      if (!roundData || roundData.length === 0) return null;
      const currentPlayer = gameState.players[gameState.currentPlayerIndex];
      const pId = currentPlayer.id;
      let playerProg = progress.r4PlayerProgress?.[pId];

      // If playerProg doesn't exist, initialize it
      if (!playerProg && progress.r4PlayerProgress) {
        playerProg = {
          correctIndices: new Set(),
          wrongIndex: null,
          hasFinished: false,
          timeSpent: 0
        };
        setGameState(prev => ({
          ...prev,
          roundProgress: {
            ...prev.roundProgress,
            [4]: {
              ...prev.roundProgress[4],
              r4PlayerProgress: {
                ...prev.roundProgress[4].r4PlayerProgress,
                [pId]: playerProg
              }
            }
          }
        }));
      }

      if (!playerProg) return null;
      const usedRowsSet = progress.usedRows || new Set();
      return (
        <div className="min-h-screen bg-slate-950 p-8 pt-24">
          <div className="max-w-[1600px] mx-auto flex gap-12">
            <div className="flex-1 flex flex-col gap-12">
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-[5rem] p-16 border-2 border-slate-800 text-center relative overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-6">
                    <div className="bg-indigo-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center text-5xl font-black shadow-lg shadow-indigo-900/30 ring-4 ring-indigo-500/20">4</div>
                    <div>
                      <h2 className="text-6xl font-black text-white tracking-tighter uppercase">SPRINT</h2>
                      <div className="text-xl font-black text-slate-400 uppercase tracking-[0.3em] mt-2">{t.round} 4</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        if (isPlaying) return;
                        stopSong();
                        initializeRound(4); // Go to Round 3 (final)
                        navigateTo('round', 3);
                      }}
                      className={`p-6 rounded-2xl transition-all ${isPlaying
                        ? 'opacity-20 cursor-not-allowed bg-slate-800'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:scale-105 active:scale-95 shadow-lg'
                        }`}
                      disabled={isPlaying}
                    >
                      <ChevronLeft size={40} />
                    </button>

                    <button
                      className="p-6 bg-slate-800/20 text-slate-700 rounded-2xl cursor-not-allowed transition-all"
                      disabled
                    >
                      <ChevronRight size={40} />
                    </button>
                  </div>
                </div>

                {!r4IsActiveSession && (
                  <div className="mb-10 flex justify-center">
                    <button onClick={() => setShowTimerSettings(true)} className="px-8 py-4 bg-slate-800 text-white rounded-3xl font-bold border-2 border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-3 shadow-lg">
                      <Timer size={24} />
                      {t.timerSettings || "Timer Settings"}
                    </button>
                  </div>
                )}

                {r4IsActiveSession && (
                  <div className="mb-10 flex items-center justify-center gap-6"><div className="bg-slate-800/50 px-10 py-6 rounded-3xl border-2 border-slate-700"><div className="text-sm font-black text-slate-500 uppercase tracking-widest mb-2">{t.timeLeft || "Time Left"}</div><div className={`text-6xl font-black tabular-nums ${timeLeft && timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-indigo-400'}`}>{formatTime(timeLeft)}</div></div><button onClick={() => setShowTimerSettings(true)} className="px-8 py-6 bg-slate-800 text-white rounded-3xl font-bold border-2 border-slate-700">{t.settings || "Settings"}</button></div>
                )}
                <div className="mb-16">{[0].map(row => {
                  const startIdx = row * 7; const isPlayerRow = selectedRow === row; const isRowUsed = usedRowsSet.has(row);
                  return (<div key={row} className={`mb-8 p-8 rounded-[3rem] border-4 ${isPlayerRow && r4IsActiveSession ? 'bg-slate-800/50 border-slate-600' : isRowUsed ? 'opacity-50' : 'bg-slate-900/30'}`}><div className="text-xl font-black text-slate-400 mb-6 uppercase">Row {row + 1}</div><div className="grid grid-cols-7 gap-4">{Array.from({ length: 7 }, (_, i) => startIdx + i).map(songIdx => {
                    const isCorrect = playerProg?.correctIndices.has(songIdx); const isWrong = playerProg?.wrongIndex === songIdx; const isActive = r4CurrentSongIdx === songIdx; const isSelectable = !playerProg?.hasFinished && !isRowUsed && (!r4IsActiveSession || (isPlayerRow && r4IsActiveSession && !isCorrect));
                    return (<button key={songIdx} onClick={() => { if (isSelectable || playerProg?.hasFinished || isCorrect || isWrong) handleNoteClick('r4_sprint', songIdx); }} className={`h-24 rounded-2xl border-3 transition-all flex flex-col items-center justify-center ${isActive && r4IsActiveSession ? 'bg-indigo-600 border-white scale-110 z-10' :
                      isCorrect ? 'bg-emerald-600 border-emerald-400' :
                        isWrong ? 'bg-rose-600 border-rose-400' :
                          playedButNotEvaluated.includes(songIdx) ? 'bg-yellow-600 border-yellow-400' :
                            isSelectable ? 'bg-slate-800 border-slate-600 hover:bg-slate-700' :
                              'bg-slate-900/50 opacity-60'
                      }`}>{isCorrect ? <CheckCircle size={28} /> : isWrong ? <XCircle size={28} /> : <MusicIcon size={28} />}</button>);
                  })}</div></div>);
                })}</div>
                {!r4IsActiveSession && playerProg?.hasFinished && (<div className="flex flex-col items-center animate-in fade-in duration-700"><div className="text-3xl font-black text-indigo-400 mb-4 uppercase">{playerProg.correctIndices.size === 7 ? t.perfectRound || "Perfect Round!" : `${playerProg.correctIndices.size} Correct`}</div><button onClick={() => { setR4IsActiveSession(false); setSelectedRow(null); setActiveNote(null); setTimeLeft(undefined); setPlayedButNotEvaluated([]); }} className="py-8 px-20 rounded-[2.5rem] bg-indigo-600 text-white font-black text-3xl uppercase">{t.continue || "Continue"}</button></div>)}
              </div>
              <div className="bg-slate-900/50 p-12 rounded-[5rem] border-2 border-slate-800"><PlayerBoard players={gameState.players} currentPlayerIndex={gameState.currentPlayerIndex} onUpdatePlayer={handleUpdatePlayer} onSetCurrentPlayer={(idx) => { if (r4IsActiveSession) return; showModal(t.playerName, t.confirmPlayerActive, () => { setGameState(prev => ({ ...prev, currentPlayerIndex: idx })); setR4IsActiveSession(false); setModal(null); }); }} t={t} /></div>
            </div>

            <div className="w-[450px] flex flex-col gap-10 relative">
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

              <div className="bg-slate-800 rounded-[3rem] p-8 border-2 border-slate-700 shadow-2xl">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest text-center mb-6"> {t.round5Progress || "ROUND 4 PROGRESS"}</h3>

                <div className="bg-slate-900/60 rounded-2xl p-6 mb-4 border border-slate-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400 text-sm font-bold">  {t.sessionPoints || "Session Points"} </span>
                    <span className="text-3xl font-black text-emerald-400">
                      {(() => {
                        const pId = currentPlayer.id;
                        const playerProg = progress.r4PlayerProgress?.[pId];
                        const correctCount = playerProg?.correctIndices?.size || 0;
                        const isCurrentSongCorrect = playerProg?.correctIndices?.has(r4CurrentSongIdx);
                        const currentBonus = correctCount === 7 ? 300 : 0;

                        let sessionPoints = correctCount * 10;

                        if (isCurrentSongCorrect && r4IsActiveSession) {
                          sessionPoints += 10;
                        }

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

                <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-slate-400 text-sm font-bold block"> {t.perfectRoundBonus || "Perfect Round Bonus"}</span>
                      <span className="text-xs text-slate-500">{t.all7Correct || "All 7 songs correct"}</span>
                    </div>
                    <div className={`text-2xl font-black ${(() => {
                      const pId = currentPlayer.id;
                      const playerProg = progress.r4PlayerProgress?.[pId];
                      return (playerProg?.correctIndices?.size || 0) === 7 ? 'text-yellow-400' : 'text-slate-600';
                    })()}`}>
                      +300
                    </div>
                  </div>
                  <div className="mt-4 flex gap-1">
                    {Array.from({ length: 7 }).map((_, idx) => {
                      const pId = currentPlayer.id;
                      const playerProg = progress.r4PlayerProgress?.[pId];
                      const isCorrect = playerProg?.correctIndices?.has(selectedRow !== null ? selectedRow * 7 + idx : idx);
                      return (
                        <div
                          key={idx}
                          className={`flex-1 h-2 rounded-full ${isCorrect ? 'bg-emerald-500' : 'bg-slate-700'
                            }`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              <ControlPanel
                isPlaying={isPlaying}
                onStart={() => handleAudioControl('start')}
                onStop={() => handleAudioControl('stop')}
                onCorrect={() => handleFinalizeTurn('correct')}
                onWrong={() => handleFinalizeTurn('wrong')}
                onSkip={() => handleFinalizeTurn('skip')}
                timeLeft={timeLeft}
                t={t}
                disabledActions={!r4IsActiveSession || timeLeft === 0}
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

    if (isFinalRound) {
      const selectedSetId = gameState.roundSets[roundId] || 'default';
      const roundData = getRoundData(roundId, selectedSetId) || [];
      const turnIdx = progress.currentTurnIndex || 0;
      const song = roundData[0]?.songs[turnIdx];
      const isSongUsed = progress.usedNotes?.has(`r3_final-${turnIdx}`);

      // Keep player panels fixed (left/right) regardless of whose turn it is.
      const duelIds = progress.activePlayerIds || [];
      const leftId = duelIds[0];
      const rightId = duelIds[1];
      const leftPlayer = gameState.players.find(p => p.id === leftId) || gameState.players[0];
      const rightPlayer = rightId !== undefined ? (gameState.players.find(p => p.id === rightId) || null) : null;
      return (
        <div className="min-h-screen bg-slate-950 p-8 pt-24">
          <div className="max-w-[1600px] mx-auto flex gap-12">
            <div className="flex-1 flex flex-col gap-12">
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-[5rem] p-16 border-2 border-slate-800 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-4 bg-indigo-600/10"><div className="bg-indigo-600 h-full transition-all duration-1000" style={{ width: `${((turnIdx + 1) / 5) * 100}%` }} /></div>
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-6">
                    <div className="bg-indigo-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center text-5xl font-black shadow-lg shadow-indigo-900/30 ring-4 ring-indigo-500/20">3</div>
                    <h2 className="text-6xl font-black text-white tracking-tighter uppercase">{t.categories.superGame}</h2>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        if (isPlaying) return;
                        navigateTo('round', 2);
                      }}
                      className={`p-6 rounded-2xl transition-all ${isPlaying
                        ? 'opacity-20 cursor-not-allowed bg-slate-800'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:scale-105 active:scale-95 shadow-lg'
                        }`}
                      disabled={isPlaying}
                    >
                      <ChevronLeft size={40} />
                    </button>

                    <button
                      onClick={() => {
                        if (isPlaying) return;
                        showModal(
                          t.mainMenu,
                          "Go to Round 4 (Sprint)?",
                          () => {
                            stopSong();
                            if (gameState.players.length > 1) {
                              setCurrentPage('r4_select');
                            } else {
                              initializeRound(4);
                              navigateTo('round', 4);
                            }
                            setModal(null);
                          }
                        );
                      }}
                      className={`p-6 rounded-2xl transition-all ${isPlaying
                        ? 'opacity-20 cursor-not-allowed bg-slate-800'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:scale-105 active:scale-95 shadow-lg'
                        }`}
                      disabled={isPlaying}
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
                        if (!isR3Finalized) {
                          return;
                        }
                        setSelectedDuration(null);
                        playSFX(SFX.button);
                      }}
                      className={`px-14 h-32 rounded-[2rem] border-4 transition-all ${selectedDuration === null ? 'bg-indigo-800 border-white text-white scale-110 shadow-2xl z-10' :
                        !isR3Finalized ? 'bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed' :
                          'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                        }`}
                      disabled={!isR3Finalized}
                    >
                      <span className="text-4xl font-black uppercase tracking-widest">
                        {t.full}
                      </span>
                    </button>

                    {!isR3Finalized && (
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded-xl border border-slate-700 whitespace-nowrap z-20 animate-pulse">
                        ← First press CORRECT or WRONG
                      </div>
                    )}
                  </div>
                </div>
                {isR3Finalized && (<button onClick={handleNextTurnNav} className="mt-16 py-8 px-20 rounded-[2.5rem] bg-emerald-600 text-white font-black text-3xl uppercase">Next Turn</button>)}
              </div>
              <div className="bg-slate-900/50 p-12 rounded-[5rem] border-2 border-slate-800"><PlayerBoard players={gameState.players} currentPlayerIndex={gameState.currentPlayerIndex} onUpdatePlayer={handleUpdatePlayer} onSetCurrentPlayer={(idx) => { if (progress.activePlayerIds?.includes(gameState.players[idx].id)) showModal(t.playerName, t.confirmPlayerActive, () => { setGameState(prev => ({ ...prev, currentPlayerIndex: idx })); setModal(null); }); }} t={t} activePlayerIds={progress.activePlayerIds} /></div>
            </div>

            <div className="w-[450px] flex flex-col gap-10 relative">
              <div className="bg-slate-800 rounded-[3rem] p-12 border-2 border-slate-700 shadow-2xl flex flex-col items-center gap-4">
                <span className="text-lg font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">
                  {t.turn || "TURN"} {turnIdx + 1} / 5
                </span>

                <div className="grid grid-cols-2 gap-8 w-full">

                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-black text-indigo-300 mb-3 text-center break-words whitespace-normal w-full px-2 min-h-[4rem] flex items-center justify-center">
                      <div className="leading-tight">
                        {leftPlayer.name || `Player ${leftPlayer.id + 1}`}
                      </div>
                    </div>

                    <div className="bg-indigo-900/40 px-6 py-4 rounded-3xl border-2 border-indigo-500/30 shadow-inner flex flex-col items-center">


                      <div className="flex justify-center gap-2">
                        {[1, 2, 3].map((starNum) => {
                          const isFilled = (leftPlayer.stars || 0) >= starNum;
                          return (
                            <Star
                              key={starNum}
                              size={28}
                              className={`${isFilled ? 'text-yellow-400 fill-yellow-400' : 'text-indigo-900/40 fill-indigo-900/40'}`}
                            />
                          );
                        })}
                      </div>

                      {/* <div className="flex flex-wrap justify-center gap-2">
                        {(() => {
                          const stars = leftPlayer.stars || 0;
                          const elements = [];
                          for (let i = 0; i < Math.min(stars, 3); i++) {
                            elements.push(<Star key={i} size={28} className="text-yellow-400 fill-yellow-400" />);
                          }
                          for (let i = Math.min(stars, 3); i < 3; i++) {
                            elements.push(<Star key={`empty-${i}`} size={28} className="text-indigo-900/40 fill-indigo-900/40" />);
                          }
                          return elements;
                        })()}
                      </div> */}

                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-black text-rose-300 mb-3 text-center break-words whitespace-normal w-full px-2 min-h-[4rem] flex items-center justify-center">
                      <div className="leading-tight">
                        {rightPlayer ? (rightPlayer.name || `Player ${rightPlayer.id + 1}`) : '--'}
                      </div>
                    </div>
                    <div className="bg-rose-900/40 px-6 py-4 rounded-3xl border-2 border-rose-500/30 shadow-inner flex flex-col items-center">
                      {/* <div className="flex flex-wrap justify-center gap-2">
                        {(() => {
                          const opponentStars = rightPlayer?.stars || 0;
                          
                          const yellowStars = Array.from({ length: Math.min(opponentStars, 3) }).map((_, i) => (
                            <Star key={i} size={28} className="text-yellow-400 fill-yellow-400" />
                          ));
                          
                          const grayStars = Array.from({ length: Math.max(0, 3 - opponentStars) }).map((_, i) => (
                            <Star key={`empty-${i}`} size={28} className="text-rose-900/40 fill-rose-900/40" />
                          ));
                          
                          return [...yellowStars, ...grayStars];
                        })()} */}
                      <div className="flex justify-center gap-2">
                        {[1, 2, 3].map((starNum) => {
                          const opponentStars = rightPlayer?.stars || 0;
                          const isFilled = opponentStars >= starNum;
                          return (
                            <Star
                              key={starNum}
                              size={28}
                              className={`${isFilled ? 'text-yellow-400 fill-yellow-400' : 'text-rose-900/40 fill-rose-900/40'}`}
                            />
                          );
                        })}



                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <ControlPanel isPlaying={isPlaying} onStart={() => handleAudioControl('start')} onStop={() => handleAudioControl('stop')} onCorrect={() => handleFinalizeTurn('correct')} onWrong={() => handleFinalizeTurn('wrong')} timeLeft={timeLeft} t={t} disabledActions={isR3Finalized || isSongUsed} isStartDisabled={!isR3Finalized && selectedDuration === null} />
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
    return (
      <RoundStandard
        gameState={gameState}
        activeNote={activeNote}
        currentRoundPoints={currentRoundPoints}
        isPlaying={isPlaying}
        timeLeft={timeLeft}
        audioProgress={audioProgress}
        modal={modal}
        t={t}
        onNavigate={navigateTo}
        onInitializeRound={initializeRound}
        onNoteClick={handleNoteClick}
        onUpdatePlayer={handleUpdatePlayer}
        onShowModal={showModal}
        onSetModal={setModal}
        onSetCurrentPlayer={(idx) => showModal(t.playerName, t.confirmPlayerActive, () => {
          setGameState(prev => ({ ...prev, currentPlayerIndex: idx }));
          setModal(null);
        })}
        onAudioControl={handleAudioControl}
        onFinalizeTurn={handleFinalizeTurn}
        onSeek={handleSeek}
        formatTime={formatTime}
        onShowRoundSummary={() => setShowScoreboard(true)}
      />
    );
  };

  // UPDATED R3SelectView component (was R6SelectView)
  const R3SelectView = () => (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
      <div className="bg-slate-900/90 backdrop-blur-xl p-16 rounded-[4rem] border border-slate-800 max-w-4xl w-full text-center shadow-2xl">
        <Users size={80} className="text-indigo-500 mx-auto mb-10 animate-pulse" />
        <div className="mb-12"><h2 className="text-6xl font-black text-white mb-4 tracking-tighter uppercase">{t.selectTeams}</h2><p className="text-xl font-bold text-slate-400 uppercase tracking-widest">{t.selectTwo}</p></div>
        <div className="space-y-6 mb-14">{gameState.players.map(p => (<button key={p.id} onClick={() => setR3Selection(prev => prev.includes(p.id) ? prev.filter(i => i !== p.id) : prev.length < 2 ? [...prev, p.id] : prev)} className={`w-full px-10 py-6 rounded-[2rem] border-2 transition-all flex items-center justify-between ${r3Selection.includes(p.id) ? 'bg-indigo-600/20 border-indigo-500 scale-[1.02]' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}><div className="text-left"><div className="text-2xl font-black text-white">{p.name || `Player ${p.id + 1}`}</div><div className="text-sm font-bold text-slate-500 uppercase">{p.score} {t.points}</div></div>{r3Selection.includes(p.id) ? <CheckCircle size={36} className="text-indigo-500" /> : <div className="w-9 h-9 rounded-full border-2 border-slate-600" />}</button>))}</div>
        <div className="grid grid-cols-2 gap-6"><button onClick={() => navigateTo('start')} className="py-10 rounded-[2.5rem] bg-slate-800 text-white font-black text-3xl uppercase">{t.cancel}</button><button onClick={() => { if (r3Selection.length !== 2) return; setGameState(prev => ({ ...prev, currentPlayerIndex: prev.players.findIndex(p => p.id === r3Selection[0]), roundProgress: { ...prev.roundProgress, [3]: { usedNotes: new Set(), activatedCategories: new Set(), pointMap: {}, activationCounts: {}, results: {}, activePlayerIds: r3Selection, currentTurnIndex: 0 } }, activeRoundId: 3 })); setCurrentPage('round'); setActiveNote({ categoryId: 'r3_final', noteIndex: 0 }); setSelectedDuration(null); setIsR3Finalized(false); }} className={`py-10 rounded-[2.5rem] font-black text-3xl uppercase ${r3Selection.length === 2 ? 'bg-indigo-600 text-white shadow-2xl' : 'bg-slate-900 text-slate-700 cursor-not-allowed'}`}>{t.startGame}</button></div>
      </div>
    </div>
  );

  const R4SelectView = () => (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
      <div className="bg-slate-900/90 backdrop-blur-xl p-16 rounded-[4rem] border border-slate-800 max-w-4xl w-full text-center shadow-2xl">
        <Users size={80} className="text-indigo-500 mx-auto mb-10 animate-pulse" />
        <div className="mb-12">
          <h2 className="text-6xl font-black text-white mb-4 tracking-tighter uppercase">
            {t.playerName}
          </h2>
          <p className="text-xl font-bold text-slate-400 uppercase tracking-widest">
            {t.confirmPlayerActive}
          </p>
        </div>
        <div className="space-y-6 mb-14">
          {gameState.players.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setR4SelectedPlayerId(p.id);
                playSFX(SFX.select);
              }}
              className={`w-full px-10 py-6 rounded-[2rem] border-2 transition-all flex items-center justify-between ${r4SelectedPlayerId === p.id ? 'bg-indigo-900/40 border-indigo-500 scale-[1.02]' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}
            >
              <div className="text-left">
                <div className="text-2xl font-black text-white">{p.name || `Player ${p.id + 1}`}</div>
                <div className="text-sm font-bold text-slate-500 uppercase">{p.score} {t.points}</div>
              </div>
              {r4SelectedPlayerId === p.id ? <CheckCircle size={36} className="text-indigo-500" /> : <div className="w-9 h-9 rounded-full border-2 border-slate-600" />}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => showModal(t.mainMenu, t.confirmNav, () => navigateTo('start'))}
            className="py-10 rounded-[2.5rem] bg-slate-800 text-white font-black text-3xl uppercase hover:bg-slate-700 transition-colors"
          >
            {t.cancel || "Cancel"}
          </button>
          <button
            onClick={() => {
              if (r4SelectedPlayerId === null) return;
              const playerIdx = gameState.players.findIndex(p => p.id === r4SelectedPlayerId);
              if (playerIdx === -1) return;

              stopSong();
              initializeRound(4);
              setActiveNote(null);
              setCurrentRoundPoints(undefined);
              setTimeLeft(undefined);
              setR4IsActiveSession(false);
              setSelectedRow(null);
              setR4CurrentSongIdx(0);
              setShowTimerSettings(false);
              setPlayedButNotEvaluated([]);
              setGameState(prev => ({ ...prev, currentPlayerIndex: playerIdx, activeRoundId: 4 }));
              setCurrentPage('round');
            }}
            className={`py-10 rounded-[2.5rem] font-black text-3xl uppercase transition-all ${r4SelectedPlayerId !== null ? 'bg-indigo-600 text-white shadow-2xl hover:scale-105' : 'bg-slate-900 text-slate-700 cursor-not-allowed'}`}
            disabled={r4SelectedPlayerId === null}
          >
            {t.startGame || "Start Game"}
          </button>
        </div>
      </div>
    </div>
  );

  const Round3VictoryView = () => {
    const winner = gameState.players.find(p => p.id === victoryContext.winnerId);

    if (!winner) return null;

    const handleClose = () => {
      if (sfxRef.current) {
        sfxRef.current.pause();
        sfxRef.current = null;
      }
      setShowVictory(false);
      setVictoryContext({ roundId: null, winnerId: null });
      triggerBGM('round', 3);
    };

    const handleSuperGame = () => {
      if (sfxRef.current) {
        sfxRef.current.pause();
        sfxRef.current = null;
      }

      const winnerIndex = gameState.players.findIndex(p => p.id === winner.id);

      setShowVictory(false);
      setVictoryContext({ roundId: null, winnerId: null });

      // Reset Round 4 states
      setR4IsActiveSession(false);
      setSelectedRow(null);
      setR4CurrentSongIdx(0);
      setTimeLeft(undefined);
      setShowTimerSettings(false);
      setPlayedButNotEvaluated([]);
      setActiveNote(null);
      setCurrentRoundPoints(undefined);

      // Set only winner to play Round 4
      const initialR4Progress = {
        [winner.id]: {
          correctIndices: new Set(),
          wrongIndex: null,
          hasFinished: false,
          timeSpent: 0
        }
      };

      setGameState(prev => ({
        ...prev,
        currentPlayerIndex: winnerIndex,
        activeRoundId: 4,
        roundProgress: {
          ...prev.roundProgress,
          [4]: {
            usedNotes: new Set(),
            activatedCategories: new Set(),
            pointMap: {},
            activationCounts: {},
            results: {},
            r4PlayerProgress: initialR4Progress,
            usedRows: new Set()
          }
        }
      }));

      setCurrentPage('round');
    };

    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950 p-8 text-center animate-in zoom-in duration-1000">
        <div className="max-w-[900px] w-full">
          <Trophy
            size={120}
            className="text-yellow-500 mx-auto mb-10 animate-bounce"
          />

          <h1 className="text-[6rem] font-black text-white mb-4 uppercase tracking-tighter leading-none">
            {t.duelVictory || "DUEL VICTORY!"}
          </h1>
          <p className="text-2xl text-slate-400 mb-12 font-bold uppercase tracking-[0.3em] opacity-60">
            {winner.name} {t.winsDuel || "WINS THE DUEL!"}
          </p>

          <div className="bg-slate-900 p-12 rounded-[4rem] border-4 border-yellow-500/40 mb-6 shadow-[0_40px_80px_rgba(234,179,8,0.3)]">
            <div className="text-sm font-black text-yellow-500 uppercase tracking-[0.4em] mb-4">
              {t.duelChampion || "DUEL CHAMPION"}
            </div>
            <div className="text-[5rem] font-black text-white mb-8 tracking-tighter leading-none">
              {winner.name || `Player ${winner.id + 1}`}
            </div>
            <div className="flex justify-center gap-16">
              <div className="text-center">
                <div className="text-yellow-500/80 text-xs font-black uppercase tracking-[0.2em] mb-3">
                  {t.stars || "STARS"}
                </div>
                <div className="text-6xl font-black text-yellow-500 tabular-nums tracking-tighter">
                  {winner.stars || 0}/3
                </div>
              </div>
              <div className="w-1 h-24 bg-slate-800 rounded-full" />
              <div className="text-center">
                <div className="text-yellow-500/80 text-xs font-black uppercase tracking-[0.2em] mb-3">
                  {t.totalPoints || "TOTAL POINTS"}
                </div>
                <div className="text-6xl font-black text-yellow-500 tabular-nums tracking-tighter">
                  {winner.score}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-6 justify-center">
            <button
              onClick={handleClose}
              className="px-10 py-6 bg-slate-800 text-white rounded-[2rem] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-slate-900/40 uppercase tracking-[0.2em] flex items-center gap-4"
            >
              <XCircle size={28} /> {t.close || "CLOSE"}
            </button>
            <button
              onClick={handleSuperGame}
              className="px-10 py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-emerald-900/40 uppercase tracking-[0.2em] flex items-center gap-4"
            >
              <Zap size={28} /> {t.nextRound || "NEXT"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // VictoryView component (unchanged except for variable names)
  const VictoryView = () => {
    const sortedPlayers = [...gameState.players].sort((a, b) => {
      if (b.stars !== a.stars) return b.stars - a.stars;
      return b.score - a.score;
    });

    const winner = sortedPlayers[0];
    const secondPlace = sortedPlayers[1];
    const thirdPlace = sortedPlayers[2];

    useEffect(() => {
      if (showVictory && gameState.isMusicEnabled) {
        playSFX(SFX.scoreboard);
        stopBGM();
      }
    }, [showVictory, gameState.isMusicEnabled]);

    const handleClose = () => {
      if (sfxRef.current) {
        sfxRef.current.pause();
        sfxRef.current = null;
      }

      setShowVictory(false);
      triggerBGM('start', null);
      navigateTo('start');
    };

    const handleReset = () => {
      if (sfxRef.current) {
        sfxRef.current.pause();
        sfxRef.current = null;
      }

      resetGameAction();
    };

    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950 p-8 text-center animate-in zoom-in duration-1000">
        <div className="max-w-[900px] w-full">
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

          <div className="bg-slate-900 p-12 rounded-[4rem] border-4 border-indigo-500/40 mb-6 shadow-[0_40px_80px_rgba(79,70,229,0.3)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Trophy size={100} />
            </div>
            <div className="text-sm font-black text-indigo-500 uppercase tracking-[0.4em] mb-4">
              {t.winner || "WINNER"}
            </div>
            <div className="text-[5rem] font-black text-white mb-8 tracking-tighter leading-none">
              {winner.name || `Player ${winner.id + 1}`}
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

          {gameState.players.length >= 2 && secondPlace && (
            <div className="bg-slate-900/60 p-8 rounded-[3rem] border-2 border-slate-700/40 mb-6 shadow-xl">
              <div className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] mb-4">
                {t.secondPlace || "Second Place"}
              </div>
              <div className="text-[3rem] font-black text-slate-300 mb-6 tracking-tight">
                {secondPlace.name || `Player ${secondPlace.id + 1}`}
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

          {gameState.players.length >= 3 && thirdPlace && (
            <div className="bg-slate-900/40 p-8 rounded-[3rem] border-2 border-slate-700/30 mb-8 shadow-lg">
              <div className="text-sm font-black text-slate-500 uppercase tracking-[0.4em] mb-4">
                THIRD PLACE
              </div>
              <div className="text-[2.5rem] font-black text-slate-400 mb-6 tracking-tight">
                {thirdPlace.name || `Player ${thirdPlace.id + 1}`}
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

          <div className="flex gap-6 justify-center">
            <button
              onClick={handleClose}
              className="px-10 py-6 bg-slate-800 text-white rounded-[2rem] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-slate-900/40 uppercase tracking-[0.2em] flex items-center gap-4"
            >
              <XCircle size={28} /> {t.close || "CLOSE"}
            </button>
            <button
              onClick={handleReset}
              className="px-10 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-indigo-900/40 uppercase tracking-[0.2em] flex items-center gap-4"
            >
              <RotateCcw size={28} /> {t.reset || "RESET GAME"}
            </button>
          </div>
        </div>
      </div>
    );
  };


console.log("PARENT HUB STATE:", hubPlayers);
  // Final return statement
  return (
    <div className="font-sans text-slate-100 select-none bg-slate-950 min-h-screen selection:bg-indigo-500 selection:text-white">
      {/* <SettingsOverlay language={gameState.language} onLanguageToggle={toggleLanguage} isMusicEnabled={gameState.isMusicEnabled} onMusicToggle={toggleMusic} isFullscreen={isFullscreen} onFullscreenToggle={toggleFullscreen} onGoHome={() => navigateTo('setup')} onGoStart={() => navigateTo('start')} onReset={() => showModal(t.reset, t.confirmReset, resetGameAction)} volume={volume} onVolumeChange={handleVolumeChange} t={t} isLocked={!!activeNote && gameState.activeRoundId !== 3 && gameState.activeRoundId !== 4} /> */}
      <SettingsOverlay
        language={gameState.language}
        onLanguageToggle={toggleLanguage}
        isMusicEnabled={gameState.isMusicEnabled}
        onMusicToggle={toggleMusic}
        isFullscreen={isFullscreen}
        onFullscreenToggle={toggleFullscreen}
        onGoHome={() => navigateTo('setup')}
        onGoStart={() => navigateTo('start')}
        onReset={() => showModal(t.reset, t.confirmReset, resetGameAction)}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        t={t}
        isLocked={!!activeNote && gameState.activeRoundId !== 3 && gameState.activeRoundId !== 4}
        isBuzzerConnected={isBuzzerConnected} // <--- PLACE IT HERE
      />
      {currentPage === 'setup' && (
        <SetupView
          players={gameState.players}
          t={t}
          onUpdatePlayer={handleUpdatePlayer}
          onAddPlayer={handleAddPlayer}
          onRemovePlayer={handleRemovePlayer}
          onStartGame={handleStartGameFromSetup}
          isPlayerWindowOpen={playerWindow && !playerWindow.closed}
          onTogglePlayerWindow={handleOpenPlayerWindow}
          isBuzzerConnected={isBuzzerConnected}
          // onCheckConnection={() => { socket.connect(); }}
          onCheckConnection={handleConnect} // Whatever your connection function is named
          onForceDisconnect={handleForceDisconnect} // Pass the new kill switch here
          availableHubPlayers={hubPlayers}
        />
      )}



      {/* {currentPage === 'start' && <StartView />} */}

      {currentPage === 'start' && (
        <StartView
          t={t}
          language={gameState.language}
          roundSets={gameState.roundSets}
          playersCount={gameState.players.length}
          onNavigate={navigateTo}
          onInitializeRound={initializeRound}
          onShowScoreboard={() => setShowScoreboard(true)}
          onShowVictory={() => setShowVictory(true)}
          onSetRoundSetSelection={setRoundSetSelectionModal}
          onStopSong={stopSong}
          setPage={setCurrentPage}
        />
      )}

      {currentPage === 'round' && <RoundView />}
      {currentPage === 'r3_select' && <R3SelectView />} {/* Changed from r6_select */}
      {currentPage === 'r4_select' && <R4SelectView />}
      {modal && modal.position === 'center' && <ConfirmationModal isOpen={modal.isOpen} title={modal.title} message={modal.message} onConfirm={modal.onConfirm} onCancel={() => setModal(null)} confirmLabel={modal.confirmLabel} cancelLabel={modal.cancelLabel} position={modal.position} />}
      {showTimerSettings && <TimerSettings />}
      {showScoreboard && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-10 animate-in fade-in duration-500">
          <div className="bg-slate-900 rounded-[4rem] p-16 max-w-2xl w-full border-2 border-slate-800 shadow-2xl">
            <h3 className="text-6xl font-black text-white mb-14 flex items-center gap-6 tracking-tighter uppercase"><Trophy className="text-yellow-500" size={64} /> {t.scorePanel}</h3>
            <div className="space-y-6">{sortedPlayersScoreboard.map((p, idx) => (<div key={p.id} className="flex items-center justify-between p-8 bg-slate-800/60 rounded-[2.5rem] border-2 border-slate-700/50 shadow-xl"><div className="flex items-center gap-8"><span className="text-slate-600 font-black text-4xl w-10">{idx + 1}.</span><div><div className="text-white font-black text-3xl">{p.name || `Player ${p.id + 1}`}</div><div className="text-yellow-500 text-sm font-black uppercase flex items-center gap-3 mt-2"><Star size={16} fill="currentColor" /> {p.stars || 0} {t.stars}</div></div></div><span className="text-5xl font-black text-indigo-400 tabular-nums">{p.score} <span className="text-xs opacity-40 uppercase ml-2">pts</span></span></div>))}</div>
            {gameState.activeRoundId === 4 ? (
              <div className="flex gap-6 mt-14">
                <button onClick={() => setShowScoreboard(false)} className="flex-1 py-8 bg-slate-800 text-white font-black text-2xl rounded-[2rem] uppercase shadow-xl hover:bg-slate-700">{t.cancel || "Cancel"}</button>
                <button onClick={() => { setShowScoreboard(false); navigateTo('start'); }} className="flex-1 py-8 bg-indigo-600 text-white font-black text-2xl rounded-[2rem] uppercase shadow-2xl hover:bg-indigo-500">{t.continue || "Continue"}</button>
              </div>
            ) : (
              <button onClick={() => setShowScoreboard(false)} className="w-full mt-14 py-8 bg-indigo-600 text-white font-black text-2xl rounded-[2rem] uppercase shadow-2xl">{t.close}</button>
            )}
          </div>
        </div>
      )}
      {/* {showVictory && <VictoryView />} */}

      {showVictory && (
        victoryContext.roundId === 3 ?
          <Round3VictoryView /> :
          <VictoryView />
      )}

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
