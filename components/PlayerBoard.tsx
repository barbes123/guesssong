
import React, { useState } from 'react';
import { User, Edit3, Check, Star } from 'lucide-react';
import { Player } from '../types';

interface PlayerBoardProps {
  players: Player[];
  currentPlayerIndex: number;
  onUpdatePlayer: (id: number, name: string, score: number, stars?: number) => void;
  onSetCurrentPlayer: (index: number) => void;
  t: any;
  activePlayerIds?: number[];
}

const PlayerBoard: React.FC<PlayerBoardProps> = ({ players, currentPlayerIndex, onUpdatePlayer, onSetCurrentPlayer, t, activePlayerIds }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<{ name: string; score: string; stars: string; } | null>(null);

  const startEdit = (e: React.MouseEvent, p: Player) => {
    e.stopPropagation();
    setEditingId(p.id);
    setEditData({
      name: p.name,
      score: String(p.score),
      stars: String(p.stars || 0),
    });
  };

  const saveEdit = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (editingId !== null && editData !== null) {
      onUpdatePlayer(
        editingId,
        editData.name,
        parseInt(editData.score, 10) || 0,
        parseInt(editData.stars, 10) || 0
      );
    }
    setEditingId(null);
    setEditData(null);
  };
  
  const isEditing = (p: Player) => editingId === p.id;

  return (
    <div className="flex flex-row gap-4 w-full">
      {players.map((p, idx) => {
        const isParticipating = !activePlayerIds || activePlayerIds.includes(p.id);
        const isActiveTurn = idx === currentPlayerIndex;

        return (
          <div
            key={p.id}
            onClick={() => idx !== currentPlayerIndex && isParticipating && onSetCurrentPlayer(idx)}
            className={`relative flex-1 bg-slate-800/95 backdrop-blur-md p-4 rounded-3xl shadow-xl border-2 transition-all duration-300 ${
              isParticipating ? 'cursor-pointer hover:shadow-2xl' : 'opacity-40 grayscale cursor-not-allowed border-transparent'
            } ${
              isActiveTurn ? 'border-indigo-500 scale-[1.02] shadow-indigo-500/20' : 'border-slate-700/50'
            }`}
          >
            {isActiveTurn && isParticipating && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg whitespace-nowrap">
                {t.currentTurn}
              </div>
            )}
            
            {!isParticipating && (
               <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-700 text-slate-400 text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg whitespace-nowrap">
                {t.notParticipating}
              </div>
            )}
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className={`p-2 rounded-full flex-shrink-0 ${isActiveTurn ? 'bg-indigo-900/50 text-indigo-400' : 'bg-slate-700 text-slate-500'}`}>
                  <User size={16} />
                </div>
                {isEditing(p) && editData ? (
                  <input
                    type="text"
                    value={editData.name}
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setEditData(d => d ? { ...d, name: e.target.value } : null)}
                    className="bg-slate-700 border border-slate-600 rounded px-2 py-1 w-full text-sm font-bold text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <span className="font-black text-slate-100 text-sm truncate">{p.name || `Player ${idx + 1}`}</span>
                )}
              </div>
              
              <button
                onClick={(e) => isEditing(p) ? saveEdit(e) : startEdit(e, p)}
                className="text-slate-500 hover:text-indigo-400 transition-colors flex-shrink-0 p-1"
              >
                {isEditing(p) ? <Check size={16} /> : <Edit3 size={16} />}
              </button>
            </div>

            <div className="flex items-center justify-between bg-slate-900/50 rounded-2xl p-2 px-3 gap-2">
              <div className="flex flex-col items-center">
                <span className="text-[8px] text-slate-500 uppercase font-black tracking-widest">{t.points}</span>
                {isEditing(p) && editData ? (
                  <input
                    type="number"
                    value={editData.score}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setEditData(d => d ? { ...d, score: value } : null);
                      }
                    }}
                    className="bg-slate-800 border border-slate-600 rounded px-2 w-24 text-center text-lg font-black text-indigo-400 outline-none"
                  />
                ) : (
                  <span className="text-xl font-black text-indigo-400 tabular-nums">{p.score}</span>
                )}
              </div>
              
              <div className="w-px h-8 bg-slate-700" />

              <div className="flex flex-col items-center">
                <span className="text-[8px] text-slate-500 uppercase font-black tracking-widest flex items-center gap-1">
                  <Star size={8} className="text-yellow-500 fill-yellow-500" /> {t.stars}
                </span>
                {isEditing(p) && editData ? (
                  <input
                    type="number"
                    value={editData.stars}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setEditData(d => d ? { ...d, stars: value } : null);
                      }
                    }}
                    className="bg-slate-800 border border-slate-600 rounded px-2 w-20 text-center text-lg font-black text-yellow-500 outline-none"
                  />
                ) : (
                  <span className="text-xl font-black text-yellow-500 tabular-nums">{p.stars || 0}</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayerBoard;
