
import React from 'react';
import { Music, VolumeX, Maximize, Minimize, Languages, Home, Play, RotateCcw, Wifi, WifiOff } from 'lucide-react';
import { Language } from '../types';

interface SettingsOverlayProps {
  language: Language;
  onLanguageToggle: () => void;
  isMusicEnabled: boolean;
  onMusicToggle: () => void;
  isFullscreen: boolean;
  onFullscreenToggle: () => void;
  onGoHome: () => void;
  onGoStart: () => void;
  onReset: () => void;
  volume?: number;
  onVolumeChange?: (volume: number) => void;  
  t: any;
  isLocked?: boolean;
  isBuzzerConnected: boolean;
}

const SettingsOverlay: React.FC<SettingsOverlayProps> = ({
  language,
  onLanguageToggle,
  isMusicEnabled,
  onMusicToggle,
  isFullscreen,
  onFullscreenToggle,
  onGoHome,
  onGoStart,
  onReset,
  volume = 0.7,
  // onVolumeChange = () => {},
  onVolumeChange = (_v: number) => {},
  t,
  isLocked = false,
  isBuzzerConnected
}) => {
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val4vol = parseFloat(e.target.value);
    onVolumeChange(val4vol);
  };

  return (
    // <div className="fixed top-6 right-6 flex items-center gap-3 z-50">
    <div className="fixed top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
      <div className="bg-slate-800/95 backdrop-blur-xl rounded-full shadow-2xl border border-slate-700/50 p-2 flex items-center gap-2">

      {/* --- BUZZER CONNECTION STATUS --- */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 ${
          isBuzzerConnected 
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
            : 'bg-rose-500/20 text-rose-500 border border-rose-500/40 animate-pulse'
        }`}>
          {isBuzzerConnected ? <Wifi size={16} /> : <WifiOff size={16} />}
          <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">
            {isBuzzerConnected ? 'Linked' : 'Offline'}
          </span>
        </div>

        <div className="w-px h-8 bg-slate-700 mx-1" />


        {/* Volume Control */}
        <div className="flex items-center gap-2 px-2">
          <VolumeX size={18} className="text-slate-500" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            style={{
              background: `linear-gradient(to right, rgb(99, 102, 241) 0%, rgb(99, 102, 241) ${volume * 100}%, rgb(55, 65, 81) ${volume * 100}%, rgb(55, 65, 81) 100%)`
            }}
          />
          <span className="text-xs font-bold text-slate-400 w-6 text-right">
            {Math.round(volume * 100)}%
          </span>
        </div>
        <div className="w-px h-8 bg-slate-700 mx-1" />
        <button
          onClick={onGoHome}
          disabled={isLocked}
          className={`p-3 rounded-full transition-all ${isLocked ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-700 text-slate-300 hover:scale-110'}`}
          title={isLocked ? t.waitingTurn : t.mainMenu}
        >
          <Home size={24} />
        </button>
        <button
          onClick={onGoStart}
          disabled={isLocked}
          className={`p-3 rounded-full transition-all ${isLocked ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-700 text-slate-300 hover:scale-110'}`}
          title={isLocked ? t.waitingTurn : t.startPage}
        >
          <Play size={24} />
        </button>
        <button
          onClick={onReset}
          disabled={isLocked}
          className={`p-3 rounded-full transition-all ${isLocked ? 'opacity-30 cursor-not-allowed' : 'hover:bg-red-900/30 text-red-400 hover:scale-110'}`}
          title={isLocked ? t.waitingTurn : t.reset}
        >
          <RotateCcw size={24} />
        </button>
        <div className="w-px h-8 bg-slate-700 mx-1" />
        <button
          onClick={onLanguageToggle}
          className="p-3 hover:bg-slate-700 rounded-full transition-all text-slate-300 flex items-center gap-2 px-4 hover:scale-105"
        >
          <Languages size={22} />
          <span className="text-sm font-black uppercase tracking-widest">{language === 'en' ? 'RU' : 'EN'}</span>
        </button>
        <button
          onClick={onMusicToggle}
          className={`p-3 rounded-full transition-all hover:scale-110 ${isMusicEnabled ? 'text-indigo-400 bg-indigo-900/40' : 'text-slate-500 bg-slate-900/40'}`}
        >
          {isMusicEnabled ? <Music size={24} /> : <VolumeX size={24} />}
        </button>
        <button
          onClick={onFullscreenToggle}
          className="p-3 hover:bg-slate-700 rounded-full transition-all text-slate-300 hover:scale-110"
        >
          {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
        </button>
      </div>
    </div>
  );
};

export default SettingsOverlay;

