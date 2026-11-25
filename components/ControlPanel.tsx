import React from 'react';
import { Play, Square, CheckCircle, XCircle, Clock, Trophy, Music2 } from 'lucide-react';
import { getAvailableSets } from '../data/index_data';
import type { GameState } from '../types';

interface ControlPanelProps {
  gameState: GameState;
  isPlaying: boolean;
  onStart: () => void;
  onStop: () => void;
  onCorrect: () => void;
  onWrong: () => void;
  onFinishRound: () => void;
  currentPoints?: number;
  timeLeft?: number;
  t: any;
  disabledActions?: boolean;
  isStartDisabled?: boolean;
  showTimer?: boolean; // Add this prop
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  gameState,
  isPlaying,
  onStart,
  onStop,
  onCorrect,
  onWrong,
  currentPoints,
  onFinishRound,
  timeLeft,
  t,
  disabledActions = false,
  isStartDisabled = false,
  showTimer = true, // Default to true
}) => {
  const roundId = gameState.activeRoundId;
  const selectedSetId = roundId === null ? null : gameState.roundSets?.[roundId] || 'default';
  const datasetName = roundId === null
    ? null
    : getAvailableSets(roundId).find(set => set.id === selectedSetId)?.name?.[gameState.language];

  const getTimerColor = () => {
    if (timeLeft === undefined) return 'text-slate-500';
    if (timeLeft <= 10) return 'text-red-500 animate-pulse';
    if (timeLeft <= 20) return 'text-yellow-500';
    return 'text-indigo-400';
  };

  const startButtonDisabled = isPlaying || isStartDisabled;

  return (
    <div className="bg-slate-900/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-xl border border-slate-800 p-3 w-full flex flex-col gap-2 animate-in slide-in-from-right duration-500">
      {roundId !== null && (
        <div className="flex items-baseline justify-center gap-2 min-w-0">
          <span className="text-sm font-black text-slate-300 uppercase tracking-wider">
            {t.round} {roundId}
          </span>
          {datasetName && (
            <span className="min-w-0 text-sm font-black text-blue-400 uppercase tracking-wider truncate">
              {datasetName}
            </span>
          )}
        </div>
      )}

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
          className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg font-black transition-all ${startButtonDisabled
            ? 'bg-slate-800 text-slate-700 border border-transparent opacity-50 cursor-not-allowed'
            : 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white hover:scale-105 active:scale-95'
            }`}
        >
          <Play size={16} fill="currentColor" />
          <span className="text-[8px] font-black uppercase tracking-widest">{t.start}</span>
        </button>

        <button
          onClick={onStop}
          disabled={!isPlaying}
          className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg font-black transition-all ${!isPlaying
            ? 'bg-slate-800 text-slate-700 border border-transparent cursor-not-allowed'
            : 'bg-rose-600/20 text-rose-400 border border-rose-500/30 hover:bg-rose-600 hover:text-white hover:scale-105 active:scale-95'
            }`}
        >
          <Square size={16} fill="currentColor" />
          <span className="text-[8px] font-black uppercase tracking-widest">{t.stop}</span>
        </button>
      </div>



      <div className="w-full h-px bg-slate-800" />

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onCorrect}
          disabled={disabledActions}
          className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg font-black transition-all ${disabledActions ? 'bg-slate-800 text-slate-700 border border-transparent opacity-50' : 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white hover:scale-105 active:scale-95'
            }`}
        >
          <CheckCircle size={16} />
          <span className="text-[8px] font-black uppercase tracking-widest">{t.correct}</span>
        </button>
        <button
          onClick={onWrong}
          disabled={disabledActions}
          className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg font-black transition-all ${disabledActions ? 'bg-slate-800 text-slate-700 border border-transparent opacity-50' : 'bg-orange-600/20 text-orange-400 border border-orange-500/30 hover:bg-orange-600 hover:text-white hover:scale-105 active:scale-95'
            }`}
        >
          <XCircle size={16} />
          <span className="text-[8px] font-black uppercase tracking-widest">{t.wrong}</span>
        </button>
      </div>

      <div className="w-full h-px bg-slate-800" />

      {/* 🟢 NEW ROW: FINISH ROUND (Full Width) */}
      <div className="grid grid-cols-2 gap-2">

        <div>
          <input
            id="full-songs-autoplay"
            type="checkbox"
            role="switch"
            aria-label={t.autoPlayFullSongs}
            className="peer sr-only"
          />
          <label
            htmlFor="full-songs-autoplay"
            className="flex cursor-pointer flex-col items-center justify-center gap-0.5 py-2 rounded-lg font-black transition-all duration-200 after:rounded after:px-1 after:py-0.5 after:text-[7px] after:tracking-widest bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-orange-300 hover:border-orange-500/40 hover:scale-105 active:scale-95 after:content-['OFF'] after:bg-slate-900 after:text-slate-500 peer-checked:bg-orange-600 peer-checked:text-white peer-checked:border-orange-400/50 peer-checked:shadow-lg peer-checked:shadow-orange-900/20 peer-checked:hover:bg-orange-500 peer-checked:after:content-['ON'] peer-checked:after:bg-orange-950/40 peer-checked:after:text-orange-100"
          >
            <Music2 size={16} />
            <span className="text-[8px] font-black uppercase tracking-widest">{t.autoPlayFullSongs}</span>
          </label>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onFinishRound?.();
          }}
          className="w-full flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg font-black transition-all bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-900 hover:scale-[1.02] active:scale-95 shadow-lg shadow-amber-900/10 group"
        >
          <Trophy size={16} className="group-hover:animate-bounce" />
          <span className="text-[8px] font-black uppercase tracking-widest">
            {t.finishRound || "Finish Round"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
