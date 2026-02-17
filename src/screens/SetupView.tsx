import React, { useState, useEffect } from 'react';
import { Users, XCircle, Monitor, Smartphone, Keyboard, Wifi, WifiOff, Trash2, PlayCircle, UserPlus } from 'lucide-react';
import { Player } from '../../types';

interface SetupViewProps {
  players: Player[];
  t: any;
  onUpdatePlayer: (id: number, name: string, score: number) => void;
  onAddPlayer: (name?: any, socketId?: string, slotNumber?: number) => void;
  onRemovePlayer: (id: number) => void;
  onStartGame: () => void;
  isPlayerWindowOpen: boolean;
  onTogglePlayerWindow: () => void;
  isBuzzerConnected: boolean;
  onCheckConnection: () => void;
  onForceDisconnect: () => void;
  availableHubPlayers: any[];
  activeResponder: string | null;
}

const SetupView: React.FC<SetupViewProps> = ({
  players,
  activeResponder,
  t,
  onUpdatePlayer,
  onAddPlayer,
  onRemovePlayer,
  onStartGame,
  isPlayerWindowOpen,
  onTogglePlayerWindow,
  isBuzzerConnected,
  onCheckConnection,
  onForceDisconnect,
  availableHubPlayers = []
}) => {
  const [localPlayers, setLocalPlayers] = useState<Player[]>(players);

  useEffect(() => {
    setLocalPlayers(players);
  }, [players]);

  // When buzz mode is toggled, clear the opposite mode's players
  // When buzz mode is toggled, clear the opposite mode's players
  useEffect(() => {
    if (isBuzzerConnected) {
      // Switch TO Buzz: Remove manual players
      players.filter(p => !p.hubId).forEach(p => onRemovePlayer(p.id));
    } else {
      // Switch TO Manual: Remove buzz players
      players.filter(p => p.hubId).forEach(p => onRemovePlayer(p.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBuzzerConnected]); // Only trigger when the connection status flips
  // useEffect(() => {
  //   if (isBuzzerConnected) {
  //     // Buzz mode activated → remove all manual players (those without hubId)
  //     const manualPlayers = localPlayers.filter(p => !p.hubId);
  //     manualPlayers.forEach(p => onRemovePlayer(p.id));
  //   } else {
  //     // Buzz mode disabled → remove all buzz players (those with hubId)
  //     const buzzPlayers = localPlayers.filter(p => p.hubId);
  //     buzzPlayers.forEach(p => onRemovePlayer(p.id));
  //   }
  // }, [isBuzzerConnected]);

  const handleLocalUpdate = (id: number, name: string, score: number) => {
    // Only update if the name is 9 characters or less
    if (name.length <= 9) {
      setLocalPlayers(prev =>
        prev.map(p => p.id === id ? { ...p, name, score } : p)
      );
    }
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
    <div className="min-h-screen bg-slate-950 p-8 pt-24 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. TOP PANEL: Smartphone Host Check */}
        <div className={`p-8 rounded-[3rem] border-2 transition-all duration-500 ${isBuzzerConnected ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-slate-900/50 border-slate-800'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all ${isBuzzerConnected ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                {isBuzzerConnected ? <Wifi size={32} /> : <WifiOff size={32} />}
              </div>
              <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  {isBuzzerConnected ? "Buzzer Hub Linked" : "Hub Disconnected"}
                </h2>
                <p className={`text-xs font-bold uppercase tracking-widest ${isBuzzerConnected ? 'text-emerald-500' : 'text-rose-500 animate-pulse'}`}>
                  {isBuzzerConnected ? "● Wireless Buzzers Ready" : "○ Standing by for connection"}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={onTogglePlayerWindow}
                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${isPlayerWindowOpen ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}
              >
                <Monitor size={20} />
                {isPlayerWindowOpen ? 'Monitor Active' : 'Open Player Screen'}
              </button>
              <button
                onClick={isBuzzerConnected ? onForceDisconnect : onCheckConnection}
                className={`px-8 py-3 rounded-xl font-black uppercase tracking-widest transition-all shadow-xl ${isBuzzerConnected ? 'bg-rose-600/20 border-2 border-rose-500 text-rose-500 hover:bg-rose-600 hover:text-white' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
              >
                {isBuzzerConnected ? "Force Disconnect" : "Connect Hub"}
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM AREA: Two Forms Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* 2. BELOW-LEFT: Manual Player Input */}
          <div className={`p-10 rounded-[4rem] border-2 transition-all duration-500 ${!isBuzzerConnected ? 'bg-slate-900 border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.15)]' : 'bg-slate-900/30 border-slate-800 opacity-40 grayscale'}`}>
            <div className="flex items-center gap-4 mb-8">
              <Keyboard className="text-indigo-400" size={32} />
              <h3 className="text-3xl font-black text-white uppercase italic">{t.manualInput || "Manual Entry"}</h3>
            </div>

            {!isBuzzerConnected ? (
              <div className="space-y-6">
                {localPlayers.filter(p => !p.hubId).map((p, idx) => (
                  <div key={p.id} className="flex gap-6 items-end"> {/* CHANGED to items-end */}

                    {/* 1. NAME BOX (Identical for everyone) */}
                    <div className="flex-1 flex flex-col">
                      {/* Invisible spacer so the Name box doesn't sit higher than the Score box */}
                      <span className="text-[10px] mb-2 invisible">Alignment Spacer</span>

                      <div className="bg-slate-800 border-2 border-slate-700 rounded-[2rem] px-10 h-[84px] flex items-center focus-within:border-indigo-500 transition-all">
                        <input
                          type="text"
                          maxLength={9}
                          placeholder={`Player ${idx + 1}`} // This ensures 1, 2, and 3 look the same
                          value={p.name}
                          onChange={(e) => handleLocalUpdate(p.id, e.target.value, p.score)}
                          onBlur={() => handleSaveAndBlur(p.id)}
                          disabled={isBuzzerConnected}
                          className="bg-transparent border-none text-white font-black w-full outline-none placeholder:text-slate-600 text-2xl"
                          autoComplete="off"
                        />
                      </div>
                    </div>


                    {/* SCORE ASSIGNMENT BOX */}
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-black text-slate-500 mb-2 uppercase">
                        {t.points}
                      </span>
                      <input
                        type="number"
                        value={p.score}
                        onChange={(e) => handleLocalUpdate(p.id, p.name, parseInt(e.target.value) || 0)}
                        onBlur={() => handleSaveAndBlur(p.id)}
                        className="w-32 h-[84px] bg-slate-800 border-2 border-slate-700 rounded-[2rem] px-2 text-indigo-400 font-black text-3xl text-center outline-none focus:border-indigo-500 transition-all"
                      />
                    </div>

                    {/* Remove Player Button */}
                    <button onClick={() => onRemovePlayer(p.id)} className="p-7 bg-rose-900/20 text-rose-500 rounded-[2.5rem] mb-[2px]">
                      <Trash2 size={32} />
                    </button>
                  </div>
                ))}

                {/* {localPlayers.filter(p => !p.hubId).length < 3 && (
                <button
                  onClick={() => onAddPlayer()}
                  disabled={isBuzzerConnected}
                  className="w-full py-5 rounded-2xl border-2 border-dashed border-slate-700 text-slate-500 font-bold hover:border-indigo-500 hover:text-indigo-400 transition-all flex items-center justify-center gap-2"
                >
                  <UserPlus size={20} /> {t.addPlayer || "+ Add Player"}
                </button>
              )} */}
                {localPlayers.filter(p => !p.hubId).length < 3 && (
                  <button
                    onClick={() => onAddPlayer("", undefined, undefined)} // Explicitly call for one empty player
                    disabled={isBuzzerConnected}
                    className="w-full py-5 rounded-2xl border-2 border-dashed border-slate-700 text-slate-500 font-bold hover:border-indigo-500 hover:text-indigo-400 transition-all flex items-center justify-center gap-2"
                  >
                    <UserPlus size={20} /> {t.addPlayer || "+ Add Player"}
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                  Manual mode disabled when Buzz Hub is connected.
                </p>
              </div>
            )}
          </div>

          {/* 3. BELOW-RIGHT: Buzz Player Input */}
          <div className={`p-10 rounded-[4rem] border-2 transition-all duration-500 ${isBuzzerConnected ? 'bg-slate-900 border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.15)]' : 'bg-slate-900/30 border-slate-800 grayscale'}`}>

            <div className="flex items-center gap-4 mb-8">
              <Smartphone className="text-emerald-400" size={32} />
              <h3 className="text-3xl font-black text-white uppercase italic">{t.buzzInput || "Buzz Assignment"}</h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[1, 2, 3].map((slotNumber) => {
                const assignedPlayer = isBuzzerConnected && players.find(p => p.id === slotNumber && p.name) || null;
                const availablePhones = availableHubPlayers.filter(hp => !players.some(p => p.hubId === hp.id));
                // const isWinner = assignedPlayer && activeResponder === assignedPlayer.hubId;
                // const winner = players.find(p => p.hubId === activeResponder);
                console.log(`Slot ${slotNumber} | Hub Count: ${availableHubPlayers.length} | Available: ${availablePhones.length}`);
                return (
                  <div key={slotNumber} className="flex gap-6 items-end">

                    {/* NAME BOX */}
                    <div className="flex-1 flex flex-col">
                      <span className="text-[10px] font-black text-slate-500 mb-2 uppercase text-left">
                        Slot 0{slotNumber}
                      </span>
                      {/* BACKGROUND MODIFIED: Gray (slate-800/50) if empty, Emerald if active */}
                      <div className={`border-2 rounded-[2rem] px-10 h-[84px] flex items-center transition-all duration-300 ${assignedPlayer
                        ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                        : 'bg-slate-800/50 border-slate-700 border-dashed'
                        }`}>

                        {assignedPlayer ? (
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <div className="text-white font-black text-2xl uppercase tracking-tighter truncate max-w-[200px]">
                                {assignedPlayer.name}
                              </div>
                              <button onClick={() => onRemovePlayer(assignedPlayer.id)} className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-400">
                                Release Slot
                              </button>
                            </div>
                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                          </div>
                        ) : (
                          <div className="flex gap-2 w-full justify-center overflow-hidden">
                            {isBuzzerConnected && availablePhones.length > 0 ? (
                              availablePhones.map(hp => (
                                <button key={hp.id} onClick={() => onAddPlayer(hp.name, hp.id, slotNumber)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase rounded-xl border border-emerald-400 whitespace-nowrap">
                                  {hp.name}
                                </button>
                              ))
                            ) : (
                              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic animate-pulse">
                                {isBuzzerConnected ? "Waiting..." : "Offline"}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* SCORE BOX */}
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-black text-slate-500 mb-2 uppercase">{t.points}</span>
                      <input
                        type="number"
                        disabled={!assignedPlayer}
                        value={assignedPlayer ? (localPlayers.find(lp => lp.id === assignedPlayer.id)?.score || 0) : 0}
                        onChange={(e) => handleLocalUpdate(slotNumber, assignedPlayer?.name || '', parseInt(e.target.value) || 0)}
                        onBlur={() => handleSaveAndBlur(slotNumber)}
                        /* BACKGROUND MODIFIED: Matches active color of the slot */
                        className={`w-32 h-[84px] border-2 rounded-[2rem] px-2 font-black text-3xl text-center outline-none transition-all ${assignedPlayer
                          ? 'bg-slate-800 border-emerald-500 text-emerald-400 focus:border-emerald-400'
                          : 'bg-slate-900/50 border-slate-800 text-slate-700 opacity-20'
                          }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-6 rounded-3xl bg-slate-950/50 border border-slate-800 text-center">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                {isBuzzerConnected
                  ? "Assign connected smartphones to game slots above."
                  : "Connect Smartphone Hub to enable wireless buzzers."}
              </p>
            </div>
          </div>
        </div>

        {/* START GAME BUTTON (FULL WIDTH) */}
        <button
          onClick={onStartGame}
          disabled={players.some(p => !p.name) || players.length === 0}
          className={`w-full py-10 rounded-[3rem] font-black text-4xl uppercase tracking-tighter transition-all flex items-center justify-center gap-6 shadow-2xl ${players.some(p => !p.name) || players.length === 0
            ? 'bg-slate-900 text-slate-700 cursor-not-allowed border-2 border-slate-800'
            : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.01] active:scale-[0.99] shadow-indigo-900/20'
            }`}
        >
          <PlayCircle size={40} fill="currentColor" />
          {t.startGame}
        </button>

      </div>
    </div >
  );
};

export default SetupView;