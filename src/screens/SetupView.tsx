import React, { useState, useEffect } from 'react';
import {
  Users,
  XCircle,
  Monitor,
  Smartphone,
  Keyboard,
  Wifi,
  WifiOff,
  Trash2,
  PlayCircle,
  UserPlus,
  Usb
} from 'lucide-react';
import { Player, InputMode } from '../../types';

const ENABLE_CONNECT_HUB = false;

export interface SetupViewProps {
  // Roster state & mutators
  players: Player[];
  t: any;
  onUpdatePlayer: (id: number, name: string, score: number, stars?: number) => void;
  onAddPlayer: (nameOrEvent?: any, socketId?: string, slotNumber?: number) => void;
  onRemovePlayer: (id: number) => void;
  onStartGame: () => void;

  // Window controls
  isPlayerWindowOpen: boolean;
  onTogglePlayerWindow: () => void;

  // Input Mode selection
  // inputMode: InputMode;
  // onModeChange: (newMode: InputMode) => void;

  // Hardware status facts (Optional read-only indicators for setup UI)
  isBuzzerConnected?: boolean;
  availableHubPlayers?: any[];
  isPadsConnected?: boolean;
  usbPorts?: any[];
  onCheckConnection?: () => void;
  onForceDisconnect?: () => void;
  activeResponder?: string | null;

  onTogglePads?: () => void;
  onToggleBuzz?: () => void;

  isBuzzAttempted?: boolean;
  isPadsAttempted?: boolean;
}

export const SetupView: React.FC<SetupViewProps> = ({
  // Player Roster
  players,
  t,
  onUpdatePlayer,
  onAddPlayer,
  onRemovePlayer,
  onStartGame,

  // Window Controls
  isPlayerWindowOpen,
  onTogglePlayerWindow,

  // High-Level Mode Selection
  // inputMode,
  // onModeChange,

  // Hardware Facts & Actions (Read-only / Callbacks)
  isBuzzerConnected = false,
  availableHubPlayers = [],
  onCheckConnection,
  onForceDisconnect,
  activeResponder,
  isPadsConnected = false,
  usbPorts = [],
  onTogglePads,
  onToggleBuzz,
  isBuzzAttempted = false,
  isPadsAttempted = false,
}) => {
  console.log("🎮 SETUP VIEW HARDWARE STATE:", { isPadsConnected, usbPorts });
  console.log("🧾 ROSTER:", players.map(p => ({ id: p.id, name: p.name, hubId: p.hubId, padsId: p.padsId })));
  const [localPlayers, setLocalPlayers] = useState<Player[]>(players);

  useEffect(() => {
    setLocalPlayers(players);
  }, [players]);

  const handleLocalUpdate = (id: number, name: string, score: number) => {
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
      <div className="max-w-[1600px] mx-auto space-y-8">

        {/* 1. TOP PANEL: Dual Hardware Status Check */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CARD A: Smartphone Socket Hub Status */}
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
                  <p className={`text-xs font-bold uppercase tracking-widest ${isBuzzerConnected ? 'text-emerald-500' : (isBuzzAttempted ? 'text-yellow-500 animate-pulse' :'text-rose-500 animate-pulse')}`}>
                    {/* {isBuzzerConnected ? "● Wireless Buzzers Ready" : "○ Waiting by for buzz server"} */}
                    {isBuzzerConnected
                      ? "● Wireless Buzzers Ready"
                      : isBuzzAttempted
                        ? "◌ Buzz server is down"
                        : "○ Waiting for buzz server..."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                disabled={isPadsConnected}
                // onClick={onToggleBuzz}
                onClick={() => {
                  if (!onToggleBuzz) {
                    console.warn("⚠️ onToggleBuzz is undefined — wiring broken in App/useGameEngine/useBuzzer");
                    return;
                  }
                  onToggleBuzz();
                }}
                className={`w-40 justify-center px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${isBuzzerConnected ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}

              >
                <Wifi size={32} />
                {isBuzzerConnected ? 'Disconnect' : 'Connect'}
              </button>

              {ENABLE_CONNECT_HUB && (
                <button
                  type="button"
                  onClick={isBuzzerConnected ? onForceDisconnect : onCheckConnection}
                  className={`px-8 py-3 rounded-xl font-black uppercase tracking-widest transition-all shadow-xl ${isBuzzerConnected ? 'bg-rose-600/20 border-2 border-rose-500 text-rose-500 hover:bg-rose-600 hover:text-white' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
                >
                  {isBuzzerConnected ? "Force Disconnect" : "Connect Hub"}
                </button>
              )}
            </div>
          </div>

          {/* CARD B: USB Pads Hardware Status */}
          <div className={`p-8 rounded-[3rem] border-2 transition-all duration-500 ${isPadsConnected ? 'bg-indigo-900/20 border-indigo-500/50' : 'bg-slate-900/50 border-slate-800'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all ${isPadsConnected ? 'bg-indigo-500 text-white border-indigo-400' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                  <Usb size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                    {isPadsConnected ? "USB Pads Linked" : "USB Pads Unplugged"}
                  </h2>
                  <p className={`text-xs font-bold uppercase tracking-widest ${isPadsConnected ? 'text-emerald-500' : 'text-rose-500 animate-pulse'}`}>
                    {isPadsConnected ? "● USB Pads Ready" : "○ Waiting for USB server"}
                  </p>
                </div>
              </div>

              {/* <button
                type="button"
                onClick={onTogglePlayerWindow}
                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${isPlayerWindowOpen ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}
              >
                <Monitor size={20} />
                {isPlayerWindowOpen ? 'Monitor Active' : 'Open Player Screen'}
              </button> */}
              <button
                type="button"
                disabled={isBuzzerConnected}
                onClick={onTogglePads}
                className={`w-40 justify-center px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${isPadsConnected ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}

              >
                <Usb size={20} />
                {isPadsConnected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM AREA: Three Panels Side-by-Side */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* 2. LEFT: Manual Player Input */}
          {/* 2. LEFT: Manual Player Input */}
          <div className={`p-10 rounded-[4rem] border-2 transition-all duration-500 ${!isBuzzerConnected && !isPadsConnected ? 'bg-slate-900 border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.15)]' : 'bg-slate-900/30 border-slate-800 opacity-60'}`}>
            <div className="flex items-center gap-4 mb-8">
              <Keyboard className="text-indigo-400" size={32} />
              <h3 className="text-3xl font-black text-white uppercase italic">{t?.manualInput || "Manual Entry"}</h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {Array.from({ length: 3 }, (_, index) => {
                const slotNumber = index + 1;

                const manualPlayer = localPlayers.find(
                  p => p.id === slotNumber && !p.hubId && !p.padsId && p.name.trim() !== ''
                ) || null;

                return (
                  <div key={slotNumber} className="flex gap-4 items-end">
                    <div className="flex-1 flex flex-col">
                      <span className="text-[10px] font-black text-slate-500 mb-2 uppercase text-left">
                        Slot 0{slotNumber}
                      </span>
                      <div className={`border-2 rounded-[2rem] px-8 h-[84px] flex items-center transition-all duration-300 ${manualPlayer
                        ? 'bg-indigo-500/20 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.1)] focus-within:border-indigo-400'
                        : 'bg-slate-800/50 border-slate-700 border-dashed'
                        }`}>

                        {manualPlayer ? (
                          <div className="flex flex-col w-full py-3">
                            <input
                              type="text"
                              maxLength={9}
                              placeholder={`Player ${slotNumber}`}
                              value={manualPlayer.name}
                              onChange={(e) => handleLocalUpdate(manualPlayer.id, e.target.value, manualPlayer.score)}
                              onBlur={() => handleSaveAndBlur(manualPlayer.id)}
                              className="bg-transparent border-none text-white font-black w-full outline-none placeholder:text-slate-600 text-xl uppercase tracking-tighter p-0"
                              autoComplete="off"
                            />
                            <button
                              type="button"
                              onClick={() => onRemovePlayer(manualPlayer.id)}
                              className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-400 text-left"
                            >
                              Release Slot
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest italic">
                            Empty
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-black text-slate-500 mb-2 uppercase">{t?.points || "Points"}</span>
                      <input
                        type="number"
                        disabled={!manualPlayer}
                        value={manualPlayer ? (localPlayers.find(lp => lp.id === manualPlayer.id)?.score || 0) : 0}
                        // FIX
                        onChange={(e) => { if (manualPlayer) handleLocalUpdate(manualPlayer.id, manualPlayer.name, parseInt(e.target.value) || 0); }}
                        onBlur={() => { if (manualPlayer) handleSaveAndBlur(manualPlayer.id); }}
                        className={`w-28 h-[84px] border-2 rounded-[2rem] px-2 font-black text-3xl text-center outline-none transition-all ${manualPlayer
                          ? 'bg-slate-800 border-indigo-500 text-indigo-400 focus:border-indigo-400'
                          : 'bg-slate-900/50 border-slate-800 text-slate-700 opacity-20'
                          }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {localPlayers.filter(p => !p.hubId && !p.padsId && p.name.trim() !== '').length < 3 && (
              <button
                type="button"
                disabled={isBuzzerConnected || isPadsConnected}
                onClick={() => onAddPlayer("", undefined, undefined)}
                className="w-full mt-6 py-5 rounded-2xl border-2 border-dashed border-slate-700 text-slate-500 font-bold hover:border-indigo-500 hover:text-indigo-400 transition-all flex items-center justify-center gap-2"
              >
                <UserPlus size={20} /> {t?.addPlayer || "+ Add Player"}
              </button>
            )}
          </div>

          {/* 3. MIDDLE: Phone Buzz Assignment */}
          <div className={`p-10 rounded-[4rem] border-2 transition-all duration-500 ${isBuzzerConnected ? 'bg-slate-900 border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.15)]' : 'bg-slate-900/30 border-slate-800 grayscale'}`}>
            <div className="flex items-center gap-4 mb-8">
              <Smartphone className="text-emerald-400" size={32} />
              <h3 className="text-3xl font-black text-white uppercase italic">{t?.buzzInput || "Phone Buzzers"}</h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* {Array.from({ length: Math.min(players.length, 3) }, (_, index) => { */}
              {Array.from({ length: 3 }, (_, index) => {
                const slotNumber = index + 1;
                // const assignedPlayer = isBuzzerConnected && players.find(p => p.id === slotNumber && p.name) || null;
                const assignedPlayer = isBuzzerConnected
                  ? (players.find(p => p.id === slotNumber && p.hubId && p.name) || null)
                  : null;
                const availablePhones = availableHubPlayers.filter(hp => !players.some(p => p.hubId === hp.id));

                return (
                  <div key={slotNumber} className="flex gap-4 items-end">
                    <div className="flex-1 flex flex-col">
                      <span className="text-[10px] font-black text-slate-500 mb-2 uppercase text-left">
                        Slot 0{slotNumber}
                      </span>
                      <div className={`border-2 rounded-[2rem] px-8 h-[84px] flex items-center transition-all duration-300 ${assignedPlayer
                        ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                        : 'bg-slate-800/50 border-slate-700 border-dashed'
                        }`}>

                        {assignedPlayer ? (
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <div className="text-white font-black text-xl uppercase tracking-tighter truncate max-w-[150px]">
                                {assignedPlayer.name}
                              </div>
                              <button
                                type="button"
                                onClick={() => onRemovePlayer(assignedPlayer.id)}
                                className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-400"
                              >
                                Release Slot
                              </button>
                            </div>
                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                          </div>
                        ) : (
                          <div className="flex gap-2 w-full justify-center overflow-hidden">
                            {isBuzzerConnected && availablePhones.length > 0 ? (
                              availablePhones.map(hp => (
                                <button
                                  key={hp.id}
                                  type="button"
                                  onClick={() => onAddPlayer(hp.name, hp.id, slotNumber)}
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase rounded-xl border border-emerald-400 whitespace-nowrap"
                                >
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

                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-black text-slate-500 mb-2 uppercase">{t?.points || "Points"}</span>
                      <input
                        type="number"
                        disabled={!assignedPlayer}
                        value={assignedPlayer ? (localPlayers.find(lp => lp.id === assignedPlayer.id)?.score || 0) : 0}
                        onChange={(e) => handleLocalUpdate(slotNumber, assignedPlayer?.name || '', parseInt(e.target.value) || 0)}
                        onBlur={() => handleSaveAndBlur(slotNumber)}
                        className={`w-28 h-[84px] border-2 rounded-[2rem] px-2 font-black text-3xl text-center outline-none transition-all ${assignedPlayer
                          ? 'bg-slate-800 border-emerald-500 text-emerald-400 focus:border-emerald-400'
                          : 'bg-slate-900/50 border-slate-800 text-slate-700 opacity-20'
                          }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* {isBuzzerConnected && players.length < 3 && (
              <button
                type="button"
                onClick={() => onAddPlayer("", undefined, players.length + 1)}
                className="w-full mt-6 py-5 rounded-2xl border-2 border-dashed border-slate-700 text-slate-500 font-bold hover:border-emerald-500 hover:text-emerald-400 transition-all flex items-center justify-center gap-2"
              >
                <UserPlus size={20} /> Add Buzz Slot
              </button>
            )} */}

            <div className="mt-8 p-6 rounded-3xl bg-slate-950/50 border border-slate-800 text-center">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                {isBuzzerConnected
                  ? "Assign connected smartphones to game slots above."
                  : "Connect Smartphone Hub to enable wireless buzzers."}
              </p>
            </div>
          </div>


          {/* 4. RIGHT: USB Pads Assignment Panel */}
          <div className={`p-10 rounded-[4rem] border-2 transition-all duration-500 ${isPadsConnected ? 'bg-slate-900 border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.15)]' : 'bg-slate-900/30 border-slate-800 grayscale'}`}>
            <div className="flex items-center gap-4 mb-8">
              <Usb className="text-indigo-400" size={32} />
              <h3 className="text-3xl font-black text-white uppercase italic">{t?.padsInput || "USB Pads"}</h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {Array.from({ length: 3 }, (_, index) => {
                const slotNumber = index + 1;

                // Match assigned player specifically using padsId
                const assignedPlayer = isPadsConnected
                  ? (players.find(p => p.id === slotNumber && String(p.padsId) !== "" && p.name) || null)
                  : null;

                // Filter detected USB gamepads that are not assigned to any player yet
                const availablePads = (usbPorts || []).filter(
                  pad => !players.some(p => String(p.padsId) === String(pad.assignedPortId || pad.id))
                );

                return (
                  <div key={slotNumber} className="flex gap-4 items-end">
                    <div className="flex-1 flex flex-col">
                      <span className="text-[10px] font-black text-slate-500 mb-2 uppercase text-left">
                        Slot 0{slotNumber} (Pad {slotNumber})
                      </span>

                      <div className={`border-2 rounded-[2rem] px-8 h-[84px] flex items-center transition-all duration-300 ${assignedPlayer
                        ? 'bg-indigo-500/20 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.1)]'
                        : 'bg-slate-800/50 border-slate-700 border-dashed'
                        }`}>

                        {assignedPlayer ? (
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <div className="text-white font-black text-xl uppercase tracking-tighter truncate max-w-[150px]">
                                {assignedPlayer.name}
                              </div>
                              <button
                                type="button"
                                onClick={() => onRemovePlayer(assignedPlayer.id)}
                                className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-400"
                              >
                                Release Slot
                              </button>
                            </div>
                            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_#6366f1]" />
                          </div>
                        ) : (
                          <div className="flex gap-2 w-full justify-center overflow-hidden">
                            {/* RENDER CLICKABLE PAD BUTTONS */}
                            {isPadsConnected && availablePads.length > 0 ? (
                              availablePads.map(pad => {
                                const portId = String(pad.assignedPortId ?? pad.id ?? slotNumber);
                                const padName = pad.name || pad.playerName || `Pad ${portId}`;

                                return (
                                  <button
                                    key={portId}
                                    type="button"
                                    onClick={() => onAddPlayer(padName, portId, slotNumber)}
                                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase rounded-xl border border-indigo-400 whitespace-nowrap"
                                  >
                                    {padName}
                                  </button>
                                );
                              })
                            ) : (
                              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic animate-pulse">
                                {isPadsConnected ? "Waiting for Pad..." : "Offline"}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-black text-slate-500 mb-2 uppercase">{t?.points || "Points"}</span>
                      <input
                        type="number"
                        disabled={!assignedPlayer}
                        value={assignedPlayer ? (localPlayers.find(lp => lp.id === assignedPlayer.id)?.score || 0) : 0}
                        onChange={(e) => handleLocalUpdate(slotNumber, assignedPlayer?.name || '', parseInt(e.target.value) || 0)}
                        onBlur={() => handleSaveAndBlur(slotNumber)}
                        className={`w-28 h-[84px] border-2 rounded-[2rem] px-2 font-black text-3xl text-center outline-none transition-all ${assignedPlayer
                          ? 'bg-slate-800 border-indigo-500 text-indigo-400 focus:border-indigo-400'
                          : 'bg-slate-900/50 border-slate-800 text-slate-700 opacity-20'
                          }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* {isPadsConnected && players.length < 3 && (
              <button
                type="button"
                onClick={() => onAddPlayer("", undefined, players.length + 1)}
                className="w-full mt-6 py-5 rounded-2xl border-2 border-dashed border-slate-700 text-slate-500 font-bold hover:border-indigo-500 hover:text-indigo-400 transition-all flex items-center justify-center gap-2"
              >
                <UserPlus size={20} /> Add Pad Slot
              </button>
            )} */}

            <div className="mt-8 p-6 rounded-3xl bg-slate-950/50 border border-slate-800 text-center">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                {isPadsConnected
                  ? "USB Gamepad hardware detected and active."
                  : "Plug in USB hardware controllers to activate USB Pads."}
              </p>
            </div>
          </div>

        </div>

        {/* START GAME BUTTON (FULL WIDTH) */}
        <button
          type="button"
          onClick={onStartGame}
          disabled={!players.some(p => p.name && p.name.trim() !== "")}
          className={`w-full py-10 rounded-[3rem] font-black text-4xl uppercase tracking-tighter transition-all flex items-center justify-center gap-6 shadow-2xl ${!players.some(p => p.name && p.name.trim() !== "")
            ? 'bg-slate-900 text-slate-700 cursor-not-allowed border-2 border-slate-800'
            : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.01] active:scale-[0.99] shadow-indigo-900/20'
            }`}
        >
          <PlayCircle size={40} fill="currentColor" />
          {t?.startGame || "Start Game"}
        </button>

      </div>
    </div>
  );
};

export default SetupView;