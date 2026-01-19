import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VolumeBarProps {
  volume: number; // 0 to 1
  onVolumeChange: (volume: number) => void;
  compact?: boolean;
}

const VolumeBar: React.FC<VolumeBarProps> = ({ volume, onVolumeChange, compact = false }) => {
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    onVolumeChange(newVolume);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (compact) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onVolumeChange(Math.max(0, Math.min(1, percent)));
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          style={{
            background: `linear-gradient(to right, rgb(99, 102, 241) 0%, rgb(99, 102, 241) ${volume * 100}%, rgb(55, 65, 81) ${volume * 100}%, rgb(55, 65, 81) 100%)`
          }}
        />
        <span className="text-xs font-bold text-slate-400 w-8 text-right">
          {Math.round(volume * 100)}%
        </span>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2.5rem] border border-slate-800 p-6 w-full animate-in slide-in-from-bottom duration-500">
      <div className="flex items-center justify-between gap-4">
        <VolumeX size={20} className="text-slate-500" />
        
        <div 
          className="flex-1 h-2 bg-slate-700 rounded-full cursor-pointer relative group"
          onClick={handleClick}
        >
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all"
            style={{ width: `${volume * 100}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-indigo-500 rounded-full shadow-lg shadow-indigo-900/50 transition-all opacity-0 group-hover:opacity-100"
            style={{ left: `${volume * 100}%`, transform: 'translate(-50%, -50%)' }}
          />
        </div>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-32 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          style={{
            background: `linear-gradient(to right, rgb(99, 102, 241) 0%, rgb(99, 102, 241) ${volume * 100}%, rgb(55, 65, 81) ${volume * 100}%, rgb(55, 65, 81) 100%)`
          }}
        />

        <Volume2 size={20} className="text-indigo-400" />
        
        <span className="text-sm font-black text-indigo-400 w-12 text-right">
          {Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  );
};

export default VolumeBar;
