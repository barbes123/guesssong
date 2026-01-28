import React from 'react';
import { MusicIcon, Star } from 'lucide-react';
import { getRoundData } from '../../data/index_data';
import './PlayerRoundDisplay.css';

const PlayerRoundDisplay = ({ gameState, t }) => {
  if (!gameState || !gameState.players) return null;

  const { 
    activeRoundId, 
    roundProgress = {}, 
    activeNote,
    players = [],
    language = 'en',
    currentPlayerIndex = 0 
  } = gameState;

  const roundId = activeRoundId;
  const progress = roundProgress[roundId] || {};
  
  const checkExists = (collection, item) => {
    if (!collection) return false;
    if (collection instanceof Set) return collection.has(item);
    if (Array.isArray(collection)) return collection.includes(item);
    return false;
  };

  const selectedSetId = gameState.roundSets?.[roundId] || 'default';
  const roundData = getRoundData(roundId, selectedSetId) || [];
  const isMelody = roundId === 2;

  return (
    <div className="player-round-display-container bg-slate-950 min-h-screen p-8 flex flex-col items-center">
      
      {/* FIXED TOP HEADER */}
      <div className="w-full max-w-[1600px] flex justify-between items-center mb-8 border-b-2 border-slate-800 pb-6">
        <div className="flex items-center gap-6">
          <div className="bg-indigo-600 rounded-2xl w-16 h-16 flex items-center justify-center text-3xl font-black shadow-lg text-white">
            {roundId}
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-white">{t.round} {roundId}</h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
              {isMelody ? t.melodyGuess : t.songChallenge}
            </p>
          </div>
        </div>
      </div>
      
      {/* MAIN CONTENT WRAPPER: Matches heights using flex-stretch */}
      <div className="w-full max-w-[1600px] flex gap-6 items-stretch">
        
        {/* LEFT: SONG GRID */}
        <div className="flex-[3] flex flex-col gap-4">
          {roundData.map(cat => (
            <div key={cat.id} className="flex items-stretch gap-4">
              {/* Category Topic */}
              <div className="w-72 bg-slate-800 border-2 border-slate-700 rounded-3xl p-4 flex items-center justify-center text-center shadow-md">
                <span className="text-lg font-black uppercase text-white leading-tight tracking-tighter">
                  {language === 'en' ? cat.name.en : cat.name.ru}
                </span>
              </div>
              
              {/* Musical Keys */}
              <div className={`grid flex-1 gap-4 ${isMelody ? 'grid-cols-5' : 'grid-cols-4'}`}>
                {isMelody ? (
                    <>
                      {/* Round 2: Points Key (Hidden until activated) */}
                      <div className="h-24 rounded-3xl border-2 bg-slate-900 border-slate-800 flex items-center justify-center text-3xl font-black">
                        {checkExists(progress.activatedCategories, cat.id) ? (
                          <span className="text-slate-500 animate-in fade-in duration-500">
                            {progress.persistentPoints?.[`${cat.id}-0`] || 20}
                          </span>
                        ) : (
                          <span className="text-indigo-500/20 font-light">?</span>
                        )}
                      </div>
                    {[1, 2, 3, 4].map(idx => (
                      <div key={idx} className={`h-24 rounded-3xl border-2 flex items-center justify-center ${idx <= (progress.activationCounts?.[cat.id] || 0) ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400' : 'bg-slate-900/50 border-slate-800 text-slate-700'}`}>
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
                      <div key={idx} className={`h-24 rounded-3xl border-2 flex items-center justify-center text-3xl font-black transition-all ${
                        isActive ? 'bg-indigo-600 border-white scale-105 shadow-2xl z-10' : 
                        isUsed ? (result === 'correct' ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-rose-600 border-rose-400 text-white') : 
                        'bg-slate-900 border-slate-800 text-slate-600'
                      }`}>
                        {progress.pointMap?.[cat.id]?.[idx]}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* RIGHT: PLAYER SIDEBAR - This will automatically match the height of the left column */}
        <div className="flex-1 flex flex-col gap-4">
          {players.map((player, idx) => {
            const isTurn = idx === currentPlayerIndex;
            return (
              <div 
                key={player.id} 
                className={`flex-1 p-6 rounded-[2.5rem] border-2 flex flex-col justify-between transition-all duration-500 ${
                  isTurn 
                    ? 'bg-indigo-600/30 border-white shadow-xl' 
                    : 'bg-slate-900/50 border-slate-800 opacity-60'
                }`}
              >
                {/* NAME ON LEFT, SCORE ON RIGHT */}
                <div className="flex justify-between items-start w-full">
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isTurn ? 'text-indigo-300' : 'text-slate-600'}`}>
                      {isTurn ? 'CURRENT TURN' : `PLAYER ${idx + 1}`}
                    </span>
                    <h2 className="text-2xl font-black text-white uppercase truncate">
                      {player.name || `Player ${idx + 1}`}
                    </h2>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-4xl font-black text-white tabular-nums">
                      {player.score || 0}
                    </div>
                  </div>
                </div>

                {/* STARS ROW AT BOTTOM RIGHT */}
                <div className="flex justify-end">
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map(s => (
                      <Star 
                        key={s} 
                        size={18} 
                        fill={s <= (player.stars || 0) ? "#eab308" : "none"} 
                        className={s <= (player.stars || 0) ? "text-yellow-500" : "text-slate-800"} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default PlayerRoundDisplay;