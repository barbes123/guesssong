import React from 'react';
import { Play, Square, CheckCircle, XCircle, Clock } from 'lucide-react';

interface ControlPanelProps {
  isPlaying: boolean;
  onStart: () => void;
  onStop: () => void;
  onCorrect: () => void;
  onWrong: () => void;
  currentPoints?: number;
  timeLeft?: number;
  t: any;
  disabledActions?: boolean;
  isStartDisabled?: boolean;
  showTimer?: boolean; // Add this prop
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isPlaying,
  onStart,
  onStop,
  onCorrect,
  onWrong,
  currentPoints,
  timeLeft,
  t,
  disabledActions = false,
  isStartDisabled = false,
  showTimer = true, // Default to true
}) => {
  const getTimerColor = () => {
    if (timeLeft === undefined) return 'text-slate-500';
    if (timeLeft <= 10) return 'text-red-500 animate-pulse';
    if (timeLeft <= 20) return 'text-yellow-500';
    return 'text-indigo-400';
  };

  const startButtonDisabled = isPlaying || isStartDisabled;

  return (
    <div className="bg-slate-900/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-xl border border-slate-800 p-3 w-full flex flex-col gap-2 animate-in slide-in-from-right duration-500">
      <div className="flex items-center justify-between px-0">
        <div className="flex flex-col items-center flex-1">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.12em] mb-0.5">{t.points}</span>
          <div className="text-2xl font-black text-indigo-400 tabular-nums tracking-tighter">
            {currentPoints ?? '--'}
          </div>
        </div>
        
        <div className="w-px h-10 bg-slate-800 mx-1" />

        {/* Timer section - conditionally rendered based on showTimer prop */}
        {showTimer ? (
          <div className="flex flex-col items-center flex-1">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.12em] mb-0.5 flex items-center gap-0.5">
              <Clock size={10} /> {timeLeft !== undefined ? 'TIME' : '--'}
            </span>
            <div className={`text-2xl font-black tabular-nums tracking-tighter transition-colors duration-300 ${getTimerColor()}`}>
              {timeLeft !== undefined ? timeLeft : '--'}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center flex-1">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.12em] mb-0.5 flex items-center gap-0.5">
              <Clock size={10} /> FULL
            </span>
            <div className="text-2xl font-black text-slate-400 tabular-nums tracking-tighter">
              ∞
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onStart}
          disabled={startButtonDisabled}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg font-black text-xs transition-all ${
            startButtonDisabled ? 'bg-slate-800 text-slate-700 cursor-not-allowed opacity-50' : 'bg-emerald-600 text-white shadow-md shadow-emerald-900/20 hover:scale-105 active:scale-95 hover:bg-emerald-500'
          }`}
        >
          <Play size={14} fill="currentColor" />
          {t.start.toUpperCase()}
        </button>
        <button
          onClick={onStop}
          disabled={!isPlaying}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg font-black text-xs transition-all ${
            !isPlaying ? 'bg-slate-800 text-slate-700 cursor-not-allowed' : 'bg-rose-600 text-white shadow-md shadow-rose-900/20 hover:scale-105 active:scale-95 hover:bg-rose-500'
          }`}
        >
          <Square size={14} fill="currentColor" />
          {t.stop.toUpperCase()}
        </button>
      </div>

      <div className="w-full h-px bg-slate-800" />

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onCorrect}
          disabled={disabledActions}
          className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg font-black transition-all ${
            disabledActions ? 'bg-slate-800 text-slate-700 border border-transparent opacity-50' : 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white hover:scale-105 active:scale-95'
          }`}
        >
          <CheckCircle size={16} />
          <span className="text-[8px] font-black uppercase tracking-widest">{t.correct}</span>
        </button>
        <button
          onClick={onWrong}
          disabled={disabledActions}
          className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg font-black transition-all ${
            disabledActions ? 'bg-slate-800 text-slate-700 border border-transparent opacity-50' : 'bg-orange-600/20 text-orange-400 border border-orange-500/30 hover:bg-orange-600 hover:text-white hover:scale-105 active:scale-95'
          }`}
        >
          <XCircle size={16} />
          <span className="text-[8px] font-black uppercase tracking-widest">{t.wrong}</span>
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
