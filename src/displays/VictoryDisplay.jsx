import React from 'react';
import { Trophy, Star, PartyPopper } from 'lucide-react';

const VictoryDisplay = ({ players, t }) => {
  // Same sorting logic as your Control Screen
  const sortedPlayers = [...players].sort((a, b) => {
    if ((b.stars || 0) !== (a.stars || 0)) return (b.stars || 0) - (a.stars || 0);
    return (b.score || 0) - (a.score || 0);
  });
  
  const winner = sortedPlayers[0];
  const secondPlace = sortedPlayers[1];
  const thirdPlace = sortedPlayers[2];

  if (!winner) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 p-8 text-center animate-in zoom-in duration-1000 overflow-y-auto">
      <div className="max-w-[1000px] w-full py-20">
        <PartyPopper 
          size={140} 
          className="text-indigo-500 mx-auto mb-10 animate-bounce"
        />
        
        <h1 className="text-[7rem] font-black text-white mb-4 uppercase tracking-tighter leading-none">
          {t.victory || "VICTORY!"}
        </h1>
        <p className="text-3xl text-slate-400 mb-12 font-bold uppercase tracking-[0.3em] opacity-60">
          {t.congratulations || "CONGRATULATIONS!"}
        </p>
        
        {/* WINNER CARD */}
        <div className="bg-slate-900 p-16 rounded-[5rem] border-4 border-indigo-500/40 mb-10 shadow-[0_40px_80px_rgba(79,70,229,0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Trophy size={140} />
          </div>
          <div className="text-sm font-black text-indigo-500 uppercase tracking-[0.4em] mb-4">
            {t.winner || "WINNER"}
          </div>
          <div className="text-[6rem] font-black text-white mb-8 tracking-tighter leading-none">
            {winner.name || `Player ${winner.id+1}`}
          </div>
          <div className="flex justify-center gap-20">
            <div className="text-center">
              <div className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-3">
                {t.stars || "STARS"}
              </div>
              <div className="text-7xl font-black text-yellow-500 tabular-nums tracking-tighter">
                {winner.stars || 0}
              </div>
            </div>
            <div className="w-1.5 h-28 bg-slate-800 rounded-full" />
            <div className="text-center">
              <div className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-3">
                {t.points || "POINTS"}
              </div>
              <div className="text-7xl font-black text-indigo-400 tabular-nums tracking-tighter">
                {winner.score}
              </div>
            </div>
          </div>
        </div>
        
        {/* SECOND PLACE */}
        {players.length >= 2 && secondPlace && (
          <div className="bg-slate-900/60 p-10 rounded-[4rem] border-2 border-slate-700/40 mb-8 shadow-xl">
            <div className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] mb-4">
              {t.secondPlace || "Second Place"}
            </div>
            <div className="text-[3.5rem] font-black text-slate-300 mb-6 tracking-tight">
              {secondPlace.name || `Player ${secondPlace.id+1}`}
            </div>
            <div className="flex justify-center gap-16">
              <div className="text-center">
                <div className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-2">STARS</div>
                <div className="text-5xl font-black text-yellow-500/80 tabular-nums">{secondPlace.stars || 0}</div>
              </div>
              <div className="w-1 h-20 bg-slate-800/50 rounded-full" />
              <div className="text-center">
                <div className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-2">POINTS</div>
                <div className="text-5xl font-black text-indigo-400/80 tabular-nums">{secondPlace.score}</div>
              </div>
            </div>
          </div>
        )}
        
        {/* THIRD PLACE */}
        {players.length >= 3 && thirdPlace && (
          <div className="bg-slate-900/40 p-10 rounded-[4rem] border-2 border-slate-700/30 shadow-lg">
            <div className="text-sm font-black text-slate-500 uppercase tracking-[0.4em] mb-4">
              THIRD PLACE
            </div>
            <div className="text-[3rem] font-black text-slate-400 mb-6 tracking-tight">
              {thirdPlace.name || `Player ${thirdPlace.id+1}`}
            </div>
            <div className="flex justify-center gap-14">
              <div className="text-center">
                <div className="text-slate-600 text-xs font-black uppercase tracking-[0.2em] mb-2">STARS</div>
                <div className="text-4xl font-black text-yellow-500/60 tabular-nums">{thirdPlace.stars || 0}</div>
              </div>
              <div className="w-1 h-16 bg-slate-800/40 rounded-full" />
              <div className="text-center">
                <div className="text-slate-600 text-xs font-black uppercase tracking-[0.2em] mb-2">POINTS</div>
                <div className="text-4xl font-black text-indigo-400/60 tabular-nums">{thirdPlace.score}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VictoryDisplay;