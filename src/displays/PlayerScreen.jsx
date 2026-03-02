import React, { useState, useEffect } from 'react';
import { Music, CheckCircle, XCircle, Trophy, Star } from 'lucide-react';
import { ROUND_DATA, getRoundData } from '../../data/index_data';
import { translations } from '../../translations';
// import { BuzzerPopupProps } from '../../types';

// const BuzzerPopup = ({ show, playerName, points, isWarmup, onClose }) => {

//   // DEBUG: Log popup props and render decisions
//   useEffect(() => {
//     console.log('👑 [BuzzerPopup] Props received:', {
//       show,
//       playerName,
//       points,
//       isWarmup,
//       timestamp: new Date().toISOString()
//     });

//     if (show) {
//       console.log('✅ [BuzzerPopup] RENDERING POPUP');
//     } else {
//       console.log('❌ [BuzzerPopup] NOT rendering - show is false or undefined');
//     }
//   }, [show, playerName, points, isWarmup]);

//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
//       <div className="relative max-w-2xl w-full mx-4">
//         {/* Golden glow */}
//         <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-3xl blur-2xl opacity-90 animate-pulse"></div>

//         {/* Main window */}
//         <div className="relative bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-8 border-4 border-yellow-300 shadow-2xl">
//           <div className="text-center">
//             <div className="text-7xl mb-4">👑</div>
//             {/* <h2 className="text-5xl font-black text-amber-900 mb-6">BUZZER PRESSED!</h2> */}
//             <h2 className="text-5xl font-black text-amber-900 mb-6">{t.buzzerPressed}</h2>

//             <div className="bg-amber-900/20 rounded-2xl p-6 mb-4">
//               <div className="text-2xl text-amber-900 mb-2">Player</div>
//               <div className="text-6xl font-black text-white mb-4">{playerName}</div>

//               <div className="text-2xl text-amber-900 mb-2">Points to Gain</div>
//               <div className="text-7xl font-black text-white">{points} PTS</div>

//               {isWarmup && (
//                 <div className="mt-4 text-xl bg-amber-200 text-amber-800 py-2 px-4 rounded-full">
//                   ⚡ WARM-UP - PRACTICE ⚡
//                 </div>
//               )}
//             </div>

//             <div className="text-lg text-amber-800">
//               Waiting for host...
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const PlayerScreen = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    const syncState = () => {
      const stored = localStorage.getItem('musicQuizPlayerState');
      if (stored) {
        try {
          const parsedState = JSON.parse(stored);
          setState(parsedState);

          // DEBUG: Log if popup state is being received
          if (parsedState.showBuzzerPopup) {
            console.log('📥 [PlayerScreen] Received buzzer popup state:', {
              show: parsedState.showBuzzerPopup,
              playerName: parsedState.buzzerPlayerName,
              points: parsedState.buzzerPoints,
              isWarmup: parsedState.isWarmup,
              timestamp: new Date().toISOString()
            });
          }
        } catch (e) {
          console.error("Failed to parse game state", e);
        }
      }
    };

    syncState();
    const interval = setInterval(syncState, 300);
    return () => clearInterval(interval);
  }, []);


  const BuzzerPopup = ({ show, playerName, points, isWarmup, onClose }) => {

    // DEBUG: Log popup props and render decisions
    useEffect(() => {
      console.log('👑 [BuzzerPopup] Props received:', {
        show,
        playerName,
        points,
        isWarmup,
        timestamp: new Date().toISOString()
      });

      if (show) {
        console.log('✅ [BuzzerPopup] RENDERING POPUP');
      } else {
        console.log('❌ [BuzzerPopup] NOT rendering - show is false or undefined');
      }
    }, [show, playerName, points, isWarmup]);

    if (!show) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="relative max-w-2xl w-full mx-4">
          {/* Golden glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-3xl blur-2xl opacity-90 animate-pulse"></div>

          {/* Main window */}
          <div className="relative bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-8 border-4 border-yellow-300 shadow-2xl">
            <div className="text-center">
              <div className="text-7xl mb-4">👑</div>
              {/* <h2 className="text-5xl font-black text-amber-900 mb-6">BUZZER PRESSED!</h2> */}
              <h2 className="text-5xl font-black text-amber-900 mb-6">{t.buzzerPressed || "BUZZER PRESSED!"}</h2>

              <div className="bg-amber-900/20 rounded-2xl p-6 mb-4">
                <div className="text-2xl text-amber-900 mb-2">{t.playerName || "Player"}</div>
                <div className="text-6xl font-black text-white mb-4">{playerName}</div>

                <div className="text-2xl text-amber-900 mb-2">{t.pointsToGain || "Points to Gain"} </div>
                <div className="text-7xl font-black text-white">{points} {t.points || "PTS"} </div>

                {/* {isWarmup && (
                  <div className="mt-4 text-xl bg-amber-200 text-amber-800 py-2 px-4 rounded-full">
                    {isWarmup ? (language === 'en' ? "Settings" : "Настройка") : `${t.round} ${roundId}`}
                  </div>
                )
                } */}
              </div>

              <div className="text-lg text-amber-800">
                {t.waitingForAnswer || "Waiting for answer..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!state) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-500 text-2xl font-bold animate-pulse">Waiting for game data...</div>
      </div>
    );
  }

  const {
    currentPage,
    activeRoundId,
    roundProgress,
    roundSets,
    players,
    language,
    currentRoundPoints,
    activeNote,
    isPlaying,
    showVictory,
    victoryContext,
    showScoreboard,
    r3Selection,
    r4SelectedPlayerId
  } = state;

  const t = translations[language] || translations['en'];

  // --- Render Helpers ---

  const renderScoreboard = () => {
    const sortedPlayers = [...players].sort((a, b) => {
      const starsA = a.stars || 0;
      const starsB = b.stars || 0;
      if (starsB !== starsA) return starsB - starsA;
      return b.score - a.score;
    });

    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-10 animate-in fade-in duration-500">
        <div className="bg-slate-900 rounded-[4rem] p-16 max-w-5xl w-full border-2 border-slate-800 shadow-2xl max-h-[90vh] flex flex-col">
          <h3 className="text-6xl font-black text-white mb-10 flex items-center gap-6 tracking-tighter uppercase shrink-0">
            <Trophy className="text-yellow-500" size={64} /> {t.scorePanel || "Scoreboard"}
          </h3>
          <div className="space-y-6 overflow-y-auto pr-4">
            {sortedPlayers.map((p, idx) => (
              <div key={p.id} className="flex items-center justify-between p-8 bg-slate-800/60 rounded-[2.5rem] border-2 border-slate-700/50 shadow-xl shrink-0">
                <div className="flex items-center gap-8">
                  <span className="text-slate-600 font-black text-4xl w-16">{idx + 1}.</span>
                  <div>
                    <div className="text-white font-black text-4xl">{p.name || `Player ${p.id + 1}`}</div>
                    <div className="text-yellow-500 text-lg font-black uppercase flex items-center gap-3 mt-2">
                      <Star size={24} fill="currentColor" /> {p.stars || 0} {t.stars || "STARS"}
                    </div>
                  </div>
                </div>
                <span className="text-6xl font-black text-indigo-400 tabular-nums">
                  {p.score} <span className="text-xl opacity-40 uppercase ml-2">pts</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderVictory = () => {
    // If it's a Round 3 duel victory
    if (victoryContext?.roundId === 3) {
      const winner = players.find((p) => p.id === victoryContext.winnerId);
      const duelPlayerIds = roundProgress[3]?.activePlayerIds || [];
      const loser = players.find(p => duelPlayerIds.includes(p.id) && p.id !== victoryContext.winnerId);

      if (!winner) return null;
      return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950 p-8 text-center animate-in zoom-in duration-1000 overflow-y-auto">
          <div className="max-w-[900px] w-full">
            <Trophy size={120} className="text-yellow-500 mx-auto mb-10 animate-bounce" />
            <h1 className="text-[6rem] font-black text-white mb-4 uppercase tracking-tighter leading-none">
              {t.duelVictory || "DUEL VICTORY!"}
            </h1>
            <div className="bg-slate-900 p-12 rounded-[4rem] border-4 border-yellow-500/40 mb-8 shadow-[0_40px_80px_rgba(234,179,8,0.3)]">
              <div className="text-sm font-black text-yellow-500 uppercase tracking-[0.4em] mb-4">
                {t.duelChampion || "DUEL CHAMPION"}
              </div>
              <div className="text-[5rem] font-black text-white mb-6 tracking-tighter leading-none">
                {winner.name || `Player ${winner.id + 1}`}
              </div>
              <div className="flex justify-center gap-16">
                <div className="text-center">
                  <div className="text-yellow-500/80 text-xs font-black uppercase tracking-[0.2em] mb-3">{t.stars || "STARS"}</div>
                  <div className="text-6xl font-black text-yellow-500 tabular-nums tracking-tighter">{winner.stars || 0}</div>
                </div>
                <div className="w-1 h-24 bg-slate-800 rounded-full" />
                <div className="text-center">
                  <div className="text-yellow-500/80 text-xs font-black uppercase tracking-[0.2em] mb-3">{t.totalPoints || "TOTAL POINTS"}</div>
                  <div className="text-6xl font-black text-yellow-500 tabular-nums tracking-tighter">{winner.score}</div>
                </div>
              </div>
            </div>

            {loser && (
              <div className="bg-slate-900/60 p-8 rounded-[3rem] border-2 border-slate-700/40 shadow-xl">
                <div className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] mb-4">
                  {t.runnerUp || "Runner Up"}
                </div>
                <div className="text-[3rem] font-black text-slate-300 mb-6 tracking-tight">
                  {loser.name || `Player ${loser.id + 1}`}
                </div>
                <div className="flex justify-center gap-12">
                  <div className="text-center">
                    <div className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-2">{t.stars || "STARS"}</div>
                    <div className="text-4xl font-black text-yellow-500/80 tabular-nums">{loser.stars || 0}</div>
                  </div>
                  <div className="w-1 h-16 bg-slate-800/50 rounded-full" />
                  <div className="text-center">
                    <div className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-2">{t.points || "POINTS"}</div>
                    <div className="text-4xl font-black text-indigo-400/80 tabular-nums">{loser.score}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Standard Game Victory
    const sortedPlayers = [...players].sort((a, b) => {
      const starsA = a.stars || 0;
      const starsB = b.stars || 0;
      if (starsB !== starsA) return starsB - starsA;
      return (b.score || 0) - (a.score || 0);
    });
    const winner = sortedPlayers[0];
    const secondPlace = sortedPlayers[1];
    const thirdPlace = sortedPlayers[2];
    const otherPlayers = sortedPlayers.slice(3);

    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950 p-8 text-center animate-in zoom-in duration-1000 overflow-y-auto">
        <div className="max-w-[900px] w-full py-12">
          <Trophy size={120} className="text-indigo-500 mx-auto mb-10 animate-bounce" />
          <h1 className="text-[6rem] font-black text-white mb-4 uppercase tracking-tighter leading-none">
            {t.victory || "VICTORY!"}
          </h1>
          <div className="bg-slate-900 p-12 rounded-[4rem] border-4 border-indigo-500/40 mb-8 shadow-[0_40px_80px_rgba(79,70,229,0.3)]">
            <div className="text-sm font-black text-indigo-500 uppercase tracking-[0.4em] mb-4">
              {t.winner || "WINNER"}
            </div>
            <div className="text-[5rem] font-black text-white mb-6 tracking-tighter leading-none">
              {winner.name || `Player ${winner.id + 1}`}
            </div>
            <div className="flex justify-center gap-16">
              <div className="text-center">
                <div className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-3">{t.stars || "STARS"}</div>
                <div className="text-6xl font-black text-yellow-500 tabular-nums tracking-tighter">{winner.stars || 0}</div>
              </div>
              <div className="w-1 h-24 bg-slate-800 rounded-full" />
              <div className="text-center">
                <div className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-3">{t.points || "POINTS"}</div>
                <div className="text-6xl font-black text-indigo-400 tabular-nums tracking-tighter">{winner.score}</div>
              </div>
            </div>
          </div>

          {secondPlace && (
            <div className="bg-slate-900/60 p-8 rounded-[3rem] border-2 border-slate-700/40 mb-6 shadow-xl">
              <div className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] mb-4">{t.secondPlace || "Second Place"}</div>
              <div className="text-[3rem] font-black text-slate-300 mb-6 tracking-tight">{secondPlace.name || `Player ${secondPlace.id + 1}`}</div>
              <div className="flex justify-center gap-12">
                <div className="text-center">
                  <div className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-2">{t.stars || "STARS"}</div>
                  <div className="text-4xl font-black text-yellow-500/80 tabular-nums">{secondPlace.stars || 0}</div>
                </div>
                <div className="w-1 h-16 bg-slate-800/50 rounded-full" />
                <div className="text-center">
                  <div className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-2">{t.points || "POINTS"}</div>
                  <div className="text-4xl font-black text-indigo-400/80 tabular-nums">{secondPlace.score}</div>
                </div>
              </div>
            </div>
          )}

          {thirdPlace && (
            <div className="bg-slate-900/40 p-8 rounded-[3rem] border-2 border-slate-700/30 mb-8 shadow-lg">
              <div className="text-sm font-black text-slate-500 uppercase tracking-[0.4em] mb-4">{t.thirdPlace || "Third Place"}</div>
              <div className="text-[2.5rem] font-black text-slate-400 mb-6 tracking-tight">{thirdPlace.name || `Player ${thirdPlace.id + 1}`}</div>
              <div className="flex justify-center gap-10">
                <div className="text-center">
                  <div className="text-slate-600 text-xs font-black uppercase tracking-[0.2em] mb-2">{t.stars || "STARS"}</div>
                  <div className="text-3xl font-black text-yellow-500/60 tabular-nums">{thirdPlace.stars || 0}</div>
                </div>
                <div className="w-1 h-12 bg-slate-800/40 rounded-full" />
                <div className="text-center">
                  <div className="text-slate-600 text-xs font-black uppercase tracking-[0.2em] mb-2">{t.points || "POINTS"}</div>
                  <div className="text-3xl font-black text-indigo-400/60 tabular-nums">{thirdPlace.score}</div>
                </div>
              </div>
            </div>
          )}

          {otherPlayers.length > 0 && (
            <div className="space-y-4">
              {otherPlayers.map((player, idx) => (
                <div key={player.id} className="bg-slate-900/20 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <span className="text-slate-600 font-bold text-lg w-8">{idx + 4}.</span>
                    <span className="text-slate-400 font-bold text-xl">{player.name || `Player ${player.id + 1}`}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-yellow-500/50 font-bold text-lg flex items-center gap-1">
                      <Star size={14} /> {player.stars || 0}
                    </span>
                    <span className="text-indigo-400/50 font-bold text-lg">{player.score} pts</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };


  const renderPlayersFooter = () => {
    // 1. Check if a buzzer is currently active in the synchronized state
    const buzzerIdx = players.findIndex(p => p.hubId === state.activeResponder);
    const hasBuzzer = state.activeResponder && buzzerIdx !== -1;

    // 2. The visual focus goes to the buzzer winner, otherwise the turn player
    const visualActiveIndex = hasBuzzer ? buzzerIdx : state.currentPlayerIndex;

    return (
      <div className="mt-8 pb-8 w-full max-w-[1800px] mx-auto">
        <div className="flex justify-center gap-6">
          {players.map((p, idx) => {
            const isHighlighted = idx === visualActiveIndex;
            const isWinner = hasBuzzer && idx === buzzerIdx;

            return (
              <div
                key={p.id}
                className={`
                  relative flex-1 bg-slate-900/90 backdrop-blur-md px-6 py-4 rounded-[2rem] border-2 flex items-center justify-between shadow-xl transition-all duration-500
                  ${isHighlighted
                    ? isWinner
                      ? 'border-yellow-500 shadow-[0_0_40px_rgba(234,179,8,0.5)] scale-110 z-20 bg-slate-800' // BUZZER STATE
                      : 'border-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.4)] scale-105 z-10 bg-slate-800' // MANUAL STATE
                    : 'border-slate-800 opacity-60 scale-95'
                  }
                `}
              >
                {isHighlighted && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg ${isWinner ? 'bg-yellow-600' : 'bg-indigo-600'}`}>
                    {isWinner ? (t.buzzer || "BUZZER!") : (t.currentTurn || "Current Turn")}
                  </div>
                )}
                <div className="flex flex-col">
                  <div className={`text-xl font-black truncate max-w-[180px] ${isHighlighted ? 'text-white' : 'text-slate-400'}`}>
                    {p.name || `Player ${p.id + 1}`}
                  </div>
                  <div className="flex gap-1 mt-1">
                    {[...Array(3)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${i < (p.stars || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-slate-700 fill-slate-700'}`}
                      />
                    ))}
                  </div>
                </div>
                <div className={`text-4xl font-black tabular-nums ${isHighlighted ? (isWinner ? 'text-yellow-400' : 'text-indigo-400') : 'text-slate-500'}`}>
                  {p.score}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // const renderPlayersFooter = () => {
  //   return (
  //     <div className="mt-8 pb-8 w-full max-w-[1800px] mx-auto">
  //       <div className="flex justify-center gap-6">
  //         {players.map((p, idx) => {
  //           const isCurrent = idx === state.currentPlayerIndex;
  //           return (
  //             <div 
  //               key={p.id} 
  //               className={`
  //                 relative flex-1 bg-slate-900/90 backdrop-blur-md px-6 py-4 rounded-[2rem] border-2 flex items-center justify-between shadow-xl transition-all duration-500
  //                 ${isCurrent ? 'border-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.4)] scale-105 z-10 bg-slate-800' : 'border-slate-800 opacity-80'}
  //               `}
  //             >
  //               {isCurrent && (
  //                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
  //                   Current Turn
  //                 </div>
  //               )}
  //               <div className="flex flex-col">
  //                 <div className={`text-xl font-black truncate max-w-[180px] ${isCurrent ? 'text-white' : 'text-slate-400'}`}>
  //                   {p.name || `Player ${p.id + 1}`}
  //                 </div>
  //                 <div className="flex gap-1 mt-1">
  //                   {[...Array(3)].map((_, i) => (
  //                     <Star 
  //                       key={i} 
  //                       size={16} 
  //                       className={`${i < (p.stars || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-slate-700 fill-slate-700'}`} 
  //                     />
  //                   ))}
  //                 </div>
  //               </div>
  //               <div className={`text-4xl font-black tabular-nums ${isCurrent ? 'text-indigo-400' : 'text-slate-500'}`}>
  //                 {p.score}
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // };

  const renderRound3 = () => {
    const progress = roundProgress[3] || { activePlayerIds: [], currentTurnIndex: 0, usedNotes: [] };
    const selectedSetId = roundSets[3] || 'default';
    const roundData = getRoundData(3, selectedSetId) || [];
    const turnIdx = progress.currentTurnIndex || 0;
    const song = roundData[0]?.songs[turnIdx];

    const duelIds = progress.activePlayerIds || [];
    const leftPlayer = players.find(p => p.id === duelIds[0]);
    const rightPlayer = players.find(p => p.id === duelIds[1]);

    if (!leftPlayer || !rightPlayer) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="text-slate-500 text-2xl font-bold animate-pulse">Waiting for duel players...</div>
        </div>
      );
    }

    const isFinalized = state.isR3Finalized;

    return (
      <div className="min-h-screen bg-slate-950 p-8 flex flex-col justify-center">
        {renderHeader(3, t.categories.superGame || "SUPER GAME")}
        <div className="max-w-[1800px] mx-auto w-full flex gap-12">
          {/* Left Player */}
          <div className={`flex-1 p-12 rounded-[4rem] border-4 transition-all duration-500 ${state.currentPlayerIndex === players.indexOf(leftPlayer) ? 'bg-indigo-900/50 border-indigo-500 shadow-2xl shadow-indigo-900/30' : 'bg-slate-900 border-slate-800'}`}>
            <h3 className="text-6xl font-black text-white text-center mb-8 truncate drop-shadow-lg">{leftPlayer.name || `Player ${leftPlayer.id + 1}`}</h3>
            <div className="flex justify-center gap-4 mb-8">
              {[1, 2, 3].map(s => <Star key={s} size={64} className={s <= (leftPlayer.stars || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-700'} />)}
            </div>
            <div className="text-center text-7xl font-black text-indigo-400 tabular-nums">{leftPlayer.score}</div>
          </div>

          {/* Center Info */}
          <div className="flex-[2] flex flex-col items-center justify-center bg-slate-900/50 rounded-[4rem] p-12 border-2 border-slate-800">
            <div className="text-2xl font-black text-slate-400 uppercase tracking-[0.3em] mb-6">
              {t.turn || "TURN"} {turnIdx + 1} / 5
            </div>
            <div className="text-center bg-slate-800/70 rounded-3xl p-8 border-2 border-slate-700 mb-8 w-full">
              <p className="text-4xl font-bold text-white italic">"{language === 'en' ? song?.hint?.en : song?.hint?.ru}"</p>
            </div>
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4, 5].map(s => (
                <div key={s} className={`w-20 h-20 rounded-2xl border-4 flex items-center justify-center transition-all ${state.selectedDuration === s ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                  <span className="text-4xl font-black">{s}</span>
                </div>
              ))}
              <div className={`w-32 h-20 rounded-2xl border-4 flex items-center justify-center transition-all ${state.selectedDuration === null && isPlaying ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                <span className="text-2xl font-black uppercase">{t.full || 'FULL'}</span>
              </div>
            </div>
            {isFinalized && (
              <div className="mt-8 text-2xl font-black text-emerald-400 uppercase animate-pulse tracking-widest">
                {t.nextTurn || "Next Turn Pending..."}
              </div>
            )}
          </div>

          {/* Right Player */}
          <div className={`flex-1 p-12 rounded-[4rem] border-4 transition-all duration-500 ${state.currentPlayerIndex === players.indexOf(rightPlayer) ? 'bg-rose-900/50 border-rose-500 shadow-2xl shadow-rose-900/30' : 'bg-slate-900 border-slate-800'}`}>
            <h3 className="text-6xl font-black text-white text-center mb-8 truncate drop-shadow-lg">{rightPlayer.name || `Player ${rightPlayer.id + 1}`}</h3>
            <div className="flex justify-center gap-4 mb-8">
              {[1, 2, 3].map(s => <Star key={s} size={64} className={s <= (rightPlayer.stars || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-700'} />)}
            </div>
            <div className="text-center text-7xl font-black text-rose-400 tabular-nums">{rightPlayer.score}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderRound4 = () => {
    const progress = roundProgress[4] || { usedRows: [], r4PlayerProgress: {} };
    const selectedSetId = roundSets[4] || 'default';
    const roundData = getRoundData(4, selectedSetId) || [];
    const songs = roundData[0]?.songs || [];

    const currentPlayer = players[state.currentPlayerIndex];
    if (!currentPlayer) return null;

    const playerProg = progress.r4PlayerProgress?.[currentPlayer.id] || { correctIndices: [], hasFinished: false };
    const correctIndices = new Set(playerProg.correctIndices);

    const formatTime = (seconds) => {
      if (seconds === undefined) return "0:00";
      const m = Math.floor(Math.abs(seconds) / 60);
      const s = Math.floor(Math.abs(seconds) % 60);
      return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
      <div className="min-h-screen bg-slate-950 p-8 flex flex-col justify-center">
        {renderHeader(4, "SPRINT")}
        <div className="max-w-[1800px] mx-auto w-full flex gap-8">
          {/* Main Grid */}
          <div className="flex-[3] bg-slate-900/50 border-2 border-slate-800 rounded-[3rem] p-8">
            {state.r4IsActiveSession ? (
              <div className="flex flex-col h-full">
                <div className="text-center mb-6">
                  <div className="text-lg font-black text-slate-400 uppercase tracking-widest">Time Left</div>
                  <div className={`text-8xl font-black tabular-nums ${state.timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-indigo-400'}`}>
                    {formatTime(state.timeLeft)}
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-7 gap-4">
                  {songs.slice(state.selectedRow * 7, state.selectedRow * 7 + 7).map((song, i) => {
                    const songIdx = state.selectedRow * 7 + i;
                    const isCorrect = correctIndices.has(songIdx);
                    const isWrong = playerProg.wrongIndex === songIdx;
                    const isActive = state.activeNote?.noteIndex === songIdx;
                    const isPlayed = state.playedButNotEvaluated?.includes(songIdx);

                    let bg = 'bg-slate-800';
                    let border = 'border-slate-700';
                    let iconColor = 'text-slate-600';
                    let scale = '';

                    if (isActive) {
                      bg = 'bg-indigo-600';
                      border = 'border-white';
                      iconColor = 'text-white animate-pulse';
                      scale = 'scale-110 z-10';
                    } else if (isCorrect) {
                      bg = 'bg-emerald-600';
                      border = 'border-emerald-400';
                      iconColor = 'text-white';
                    } else if (isWrong) {
                      bg = 'bg-rose-600';
                      border = 'border-rose-400';
                      iconColor = 'text-white';
                    } else if (isPlayed) {
                      bg = 'bg-yellow-600';
                      border = 'border-yellow-400';
                      iconColor = 'text-white';
                    }

                    return (
                      <div key={songIdx} className={`rounded-3xl border-4 flex items-center justify-center transition-all ${bg} ${border} ${scale}`}>
                        {isCorrect ? <CheckCircle size={48} className={iconColor} /> : isWrong ? <XCircle size={48} className={iconColor} /> : <Music size={48} className={iconColor} />}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {Array.from({ length: Math.ceil(songs.length / 7) }).map((_, rowIdx) => {
                  const isUsed = progress.usedRows?.includes(rowIdx);
                  const isSelected = state.selectedRow === rowIdx;
                  return (
                    <div key={rowIdx} className={`p-4 rounded-2xl border-2 transition-all ${isUsed ? 'bg-slate-800/30 border-slate-700/30 opacity-50' : isSelected ? 'bg-indigo-600/20 border-indigo-500' : 'bg-slate-800 border-slate-700'}`}>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 grid grid-cols-7 gap-3">
                          {Array.from({ length: 7 }).map((_, i) => (
                            <div key={i} className={`h-12 rounded-lg flex items-center justify-center ${isUsed ? 'bg-slate-700/50' : 'bg-slate-900'}`}>
                              <Music size={24} className="text-slate-600" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Player Info */}
          <div className="flex-1 bg-slate-900/50 border-2 border-slate-800 rounded-[3rem] p-8 flex flex-col items-center justify-center text-center">
            <h3 className="text-5xl font-black text-white mb-6 truncate w-full drop-shadow-md">{currentPlayer.name || `Player ${currentPlayer.id + 1}`}</h3>
            <div className="text-7xl font-black text-indigo-400 tabular-nums mb-8">{currentPlayer.score}</div>
            <div className="w-full bg-slate-800 rounded-2xl p-6 border-2 border-slate-700">
              <div className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Sprint Progress</div>
              <div className="text-5xl font-black text-emerald-400">
                {correctIndices.size} / 7
              </div>
              <div className="flex gap-1 mt-4">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className={`h-2 flex-1 rounded-full ${i < correctIndices.size ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderR3Select = () => {
    const selectedIds = r3Selection || [];

    return (
      <div className="min-h-screen bg-slate-950 p-8 flex flex-col justify-center items-center">
        {renderHeader(3, t.categories.superGame || "SUPER GAME")}
        <div className="w-full max-w-[1400px]">
          <h3 className="text-4xl text-slate-400 font-bold text-center mb-12 uppercase tracking-widest">{t.selectTeams || "SELECT PLAYERS"}</h3>
          <div className="flex justify-center gap-12">
            {[0, 1].map(idx => {
              const playerId = selectedIds[idx];
              const player = playerId !== undefined ? players.find(p => p.id === playerId) : null;

              return (
                <div key={idx} className={`w-96 h-96 rounded-[3rem] border-4 flex flex-col items-center justify-center p-8 transition-all duration-500 ${player ? 'bg-indigo-900/40 border-indigo-500 shadow-[0_0_60px_rgba(99,102,241,0.3)]' : 'bg-slate-900/50 border-slate-800 border-dashed'}`}>
                  {player ? (
                    <>
                      <div className="text-5xl font-black text-white mb-6 text-center leading-tight">{player.name || `Player ${player.id + 1}`}</div>
                      <div className="flex gap-2">
                        {[...Array(player.stars || 0)].map((_, i) => <Star key={i} size={32} className="text-yellow-500 fill-yellow-500" />)}
                      </div>
                      <div className="mt-6 text-3xl font-bold text-indigo-400">{player.score} pts</div>
                    </>
                  ) : (
                    <div className="text-slate-700 font-black text-3xl uppercase tracking-widest">
                      {idx === 0 ? "Player 1" : "Player 2"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderR4Select = () => {
    return (
      <div className="min-h-screen bg-slate-950 p-8 flex flex-col justify-center items-center">
        {renderHeader(4, "SPRINT")}
        <div className="w-full max-w-[1400px]">
          <h3 className="text-4xl text-slate-400 font-bold text-center mb-12 uppercase tracking-widest">{t.playerName || "SELECT PLAYER"}</h3>
          <div className="grid grid-cols-3 gap-8">
            {players.map((p, idx) => (
              <div key={p.id} className={`p-10 rounded-[3rem] border-4 flex flex-col items-center justify-center gap-6 shadow-xl transition-all duration-500 ${r4SelectedPlayerId === p.id ? 'bg-indigo-900/60 border-indigo-500 scale-105 opacity-100' : 'bg-slate-900/80 border-slate-800 opacity-60'}`}>
                <div className="text-4xl font-black text-white text-center leading-tight">{p.name || `Player ${p.id + 1}`}</div>
                <div className="flex gap-2">
                  {[...Array(p.stars || 0)].map((_, i) => <Star key={i} size={32} className="text-yellow-500 fill-yellow-500" />)}
                </div>
                <div className="text-3xl font-bold text-indigo-400">{p.score} pts</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderHeader = (roundId, title) => (
    <div className="w-full max-w-[1800px] mx-auto mb-8 flex items-center gap-6">
      <div className="bg-indigo-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center text-5xl font-black shadow-lg shadow-indigo-900/30 ring-4 ring-indigo-500/20">
        {roundId}
      </div>
      <div>
        <h2 className="text-5xl font-black text-white tracking-tighter uppercase">
          {title}
        </h2>
      </div>
    </div>
  );

  // const renderRound1 = () => {
  //   const progress = roundProgress[1] || { 
  //     usedNotes: [], 
  //     results: {}, 
  //     pointMap: {} 
  //   };

  //   const selectedSetId = roundSets[1] || 'default';
  //   const categories = getRoundData(1, selectedSetId) || [];
  const renderRound1 = () => {
    // 1. Get the actual ID (0, 1, etc.)
    const currentId = activeRoundId;

    // 2. Get the progress for THIS specific round
    const progress = roundProgress[currentId] || {
      usedNotes: [],
      results: {},
      pointMap: {}
    };

    // 3. Get the correct data file (round0_default vs round1_default)
    const selectedSetId = roundSets[currentId] || 'default';
    const categories = getRoundData(currentId, selectedSetId) || [];

    // 4. Set the title based on the round
    const title = currentId === 0
      ? (language === 'en' ? "Warm-up" : "Разминка")
      : (t.songChallenge || "SONG CHALLENGE");

    return (
      <>
        <BuzzerPopup
          show={state?.showBuzzerPopup}
          playerName={state?.buzzerPlayerName}
          points={state?.buzzerPoints}
          isWarmup={state?.isWarmup}
        />



        <div className="min-h-screen bg-slate-950 p-8 flex flex-col justify-center">
          {renderHeader(currentId, title)}
          <div className="max-w-[1800px] mx-auto w-full">
            <div className="flex flex-col gap-6">
              {categories.slice(0, 4).map((cat) => (
                <div key={cat.id} className="flex gap-6 h-32">
                  {/* Category Label */}
                  <div className="w-80 bg-slate-800 rounded-3xl flex items-center justify-center p-6 border-2 border-slate-700 shadow-lg relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-2xl font-black text-white uppercase text-center leading-tight tracking-tight relative z-10">
                      {language === 'ru' ? cat.name.ru : cat.name.en}
                    </span>
                  </div>

                  {/* Notes Grid */}
                  <div className="flex-1 grid grid-cols-4 gap-4">
                    {[0, 1, 2, 3].map((noteIdx) => {
                      const noteId = `${cat.id}-${noteIdx}`;
                      // Handle both Set and Array for usedNotes
                      const isUsed = Array.isArray(progress.usedNotes)
                        ? progress.usedNotes.includes(noteId)
                        : progress.usedNotes?.has?.(noteId);

                      const result = progress.results?.[noteId];
                      const isActive = activeNote?.categoryId === cat.id && activeNote?.noteIndex === noteIdx;

                      let bgColor = 'bg-slate-900';
                      let borderColor = 'border-slate-800';
                      let textColor = 'text-indigo-400';
                      let shadow = '';
                      let scale = 'scale-100';

                      if (isActive) {
                        bgColor = 'bg-indigo-600';
                        borderColor = 'border-white';
                        textColor = 'text-white';
                        shadow = 'shadow-[0_0_30px_rgba(79,70,229,0.5)]';
                        scale = 'scale-105 z-10';
                      } else if (isUsed) {
                        if (result === 'correct') {
                          bgColor = 'bg-emerald-600';
                          borderColor = 'border-emerald-400';
                          textColor = 'text-white';
                        } else if (result === 'wrong') {
                          bgColor = 'bg-rose-600';
                          borderColor = 'border-rose-400';
                          textColor = 'text-white';
                        } else {
                          bgColor = 'bg-slate-800';
                          borderColor = 'border-slate-700';
                          textColor = 'text-slate-600';
                        }
                      }

                      return (

                        <div
                          key={noteIdx}
                          className={`rounded-3xl border-4 flex items-center justify-center text-5xl font-black transition-all duration-300 ${bgColor} ${borderColor} ${textColor} ${shadow} ${scale}`}
                        >
                          {/* If the note is currently active (being played) or is already used, show points. 
      Otherwise, show the music icon. */}
                          {isActive || isUsed ? (
                            progress.pointMap?.[cat.id]?.[noteIdx] || 0
                          ) : (
                            <Music size={48} className="text-slate-700/50" />
                          )}
                        </div>
                        // <div 
                        //   key={noteIdx} 
                        //   className={`rounded-3xl border-4 flex items-center justify-center text-5xl font-black transition-all duration-300 ${bgColor} ${borderColor} ${textColor} ${shadow} ${scale}`}
                        // >
                        //   {progress.pointMap?.[cat.id]?.[noteIdx] || 0}
                        // </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {renderPlayersFooter()}
        </div>
      </>
    );
  };

  const renderRound2 = () => {
    const progress = roundProgress[2] || {
      usedNotes: [],
      activationCounts: {},
      persistentPoints: {},
      results: {}
    };

    const selectedSetId = roundSets[2] || 'default';
    const categories = getRoundData(2, selectedSetId) || [];

    return (
          <>
        <BuzzerPopup
          show={state?.showBuzzerPopup}
          playerName={state?.buzzerPlayerName}
          // points={activeNote?.categoryId ? currentRoundPoints || state?.buzzerPoints : state?.buzzerPoints}
          points={currentRoundPoints || state?.buzzerPoints}
          // points={state?.buzzerPoints}
          isWarmup={state?.isWarmup}
        />


      <div className="min-h-screen bg-slate-950 p-8 flex flex-col justify-center">
        {renderHeader(2, t.melodyGuess || "MELODY GUESS")}
        <div className="max-w-[1800px] mx-auto w-full">
          <div className="flex flex-col gap-6">
            {categories.slice(0, 4).map((cat) => {
              const activationCount = progress.activationCounts?.[cat.id] || 0;
              const isCategoryActive = activeNote?.categoryId === cat.id;
              // Check if category is completed (all 4 songs done)
              const isCompleted = progress.results?.[`${cat.id}-0`] !== undefined || (progress.usedNotes && (Array.isArray(progress.usedNotes) ? progress.usedNotes.includes(`${cat.id}-0`) : progress.usedNotes.has(`${cat.id}-0`)));

              let displayScore = null;

              if (activationCount > 0 || isCategoryActive) {
                displayScore = progress.persistentPoints?.[`${cat.id}-0`];
              }

              if (isCategoryActive && activeNote?.noteIndex === 0 && currentRoundPoints !== undefined) {
                displayScore = currentRoundPoints;
              }

              return (
                <div key={cat.id} className="flex gap-6 h-32">
                  {/* Category Label */}
                  <div className="w-80 bg-slate-800 rounded-3xl flex items-center justify-center p-6 border-2 border-slate-700 shadow-lg relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-2xl font-black text-white uppercase text-center leading-tight tracking-tight relative z-10">
                      {language === 'ru' ? cat.name.ru : cat.name.en}
                    </span>
                  </div>

                  {/* Notes Grid - 5 columns (1 Price + 4 Songs) */}
                  <div className="flex-1 grid grid-cols-5 gap-4">
                    {/* Note 0: Price/Activator */}
                    <div
                      className={`
                        rounded-3xl border-4 flex items-center justify-center text-4xl font-black transition-all duration-500 relative overflow-hidden
                        ${isCompleted
                          ? 'bg-slate-800 border-slate-700 text-slate-600'
                          : isCategoryActive && activeNote?.noteIndex === 0
                            ? 'bg-indigo-600 border-white text-white shadow-[0_0_30px_rgba(79,70,229,0.5)] scale-105 z-10'
                            : 'bg-slate-900 border-slate-800 text-indigo-400/50'
                        }
                      `}
                    >
                      {displayScore !== null ? displayScore : '?'}
                    </div>

                    {/* Notes 1-4: Songs */}
                    {[1, 2, 3, 4].map((noteIdx) => {
                      const resultKey = `${cat.id}-${noteIdx}`;
                      const result = progress.results?.[resultKey];
                      const isNoteActive = isCategoryActive && activeNote?.noteIndex === noteIdx;

                      let bgColor = 'bg-slate-900/50';
                      let borderColor = 'border-slate-800';
                      let icon = <Music size={32} className="text-slate-700" />;

                      if (result === 'correct') {
                        bgColor = 'bg-emerald-900/30';
                        borderColor = 'border-emerald-600/50';
                        icon = <CheckCircle size={40} className="text-emerald-500" />;
                      } else if (result === 'wrong') {
                        bgColor = 'bg-rose-900/30';
                        borderColor = 'border-rose-600/50';
                        icon = <XCircle size={40} className="text-rose-500" />;
                      } else if (isNoteActive) {
                        bgColor = 'bg-indigo-900/30';
                        borderColor = 'border-indigo-500';
                        icon = <Music size={32} className="text-indigo-400 animate-pulse" />;
                      }

                      return (
                        <div
                          key={noteIdx}
                          className={`
                            rounded-3xl border-2 flex items-center justify-center transition-all duration-300
                            ${bgColor} ${borderColor}
                            ${isNoteActive ? 'scale-105 shadow-lg shadow-indigo-900/20' : ''}
                          `}
                        >
                          {icon}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {renderPlayersFooter()}
      </div>
      </>
    );
  };

  if (currentPage === 'victory' || showVictory) {
    return renderVictory();
  }

  if (showScoreboard) {
    return renderScoreboard();
  }

  if (currentPage === 'setup' || currentPage === 'start') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-violet-600 rounded-full blur-[150px] animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 text-center">
          <div className="mb-12 relative inline-block">
            <div className="absolute inset-0 bg-indigo-500 blur-[60px] opacity-30 rounded-full" />
            <Music size={120} className="text-indigo-400 relative z-10 animate-bounce" />
          </div>

          <h1 className="text-8xl font-black text-white mb-6 tracking-tighter uppercase drop-shadow-2xl">
            {t.gameTitle || "GUESS THE SONG"}
          </h1>

          <div className="flex flex-wrap justify-center gap-8 mt-16">
            {players.map((p) => (
              <div key={p.id} className="bg-slate-900/80 backdrop-blur-md px-10 py-6 rounded-[2.5rem] border-2 border-slate-800 flex items-center gap-6 shadow-xl">
                <div className="text-3xl font-black text-white">{p.name || `Player ${p.id + 1}`}</div>
                <div className="w-px h-8 bg-slate-700" />
                <div className="text-3xl font-black text-indigo-400">{p.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'round') {
    if (activeRoundId === 0) {
      return renderRound1();
    }
    if (activeRoundId === 1) {
      return renderRound1();
    }
    if (activeRoundId === 2) {
      return renderRound2();
    }
    if (activeRoundId === 3) {
      return renderRound3();
    }
    if (activeRoundId === 4) {
      return renderRound4();
    }

    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-6xl font-black text-white mb-8 uppercase tracking-tighter">
            {t.round || "ROUND"} {activeRoundId}
          </h2>
          {activeNote && (
            <div className="bg-indigo-600 px-12 py-8 rounded-[3rem] inline-block shadow-[0_0_60px_rgba(79,70,229,0.4)] animate-pulse">
              <Music size={80} className="text-white mx-auto mb-4" />
              <div className="text-4xl font-bold text-white uppercase tracking-widest">
                {isPlaying ? (t.playing || "PLAYING...") : (t.ready || "READY")}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentPage === 'r3_select') {
    return renderR3Select();
  }

  if (currentPage === 'r4_select') {
    return renderR4Select();
  }


  return null;
};

export default PlayerScreen;