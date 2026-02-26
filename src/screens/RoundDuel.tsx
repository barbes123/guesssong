import React from 'react';
import { ChevronLeft, ChevronRight, HelpCircle, Star } from 'lucide-react';
import PlayerBoard from '../../components/PlayerBoard';
import ControlPanel from '../../components/ControlPanel';
import MusicTimeline from '../../components/MusicTimeline';
import { getRoundData } from '../../data/index_data';
import { GameState } from '../../types';
import { SFX } from '../../data/constants_main';

interface RoundDuelProps {
  gameState: GameState;
  isPlaying: boolean;
  timeLeft: number | undefined;
  audioProgress: { current: number; total: number };
  modal: any;
  t: any;
  selectedDuration: number | null;
  isR3Finalized: boolean;
  onNavigate: (page: any, roundId: number | null) => void;
  onInitializeRound: (roundId: number) => void;
  onUpdatePlayer: (id: number, name: string, score: number, stars?: number) => void;
  onShowModal: (title: string, message: string, onConfirm: () => void, cl?: string, cal?: string, pos?: 'center' | 'inline') => void;
  onSetModal: (modal: any) => void;
  onSetCurrentPlayer: (index: number) => void;
  onAudioControl: (action: 'start' | 'stop') => void;
  onFinalizeTurn: (status: 'correct' | 'wrong' | 'skip') => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatTime: (seconds: number | undefined) => string;
  onSetSelectedDuration: (duration: number | null) => void;
  onPlaySFX: (url: string) => void;
  onNextTurnNav: () => void;
  onStopSong: () => void;
}

const RoundDuel: React.FC<RoundDuelProps> = ({
  gameState,
  isPlaying,
  timeLeft,
  audioProgress,
  modal,
  t,
  selectedDuration,
  isR3Finalized,
  onNavigate,
  onInitializeRound,
  onUpdatePlayer,
  onShowModal,
  onSetModal,
  onSetCurrentPlayer,
  onAudioControl,
  onFinalizeTurn,
  onSeek,
  formatTime,
  onSetSelectedDuration,
  onPlaySFX,
  onNextTurnNav,
  onStopSong
}) => {
  const roundId = 3;
  const progress = gameState.roundProgress[roundId];
  if (!progress) return null;

  const selectedSetId = gameState.roundSets[roundId] || 'default';
  const roundData = getRoundData(roundId, selectedSetId) || [];
  const turnIdx = progress.currentTurnIndex || 0;
  const song = roundData[0]?.songs ? roundData[0].songs[turnIdx] : null;
  const isSongUsed = progress.usedNotes?.has(`r3_final-${turnIdx}`);

  const duelIds = progress.activePlayerIds || [];
  const leftId = duelIds[0];
  const rightId = duelIds[1];
  const leftPlayer = gameState.players.find(p => p.id === leftId) || gameState.players[0];
  const rightPlayer = rightId !== undefined ? (gameState.players.find(p => p.id === rightId) || null) : null;
  const hasWinner = (leftPlayer.stars || 0) >= 3 || (rightPlayer?.stars || 0) >= 3;

  return (
    // De-zoomed: changed p-8 to p-6 and pt-24 to pt-20
    <div className="min-h-screen bg-slate-950 p-6 pt-20">
      {/* De-zoomed: changed gap-12 to gap-8 */}
      <div className="max-w-[1600px] mx-auto flex gap-8">
        
        <div className="flex-1 flex flex-col gap-8">
          {/* HEADER - De-zoomed: p-16 to p-8, rounded-5rem to 3xl */}
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-slate-800 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-3 bg-indigo-600/10">
              <div className="bg-indigo-600 h-full transition-all duration-1000" style={{ width: `${((turnIdx + 1) / 5) * 100}%` }} />
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {/* De-zoomed: w-20 to w-14, text-5xl to text-3xl */}
                <div className="bg-indigo-600 text-white w-14 h-14 rounded-xl flex items-center justify-center text-3xl font-black shadow-lg shadow-indigo-900/30 ring-4 ring-indigo-500/20">3</div>
                <h2 className="text-4xl font-black text-white tracking-tighter uppercase">{t.categories.superGame}</h2>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => { if (!isPlaying) onNavigate('round', 2); }} 
                  className={`p-3 rounded-lg transition-all ${isPlaying ? 'opacity-20 cursor-not-allowed bg-slate-800' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:scale-105 shadow-md'}`}
                  disabled={isPlaying}
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => {
                    if (isPlaying) return;
                    onShowModal(t.mainMenu, "Go to Round 4 (Sprint)?", () => {
                      onStopSong();
                      onInitializeRound(4);
                      onNavigate('round', 4);
                    }, t.yes, t.no, 'center');
                  }} 
                  className={`p-3 rounded-lg transition-all ${isPlaying ? 'opacity-20 cursor-not-allowed bg-slate-800' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:scale-105 shadow-md'}`}
                  disabled={isPlaying}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            {/* HINT AREA - De-zoomed: p-16 to p-8, text-5xl to 3xl */}
            <div className="bg-slate-800/40 rounded-2xl p-8 border-2 border-slate-700/50 mb-8 shadow-inner">
              <HelpCircle size={48} className="text-indigo-500 mx-auto mb-4" />
              <p className="text-3xl font-black text-white italic">
                "{gameState.language === 'en' ? song?.hint?.en : song?.hint?.ru}"
              </p>
            </div>

            {/* DURATION SELECTORS - De-zoomed: w-32 to w-20 */}
            <div className="flex justify-center gap-5">
              {[1, 2, 3, 4, 5].map(s => (
                <button 
                  key={s} 
                  onClick={() => { onSetSelectedDuration(s); onPlaySFX(SFX.button); }} 
                  className={`w-20 h-20 rounded-lg border-3 transition-all ${selectedDuration === s ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                >
                  <span className="text-3xl font-black">{s}</span>
                </button>
              ))}
              <div className="relative">
                <button 
                  onClick={() => { if (isR3Finalized) { onSetSelectedDuration(null); onPlaySFX(SFX.button); } }} 
                  className={`px-8 h-20 rounded-lg border-3 transition-all ${selectedDuration === null ? 'bg-indigo-800 border-white text-white scale-110 shadow-lg z-10' : !isR3Finalized ? 'bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                  disabled={!isR3Finalized}
                >
                  <span className="text-2xl font-black uppercase tracking-widest">{t.full}</span>
                </button>
                {!isR3Finalized && (
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-lg border border-slate-700 whitespace-nowrap z-20 animate-pulse">
                    ← First press CORRECT or WRONG
                  </div>
                )}
              </div>
            </div>
            
            {isR3Finalized && (
              <button 
                onClick={onNextTurnNav} 
                className={`mt-8 py-4 px-12 rounded-xl text-white font-black text-xl uppercase ${hasWinner ? 'bg-slate-700 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500'}`}
                disabled={hasWinner}
              >
                {hasWinner ? "Duel Finished" : "Next Turn"}
              </button>
            )}
          </div>
          
          {/* PLAYER BOARD - De-zoomed: p-12 to p-6 */}
          <div className="bg-slate-900/50 p-6 rounded-3xl border-2 border-slate-800">
            <PlayerBoard 
              players={gameState.players} 
              currentPlayerIndex={gameState.currentPlayerIndex} 
              onUpdatePlayer={onUpdatePlayer} 
              onSetCurrentPlayer={onSetCurrentPlayer} 
              t={t} 
              activePlayerIds={progress.activePlayerIds} 
            />
          </div>
        </div>
        
        {/* SIDEBAR - De-zoomed: w-450 to w-380 */}
        <div className="w-[380px] flex flex-col gap-6 relative">
          <div className="bg-slate-800 rounded-2xl p-6 border-2 border-slate-700 shadow-lg flex flex-col items-center gap-2">
            <span className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] mb-1">
              {t.turn || "TURN"} {turnIdx + 1} / 5
            </span>

            <div className="grid grid-cols-2 gap-4 w-full">
              {/* Left Player */}
              <div className="flex flex-col items-center">
                <div className="text-base font-black text-indigo-300 mb-2 text-center break-words min-h-[2.5rem] flex items-center justify-center">
                  <div className="leading-tight">{leftPlayer.name || `P${leftPlayer.id + 1}`}</div>
                </div>
                <div className="bg-indigo-900/40 px-4 py-2 rounded-2xl border-2 border-indigo-500/30 flex flex-col gap-1">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((starNum) => (
                      <Star key={starNum} size={20} className={(leftPlayer.stars || 0) >= starNum ? 'text-yellow-400 fill-yellow-400' : 'text-indigo-900/40 fill-indigo-900/40'} />
                    ))}
                  </div>
                </div> 
              </div>
              
              {/* Right Player */}
              <div className="flex flex-col items-center">
                <div className="text-base font-black text-rose-300 mb-2 text-center break-words min-h-[2.5rem] flex items-center justify-center">
                  <div className="leading-tight">{rightPlayer ? (rightPlayer.name || `P${rightPlayer.id + 1}`) : '--'}</div>
                </div>
                <div className="bg-rose-900/40 px-4 py-2 rounded-2xl border-2 border-rose-500/30 flex flex-col gap-1">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((starNum) => (
                      <Star key={starNum} size={20} className={(rightPlayer?.stars || 0) >= starNum ? 'text-yellow-400 fill-yellow-400' : 'text-rose-900/40 fill-rose-900/40'} />
                    ))}
                  </div>
                </div>
              </div>
            </div>    
          </div>

          <ControlPanel 
            isPlaying={isPlaying} 
            onStart={() => onAudioControl('start')} 
            onStop={() => onAudioControl('stop')} 
            onCorrect={() => onFinalizeTurn('correct')} 
            onWrong={() => onFinalizeTurn('wrong')} 
            timeLeft={timeLeft} 
            t={t} 
            disabledActions={isR3Finalized || !!isSongUsed} 
            isStartDisabled={!isR3Finalized && selectedDuration === null} 
          />
          
          <MusicTimeline 
            isPlaying={isPlaying}
            progress={audioProgress}
            isReveal={isR3Finalized || selectedDuration === null}
            onSeek={onSeek}
            formatTime={formatTime}
            t={t}
          />

          {modal?.isOpen && modal.position === 'inline' && (
            <div className="w-full bg-slate-800 rounded-2xl p-4 border-2 border-indigo-500 shadow-2xl animate-in fade-in slide-in-from-top duration-300">
              <h3 className="text-[10px] font-black text-white mb-2 uppercase tracking-widest text-center">{modal.title}</h3>
              <p className="text-slate-400 text-[9px] mb-3 text-center">{modal.message}</p>
              <div className="flex flex-col gap-2">
                <button onClick={modal.onConfirm} className="w-full py-2 rounded-lg bg-indigo-600 text-white font-black uppercase text-[9px]">{modal.confirmLabel}</button>
                <button onClick={() => onSetModal(null)} className="w-full py-2 rounded-lg bg-slate-700 text-slate-300 font-bold uppercase text-[9px]">{modal.cancelLabel}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoundDuel;