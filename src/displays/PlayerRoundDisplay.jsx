import React from 'react';
import { MusicIcon, PlayCircle, Star, Zap, Trophy, HelpCircle, CheckCircle, XCircle } from 'lucide-react';
import { getRoundData } from '../../data/index_data';
import './PlayerRoundDisplay.css';

const PlayerRoundDisplay = ({ gameState, t }) => {
  // 1. CRITICAL GUARD: Prevent crash if state isn't synced yet
  if (!gameState || !gameState.players) {
    return (
      <div className="player-round-display-container flex items-center justify-center">
        <div className="text-4xl font-black text-indigo-400 animate-pulse uppercase">Syncing...</div>
      </div>
    );
  }

  const { 
    activeRoundId, 
    roundProgress = {}, 
    activeNote,
    isPlaying = false,
    currentRoundPoints,
    players = [],
    language = 'en',
    currentPlayerIndex = 0
  } = gameState;

  const roundId = activeRoundId;
  const progress = roundProgress[roundId] || {};
  
  // HELPER: Handles Set vs Array issues (localStorage converts Sets to Arrays during sync)
  const checkExists = (collection, item) => {
    if (!collection) return false;
    if (collection instanceof Set) return collection.has(item);
    if (Array.isArray(collection)) return collection.includes(item);
    return false;
  };

  const selectedSetId = gameState.roundSets?.[roundId] || 'default';
  const roundData = getRoundData(roundId, selectedSetId) || [];

  // =========================================================
  // ROUND 3: DUEL (Based on your RoundDuel.tsx)
  // =========================================================
  if (roundId === 3) {
    const turnIdx = progress.currentTurnIndex || 0;
    const currentSong = roundData[0]?.songs?.[turnIdx];
    const duelIds = progress.activePlayerIds || [];
    const duelPlayers = players.filter(p => duelIds.includes(p.id));

    return (
      <div className="player-round-display-container duel-display">
        <div className="player-round-header">
          <div className="player-round-number">3</div>
          <h1 className="player-round-title">{t.categories?.superGame || 'FINAL DUEL'}</h1>
        </div>
        
        <div className="player-round-content flex-col items-center justify-center pt-10">
          {/* Hint Card matching Host's HelpCircle box */}
          <div className="bg-slate-800/40 rounded-[4rem] p-16 border-2 border-slate-700/50 mb-14 shadow-inner text-center w-full max-w-5xl">
            <HelpCircle size={80} className="text-indigo-500 mx-auto mb-8" />
            <p className="text-6xl font-black text-white italic">
              "{language === 'en' ? currentSong?.hint?.en : currentSong?.hint?.ru}"
            </p>
            <div className="text-2xl font-black text-slate-500 mt-10 uppercase tracking-[0.3em]">
              {t.turn || 'TURN'} {turnIdx + 1} / 5
            </div>
          </div>

          <div className="flex justify-center gap-16 w-full">
            {duelPlayers.map(p => (
              <div key={p.id} className="bg-slate-900/80 p-10 rounded-[3rem] border-2 border-slate-800 min-w-[350px] text-center">
                <div className="text-3xl font-black text-white mb-4 uppercase truncate">{p.name}</div>
                <div className="flex justify-center gap-4">
                  {[1, 2, 3].map(s => (
                    <Star 
                      key={s} 
                      size={48}
                      fill={s <= (p.stars || 0) ? "#eab308" : "none"} 
                      className={s <= (p.stars || 0) ? "text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" : "text-slate-800"}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // ROUND 4: SPRINT (Based on your RoundSprint.tsx)
  // =========================================================
  if (roundId === 4) {
    const currentPlayer = players[currentPlayerIndex];
    const playerProg = progress.r4PlayerProgress?.[currentPlayer?.id] || { correctIndices: [], wrongIndex: null };
    const correctCount = playerProg.correctIndices instanceof Set ? playerProg.correctIndices.size : (playerProg.correctIndices?.length || 0);

    return (
      <div className="player-round-display-container sprint-display">
        <div className="player-round-header">
          <div className="player-round-number">4</div>
          <h1 className="player-round-title">SPRINT: {currentPlayer?.name}</h1>
        </div>

        <div className="player-round-content flex-col items-center">
          {/* 7-Song Progress Track */}
          <div className="grid grid-cols-7 gap-6 mb-20 w-full max-w-6xl mx-auto pt-20">
            {Array.from({ length: 7 }).map((_, i) => {
              const isCorrect = checkExists(playerProg.correctIndices, i);
              const isWrong = playerProg.wrongIndex === i;
              const isActive = gameState.r4CurrentSongIdx === i && gameState.r4IsActiveSession;
              
              return (
                <div key={i} className={`h-40 rounded-[2rem] border-4 flex flex-col items-center justify-center transition-all duration-500 ${
                  isCorrect ? 'bg-emerald-600 border-emerald-400 scale-105' : 
                  isWrong ? 'bg-rose-600 border-rose-400' : 
                  isActive ? 'bg-indigo-600 border-white scale-110 shadow-[0_0_40px_rgba(99,102,241,0.6)]' : 
                  'bg-slate-900/50 border-slate-800 opacity-60'
                }`}>
                  {isCorrect ? <CheckCircle size={48} /> : isWrong ? <XCircle size={48} /> : <MusicIcon size={48} />}
                  <span className="text-xl font-black mt-2">{i + 1}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-20">
            <div className="bg-slate-900/80 p-12 rounded-[3rem] border-2 border-slate-800 text-center min-w-[300px]">
              <div className="text-slate-500 font-black uppercase tracking-widest mb-2">Songs Correct</div>
              <div className="text-7xl font-black text-emerald-400">{correctCount} <span className="text-2xl text-slate-600">/ 7</span></div>
            </div>
            
            <div className={`bg-slate-900/80 p-12 rounded-[3rem] border-2 text-center min-w-[300px] transition-colors ${correctCount === 7 ? 'border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.2)]' : 'border-slate-800'}`}>
              <div className="text-slate-500 font-black uppercase tracking-widest mb-2">Bonus</div>
              <div className={`text-7xl font-black ${correctCount === 7 ? 'text-yellow-500' : 'text-slate-700'}`}>+300</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // ROUNDS 1 & 2: STANDARD GRID
  // =========================================================
  const sortedPlayers = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));
  const isMelody = roundId === 2;

  return (
    <div className="player-round-display-container">
      <div className="player-round-header">
        <div className="player-round-header-left">
          <div className="player-round-number">{roundId}</div>
          <div>
            <h1 className="player-round-title">{t.round || 'ROUND'} {roundId}</h1>
            <div className="player-round-subtitle">{isMelody ? t.melodyGuess : t.songChallenge}</div>
          </div>
        </div>
        <div className="player-round-status">
          {isPlaying && (
            <div className="bg-indigo-600/20 text-indigo-400 px-6 py-2 rounded-full border border-indigo-500 animate-pulse uppercase tracking-widest font-black">
              Live Audio
            </div>
          )}
        </div>
      </div>
      
      <div className="player-round-content">
        <div className="player-round-game-grid">
          {roundData.map(cat => (
            <div key={cat.id} className="player-category-row">
              <div className="player-category-name">{language === 'en' ? cat.name.en : cat.name.ru}</div>
              <div className={`player-notes-grid ${isMelody ? 'melody' : 'standard'}`}>
                {isMelody ? (
                  <>
                    <div className="player-note-cell points-cell available">
                      {progress.persistentPoints?.[`${cat.id}-0`] || 20}
                    </div>
                    {[1, 2, 3, 4].map(idx => (
                      <div key={idx} className={`player-note-cell ${idx <= (progress.activationCounts?.[cat.id] || 0) ? 'unlocked' : 'locked'}`}>
                        <MusicIcon size={24} />
                      </div>
                    ))}
                  </>
                ) : (
                  [0, 1, 2, 3].map(idx => {
                    const noteId = `${cat.id}-${idx}`;
                    const isUsed = checkExists(progress.usedNotes, noteId);
                    const isActive = activeNote?.categoryId === cat.id && activeNote?.noteIndex === idx;
                    const result = progress.results?.[noteId];
                    return (
                      <div key={idx} className={`player-note-cell ${isActive ? 'active' : isUsed ? (result === 'correct' ? 'correct' : 'wrong') : 'available'}`}>
                        {progress.pointMap?.[cat.id]?.[idx]}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="player-round-scores-column">
          <div className="space-y-4">
            {sortedPlayers.map((p) => (
              <div key={p.id} className={`p-6 rounded-[2rem] border-2 transition-all ${p.id === players[currentPlayerIndex]?.id ? 'bg-indigo-600/20 border-indigo-500 scale-105' : 'bg-slate-900/50 border-slate-800 opacity-60'}`}>
                <div className="flex justify-between items-center mb-2">
                   <div className="font-black text-white truncate pr-4 text-xl">{p.name}</div>
                   <div className="font-black text-2xl text-indigo-400">{p.score}</div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3].map(s => (
                    <Star key={s} size={14} fill={s <= (p.stars || 0) ? "#eab308" : "none"} className={s <= (p.stars || 0) ? "text-yellow-500" : "text-slate-800"} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerRoundDisplay;