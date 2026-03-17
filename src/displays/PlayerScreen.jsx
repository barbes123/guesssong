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
    if (!show) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
        <div className="relative max-w-2xl w-full mx-4 animate-in zoom-in-95 duration-500 spring">

          {/* Massive Golden Glow behind the card */}
          <div className="absolute inset-0 bg-yellow-500/30 rounded-[3rem] blur-[80px] animate-pulse"></div>

          {/* Main Glass Window */}
          <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 rounded-[3rem] p-12 border border-yellow-500/30 shadow-2xl overflow-hidden text-center">

            {/* Subtle top highlight line for 3D effect */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>

            <div className="relative z-10">
              <Trophy className="mx-auto text-yellow-500 mb-6 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" size={80} />

              <h2 className="text-4xl font-bold text-yellow-500 tracking-widest uppercase mb-8">
                {t.buzzerPressed || "BUZZER PRESSED!"}
              </h2>

              <div className="bg-slate-900/50 backdrop-blur-md rounded-3xl p-8 mb-6 border border-slate-700 shadow-inner">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {t.playerName || "Player"}
                </div>
                <div className="text-6xl font-black text-white mb-8 tracking-tight drop-shadow-md">
                  {playerName}
                </div>

                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {t.pointsToGain || "Points to Gain"}
                </div>
                <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600">
                  +{points}
                </div>
              </div>

              {isWarmup ? (
                <div className="inline-block mt-2 text-sm font-black tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 py-3 px-6 rounded-full animate-pulse">
                  ⚡ WARM-UP / NO POINTS ⚡
                </div>
              ) : (
                <div className="text-lg font-medium text-slate-400 animate-pulse">
                  {t.waitingForAnswer || "Waiting for answer..."}
                </div>
              )}
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
    r4SelectedPlayerId,
    r4CurrentSongIdx
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
    const buzzerIdx = players.findIndex(p => p.hubId === state.activeResponder);
    const hasBuzzer = state.activeResponder && buzzerIdx !== -1;
    const visualActiveIndex = hasBuzzer ? buzzerIdx : state.currentPlayerIndex;

    return (
      <div className="mt-12 pb-8 w-full max-w-[1800px] mx-auto">
        <div className="flex justify-center gap-8">
          {players.map((p, idx) => {
            const isHighlighted = idx === visualActiveIndex;
            const isWinner = hasBuzzer && idx === buzzerIdx;

            return (
              <div
                key={p.id}
                className={`
                relative flex-1 px-8 py-5 rounded-3xl border flex items-center justify-between transition-all duration-500 overflow-hidden
                ${isHighlighted
                    ? isWinner
                      ? 'border-yellow-400 bg-gradient-to-r from-yellow-900/40 to-slate-900 shadow-[0_0_40px_rgba(234,179,8,0.2)] scale-105 z-20'
                      : 'border-indigo-500 bg-gradient-to-r from-indigo-900/40 to-slate-900 shadow-[0_0_40px_rgba(99,102,241,0.2)] scale-105 z-10'
                    : 'border-slate-800/50 bg-slate-900/40 opacity-70 scale-100'
                  }
              `}
              >
                {/* Highlight Badge */}
                {isHighlighted && (
                  <div className={`absolute top-0 left-0 w-full h-1 ${isWinner ? 'bg-yellow-400 animate-pulse' : 'bg-indigo-500'}`}></div>
                )}

                <div className="flex flex-col gap-1 z-10">
                  <div className={`text-xs font-bold uppercase tracking-widest ${isHighlighted ? (isWinner ? 'text-yellow-400' : 'text-indigo-400') : 'text-slate-600'}`}>
                    {isHighlighted ? (isWinner ? (t.buzzer || "BUZZER!") : (t.currentTurn || "Current Turn")) : "Player"}
                  </div>
                  <div className={`text-2xl font-black truncate max-w-[200px] ${isHighlighted ? 'text-white' : 'text-slate-300'}`}>
                    {p.name || `Player ${p.id + 1}`}
                  </div>
                  <div className="flex gap-1 mt-1">
                    {[...Array(3)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${i < (p.stars || 0) ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]' : 'text-slate-700 fill-slate-800'}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-right z-10">
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Score</div>
                  <div className={`text-5xl font-black tabular-nums tracking-tighter ${isHighlighted ? (isWinner ? 'text-yellow-400' : 'text-white') : 'text-slate-500'}`}>
                    {p.score}
                  </div>
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

    // Determine active players for highlighting
    const isLeftActive = state.currentPlayerIndex === players.indexOf(leftPlayer);
    const isRightActive = state.currentPlayerIndex === players.indexOf(rightPlayer);

    return (
      <div className="min-h-screen bg-slate-950 p-8 flex flex-col justify-center">
        {renderHeader(3, t.categories.superGame || "SUPER GAME")}

        {/* We use gap-8 and fixed narrower widths for the sides so the center expands */}
        <div className="max-w-[1800px] mx-auto w-full flex gap-8 items-stretch">

          {/* ================= LEFT PLAYER (Narrowed, line removed) ================= */}
          <div
            className={`w-[280px] xl:w-[340px] shrink-0 p-8 rounded-[3rem] border-2 flex flex-col justify-center transition-all duration-500 relative ${isLeftActive
                ? 'bg-gradient-to-b from-indigo-900/60 to-slate-900 border-indigo-400 shadow-[0_0_40px_rgba(99,102,241,0.3)] scale-105 z-10'
                : 'bg-slate-900/80 border-slate-800 opacity-80'
              }`}
          >
            {/* Reduced from text-6xl to text-4xl to fit narrow container */}
            <h3 className="text-4xl font-black text-white text-center mb-6 truncate drop-shadow-md">
              {leftPlayer.name || `Player ${leftPlayer.id + 1}`}
            </h3>

            {/* Reduced star size from 64 to 36 */}
            <div className="flex justify-center gap-3 mb-8 bg-slate-950/40 py-3 rounded-full border border-slate-800 shadow-inner">
              {[1, 2, 3].map(s => (
                <Star
                  key={s}
                  size={36}
                  className={s <= (leftPlayer.stars || 0) ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]' : 'text-slate-700'}
                />
              ))}
            </div>

            {/* Reduced score from text-7xl to text-6xl */}
            <div className="text-center text-6xl font-black text-indigo-400 tabular-nums tracking-tighter drop-shadow-md">
              {leftPlayer.score}
            </div>
          </div>

          {/* ================= CENTER INFO (Expanded) ================= */}
          <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-slate-800/40 to-slate-900/60 rounded-[4rem] p-10 lg:p-14 border border-slate-700/50 shadow-2xl relative">
            <div className="text-2xl font-black text-slate-400 uppercase tracking-[0.3em] mb-6">
              {t.turn || "TURN"} {turnIdx + 1} / 5
            </div>

            {/* HINT TEXT CONTAINER: Same text-4xl size, enhanced container styling */}
            <div className="text-center bg-gradient-to-b from-slate-900/80 to-slate-950/90 rounded-[2.5rem] p-10 border border-slate-700 shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)] mb-10 w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />

              {/* Keeping original text-4xl size as requested */}
              <p className="text-4xl font-bold text-white italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] relative z-10">
                "{language === 'en' ? song?.hint?.en : song?.hint?.ru}"
              </p>
            </div>

            {/* DURATION BUTTONS (Premium 3D Style) */}
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4, 5].map(s => {
                const isSelected = state.selectedDuration === s;
                return (
                  <div
                    key={s}
                    className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${isSelected
                        ? 'bg-gradient-to-b from-indigo-500 to-indigo-700 border-indigo-400 text-white shadow-[0_0_30px_rgba(99,102,241,0.6),inset_0_2px_0_rgba(255,255,255,0.3)] scale-110 z-10'
                        : 'bg-slate-800 border-slate-700/50 text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] cursor-pointer hover:bg-slate-700'
                      }`}
                  >
                    <span className="text-4xl font-black drop-shadow-md">{s}</span>
                  </div>
                );
              })}

              <div
                className={`w-32 h-20 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${state.selectedDuration === null && isPlaying
                    ? 'bg-gradient-to-b from-indigo-500 to-indigo-700 border-indigo-400 text-white shadow-[0_0_30px_rgba(99,102,241,0.6),inset_0_2px_0_rgba(255,255,255,0.3)] scale-110 z-10'
                    : 'bg-slate-800 border-slate-700/50 text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] cursor-pointer hover:bg-slate-700'
                  }`}
              >
                <span className="text-2xl font-black uppercase drop-shadow-md">{t.full || 'FULL'}</span>
              </div>
            </div>

            {isFinalized && (
              <div className="absolute bottom-6 text-xl font-black text-emerald-400 uppercase animate-pulse tracking-widest drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                {t.nextTurn || "Next Turn Pending..."}
              </div>
            )}
          </div>

          {/* ================= RIGHT PLAYER (Narrowed, line removed) ================= */}
          <div
            className={`w-[280px] xl:w-[340px] shrink-0 p-8 rounded-[3rem] border-2 flex flex-col justify-center transition-all duration-500 relative ${isRightActive
                ? 'bg-gradient-to-b from-rose-900/60 to-slate-900 border-rose-400 shadow-[0_0_40px_rgba(244,63,94,0.3)] scale-105 z-10'
                : 'bg-slate-900/80 border-slate-800 opacity-80'
              }`}
          >
            {/* Reduced from text-6xl to text-4xl */}
            <h3 className="text-4xl font-black text-white text-center mb-6 truncate drop-shadow-md">
              {rightPlayer.name || `Player ${rightPlayer.id + 1}`}
            </h3>

            {/* Reduced star size from 64 to 36 */}
            <div className="flex justify-center gap-3 mb-8 bg-slate-950/40 py-3 rounded-full border border-slate-800 shadow-inner">
              {[1, 2, 3].map(s => (
                <Star
                  key={s}
                  size={36}
                  className={s <= (rightPlayer.stars || 0) ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]' : 'text-slate-700'}
                />
              ))}
            </div>

            {/* Reduced score from text-7xl to text-6xl */}
            <div className="text-center text-6xl font-black text-rose-400 tabular-nums tracking-tighter drop-shadow-md">
              {rightPlayer.score}
            </div>
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

    // FORCE Row 0 since we don't need activation/selection
    const displayRow = 0;

    const formatTime = (seconds) => {
      // If timer hasn't started, show the full duration (e.g., 30s) instead of 0:00
      const timeToDisplay = (seconds === undefined || seconds === null) ? 30 : seconds;
      const m = Math.floor(Math.abs(timeToDisplay) / 60);
      const s = Math.floor(Math.abs(timeToDisplay) % 60);
      return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
      <div className="min-h-screen bg-slate-950 p-6 flex flex-col justify-center">

        <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-5">

          {/* HEADER MOVED HERE: Now it is constrained by the 1400px wrapper and aligns perfectly with the left edge! */}
          <div className="-mb-2">
            {renderHeader(4, "SPRINT")}
          </div>

          {/* MAIN GRID */}
          <div className="bg-slate-900/50 border-2 border-slate-800 rounded-[3rem] p-6 lg:p-8">
            <div className="flex flex-col h-full">

              {/* TIMER */}
              <div className="text-center mb-6">
                <div className="text-base font-black text-slate-400 uppercase tracking-widest">Time Left</div>
                <div className={`text-6xl lg:text-7xl font-black tabular-nums ${state.timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-indigo-400'}`}>
                  {formatTime(state.timeLeft)}
                </div>
              </div>

              {/* GRID */}
              <div className="grid grid-cols-7 gap-3 lg:gap-4">
                {songs.slice(0, 7).map((song, i) => {
                  const songIdx = i; // Simplified since row is always 0
                  const isCorrect = correctIndices.has(songIdx);
                  const isWrong = playerProg.wrongIndex === songIdx;

                  // If no note is active in state, visually highlight the first one
                  const isActive = state.activeNote
                    ? state.activeNote?.noteIndex === songIdx
                    : songIdx === r4CurrentSongIdx;

                  const isPlayed = state.playedButNotEvaluated?.includes(songIdx);

                  let bg = 'bg-slate-800';
                  let border = 'border-slate-700';
                  let iconColor = 'text-slate-600';
                  let scale = '';

                  if (isActive) {
                    bg = 'bg-indigo-600';
                    border = 'border-white';
                    iconColor = 'text-white animate-pulse';
                    scale = 'scale-105 z-10 shadow-[0_0_30px_rgba(99,102,241,0.4)]';
                  } else if (isCorrect) {
                    bg = 'bg-emerald-600'; border = 'border-emerald-400'; iconColor = 'text-white';
                  } else if (isWrong) {
                    bg = 'bg-rose-600'; border = 'border-rose-400'; iconColor = 'text-white';
                  } else if (isPlayed) {
                    bg = 'bg-yellow-600'; border = 'border-yellow-400'; iconColor = 'text-white';
                  }

                  return (
                    <div
                      key={songIdx}
                      className={`aspect-square rounded-2xl lg:rounded-3xl border-4 flex items-center justify-center transition-all duration-500 ${bg} ${border} ${scale}`}
                    >
                      <Music size={48} className={iconColor} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* PLAYER INFO */}
          <div className="bg-slate-900/50 border-2 border-slate-800 rounded-[2.5rem] px-8 py-5 flex items-center justify-between">
            <h3 className="text-4xl font-black text-white truncate drop-shadow-md">
              {currentPlayer.name || `Player ${currentPlayer.id + 1}`}
            </h3>
            <div className="text-5xl font-black text-indigo-400 tabular-nums">
              {currentPlayer.score} <span className="text-2xl font-bold uppercase text-indigo-400/50 ml-2">pts</span>
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

const renderRound1 = () => {
    // 1. Get the actual ID (0, 1, etc.)
    const currentId = activeRoundId;

    // 2. Get the progress for THIS specific round
    const progress = roundProgress[currentId] || {
      usedNotes:[],
      results: {},
      pointMap: {}
    };

    // 3. Get the correct data file
    const selectedSetId = roundSets[currentId] || 'default';
    const categories = getRoundData(currentId, selectedSetId) ||[];

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
                  <div className="w-80 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center p-6 border border-slate-700/50 shadow-lg relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="text-2xl font-black text-white uppercase text-center leading-tight tracking-tight relative z-10 drop-shadow-md">
                      {language === 'ru' ? cat.name.ru : cat.name.en}
                    </span>
                  </div>

                  {/* Notes Grid */}
                  <div className="flex-1 grid grid-cols-4 gap-4">
                    {[0, 1, 2, 3].map((noteIdx) => {
                      const noteId = `${cat.id}-${noteIdx}`;
                      const isUsed = Array.isArray(progress.usedNotes)
                        ? progress.usedNotes.includes(noteId)
                        : progress.usedNotes?.has?.(noteId);

                      const result = progress.results?.[noteId];
                      const isActive = activeNote?.categoryId === cat.id && activeNote?.noteIndex === noteIdx;
                      
                      // Check if this specific note is currently outputting sound
                      const isPlayingNow = isActive && isPlaying;

                      let bgColor = 'bg-gradient-to-b from-slate-800 to-slate-900';
                      let borderColor = 'border-slate-700/50 text-slate-500';
                      let shadow = 'shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]';
                      let scale = 'scale-100';

                      if (isActive) {
                        bgColor = 'bg-gradient-to-b from-indigo-500 to-indigo-700';
                        borderColor = isPlayingNow ? 'border-white text-white' : 'border-indigo-400 text-white';
                        shadow = isPlayingNow 
                          ? 'shadow-[0_0_50px_rgba(255,255,255,0.4),inset_0_2px_0_rgba(255,255,255,0.6)]' 
                          : 'shadow-[0_0_30px_rgba(99,102,241,0.5),inset_0_2px_0_rgba(255,255,255,0.2)]';
                        scale = `z-20 ${isPlayingNow ? 'scale-110 ring-4 ring-white animate-pulse' : 'scale-105 ring-2 ring-indigo-400/50'}`;
                      } else if (isUsed) {
                        if (result === 'correct') {
                          bgColor = 'bg-gradient-to-b from-emerald-500 to-emerald-700';
                          borderColor = 'border-emerald-400 text-white';
                          shadow = 'shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] opacity-90';
                        } else if (result === 'wrong') {
                          bgColor = 'bg-gradient-to-b from-rose-600 to-rose-800';
                          borderColor = 'border-rose-400 text-white';
                          shadow = 'opacity-50 grayscale-[50%]';
                        } else {
                          bgColor = 'bg-slate-900/80';
                          borderColor = 'border-slate-800/50 text-slate-700';
                        }
                      }

                      return (
                        <div
                          key={noteIdx}
                          className={`relative rounded-3xl border-2 flex items-center justify-center text-5xl font-black transition-all duration-300 ease-out ${bgColor} ${borderColor} ${shadow} ${scale}`}
                        >
                          {/* HIGHLIGHT: Bouncing music icon in the corner when audio is playing */}
                          {isPlayingNow && (
                            <Music size={28} className="absolute top-4 right-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-bounce" />
                          )}

                          {isActive || isUsed ? (
                            <span className="drop-shadow-md relative z-10">
                              {progress.pointMap?.[cat.id]?.[noteIdx] || 0}
                            </span>
                          ) : (
                            <Music size={40} className="text-slate-600 opacity-50" />
                          )}
                        </div>
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
          points={currentRoundPoints || state?.buzzerPoints}
          isWarmup={state?.isWarmup}
        />

        <div className="min-h-screen bg-slate-950 p-8 flex flex-col justify-center">
          {renderHeader(2, t.melodyGuess || "MELODY GUESS")}

          <div className="max-w-[1800px] mx-auto w-full">
            <div className="flex flex-col gap-6">
              {categories.slice(0, 4).map((cat) => {
                const activationCount = progress.activationCounts?.[cat.id] || 0;
                const isCategoryActive = activeNote?.categoryId === cat.id;

                // Check if category is completed
                const isCompleted = progress.results?.[`${cat.id}-0`] !== undefined ||
                  (progress.usedNotes && (Array.isArray(progress.usedNotes) ? progress.usedNotes.includes(`${cat.id}-0`) : progress.usedNotes.has(`${cat.id}-0`)));

                let displayScore = null;

                if (activationCount > 0 || isCategoryActive) {
                  displayScore = progress.persistentPoints?.[`${cat.id}-0`];
                }

                if (isCategoryActive && activeNote?.noteIndex === 0 && currentRoundPoints !== undefined) {
                  displayScore = currentRoundPoints;
                }

                // --- STYLING NOTE 0 (PRICE / ACTIVATOR) ---
                const isActiveActivator = isCategoryActive && activeNote?.noteIndex === 0;
                const isActivatorPlaying = isActiveActivator && isPlaying;

                let actBgColor = 'bg-gradient-to-b from-slate-800 to-slate-900';
                let actBorderColor = 'border-slate-700/50 text-indigo-400';
                let actShadow = 'shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]';
                let actScale = 'scale-100 cursor-pointer hover:scale-[1.02]';

                if (isCompleted) {
                  actBgColor = 'bg-slate-900/80';
                  actBorderColor = 'border-slate-800/50 text-slate-600';
                  actShadow = 'opacity-50 grayscale-[50%]';
                  actScale = 'scale-100 cursor-default';
                } else if (isActiveActivator) {
                  actBgColor = 'bg-gradient-to-b from-indigo-500 to-indigo-700';
                  actBorderColor = isActivatorPlaying ? 'border-white text-white' : 'border-indigo-400 text-white';
                  actShadow = isActivatorPlaying
                    ? 'shadow-[0_0_50px_rgba(255,255,255,0.4),inset_0_2px_0_rgba(255,255,255,0.6)]'
                    : 'shadow-[0_0_40px_rgba(99,102,241,0.6),inset_0_2px_0_rgba(255,255,255,0.3)]';
                  actScale = `z-20 ${isActivatorPlaying ? 'scale-110 ring-4 ring-white animate-pulse' : 'scale-105 ring-4 ring-indigo-500/30'}`;
                } else if (activationCount === 0 && !isCategoryActive) {
                  actBorderColor = 'border-slate-700/50 text-indigo-400/50';
                }

                return (
                  <div key={cat.id} className="flex gap-6 h-32">
                    {/* Category Label (Glassmorphic) */}
                    <div className="w-80 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center p-6 border border-slate-700/50 shadow-lg relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="text-2xl font-black text-white uppercase text-center leading-tight tracking-tight relative z-10 drop-shadow-md">
                        {language === 'ru' ? cat.name.ru : cat.name.en}
                      </span>
                    </div>

                    <div className="flex-1 grid grid-cols-5 gap-4">

                      {/* Note 0: Price/Activator */}
                      <div className={`relative rounded-3xl border-2 flex items-center justify-center text-4xl font-black transition-all duration-300 ease-out overflow-hidden ${actBgColor} ${actBorderColor} ${actShadow} ${actScale}`}>

                        {/* HIGHLIGHT: Bouncing music icon inside Activator when playing */}
                        {isActivatorPlaying && (
                          <Music size={28} className="absolute top-4 right-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-bounce" />
                        )}

                        <span className="drop-shadow-md relative z-10">
                          {displayScore !== null ? displayScore : '?'}
                        </span>
                      </div>

                      {/* Notes 1-4: Songs */}
                      {[1, 2, 3, 4].map((noteIdx) => {
                        const resultKey = `${cat.id}-${noteIdx}`;
                        const result = progress.results?.[resultKey];
                        const isNoteActive = isCategoryActive && activeNote?.noteIndex === noteIdx;

                        // Check if this specific note is outputting audio
                        const isPlayingNow = isNoteActive && isPlaying;

                        let songBgColor = 'bg-gradient-to-b from-slate-800/40 to-slate-900/60';
                        let songBorderColor = 'border-slate-700/50';
                        let songShadow = 'shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]';
                        let songScale = 'scale-100 hover:scale-[1.02] cursor-pointer';
                        let icon = <Music size={32} className="text-slate-600/50" />;

                        if (result === 'correct') {
                          songBgColor = 'bg-gradient-to-b from-emerald-500/20 to-emerald-900/40';
                          songBorderColor = 'border-emerald-500/50';
                          songShadow = 'shadow-[inset_0_1px_0_rgba(16,185,129,0.2)]';
                          icon = <Music size={40} className="text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />;
                        } else if (result === 'wrong') {
                          songBgColor = 'bg-gradient-to-b from-rose-500/20 to-rose-900/40';
                          songBorderColor = 'border-rose-500/50';
                          songShadow = 'shadow-[inset_0_1px_0_rgba(244,63,94,0.2)]';
                          icon = <Music size={40} className="text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]" />;
                        } else if (isNoteActive) {
                          songBgColor = 'bg-gradient-to-b from-indigo-500/30 to-indigo-900/60';
                          // HIGHLIGHT: Intense white border and glow when playing
                          songBorderColor = isPlayingNow ? 'border-white' : 'border-indigo-400';
                          songShadow = isPlayingNow
                            ? 'shadow-[0_0_40px_rgba(255,255,255,0.3),inset_0_1px_0_rgba(255,255,255,0.8)]'
                            : 'shadow-[0_0_30px_rgba(99,102,241,0.3),inset_0_1px_0_rgba(99,102,241,0.5)]';
                          songScale = `z-20 ${isPlayingNow ? 'scale-110 ring-4 ring-white animate-pulse' : 'scale-105 ring-2 ring-indigo-500/30'}`;

                          // HIGHLIGHT: Bouncing bright white icon when playing
                          icon = <Music
                            size={isPlayingNow ? 48 : 40}
                            className={`${isPlayingNow ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-bounce' : 'text-indigo-400 animate-pulse drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]'}`}
                          />;
                        }

                        return (
                          <div
                            key={noteIdx}
                            className={`relative rounded-3xl border-2 flex items-center justify-center transition-all duration-300 ease-out ${songBgColor} ${songBorderColor} ${songShadow} ${songScale}`}
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