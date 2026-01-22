import React, { useState, useEffect } from 'react';
import { Users, XCircle, Monitor } from 'lucide-react';
import { Player } from '../../types';


interface SetupViewProps {
  players: Player[];
  t: any; 
  onUpdatePlayer: (id: number, name: string, score: number) => void;
  onAddPlayer: () => void;
  onRemovePlayer: (id: number) => void;
  onStartGame: () => void;
  isPlayerWindowOpen: boolean;
  onTogglePlayerWindow: () => void;
}

const SetupView: React.FC<SetupViewProps> = ({
  players, 
  t, 
  onUpdatePlayer, 
  onAddPlayer, 
  onRemovePlayer, 
  onStartGame,
  isPlayerWindowOpen,
  onTogglePlayerWindow
}) => {
  const [localPlayers, setLocalPlayers] = useState<Player[]>(players);
  
  useEffect(() => {
    setLocalPlayers(players);
  }, [players]);

  const handleLocalUpdate = (id: number, name: string, score: number) => {
    setLocalPlayers(prev => 
      prev.map(p => p.id === id ? { ...p, name, score } : p)
    );
  };

  const handleSaveAndBlur = (id: number) => {
    const localPlayer = localPlayers.find(p => p.id === id);
    const globalPlayer = players.find(p => p.id === id);
    
    if (localPlayer && globalPlayer && 
        (localPlayer.name !== globalPlayer.name || localPlayer.score !== globalPlayer.score)) {
      onUpdatePlayer(id, localPlayer.name, localPlayer.score);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
      <div className="bg-slate-900/90 backdrop-blur-xl p-16 rounded-[4rem] border border-slate-800 max-w-4xl w-full text-center shadow-2xl">
        <Users size={80} className="text-indigo-500 mx-auto mb-10 animate-pulse" />
        <h1 className="text-6xl font-black text-white mb-12 uppercase tracking-tighter">
          {t.playerSetup}
        </h1>
        
        {/* Player Setup Form */}
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
                <span className="text-xs font-black text-slate-500 mb-2 uppercase">
                  {t.points}
                </span>
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
                  onClick={() => onRemovePlayer(p.id)}
                  className="p-7 bg-rose-900/20 text-rose-500 rounded-[2rem] hover:bg-rose-900/30 transition-colors"
                >
                  <XCircle size={36} />
                </button>
              )}
            </div>
          ))}
          
          {localPlayers.length < 3 && (
            <button 
              onClick={onAddPlayer}
              className="w-full py-8 border-2 border-dashed border-slate-700 rounded-[2rem] text-slate-500 font-black text-2xl hover:border-indigo-500 hover:text-indigo-400 transition-colors"
            >
              + {t.editPlayer}
            </button>
          )}
        </div>
        
        {/* SIMPLE Buttons Row */}
        <div className="space-y-6">
          {/* Player Screen Button - SIMPLE */}
          <button 
            onClick={onTogglePlayerWindow}
            className={`w-full py-10 rounded-[2.5rem] font-black text-3xl flex items-center justify-center gap-4 transition-all ${
              isPlayerWindowOpen
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 text-white'
            }`}
          >
            <Monitor size={36} />
            <span>
              {isPlayerWindowOpen ? 'Player Screen Open ✓' : 'Open Player Screen'}
            </span>
          </button>
          
          {/* Start Game Button */}
          <button 
            onClick={onStartGame}
            className="w-full py-10 rounded-[2.5rem] bg-indigo-600 text-white font-black text-3xl shadow-xl uppercase tracking-[0.2em] hover:bg-indigo-700 transition-colors"
          >
            {t.startGame}
          </button>
        </div>
        
        {/* Simple Status */}
        <div className="mt-6 text-sm">
          {isPlayerWindowOpen ? (
            <div className="text-green-400 font-bold">
              Player screen open on separate window
            </div>
          ) : (
            <div className="text-slate-500">
              Click to open player screen
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetupView;