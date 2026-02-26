import React from 'react';
import { ChevronLeft, ChevronRight, HelpCircle, Star, Zap } from 'lucide-react';
import PlayerBoard from '../../components/PlayerBoard'; // Adjust path
import ControlPanel from '../../components/ControlPanel'; // Adjust path
import MusicTimeline from '../../components/MusicTimeline'; // Adjust path
import { getRoundData } from '../../data/index_data'; // Adjust path
import { GameState } from '../../types';
// import { SFX } from '../../data/index_data';
import { SFX } from '../../data/constants_main';


interface RoundDuelProps {
  gameState: GameState;
  isPlaying: boolean;
  timeLeft: number | undefined;
  audioProgress: { current: number; total: number };
  modal: any;
  t: any;
  // Round 3 Specific State
  selectedDuration: number | null;
  isR3Finalized: boolean;
  // Actions
  onNavigate: (page: any, roundId: number | null) => void;
  onInitializeRound: (roundId: number) => void;
  onUpdatePlayer: (id: number, name: string, score: number, stars?: number) => void;
  onShowModal: (title: string, message: string, onConfirm: () => void) => void;
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
  
  // In Round 3 (Duel), we often use the old Round 6 data structure or custom logic.
  // Assuming getRoundData returns the correct structure.
  const turnIdx = progress.currentTurnIndex || 0;
  // Safe check if songs exist
  const song = roundData[0]?.songs ? roundData[0].songs[turnIdx] : null;
  const isSongUsed = progress.usedNotes?.has(`r3_final-${turnIdx}`);

  // Determine Players (Left vs Right)
  const duelIds = progress.activePlayerIds || [];
  const leftId = duelIds[0];
  const rightId = duelIds[1];
  const leftPlayer = gameState.players.find(p => p.id === leftId) || gameState.players[0];
  const rightPlayer = rightId !== undefined ? (gameState.players.find(p => p.id === rightId) || null) : null;

  const hasWinner = (leftPlayer.stars || 0) >= 3 || (rightPlayer?.stars || 0) >= 3;

  return (
    <div className="min-h-screen bg-slate-950 p-8 pt-24">
      <div className="max-w-[1600px] mx-auto flex gap-12">
        <div className="flex-1 flex flex-col gap-12">
          
          {/* HEADER */}
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-[5rem] p-16 border-2 border-slate-800 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-4 bg-indigo-600/10">
              <div className="bg-indigo-600 h-full transition-all duration-1000" style={{ width: `${((turnIdx+1)/5)*100}%` }} />
            </div>
            
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-6">
                <div className="bg-indigo-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center text-5xl font-black shadow-lg shadow-indigo-900/30 ring-4 ring-indigo-500/20">3</div>
                <h2 className="text-6xl font-black text-white tracking-tighter uppercase">{t.categories.superGame}</h2>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => { 
                    if (isPlaying) return;
                    onNavigate('round', 2);
                  }} 
                  className={`p-6 rounded-2xl transition-all ${isPlaying ? 'opacity-20 cursor-not-allowed bg-slate-800' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:scale-105 active:scale-95 shadow-lg'}`}
                  disabled={isPlaying}
                >
                  <ChevronLeft size={40} />
                </button>
                
                <button 
                  onClick={() => { 
                    if (isPlaying) return;
                    onShowModal(
                      t.mainMenu, 
                      "Go to Round 4 (Sprint)?", 
                      () => {
                        onStopSong();
                        onInitializeRound(4);
                        onNavigate('round', 4);
                        onSetModal(null);
                      }
                    );
                  }} 
                  className={`p-6 rounded-2xl transition-all ${isPlaying ? 'opacity-20 cursor-not-allowed bg-slate-800' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:scale-105 active:scale-95 shadow-lg'}`}
                  disabled={isPlaying}
                >
                  <ChevronRight size={40} />
                </button>
              </div>
            </div>

            <div className="bg-slate-800/40 rounded-[4rem] p-16 border-2 border-slate-700/50 mb-14 shadow-inner group">
              <HelpCircle size={80} className="text-indigo-500 mx-auto mb-8" />
              <p className="text-5xl font-black text-white italic">
                "{gameState.language === 'en' ? song?.hint?.en : song?.hint?.ru}"
              </p>
            </div>

            {/* DURATION SELECTORS */}
            <div className="flex justify-center gap-8">
              {[1, 2, 3, 4, 5].map(s => (
                <button 
                  key={s} 
                  onClick={() => { onSetSelectedDuration(s); onPlaySFX(SFX.button); }} 
                  className={`w-32 h-32 rounded-[2rem] border-4 transition-all ${selectedDuration === s ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                >
                  <span className="text-5xl font-black">{s}</span>
                </button>
              ))}
              <div className="relative">
                <button 
                  onClick={() => { 
                    if (!isR3Finalized) return; 
                    onSetSelectedDuration(null); 
                    onPlaySFX(SFX.button); 
                  }} 
                  className={`px-14 h-32 rounded-[2rem] border-4 transition-all ${
                    selectedDuration === null ? 'bg-indigo-800 border-white text-white scale-110 shadow-2xl z-10' : 
                    !isR3Finalized ? 'bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed' :
                    'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                  disabled={!isR3Finalized}
                >
                  <span className="text-4xl font-black uppercase tracking-widest">{t.full}</span>
                </button>
                
                {!isR3Finalized && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded-xl border border-slate-700 whitespace-nowrap z-20 animate-pulse">
                    ← First press CORRECT or WRONG
                  </div>
                )}
              </div>
            </div>
            
            {isR3Finalized && (
              hasWinner ? (
                <button 
                  onClick={() => onShowModal("Game Over", "The duel has ended!", () => {})} 
                  className="mt-16 py-8 px-20 rounded-[2.5rem] bg-slate-700 text-slate-400 font-black text-3xl uppercase cursor-not-allowed"
                  disabled
                >
                  Next Turn Disabled
                </button>
              ) : (
                <button 
                  onClick={onNextTurnNav} 
                  className="mt-16 py-8 px-20 rounded-[2.5rem] bg-emerald-600 text-white font-black text-3xl uppercase"
                >
                  Next Turn
                </button>
              )
            )}
          </div>
          
          <div className="bg-slate-900/50 p-12 rounded-[5rem] border-2 border-slate-800">
            <PlayerBoard 
              players={gameState.players} 
              currentPlayerIndex={gameState.currentPlayerIndex} 
              onUpdatePlayer={onUpdatePlayer} 
              onSetCurrentPlayer={(idx) => { 
                if(progress.activePlayerIds?.includes(gameState.players[idx].id)) 
                  onShowModal(t.playerName, t.confirmPlayerActive, () => { 
                    onSetCurrentPlayer(idx); 
                    onSetModal(null); 
                  }); 
              }} 
              t={t} 
              activePlayerIds={progress.activePlayerIds} 
            />
          </div>
        </div>
        
        {/* SIDEBAR */}
        <div className="w-[450px] flex flex-col gap-10 relative">
          <div className="bg-slate-800 rounded-[3rem] p-12 border-2 border-slate-700 shadow-2xl flex flex-col items-center gap-4">
            <span className="text-lg font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">
              {t.turn || "TURN"} {turnIdx + 1} / 5
            </span>

            <div className="grid grid-cols-2 gap-8 w-full">
              {/* Left Player Stars */}
              <div className="flex flex-col items-center">
                <div className="text-2xl font-black text-indigo-300 mb-3 text-center break-words whitespace-normal w-full px-2 min-h-[4rem] flex items-center justify-center">
                  <div className="leading-tight">{leftPlayer.name || `Player ${leftPlayer.id + 1}`}</div>
                </div>
                <div className="bg-indigo-900/40 px-6 py-4 rounded-3xl border-2 border-indigo-500/30 shadow-inner flex flex-col items-center">
                  <div className="flex flex-col gap-2">
                    {[1, 2, 3].map((starNum) => {
                      const isFilled = (leftPlayer.stars || 0) >= starNum;
                      return <Star key={starNum} size={28} className={`${isFilled ? 'text-yellow-400 fill-yellow-400' : 'text-indigo-900/40 fill-indigo-900/40'}`} />;
                    })}
                  </div>
                </div> 
              </div>
              
              {/* Right Player Stars */}
              <div className="flex flex-col items-center">
                <div className="text-2xl font-black text-rose-300 mb-3 text-center break-words whitespace-normal w-full px-2 min-h-[4rem] flex items-center justify-center">
                  <div className="leading-tight">{rightPlayer ? (rightPlayer.name || `Player ${rightPlayer.id + 1}`) : '--'}</div>
                </div>
                <div className="bg-rose-900/40 px-6 py-4 rounded-3xl border-2 border-rose-500/30 shadow-inner flex flex-col items-center">
                  <div className="flex flex-col gap-2">
                    {[1, 2, 3].map((starNum) => {
                      const opponentStars = rightPlayer?.stars || 0;
                      const isFilled = opponentStars >= starNum;
                      return <Star key={starNum} size={28} className={`${isFilled ? 'text-yellow-400 fill-yellow-400' : 'text-rose-900/40 fill-rose-900/40'}`} />;
                    })}
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
            // isReveal={false} // Round 3 typically reveals via logic, not manual Seek in reveal mode
            isReveal={isR3Finalized || selectedDuration === null}
            onSeek={onSeek}
            formatTime={formatTime}
            t={t}
          />

          {modal?.isOpen && modal.position === 'inline' && (
            <div className="w-full bg-slate-800 rounded-3xl p-6 border-2 border-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.3)] animate-in fade-in slide-in-from-top duration-300">
              <h3 className="text-xs font-black text-white mb-2 leading-tight uppercase tracking-widest text-center">{modal.title}</h3>
              <p className="text-slate-400 text-[10px] mb-4 font-medium text-center">{modal.message}</p>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={modal.onConfirm} 
                  className="w-full py-3 rounded-xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-900/40"
                >
                  {modal.confirmLabel}
                </button>
                <button 
                  onClick={() => onSetModal(null)} 
                  className="w-full py-3 rounded-xl bg-slate-700 text-slate-300 font-bold hover:bg-slate-600 transition-colors uppercase tracking-widest text-[10px]"
                >
                  {modal.cancelLabel}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoundDuel;