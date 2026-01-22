import React from 'react';

interface MusicTimelineProps {
  isPlaying: boolean;
  progress: { current: number; total: number };
  isReveal: boolean;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatTime: (seconds: number | undefined) => string;
  t: any;
}


const MusicTimeline: React.FC<MusicTimelineProps> = ({
  isPlaying,
  progress,
  isReveal,
  onSeek,
  formatTime,
  t
}) => {
  if (!isPlaying && progress.current === 0) return null;
  
  return (
    <div className="w-full bg-slate-800 rounded-3xl p-6 border-2 border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.2)] animate-in slide-in-from-top duration-300">
      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2 block text-center">
        {isReveal ? t.fullVersionSeek : t.playbackProgress}
      </span>
      <input 
        type="range" 
        min="0" 
        max={progress.total || 0} 
        value={progress.current} 
        onChange={onSeek} 
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 mb-2" 
      />
      <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase">
        <span>{formatTime(progress.current)}</span>
        <span>{formatTime(progress.total)}</span>
      </div>
    </div>
  );
};

export default MusicTimeline;