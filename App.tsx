import React, { useState, useEffect, useRef, useCallback } from 'react';
import { translations } from './translations';
import { Player, GameState, Page, Language } from './types';
import { ROUND_DATA, getRoundData, getAvailableSets } from './data/index_data';
import { SCREEN_BGM, SFX, INITIAL_POINTS, shuffle } from './data/constants_main';
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
import LeaderDisplay from './src/displays/LeaderDisplay'; // Leader display for host notes
import { useBuzzer } from './src/hooks/useBuzzer';
import { saveScoreSnapshot, downloadFinalLog } from './src/utils/logger';
import { Music as MusicIcon, ChevronRight, ChevronLeft, Users, Trophy, Star, PartyPopper, RotateCcw, PlayCircle, HelpCircle, CheckCircle, XCircle, Zap, Timer, SkipForward } from 'lucide-react';
import PasswordGuard from './components/PasswordGuard';
/////////// Buzz---------------------------
import configBuzz from './configBuzz.json';
import { io } from 'socket.io-client';
// const socket = io(configBuzz.SOCKET_URL);
// ----------------------------------------


const App: React.FC = () => {
  const path = window.location.pathname.toLowerCase();
  const isPlayerScreen = path.includes('display');
  const isLeaderScreen = path.includes('leader');

  useEffect(() => {
    if (isLeaderScreen) {
      document.title = "GS Leader";
    } else if (isPlayerScreen) {
      document.title = "GS Display";
    } else {
      document.title = "GS Main";
    }
  }, [isLeaderScreen, isPlayerScreen]);

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
  const [includeWarmupStart, setIncludeWarmupStart] = useState(false);

  const roundPointsTimerRef = useRef<number | null>(null);
  const autoStopTimerRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);

  //To show pop pup window  with player who pressed
  const [showBuzzerPopup, setShowBuzzerPopup] = useState(false);
  const [buzzerPlayerName, setBuzzerPlayerName] = useState('');
  const [buzzerPoints, setBuzzerPoints] = useState(0);
  const [isWarmup, setIsWarmup] = useState(false);

  if (isLeaderScreen) {
    return <LeaderDisplay />;
  }

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

    // --- MOVE THESE OUTSIDE THE IF BLOCK ---
    // This ensures that whenever the music stops (Buzz or Manual Stop), 
    // the clock freezes immediately for ALL rounds.
    if (countdownIntervalRef.current) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (roundPointsTimerRef.current) {
      window.clearInterval(roundPointsTimerRef.current);
      roundPointsTimerRef.current = null;
    }
    // ---------------------------------------

    const roundId = gameState.activeRoundId;
    const isR4 = roundId === 4;

    if (fullyClear || (!isR4 || !r4IsActiveSession)) {
      if (autoStopTimerRef.current) {
        window.clearTimeout(autoStopTimerRef.current);
        autoStopTimerRef.current = null;
      }
    }

    if (fullyClear) {
      setAudioProgress({ current: 0, total: 0 });
      if (!isR4 || !r4IsActiveSession) {
        setTimeLeft(undefined);
      }
    }
  }, [gameState.activeRoundId, r4IsActiveSession]);

  const {
    activeResponder,
    setActiveResponder,
    isBuzzerConnected,
    hubPlayers,
    handleConnect,
    handleForceDisconnect,
    setBuzzerMapping,
    armBuzzers,
    socket: buzzerSocket,
  } = useBuzzer(stopSong);

  // useEffect(() => { //was this one
  //   const syncInterval = setInterval(() => {
  //     // This sends the data from your Laptop to the Server Bridge
  //     if (stateToShareRef.current && isBuzzerConnected) {
  //       // 'buzzerSocket' is the variable you got from your useBuzzer hook
  //       const stateData = stateToShareRef.current;
  //       console.log('🚀 [App.tsx] Emitting updateGameState:', {
  //         hasSong: !!stateData.currentSong,
  //         songTitle: stateData.currentSong?.title || 'none',
  //         socketConnected: buzzerSocket?.connected,
  //         eventName: 'updateGameState'
  //       });
  //       buzzerSocket.emit('updateGameState', stateData);
  //     }
  //   }, 500);

  //   return () => clearInterval(syncInterval);
  // }, [isBuzzerConnected, buzzerSocket]);

  useEffect(() => {
    const syncInterval = setInterval(() => {
      const stateData = stateToShareRef.current;
      if (!stateData) return;

      // DEBUG: Log if popup is being synced
      if (stateData.showBuzzerPopup) {
        console.log('📤 [App.tsx] Syncing buzzer popup to localStorage:', {
          showBuzzerPopup: stateData.showBuzzerPopup,
          playerName: stateData.buzzerPlayerName,
          points: stateData.buzzerPoints,
          isWarmup: stateData.isWarmup,
          timestamp: new Date().toISOString()
        });
      }

      // 1. SYNC TO PLAYER DISPLAY (Same Laptop)
      // This fixed the "Stuck on Starting Page" issue for /display
      try {
        localStorage.setItem('musicQuizPlayerState', JSON.stringify(stateData));
      } catch (e) {
        console.error("Local storage sync error", e);
      }

      // 2. SYNC TO LEADER DISPLAY (Phone / Network)
      // Removed isBuzzerConnected so it works in "Manual Mode"
      if (buzzerSocket?.connected) {
        buzzerSocket.emit('updateGameState', stateData);
      }
    }, 500);

    return () => clearInterval(syncInterval);
  }, [buzzerSocket]);


  // Show popup on PlayerScreen when buzzer is pressed in rounds 0,1,2
  useEffect(() => {
    const validRounds = [0, 1, 2];
    const currentRoundId = gameState.activeRoundId;


    //     if (currentRoundId === 4 && activeResponder) {
    //   const activePlayer = gameState.players[gameState.currentPlayerIndex];
    //   if (activePlayer.hubId !== activeResponder) {
    //     // Wrong player buzzed – ignore
    //     console.log("Ignoring buzz from non‑active player in Round 4");
    //     setActiveResponder(null);
    //     return;
    //   }
    // }

    if (!activeResponder || currentRoundId === null || currentRoundId === undefined || !validRounds.includes(currentRoundId) || !activeNote) {
      return;
    }

    const buzzingPlayer = gameState.players.find(p => p.hubId === activeResponder);
    if (!buzzingPlayer) return;

    // Calculate points
    let points = 0;
    const progress = gameState.roundProgress[currentRoundId];

    if ((currentRoundId === 0 || currentRoundId === 1) && progress?.pointMap) {
      points = progress.pointMap[activeNote.categoryId]?.[activeNote.noteIndex] || 0;
    } else if (currentRoundId === 2 && progress?.persistentPoints) //{
      points = progress.persistentPoints[`${activeNote.categoryId}-0`] || 20;
    // } else if (currentRoundId === 0 && progress?.pointMap) {
    //   points = progress.pointMap[activeNote.categoryId]?.[activeNote.noteIndex] || 0;
    // }

    setBuzzerPlayerName(buzzingPlayer.name || `Player ${buzzingPlayer.id}`);
    setBuzzerPoints(points);
    setIsWarmup(currentRoundId === 0);

    console.log('🔔 [App.tsx] ABOUT TO SET showBuzzerPopup = true', {
      activeResponder,
      playerName: buzzingPlayer.name,
      timestamp: new Date().toISOString()
    });
    setShowBuzzerPopup(true);

    // DEBUG: Log buzzer popup state
    console.log('🔔 [App.tsx] Buzzer pressed! Setting popup state:', {
      playerName: buzzingPlayer.name || `Player ${buzzingPlayer.id}`,
      points: points,
      roundId: currentRoundId,
      isWarmup: currentRoundId === 0,
      activeResponder: activeResponder,
      timestamp: new Date().toISOString()
    });

  }, [activeResponder, gameState.activeRoundId, activeNote, gameState.players]);



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

    // NOTE: activeId may be 0 (warm-up). Use explicit null check.
    if (activeId !== null && Object.prototype.hasOwnProperty.call(serializedRoundProgress, activeId)) {
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

    // Get current song data
    // CHANGE: Only update song info when activeNote changes (new song selected with PLAY)
    // Song info persists even if music is stopped (STOP) or buzzer is pressed
    // let currentSong: any = null;
    // if (activeNote && activeId !== null) {
    //   const selectedSetId = gameState.roundSets[activeId] || 'default';
    //   const roundData = getRoundData(activeId, selectedSetId) || [];
    //   const category = roundData.find(c => c.id === activeNote.categoryId);
    //   if (category) {
    //     const songData = category.songs[activeNote.noteIndex];
    //     currentSong = {
    //       title: songData.title,
    //       artist: songData.artist,
    //       // Force the notes string into the object
    //       notes: songData.notes || ""
    //     };
    //   }
    // }
    // Get current song data
    // CHANGE: Only update song info when activeNote changes (new song selected with PLAY)
    // Song info persists even if music is stopped (STOP) or buzzer is pressed
    let currentSong: any = null;
    if (activeNote && activeId !== null) {
      const selectedSetId = gameState.roundSets[activeId] || 'default';
      const roundData = getRoundData(activeId, selectedSetId) || [];
      const category = roundData.find(c => c.id === activeNote.categoryId);
      if (category) {
        // Determine the correct song index based on round type
        let songIndex = activeNote.noteIndex;
        const progress = gameState.roundProgress[activeId];

        // Round 3(melody round) needs special handling
        if (activeId === 3) {
          songIndex = progress?.currentTurnIndex || 0;
        }

        // Round 2 (melody round) needs special handling
        if (activeId === 2) {
          if (activeNote.isReveal) {
            // Reveal buttons (1‑4) → song index = noteIndex - 1
            songIndex = activeNote.noteIndex - 1;
          } else if (activeNote.noteIndex === 0) {
            // Points button (0) → song index = next unrevealed song
            songIndex = progress?.activationCounts?.[activeNote.categoryId] || 0;
          }
        }
        // For other rounds, noteIndex already matches the song

        const songData = category.songs[songIndex];
        if (songData) {
          currentSong = {
            title: songData.title,
            artist: songData.artist,
            notes: songData.notes || ""
          };
        }
      }
    }

    stateToShareRef.current = {
      // Force victory page if showVictory is triggered
      currentPage: showVictory ? 'victory' : currentPage,
      activeRoundId: activeId,
      players: gameState.players,
      activeResponder: activeResponder,
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
      language: gameState.language,
      currentSong: currentSong,
      showBuzzerPopup: showBuzzerPopup,
      buzzerPlayerName: buzzerPlayerName,
      buzzerPoints: buzzerPoints,
      isWarmup: isWarmup
    };

    // DEBUG: Log what we're about to emit
    if (currentSong) {
      console.log('📦 [App.tsx] Packing song data:', {
        title: currentSong.title,
        artist: currentSong.artist,
        notes: currentSong.notes ? currentSong.notes.substring(0, 50) + '...' : '(none)',
        timestamp: new Date().toISOString()
      });
    }
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
    r4SelectedPlayerId,
    activeResponder,
    showBuzzerPopup,
    buzzerPlayerName,
    buzzerPoints,
    isWarmup
  ]);


  // useEffect(() => {
  //   const syncInterval = setInterval(() => {
  //     // 🔴 REMOVED: 'isBuzzerConnected' from the if-statement
  //     // Now it only cares if the socket is physically connected to the server
  //     if (stateToShareRef.current && buzzerSocket?.connected) {

  //       // Optional: Add a log to see it working in your Laptop console
  //       console.log("Manual Syncing to Phone...");

  //       buzzerSocket.emit('updateGameState', stateToShareRef.current);
  //     }
  //   }, 500);

  //   return () => clearInterval(syncInterval);
  // }, [buzzerSocket]); // Removed isBuzzerConnected from dependency array
  //   useEffect(() => {
  //   const syncInterval = setInterval(() => {
  //     if (stateToShareRef.current) {
  //       // 1. Update the TV/Display window (Same device)
  //       try {
  //         localStorage.setItem('musicQuizPlayerState', JSON.stringify(stateToShareRef.current));
  //       } catch (e) {
  //         console.error("Local storage error", e);
  //       }

  //       // 2. Update the Phone/Leader display (Network device)
  //       // Note: I removed the "isBuzzerConnected" check so the phone works even 
  //       // if you haven't clicked 'Connect' on the buzzer yet.
  //       if (buzzerSocket?.connected) {
  //         buzzerSocket.emit('updateGameState', stateToShareRef.current);
  //       }
  //     }
  //   }, 500);

  //   return () => clearInterval(syncInterval);
  // }, [buzzerSocket]);

  // useEffect(() => {
  //   // Share game state with player screen and leader display
  //   const interval = setInterval(() => {
  //     if (stateToShareRef.current) {
  //       try {
  //         localStorage.setItem('musicQuizPlayerState', JSON.stringify(stateToShareRef.current));

  //         // Send song state to server via HTTP for network access
  //         if (stateToShareRef.current.currentSong) {
  //           fetch('/api/current-song', {
  //             method: 'POST',
  //             headers: { 'Content-Type': 'application/json' },
  //             body: JSON.stringify({
  //               currentSong: stateToShareRef.current.currentSong
  //             })
  //           }).catch(() => {
  //             // Silently fail if server endpoint not available
  //           });
  //         }
  //       } catch (error) {
  //         console.log('Error sharing state:', error);
  //       }
  //     }
  //   }, 300);
  //   return () => clearInterval(interval);
  // }, []);
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

    if (socketId && slotNumber) {
      setBuzzerMapping(prevMap => ({ ...prevMap, [socketId]: slotNumber }));
    }

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

        // setBuzzerMapping(prevMap => ({ ...prevMap, [socketId]: targetId }));
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

  const handleFinishRoundManual = () => {
    if (showBuzzerPopup) {
      setShowBuzzerPopup(false);
    }
    showModal(
      t.finishRound,
      t.confirmFinish,
      () => {
        stopSong(); // Stop any music playing
        playSFX(SFX.scoreboard); 
        setShowScoreboard(true); // Show the scores to everyone
        setModal(null); // Close the confirmation box
      },
      t.yes,
      t.no,
      'center'
    );
  };

  const resetGameAction = () => {
    downloadFinalLog();
    setGameState(prev => ({
      ...prev,
      players: prev.players.map(p => ({ ...p, score: 0, stars: 0 })),
      currentPlayerIndex: 0,
      currentRound: 0,
      activeRoundId: null,
      roundProgress: {}
    }));

    // if (buzzerSocket) {
    //   buzzerSocket.emit('updateGameState', {
    //     currentPage: 'setup',  // This forces Display back to start
    //     currentSong: null,     // Clears the "Ёлочка" info
    //     activeResponder: null, // Clears the "Buzzer" light
    //     players: []            // Optional: clears player list on display
    //   });
    // }
    if (buzzerSocket) {
      // 1. ADDED: Lock the physical buzzers (Hardware level)
      buzzerSocket.emit('gameAction', {
        type: 'SET_STATE',
        data: { state: 'LOCKED' }
      });

      // 2. KEPT: Your original display reset (Visual level)
      buzzerSocket.emit('updateGameState', {
        currentPage: 'setup',  // Keep: Forces Display back to start
        currentSong: null,     // Keep: Clears the song info
        activeResponder: null, // Keep: Clears the "Buzzer" light
        players: []            // Keep: Clears player list on display as requested
      });
    }


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

    const leavingWarmup = gameState.activeRoundId === 0;

    const action = () => {
      if (roundId !== null) {
        initializeRound(roundId);
      }

      if (buzzerSocket) {
        buzzerSocket.emit('gameAction', { type: 'SET_STATE', data: { state: 'IDLE' } });
      }

      stopSong();
      setCurrentPage(page);

      //Clean up points after round0
      setGameState(prev => {
        const leavingWarmup = prev.activeRoundId === 0;

        return {
          ...prev,
          activeRoundId: roundId,
          // If we are leaving the Warm-up (Round 0), reset scores to 0
          // Otherwise, keep the current scores (prev.players)
          players: leavingWarmup
            ? prev.players.map(p => ({ ...p, score: 0 }))
            : prev.players
        };
      });;

      // setGameState(prev => ({ ...prev, activeRoundId: roundId }));
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
    // When starting from Setup, include the Warm-up (Round 0) before normal rounds
    // setIncludeWarmupStart(true);
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

    // ROUND 0: Warm-up - structurally identical to Round 1 but practice (no points awarded)
    if (roundId === 0) {
      const pointMap0: { [categoryId: string]: number[] } = {};

      // 🟢 CHANGE: Use index 0 instead of 1 to target your new round0_default.ts
      const selectedSetId0 = gameState.roundSets[0] || 'default';
      const roundData0 = getRoundData(0, selectedSetId0) || [];

      roundData0.forEach((cat) => {
        // Shuffling points is fine, even for warmup!
        pointMap0[cat.id] = shuffle(INITIAL_POINTS);
      });

      setGameState(prev => ({
        ...prev,
        roundProgress: {
          ...prev.roundProgress,
          [0]: {
            usedNotes: new Set(),
            activatedCategories: new Set(),
            pointMap: pointMap0,
            activationCounts: {},
            persistentPoints: {},
            results: {}
          }
        },
        currentPlayerIndex: 0,
        activeRoundId: 0
      }));

      setIncludeWarmupStart(false);
      setCurrentPage('round');
      return;
    }
    // if (roundId === 0) {
    //   const pointMap0: { [categoryId: string]: number[] } = {};
    //   const selectedSetId0 = gameState.roundSets[1] || 'default';
    //   const roundData0 = getRoundData(1, selectedSetId0) || [];
    //   roundData0.forEach((cat) => {
    //     pointMap0[cat.id] = shuffle(INITIAL_POINTS);
    //   });

    //   setGameState(prev => ({
    //     ...prev,
    //     roundProgress: {
    //       ...prev.roundProgress,
    //       [0]: {
    //         usedNotes: new Set(),
    //         activatedCategories: new Set(),
    //         pointMap: pointMap0,
    //         activationCounts: {},
    //         persistentPoints: {},
    //         results: {}
    //       }
    //     },
    //     currentPlayerIndex: 0,
    //     activeRoundId: 0
    //   }));
    //   // Clear the warmup flag once initialized
    //   setIncludeWarmupStart(false);
    //   setCurrentPage('round');
    //   return;
    // }

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


    const roundId = gameState.activeRoundId!;
    const selectedSetId = gameState.roundSets[roundId] || 'default';
    const roundData = getRoundData(roundId, selectedSetId) || [];

    const category = roundData.find((c: any) => c.id === categoryId);
    if (!category) return;

    const progress = gameState.roundProgress[roundId];
    if (!progress) return;

    const isMelodyRound = roundId === 2;
    const isSprintRound = roundId === 4;
    const isFinalRound = roundId === 3;

    console.log("📌 handleNoteClick called with:", { categoryId, noteIndex, roundId });

    // --- Determine the actual song index for existence check ---
    let effectiveIndex = noteIndex; // default for non-melody rounds

    if (isMelodyRound) {
      if (noteIndex === 0) {
        // Points button: use the next unrevealed song (activation count)
        effectiveIndex = progress.activationCounts?.[categoryId] || 0;
      } else {
        // Reveal buttons: noteIndex maps to songIndex = noteIndex - 1
        effectiveIndex = noteIndex - 1;
      }
    }

    // Safety check: ensure the song exists
    if (!category.songs || !category.songs[effectiveIndex]) {
      console.warn(`Blocked a crash! Effective index ${effectiveIndex} doesn't exist in category ${categoryId}`);
      return;
    }



    // (Optional) log for debugging
    console.log(`Category: ${categoryId}, noteIndex: ${noteIndex}, effectiveIndex: ${effectiveIndex}`);
    if (isSprintRound) {
      const pId = gameState.players[gameState.currentPlayerIndex].id;
      const playerProg = progress.r4PlayerProgress?.[pId];

      if (playerProg?.hasFinished) {
        stopSong(false);
        setActiveNote({ categoryId: 'r4_sprint', noteIndex, isReveal: true });
        setR4CurrentSongIdx(noteIndex);
        playSFX(SFX.select);
        return;
      }

      const isCorrect = playerProg?.correctIndices.has(noteIndex);
      const row = Math.floor(noteIndex / 7);          // Determine which row
      const usedRowsSet = progress.usedRows || new Set();

      // If the row is already used, only allow correct songs (as reveals)
      if (usedRowsSet.has(row)) {
        if (isCorrect) {
          stopSong(false);                             // preserve timer at 0
          setActiveNote({ categoryId: 'r4_sprint', noteIndex, isReveal: true });
          setR4CurrentSongIdx(noteIndex);
          playSFX(SFX.select);
        }
        return;                                         // exit – do NOT start a new session
      }

      // Row is not used – start a new session (only if timer is not expired)
      if (!r4IsActiveSession && timeLeft !== 0) {
        setSelectedRow(row);
        setR4CurrentSongIdx(noteIndex);
        setR4IsActiveSession(true);
        setTimeLeft(timerDuration);
        stopBGM();
        playSFX(SFX.select);
      }

      // Select the note (whether new session just started or already active)
      if (selectedRow !== null || !r4IsActiveSession) {
        if (isPlaying) return;

        setR4CurrentSongIdx(noteIndex);
        if (isCorrect) {
          stopSong(false);                              // keep timer frozen for correct replay
          setActiveNote({ categoryId: 'r4_sprint', noteIndex, isReveal: true });
        } else {
          // For a new, not‑yet‑answered song, we want a normal start (timer active)
          // Here we do NOT stop the song – it will be started by onAudioControl later.
          setActiveNote({ categoryId: 'r4_sprint', noteIndex, isReveal: false });
        }
        playSFX(SFX.select);
      }
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

    // if (activeNote) return;

    if (activeNote && !isPlaying) {
      stopSong(true);                 // stop audio and clear timers
      setActiveNote(null);             // clear the previous selection
      // setCurrentRoundPoints(undefined);
      if (roundId !== 4) { setTimeLeft(undefined); }; // Clear timer for non-sprint rounds
      // Continue to the selection logic below (no return)
    } else if (activeNote) {
      // If playing, block changing the note
      return;
    }

    // showModal(t.round, t.confirmNote, () => {
    playSFX(SFX.select);
    stopBGM();
    setActiveNote({ categoryId, noteIndex });
    // setTimeLeft(60);
    setModal(null);
    if (roundId !== 4) { setTimeLeft(60); };
    if (roundId === 0 || roundId === 1) {
      setCurrentRoundPoints(progress.pointMap[categoryId][noteIndex]);
    } else if (isMelodyRound) {
      setCurrentRoundPoints(progress.persistentPoints?.[`${categoryId}-0`] || 20);
    }
    // }, undefined, undefined, 'inline');
  };

  // UPDATED handleAudioControl function
  const handleAudioControl = (action: 'start' | 'stop') => {
    if (!activeNote) return;

    if (showBuzzerPopup) {
      setShowBuzzerPopup(false);
    }

    const roundId = gameState.activeRoundId!;
    const progress = gameState.roundProgress[roundId];
    const selectedSetId = gameState.roundSets[roundId] || 'default';

    // let dataRoundId = roundId;
    // if (roundId === 3) dataRoundId = 6; // New Round 3 uses old Round 6 data

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



      // 🔍 ADD DEBUG LOGS HERE
      console.log("🔍 Round 3 debug:", {
        roundId,
        categoryId: activeNote.categoryId,
        categoryFound: !!category,
        songsLength: category?.songs?.length,
        songIndex,
        songExists: !!category?.songs?.[songIndex],
        songTitle: category?.songs?.[songIndex]?.title
      });


      if (!song) return;


      let isSongCorrect = false;
      if (isSprintRound) {
        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        const playerProg = progress.r4PlayerProgress?.[currentPlayer.id];
        isSongCorrect = playerProg?.correctIndices.has(songIndex) ?? false;
      }

      const isRevealMode = activeNote.isReveal ||
        (isSprintRound && (!r4IsActiveSession || isSongCorrect)) ||
        (isFinalRound && progress.currentTurnIndex !== songIndex);

      // const isRevealMode = activeNote.isReveal || (isSprintRound && !r4IsActiveSession) || (isFinalRound && progress.currentTurnIndex !== songIndex);
      const audioUrlToPlay = (isRevealMode || (isFinalRound && selectedDuration === null)) ? (song.audioUrlFull || song.audioUrl) : song.audioUrl;

      console.log("🔊 FULL VERSION CHECK:", {
        isFinalRound,
        selectedDuration,
        isNull: selectedDuration === null,
        condition: (isFinalRound && selectedDuration === null),
        usingFull: (isRevealMode || (isFinalRound && selectedDuration === null)),
        willPlay: (isRevealMode || (isFinalRound && selectedDuration === null)) ? "FULL" : "PREVIEW"
      });


      console.log("🔊 Audio debug:", {
        isRevealMode,
        activeNoteIsReveal: activeNote.isReveal,
        songTitle: song?.title,
        hasFullVersion: !!song?.audioUrlFull,
        playingFull: isRevealMode || (isFinalRound && selectedDuration === null)
      });

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
        // Inside handleAudioControl, around where the Round 4 interval is set
        else if (isSprintRound && r4IsActiveSession && !activeNote.isReveal) {
          countdownIntervalRef.current = window.setInterval(() => {
            setTimeLeft(prev => {
              if (prev === undefined) return prev;
              const playerProg = gameState.roundProgress[roundId]?.r4PlayerProgress?.[gameState.players[gameState.currentPlayerIndex].id];
              if (playerProg?.correctIndices.has(r4CurrentSongIdx)) {
                return prev; // freeze timer
              }
              if (prev > 0) return prev - 1;

              // Timer expired – handle end of session
              window.clearInterval(countdownIntervalRef.current!);
              countdownIntervalRef.current = null;
              stopSong(false);
              playSFX(SFX.wrong);

              // Mark row as used
              setGameState(prevState => {
                const progress = prevState.roundProgress[roundId];
                if (!progress) return prevState;
                const usedRows = new Set(progress.usedRows || []);
                if (selectedRow !== null) usedRows.add(selectedRow);
                return {
                  ...prevState,
                  roundProgress: {
                    ...prevState.roundProgress,
                    [roundId]: { ...progress, usedRows }
                  }
                };
              });

              setR4IsActiveSession(false);
              playSFX(SFX.scoreboard); 
              setShowScoreboard(true);
              return 0;
            });
          }, 1000);
        }
        // else if (isSprintRound && r4IsActiveSession) {
        //   countdownIntervalRef.current = window.setInterval(() => {
        //     setTimeLeft(prev => {
        //       if (prev === undefined) return prev;
        //       if (prev > 0) return prev - 1;

        //       window.clearInterval(countdownIntervalRef.current!);
        //       countdownIntervalRef.current = null;

        //       if (isSprintRound && r4IsActiveSession) {
        //         stopSong(false);
        //         playSFX(SFX.wrong); // Play wrong sound once when time is up
        //       }
        //       else handleAudioControl('stop');
        //       return 0;
        //     });
        //   }, 1000);
        // }
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
      console.log("🔄 STARTING: isBuzzerConnected is:", isBuzzerConnected);


      const initiateSequence = () => {
        setActiveResponder(null);

        // Determine song index (needed for reveal mode)
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

        // For Round 4, also check if the current song is already correct
        let isSongCorrect = false;
        if (isSprintRound) {
          const currentPlayer = gameState.players[gameState.currentPlayerIndex];
          const playerProg = progress.r4PlayerProgress?.[currentPlayer.id];
          isSongCorrect = playerProg?.correctIndices.has(songIndex) ?? false;
        }

        // Compute reveal mode – matches startPlayback exactly
        const isRevealMode = activeNote.isReveal ||
          (isSprintRound && (!r4IsActiveSession || isSongCorrect)) ||
          (isFinalRound && progress.currentTurnIndex !== songIndex);



        const roundsThatUseBuzzers = [0, 1, 2, 4];

        if (isBuzzerConnected && !isRevealMode && roundsThatUseBuzzers.includes(roundId)) {
          // Special handling for round 4 – skip generic arming (arming is done via onArmSprintPlayer)
          if (roundId === 4) {
            console.log("⏭️ Round 4: Skipping generic ARM – arming handled separately.");
            startPlayback();
            return;
          }

          // For other rounds, do the normal DISARM + ARM sequence
          console.log("🛠️ Sending DISARM (IDLE)");
          buzzerSocket.emit('gameAction', { type: 'SET_STATE', data: { state: 'IDLE' } });

          setTimeout(() => {
            console.log("🛠️ Sending ARM (BATTLE)");
            armBuzzers();
            startPlayback();
          }, 150);
        } else {
          // No buzzer arming – start playback directly
          startPlayback();
        }
      };

      if (isFinalRound && !isPlaying && !isR3Finalized && selectedDuration === null) {
        showModal(t.currentTurn, t.confirmPlayerActive, () => {
          setModal(null);
          initiateSequence(); // Sequence triggered here
        });
        return;
      }
      initiateSequence(); // Sequence triggered here
    } else {
      // Start of your 'stop' leg - Added DISARM here
      if (isBuzzerConnected) {
        buzzerSocket.emit('gameAction', { type: 'SET_STATE', data: { state: 'IDLE' } });
      }

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

  // Place this in App.tsx
  const handleArmSprintPlayer = () => {
    const currentSlot = gameState.players[gameState.currentPlayerIndex];
    console.log("DEBUG: Current Player Index:", gameState.currentPlayerIndex);
    console.log("DEBUG: Current Player Data:", currentSlot)

    if (buzzerSocket && currentSlot && currentSlot.hubId) {
      // 1. Tell the server to lock the hardware (the phone)
      console.log(`[ARMING] Sending Hardware ID to Server: ${currentSlot.hubId}`);
      buzzerSocket.emit('gameAction', {
        type: 'ARM_SPECIFIC',
        data: { playerId: currentSlot.hubId }
      });

      // 2. Optional: Sync your display to show WHO is sprinting
      buzzerSocket.emit('updateGameState', {
        currentPage: 'round-sprint',
        activeResponder: currentSlot.name, // Highlights them on the big screen
        isSprintActive: true
      });
    }
  };

  // UPDATED handleFinalizeTurn function
  const handleFinalizeTurn = (status: 'correct' | 'wrong' | 'skip', isTimeOut = false) => {
    const roundId = gameState.activeRoundId!;

    if (!activeNote || activeNote.isReveal) return;
    // const roundId = gameState.activeRoundId!;
    const progress = gameState.roundProgress[roundId];
    if (!progress) return;

    const isFinalRound = roundId === 3;
    const isSprintRound = roundId === 4;

    // =========================================================
    // ROUND 4: SPRINT LOGIC (Update state, don't return JSX)
    // =========================================================
    if (isSprintRound) {
      // Show confirmation modal
      const title = status === 'correct' ? t.correct : status === 'wrong' ? t.wrong : t.skip;
      const message = status === 'correct' ? t.confirmAssignPoints : t.confirmNoPoints;

      showModal(title, message, () => {
        // --- This runs after user confirms ---
        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        const playerId = currentPlayer.id;
        const playerProg = progress.r4PlayerProgress?.[playerId];
        if (!playerProg) return;

        const currentSongIdx = r4CurrentSongIdx;

        // Copy player progress (Set must be recreated)
        const newPlayerProg = {
          ...playerProg,
          correctIndices: new Set(playerProg.correctIndices),
          wrongIndex: playerProg.wrongIndex,
        };

        // Play sound
        playSFX(status === 'correct' ? SFX.correct : SFX.wrong);

        // Update based on status
        if (status === 'correct') {

          const currentCorrectCount = playerProg.correctIndices.size;
          const pointsForThis = (currentCorrectCount + 1) * 10; // next correct value
          newPlayerProg.correctIndices.add(currentSongIdx);


          // Award 10 points
          setGameState(prev => ({
            ...prev,
            players: prev.players.map(p =>
              //p.id === playerId ? { ...p, score: p.score + 10 } : p
              p.id === playerId ? { ...p, score: p.score + pointsForThis } : p
            )
          }));
        } else if (status === 'wrong') {
          newPlayerProg.wrongIndex = currentSongIdx;
        }
        // skip does nothing

        // Check for perfect round bonus
        if (newPlayerProg.correctIndices.size === 7) {
          newPlayerProg.hasFinished = true;
          setGameState(prev => ({
            ...prev,
            players: prev.players.map(p =>
              p.id === playerId ? { ...p, score: p.score + 300 } : p
            )
          }));
          playSFX(SFX.scoreboard); 
          setShowScoreboard(true); // <-- ADD THIS LINE
        }

        // Update round progress
        setGameState(prev => ({
          ...prev,
          roundProgress: {
            ...prev.roundProgress,
            [roundId]: {
              ...progress,
              r4PlayerProgress: {
                ...progress.r4PlayerProgress,
                [playerId]: newPlayerProg
              }
            }
          }
        }));

        // Clean up
        stopSong(true);
        setActiveNote(null);
        setCurrentRoundPoints(undefined);
        // setTimeLeft(undefined);
        setModal(null); // close confirmation modal
      }, status === 'correct' ? t.correct : t.noAssign, undefined, 'inline');

      return; // important: exit after showing modal
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
            console.log("⭐ Correct - New stars:", newPlayers.find(p => p.id === currentP.id)?.stars);
          } else if (status === 'wrong' && opponentId !== undefined) {
            newPlayers = newPlayers.map(p => p.id === opponentId ? { ...p, stars: (p.stars || 0) + 1 } : p);
            console.log("⭐ Wrong - Opponent stars:", newPlayers.find(p => p.id === opponentId)?.stars);
          }

          // Check for winner (3 stars)
          const updatedCurrentP = newPlayers.find(p => p.id === currentP.id);
          const updatedOpponentP = opponentId !== undefined ? newPlayers.find(p => p.id === opponentId) : undefined;

          if ((updatedCurrentP?.stars || 0) >= 3) winnerId = updatedCurrentP!.id;
          if ((updatedOpponentP?.stars || 0) >= 3) winnerId = updatedOpponentP!.id;

          // Mark the song as used
          const newUsedNotes = new Set(prev.roundProgress[3]?.usedNotes || []);
          newUsedNotes.add(`r3_final-${progress.currentTurnIndex}`);

          console.log("🏆 Winner check:", {
            currentStars: updatedCurrentP?.stars,
            opponentStars: updatedOpponentP?.stars,
            winnerId: winnerId
          });

          // 🟢 WINNER CHECK INSIDE SETGAMESTATE WITH setTimeout
          if (winnerId !== null) {
            setTimeout(() => {
              setVictoryContext({ roundId: 3, winnerId });
              console.log("🏆 Winner detected! ID:", winnerId);
              playSFX(SFX.scoreboard); 
              setShowScoreboard(true);
            }, 0);
          }

          return {
            ...prev,
            players: newPlayers,
            currentPlayerIndex: nextPlayerIndex,
            roundProgress: {
              ...prev.roundProgress,
              [3]: {
                ...prev.roundProgress[3],
                usedNotes: newUsedNotes
              }
            }
          };
        });

        console.log("🎯 Setting isR3Finalized to true");
        setIsR3Finalized(true);
        stopSong(true);
        setCurrentRoundPoints(undefined);
        setModal(null);
        playSFX(status === 'correct' ? SFX.correct : SFX.wrong);

      }, undefined, undefined, 'inline');
      return;
    }

    // =========================================================
    // ROUNDS 1 & 2: STANDARD LOGIC
    // =========================================================

    const buzzerIdx = gameState.players.findIndex(p => p.hubId === activeResponder);
    const targetPlayerIndex = (activeResponder && buzzerIdx !== -1)
      ? buzzerIdx
      : gameState.currentPlayerIndex;


    showModal(status === 'correct' ? t.correct : t.wrong, status === 'correct' ? t.confirmAssignPoints : t.confirmNoPoints, () => {
      // If this is the Warm-up (Round 0), do not award points regardless of correctness
      // const addedPoints = status === 'correct' ? ((roundId === 0) ? 0 : (currentRoundPoints || 0)) : 0;
      const addedPoints = status === 'correct' ? (currentRoundPoints || 0) : 0;
      if (status === 'correct') {
        playSFX(SFX.correct);
        saveScoreSnapshot(gameState.players, roundId);
      }
      else playSFX(SFX.wrong);

      setActiveResponder(null);//*** */
      setShowBuzzerPopup(false);

      setGameState(prev => {
        // const newPlayers = prev.players.map((p, idx) => idx === prev.currentPlayerIndex ? { ...p, score: p.score + addedPoints } : p);
        const newPlayers = prev.players.map((p, idx) => idx === targetPlayerIndex ? { ...p, score: p.score + addedPoints } : p);
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
          //uncomment for auto-switch next player in rounds 1 & 2
          // currentPlayerIndex: (prev.currentPlayerIndex + 1) % prev.players.length,
          currentPlayerIndex: targetPlayerIndex, roundProgress: {
            // roundProgress: {
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
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-6">
      <div className="bg-slate-900 rounded-2xl p-6 max-w-md w-full border-2 border-slate-700 shadow-lg">
        <h3 className="text-2xl font-black text-white mb-4 text-center uppercase tracking-tight">{t.timerSettings || "Timer Settings"}</h3>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">{t.timerDuration || "Timer Duration (seconds)"}</label>
            <div className="flex items-center gap-2">
              <button onClick={() => setTimerDuration(Math.max(10, timerDuration - 10))} className="w-12 h-12 rounded-lg bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-xl font-black hover:bg-slate-700">-</button>
              <div className="flex-1 bg-slate-800 border-2 border-slate-700 rounded-lg px-3 py-2 text-white text-2xl font-black text-center tabular-nums">
                {timerDuration}
              </div>
              <button onClick={() => setTimerDuration(Math.min(300, timerDuration + 10))} className="w-12 h-12 rounded-lg bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-xl font-black hover:bg-slate-700">+</button>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setShowTimerSettings(false)} className="flex-1 py-3 bg-slate-800 text-white font-black text-sm rounded-lg hover:bg-slate-700 uppercase tracking-widest">{t.cancel}</button>
          <button onClick={() => { setShowTimerSettings(false); resetTimer(); }} className="flex-1 py-3 bg-indigo-600 text-white font-black text-sm rounded-lg hover:bg-indigo-500 uppercase tracking-widest shadow-lg">{t.save || "Save"}</button>
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
      return (
        <RoundSprint
          gameState={gameState}
          isPlaying={isPlaying}
          timeLeft={timeLeft}
          audioProgress={audioProgress}
          modal={modal}
          t={t}
          r4IsActiveSession={r4IsActiveSession}
          selectedRow={selectedRow}
          r4CurrentSongIdx={r4CurrentSongIdx}
          playedButNotEvaluated={playedButNotEvaluated}
          showTimerSettings={showTimerSettings}
          timerDuration={timerDuration}
          activeNote={activeNote}
          onNavigate={navigateTo}
          onInitializeRound={initializeRound}
          onUpdatePlayer={handleUpdatePlayer}
          onShowModal={showModal}
          onSetModal={setModal}
          onSetCurrentPlayer={(idx) => {
            setGameState(prev => ({ ...prev, currentPlayerIndex: idx }));
          }}
          onAudioControl={handleAudioControl}
          onFinalizeTurn={handleFinalizeTurn}
          onSeek={handleSeek}
          formatTime={formatTime}
          onNoteClick={handleNoteClick}
          onSetR4IsActiveSession={setR4IsActiveSession}
          onSetSelectedRow={setSelectedRow}
          onSetTimeLeft={setTimeLeft}
          onSetShowTimerSettings={setShowTimerSettings}
          onSetPlayedButNotEvaluated={setPlayedButNotEvaluated}
          onSetTimerDuration={setTimerDuration}
          onResetTimer={() => setTimeLeft(timerDuration)}
          onStopSong={stopSong}
          onShowRoundSummary={() => setShowScoreboard(true)}
          onArmSprintPlayer={handleArmSprintPlayer}
          onFinishRound={handleFinishRoundManual} // 🟢 This connects your new button!
        />
      );
    }

    // if (isSprintRound) {
    //   const selectedSetId = gameState.roundSets[roundId] || 'default';
    //   const roundData = getRoundData(roundId, selectedSetId) || [];
    //   if (!roundData || roundData.length === 0) return null;
    //   const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    //   const pId = currentPlayer.id;
    //   let playerProg = progress.r4PlayerProgress?.[pId];

    //   // If playerProg doesn't exist, initialize it
    //   if (!playerProg && progress.r4PlayerProgress) {
    //     playerProg = {
    //       correctIndices: new Set(),
    //       wrongIndex: null,
    //       hasFinished: false,
    //       timeSpent: 0
    //     };
    //     setGameState(prev => ({
    //       ...prev,
    //       roundProgress: {
    //         ...prev.roundProgress,
    //         [4]: {
    //           ...prev.roundProgress[4],
    //           r4PlayerProgress: {
    //             ...prev.roundProgress[4].r4PlayerProgress,
    //             [pId]: playerProg
    //           }
    //         }
    //       }
    //     }));
    //   }

    //   if (!playerProg) return null;
    //   const usedRowsSet = progress.usedRows || new Set();
    //   return (
    //     <div className="min-h-screen bg-slate-950 p-6 pt-20">
    //       <div className="max-w-[1600px] mx-auto flex gap-8">
    //         <div className="flex-1 flex flex-col gap-8">
    //           <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-slate-800 text-center relative overflow-hidden shadow-2xl">
    //             <div className="flex items-center justify-between mb-6">
    //               <div className="flex items-center gap-4">
    //                 <div className="bg-indigo-600 text-white w-14 h-14 rounded-xl flex items-center justify-center text-3xl font-black shadow-lg shadow-indigo-900/30 ring-4 ring-indigo-500/20">4</div>
    //                 <div>
    //                   <h2 className="text-4xl font-black text-white tracking-tighter uppercase">SPRINT</h2>
    //                   <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-1">{t.round} 4</div>
    //                 </div>
    //               </div>
    //               <div className="flex gap-2">
    //                 <button
    //                   onClick={() => {
    //                     if (isPlaying) return;
    //                     stopSong();
    //                     initializeRound(4); // Go to Round 3 (final)
    //                     navigateTo('round', 3);
    //                   }}
    //                   className={`p-3 rounded-lg transition-all ${isPlaying
    //                     ? 'opacity-20 cursor-not-allowed bg-slate-800'
    //                     : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:scale-105 active:scale-95 shadow-lg'
    //                     }`}
    //                   disabled={isPlaying}
    //                 >
    //                   <ChevronLeft size={24} />
    //                 </button>

    //                 <button
    //                   className="p-3 bg-slate-800/20 text-slate-700 rounded-lg cursor-not-allowed transition-all"
    //                   disabled
    //                 >
    //                   <ChevronRight size={24} />
    //                 </button>
    //               </div>
    //             </div>

    //             {!r4IsActiveSession && (
    //               <div className="mb-6 flex justify-center">
    //                 <button onClick={() => setShowTimerSettings(true)} className="px-6 py-3 bg-slate-800 text-white rounded-2xl font-bold border-2 border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-2 shadow-md">
    //                   <Timer size={18} />
    //                   {t.timerSettings || "Timer Settings"}
    //                 </button>
    //               </div>
    //             )}

    //             {r4IsActiveSession && (
    //               <div className="mb-6 flex items-center justify-center gap-4"><div className="bg-slate-800/50 px-6 py-3 rounded-2xl border-2 border-slate-700"><div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{t.timeLeft || "Time Left"}</div><div className={`text-4xl font-black tabular-nums ${timeLeft && timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-indigo-400'}`}>{formatTime(timeLeft)}</div></div><button onClick={() => setShowTimerSettings(true)} className="px-6 py-3 bg-slate-800 text-white rounded-2xl font-bold border-2 border-slate-700">{t.settings || "Settings"}</button></div>
    //             )}
    //             <div className="mb-10">{[0].map(row => {
    //               const startIdx = row * 7; const isPlayerRow = selectedRow === row; const isRowUsed = usedRowsSet.has(row);
    //               return (<div key={row} className={`mb-5 p-5 rounded-2xl border-3 ${isPlayerRow && r4IsActiveSession ? 'bg-slate-800/50 border-slate-600' : isRowUsed ? 'opacity-50' : 'bg-slate-900/30'}`}><div className="text-sm font-black text-slate-400 mb-4 uppercase">Row {row + 1}</div><div className="grid grid-cols-7 gap-3">{Array.from({ length: 7 }, (_, i) => startIdx + i).map(songIdx => {
    //                 const isCorrect = playerProg?.correctIndices.has(songIdx); const isWrong = playerProg?.wrongIndex === songIdx; const isActive = r4CurrentSongIdx === songIdx; const isSelectable = !playerProg?.hasFinished && !isRowUsed && (!r4IsActiveSession || (isPlayerRow && r4IsActiveSession && !isCorrect));
    //                 return (<button key={songIdx} onClick={() => { if (isSelectable || playerProg?.hasFinished || isCorrect || isWrong) handleNoteClick('r4_sprint', songIdx); }} className={`h-16 rounded-lg border-2 transition-all flex flex-col items-center justify-center ${isActive && r4IsActiveSession ? 'bg-indigo-600 border-white scale-110 z-10' :
    //                   isCorrect ? 'bg-emerald-600 border-emerald-400' :
    //                     isWrong ? 'bg-rose-600 border-rose-400' :
    //                       playedButNotEvaluated.includes(songIdx) ? 'bg-yellow-600 border-yellow-400' :
    //                         isSelectable ? 'bg-slate-800 border-slate-600 hover:bg-slate-700' :
    //                           'bg-slate-900/50 opacity-60'
    //                   }`}>{isCorrect ? <CheckCircle size={18} /> : isWrong ? <XCircle size={18} /> : <MusicIcon size={18} />}</button>);
    //               })}</div></div>);
    //             })}</div>
    //             {!r4IsActiveSession && playerProg?.hasFinished && (<div className="flex flex-col items-center animate-in fade-in duration-700"><div className="text-2xl font-black text-indigo-400 mb-3 uppercase">{playerProg.correctIndices.size === 7 ? t.perfectRound || "Perfect Round!" : `${playerProg.correctIndices.size} Correct`}</div><button onClick={() => { setR4IsActiveSession(false); setSelectedRow(null); setActiveNote(null); setTimeLeft(undefined); setPlayedButNotEvaluated([]); }} className="py-4 px-12 rounded-2xl bg-indigo-600 text-white font-black text-xl uppercase">{t.continue || "Continue"}</button></div>)}
    //           </div>
    //           <div className="bg-slate-900/50 p-6 rounded-3xl border-2 border-slate-800"><PlayerBoard players={gameState.players} currentPlayerIndex={gameState.currentPlayerIndex} onUpdatePlayer={handleUpdatePlayer} onSetCurrentPlayer={(idx) => { if (r4IsActiveSession) return; showModal(t.playerName, t.confirmPlayerActive, () => { setGameState(prev => ({ ...prev, currentPlayerIndex: idx })); setR4IsActiveSession(false); setModal(null); }); }} t={t} /></div>
    //         </div>

    //         <div className="w-[380px] flex flex-col gap-6 relative">
    //           <div className="bg-slate-800 rounded-2xl p-6 border-2 border-slate-700 shadow-lg flex flex-col items-center gap-2">
    //             <div className="text-2xl font-black text-white text-center truncate w-full">{currentPlayer.name || `Player ${gameState.currentPlayerIndex + 1}`}
    //             </div>
    //             <div className="bg-indigo-900/40 px-10 py-4 rounded-3xl border-2 border-indigo-500/30 shadow-inner">
    //               <span className="text-4xl font-black text-indigo-400 tabular-nums">
    //                 {currentPlayer.score} <span className="text-xs uppercase opacity-60 ml-2 tracking-widest">PTS</span>
    //               </span>
    //             </div>
    //           </div>

    //           <div className="bg-slate-800 rounded-[3rem] p-8 border-2 border-slate-700 shadow-2xl">
    //             <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest text-center mb-6"> {t.round5Progress || "ROUND 4 PROGRESS"}</h3>

    //             <div className="bg-slate-900/60 rounded-2xl p-6 mb-4 border border-slate-700">
    //               <div className="flex justify-between items-center mb-2">
    //                 <span className="text-slate-400 text-sm font-bold">  {t.sessionPoints || "Session Points"} </span>
    //                 <span className="text-3xl font-black text-emerald-400">
    //                   {(() => {
    //                     const pId = currentPlayer.id;
    //                     const playerProg = progress.r4PlayerProgress?.[pId];
    //                     const correctCount = playerProg?.correctIndices?.size || 0;
    //                     const isCurrentSongCorrect = playerProg?.correctIndices?.has(r4CurrentSongIdx);
    //                     const currentBonus = correctCount === 7 ? 300 : 0;

    //                     let sessionPoints = correctCount * 10;

    //                     if (isCurrentSongCorrect && r4IsActiveSession) {
    //                       sessionPoints += 10;
    //                     }

    //                     if (correctCount === 7 || (correctCount === 6 && isCurrentSongCorrect)) {
    //                       sessionPoints += 300;
    //                     }

    //                     return sessionPoints;
    //                   })()}
    //                 </span>
    //               </div>
    //               <div className="text-xs text-slate-500 font-medium"> {t.tenPerCorrect || "+10 per correct song"}
    //               </div>
    //             </div>

    //             <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-700">
    //               <div className="flex justify-between items-center">
    //                 <div>
    //                   <span className="text-slate-400 text-sm font-bold block"> {t.perfectRoundBonus || "Perfect Round Bonus"}</span>
    //                   <span className="text-xs text-slate-500">{t.all7Correct || "All 7 songs correct"}</span>
    //                 </div>
    //                 <div className={`text-2xl font-black ${(() => {
    //                   const pId = currentPlayer.id;
    //                   const playerProg = progress.r4PlayerProgress?.[pId];
    //                   return (playerProg?.correctIndices?.size || 0) === 7 ? 'text-yellow-400' : 'text-slate-600';
    //                 })()}`}>
    //                   +300
    //                 </div>
    //               </div>
    //               <div className="mt-4 flex gap-1">
    //                 {Array.from({ length: 7 }).map((_, idx) => {
    //                   const pId = currentPlayer.id;
    //                   const playerProg = progress.r4PlayerProgress?.[pId];
    //                   const isCorrect = playerProg?.correctIndices?.has(selectedRow !== null ? selectedRow * 7 + idx : idx);
    //                   return (
    //                     <div
    //                       key={idx}
    //                       className={`flex-1 h-2 rounded-full ${isCorrect ? 'bg-emerald-500' : 'bg-slate-700'
    //                         }`}
    //                     />
    //                   );
    //                 })}
    //               </div>
    //             </div>
    //           </div>

    //           <ControlPanel
    //             isPlaying={isPlaying}
    //             onStart={() => handleAudioControl('start')}
    //             onStop={() => handleAudioControl('stop')}
    //             onCorrect={() => handleFinalizeTurn('correct')}
    //             onWrong={() => handleFinalizeTurn('wrong')}
    //             onSkip={() => handleFinalizeTurn('skip')}
    //             timeLeft={timeLeft}
    //             t={t}
    //             disabledActions={!r4IsActiveSession || timeLeft === 0}
    //             isStartDisabled={false}
    //           />

    //           <MusicTimeline />

    //           {modal?.isOpen && modal.position === 'inline' && (
    //             <ConfirmationModal
    //               isOpen={modal.isOpen}
    //               title={modal.title}
    //               message={modal.message}
    //               onConfirm={modal.onConfirm}
    //               onCancel={() => setModal(null)}
    //               confirmLabel={modal.confirmLabel}
    //               cancelLabel={modal.cancelLabel}
    //               position={modal.position}
    //             />
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }

    // Inside App.tsx -> RoundView function
    if (isFinalRound) {
      return (
        <RoundDuel
          gameState={gameState}
          isPlaying={isPlaying}
          timeLeft={timeLeft}
          audioProgress={audioProgress}
          modal={modal}
          t={t}
          selectedDuration={selectedDuration}
          isR3Finalized={isR3Finalized}
          // Pass all the functions
          onNavigate={navigateTo}
          onInitializeRound={initializeRound}
          onUpdatePlayer={handleUpdatePlayer}
          onShowModal={showModal}
          onSetModal={setModal}
          onSetCurrentPlayer={(idx) => {
            // Custom logic for duel selection
            const duelIds = gameState.roundProgress[3]?.activePlayerIds || [];
            if (duelIds.includes(gameState.players[idx].id)) {
              showModal(t.playerName, t.confirmPlayerActive, () => {
                setGameState(prev => ({ ...prev, currentPlayerIndex: idx }));
                setModal(null);
              });
            }
          }}
          onAudioControl={handleAudioControl}
          onFinalizeTurn={handleFinalizeTurn}
          onSeek={handleSeek}
          formatTime={formatTime}
          onSetSelectedDuration={setSelectedDuration}
          onPlaySFX={playSFX}
          onNextTurnNav={handleNextTurnNav}
          onStopSong={stopSong}
          onFinishRound={handleFinishRoundManual} // 🟢 
          onShowRoundSummary={() => setShowScoreboard(true)}
        />
      );
    }
    return (
      <RoundStandard
        activeResponder={activeResponder}
        gameState={gameState}
        players={gameState.players}
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
        onFinishRound={handleFinishRoundManual}
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


  // console.log("PARENT HUB STATE:", hubPlayers);
  // Final return statement

  return (
    <PasswordGuard>


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
            activeResponder={activeResponder}
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
            includeWarmup={includeWarmupStart}
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
              <div className="flex gap-6 mt-14">
                <button
                  onClick={() => setShowScoreboard(false)}
                  className="flex-1 py-8 bg-slate-800 text-white font-black text-2xl rounded-[2rem] uppercase shadow-xl hover:bg-slate-700"
                >
                  {t.cancel || "Cancel"}
                </button>
                <button
                  onClick={() => {
                    setShowScoreboard(false);
                    stopSong(); // Safety: stop music when leaving
                    navigateTo('start');
                  }}
                  className="flex-1 py-8 bg-indigo-600 text-white font-black text-2xl rounded-[2rem] uppercase shadow-2xl hover:bg-indigo-500"
                >
                  {t.continue || "Continue"}
                </button>
              </div>
              {/* {gameState.activeRoundId === 4 ? (
                <div className="flex gap-6 mt-14">
                  <button onClick={() => setShowScoreboard(false)} className="flex-1 py-8 bg-slate-800 text-white font-black text-2xl rounded-[2rem] uppercase shadow-xl hover:bg-slate-700">{t.cancel || "Cancel"}</button>
                  <button onClick={() => { setShowScoreboard(false); navigateTo('start'); }} className="flex-1 py-8 bg-indigo-600 text-white font-black text-2xl rounded-[2rem] uppercase shadow-2xl hover:bg-indigo-500">{t.continue || "Continue"}</button>
                </div>
              ) : (
                <button onClick={() => setShowScoreboard(false)} className="w-full mt-14 py-8 bg-indigo-600 text-white font-black text-2xl rounded-[2rem] uppercase shadow-2xl">{t.close}</button>
              )} */}
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
    </PasswordGuard>
  );
};

export default App;
