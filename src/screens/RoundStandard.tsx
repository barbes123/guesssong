import React from 'react';
import { ChevronLeft, ChevronRight, Music as MusicIcon, PlayCircle } from 'lucide-react';
import PlayerBoard from '../../components/PlayerBoard'; // Adjust path if needed
import ControlPanel from '../../components/ControlPanel'; // Adjust path if needed
// import MusicTimeline from '../../components/MusicTimeline'; // The file you just created
import { getRoundData } from '../../data/index_data'; // Adjust path
import { GameState } from '../../types'; // Adjust path
import MusicTimeline from '../../components/MusicTimeline';



interface RoundStandardProps {
  gameState: GameState;
  activeNote: { categoryId: string; noteIndex: number; isReveal?: boolean } | null;
  currentRoundPoints: number | undefined;
  isPlaying: boolean;
  timeLeft: number | undefined;
  audioProgress: { current: number; total: number };
  modal: any;
  t: any;
  activeResponder: string | null;
  players: any[];
  onFinishRound: () => void;
  // Actions
  onNavigate: (page: any, roundId: number | null) => void;
  onInitializeRound: (roundId: number) => void;
  onNoteClick: (categoryId: string, noteIndex: number) => void;
  onUpdatePlayer: (id: number, name: string, score: number, stars?: number) => void;
  onShowModal: (title: string, message: string, onConfirm: () => void, confirmLabel?: string, cancelLabel?: string, position?: 'center' | 'inline') => void;
  onSetModal: (modal: any) => void;
  onSetCurrentPlayer: (index: number) => void;
  onAudioControl: (action: 'start' | 'stop') => void;
  onFinalizeTurn: (status: 'correct' | 'wrong' | 'skip') => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatTime: (seconds: number | undefined) => string;
}

const RoundStandard: React.FC<RoundStandardProps> = ({
  gameState,
  activeNote,
  currentRoundPoints,
  isPlaying,
  timeLeft,
  audioProgress,
  modal,
  t,
  onNavigate,
  onInitializeRound,
  onNoteClick,
  onUpdatePlayer,
  onShowModal,
  onSetModal,
  onSetCurrentPlayer,
  onAudioControl,
  onFinalizeTurn,
  onSeek,
  formatTime,
  activeResponder,
  players = [],
  onFinishRound,
  onShowRoundSummary  // players
}) => {

  const roundId = gameState.activeRoundId!;
  // const isBuzzerRound = roundId === 1 || roundId === 2;

  // // Find the index of the person who buzzed
  // const buzzerIndex = (players || []).findIndex(p => p?.hubId === activeResponder);

  // // THE MASTER INDEX: 
  // // Use the buzzer if it's active and found; otherwise, use your manual appointment.
  // const visualActiveIndex = (isBuzzerRound && activeResponder && buzzerIndex !== -1)
  //   ? buzzerIndex
  //   : gameState.currentPlayerIndex;

  // // Use this for any name/score displays in the sidebar
  // const displayPlayer = gameState.players[visualActiveIndex] || gameState.players[0];


  // const roundId = gameState.activeRoundId!;
  const progress = gameState.roundProgress[roundId];

  const selectedSetId = gameState.roundSets[roundId] || 'default';
  const roundData = getRoundData(roundId, selectedSetId) || [];
  const isMelodyRound = roundId === 2;


  // 1. Identify if someone is ACTIVELY buzzing right now
  const buzzerWinner = (players || []).find(p => p?.hubId === activeResponder);

  // 2. Decide who the SIDEBAR shows (ControlBoard)
  // We only swap to the buzzer winner if activeResponder actually has a value
  const currentPlayer = activeResponder && buzzerWinner
    ? buzzerWinner
    : gameState.players[gameState.currentPlayerIndex];

  // 3. Decide who the PLAYERBOARD highlights
  const highlightIndex = activeResponder && buzzerWinner
    ? gameState.players.findIndex(p => p.hubId === activeResponder)
    : gameState.currentPlayerIndex;

  // const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  // // const buzzerWinner = players.find(p => p.hubId === activeResponder);
  // const buzzerWinner = (players || []).find(p => p?.hubId === activeResponder);
  // const currentPlayer = buzzerWinner || gameState.players[gameState.currentPlayerIndex];

  console.log("🔍 DEBUG: activeResponder:", activeResponder, "Winner Found:", buzzerWinner?.name);


  // //To send buzz resukta to PlayerDisplay
  // const buzzerIdx = (players || []).findIndex(p => p?.hubId === activeResponder);
  // const isBuzzerActive = activeResponder && buzzerIdx !== -1;
  // // The "Visual Index" determines who gets the main highlight
  // const visualActiveIndex = isBuzzerActive ? buzzerIdx : gameState.currentPlayerIndex;




  return (
    <div className="min-h-screen bg-slate-950 p-6 pt-20">
      <div className="max-w-[1600px] mx-auto flex gap-8">
        <div className="flex-1 flex flex-col gap-8">
          {/* HEADER */}
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-slate-800 text-center relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-600 text-white w-14 h-14 rounded-xl flex items-center justify-center text-3xl font-black shadow-lg shadow-indigo-900/30 ring-4 ring-indigo-500/20">
                  {roundId}
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white tracking-tighter uppercase">
                    {roundId === 0 ? 'Warm-up' : `${t.round} ${roundId}`}
                  </h2>
                  <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-1">
                    {roundId === 0 ? 'WARM-UP / PRACTICE' : (isMelodyRound ? t.melodyGuess : t.songChallenge)}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  // onClick={() => {
                  //   const pr = Math.max(1, roundId - 1);
                  //   onInitializeRound(pr);
                  //   onNavigate('round', pr);
                  // }}

                  onClick={() => {
                    const pr = roundId - 1; // 🟢 Calculate the previous ID
                    if (pr >= 0) { // 🟢 If it's 0 or higher, go to that round
                      onInitializeRound(pr);
                      onNavigate('round', pr);
                    } else {
                      onNavigate('start', null); // 🟢 If we are at 0, go back to the Start page
                    }
                  }}
                  className="p-3 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => {
                    if (roundId < 4) {
                      const nxt = roundId + 1;
                      onInitializeRound(nxt);
                      onNavigate('round', nxt);
                    }
                  }}
                  className="p-3 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 gap-5">
              {roundData.map(cat => {
                const activatedCount = progress.activationCounts[cat.id] || 0;
                const isCategoryFinished = progress.activatedCategories.has(cat.id);
                const isPointsActiveInTurn = activeNote?.categoryId === cat.id && activeNote?.noteIndex === 0 && !activeNote.isReveal;

                return (
                  <div
                    key={cat.id}
                    className={`flex items-center gap-5 p-5 rounded-2xl border-3 transition-all ${activeNote?.categoryId === cat.id ? 'bg-indigo-900/20 border-indigo-500/50' : 'bg-slate-800/20 border-slate-700'
                      } ${isCategoryFinished ? 'opacity-40' : ''}`}
                  >
                    <div className={`w-48 h-28 flex items-center justify-center rounded-2xl border-3 font-black text-lg text-center px-6 leading-tight ${isCategoryFinished ? 'bg-slate-800 text-slate-600 border-slate-700' : 'bg-slate-800 text-slate-200 border-slate-700'
                      }`}>
                      {gameState.language === 'en' ? cat.name.en : cat.name.ru}
                    </div>

                    <div className={`flex-1 grid ${isMelodyRound ? 'grid-cols-5' : 'grid-cols-4'} gap-4`}>
                      {isMelodyRound ? (
                        <>
                          <button
                            onClick={() => onNoteClick(cat.id, 0)}
                            className={`h-24 rounded-2xl transition-all flex flex-col items-center justify-center border-3 relative overflow-hidden ${isPointsActiveInTurn ? 'bg-indigo-600 text-white scale-110 shadow-[0_0_40px_rgba(99,102,241,0.6)] border-indigo-400 z-10' :
                              'bg-slate-800 border-slate-700 text-indigo-400 hover:border-indigo-500/50 hover:bg-slate-700'
                              }`}
                            disabled={isCategoryFinished}
                          >
                            {isPointsActiveInTurn && isPlaying && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
                            {(activatedCount === 0 && !isPointsActiveInTurn) ? (
                              <MusicIcon size={32} className="opacity-40" />
                            ) : (
                              <span className="text-4xl font-black tracking-tighter">
                                {isPointsActiveInTurn ? currentRoundPoints : (progress.persistentPoints?.[`${cat.id}-0`] || 0)}
                              </span>
                            )}
                            <div className="absolute top-2 right-2 text-[9px] font-black uppercase opacity-50 bg-slate-900/50 px-1 rounded text-center">
                              {4 - activatedCount} L
                            </div>
                          </button>

                          {[1, 2, 3, 4].map((idx) => {
                            const songIdx = idx - 1;
                            const isUnlocked = songIdx < activatedCount;
                            const isSelectedReveal = activeNote?.categoryId === cat.id && activeNote?.noteIndex === idx && activeNote.isReveal;
                            const noteId = `${cat.id}-${idx}`;
                            const isUsed = progress.usedNotes.has(noteId);
                            const result = progress.results?.[noteId];

                            let btnCls = `h-24 rounded-2xl border-3 flex items-center justify-center transition-all `;

                            if (!isUnlocked) {
                              btnCls += `bg-slate-900/50 border-dashed border-slate-700 text-slate-800 cursor-not-allowed `;
                            } else if (isSelectedReveal) {
                              btnCls += `bg-indigo-800 border-white text-white animate-pulse shadow-[0_0_50px_rgba(99,102,241,0.7)] ring-4 ring-indigo-500/50 z-10 `;
                            } else if (isUsed) {
                              if (result === 'correct') {
                                btnCls += `bg-emerald-900/60 text-emerald-400 border-emerald-500/50 hover:bg-emerald-800/80 hover:border-emerald-400 `;
                              } else if (result === 'wrong') {
                                btnCls += `bg-rose-900/60 text-rose-400 border-rose-500/50 hover:bg-rose-800/80 hover:border-rose-400 `;
                              } else {
                                btnCls += `bg-slate-800 border-slate-600 text-slate-500 hover:bg-slate-700 hover:text-indigo-400 hover:border-slate-500 `;
                              }
                            } else {
                              btnCls += `bg-slate-800 border-slate-700 text-slate-500 hover:bg-slate-700 hover:text-indigo-400 `;
                            }

                            return (
                              <button
                                key={idx}
                                onClick={() => isUnlocked && onNoteClick(cat.id, idx)}
                                className={btnCls}
                                disabled={!isUnlocked}
                              >
                                {isSelectedReveal && isPlaying ? (
                                  <PlayCircle size={28} className="animate-spin" />
                                ) : (
                                  <MusicIcon size={isUnlocked ? 28 : 24} />
                                )}

                                {isUsed && !isSelectedReveal && (
                                  <div className="absolute bottom-2 right-2">
                                    <PlayCircle size={16} className="text-slate-400" />
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </>
                      ) : (
                        cat.songs.map((_, idx) => {
                          const noteId = `${cat.id}-${idx}`;
                          const isUsed = progress.usedNotes.has(noteId);
                          const isSelected = activeNote?.categoryId === cat.id && activeNote?.noteIndex === idx && !activeNote.isReveal;
                          const isRevealActive = activeNote?.categoryId === cat.id && activeNote?.noteIndex === idx && activeNote.isReveal;
                          const turnResult = progress.results[noteId];
                          const isCurrentlyPlayingThis = (isSelected || isRevealActive) && isPlaying;
                          let pts = null;
                          if (isSelected || (isUsed && !isRevealActive)) {
                            pts = isSelected ? currentRoundPoints : progress.pointMap?.[cat.id]?.[idx];
                          }

                          let btnCls = `h-24 rounded-2xl transition-all flex flex-col items-center justify-center group relative overflow-hidden border-3 `;

                          if (isSelected) {
                            btnCls += `bg-indigo-600 text-white shadow-[0_0_40px_rgba(99,102,241,0.6)] scale-110 border-indigo-400 z-10 `;
                          } else if (isRevealActive) {
                            btnCls += `bg-indigo-800 text-white border-white animate-pulse shadow-[0_0_50px_rgba(99,102,241,0.7)] ring-4 ring-indigo-500/50 z-10 `;
                          } else if (isUsed) {
                            if (turnResult === 'correct') {
                              btnCls += `bg-emerald-900/60 text-emerald-400 border-emerald-500/50 hover:bg-emerald-800/80 hover:border-emerald-400 `;
                            } else if (turnResult === 'wrong') {
                              btnCls += `bg-rose-900/60 text-rose-400 border-rose-500/50 hover:bg-rose-800/80 hover:border-rose-400 `;
                            } else {
                              btnCls += `bg-slate-800 border-slate-600 text-slate-500 hover:bg-slate-700 hover:text-indigo-400 hover:border-slate-500 `;
                            }
                          } else {
                            btnCls += `bg-slate-800 border-slate-700 text-indigo-400 hover:border-indigo-500/50 hover:bg-slate-700 hover:-translate-y-1 `;
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => onNoteClick(cat.id, idx)}
                              className={btnCls}
                              disabled={isCategoryFinished && !isUsed}
                            >
                              {isCurrentlyPlayingThis && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
                              {!pts ? (
                                <MusicIcon size={28} className={`${isSelected ? 'animate-bounce' : 'group-hover:rotate-12 transition-transform opacity-60'}`} />
                              ) : (
                                <span className="text-4xl font-black tracking-tighter">{pts}</span>
                              )}

                              {isRevealActive && (
                                <div className="absolute bottom-2 right-2">
                                  <PlayCircle size={16} className="text-white opacity-80" />
                                </div>
                              )}
                            </button>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PLAYER BOARD */}
          <div className="bg-slate-900/50 p-6 rounded-3xl border-2 border-slate-800">
            <PlayerBoard
              players={gameState.players}
              currentPlayerIndex={buzzerWinner
                ? gameState.players.findIndex(p => p.hubId === activeResponder)
                : gameState.currentPlayerIndex
              }
              onUpdatePlayer={onUpdatePlayer}
              onSetCurrentPlayer={onSetCurrentPlayer}
              activeResponder={activeResponder}
              t={t}
            />
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="w-[380px] flex flex-col gap-6 relative">
          <div className="bg-slate-800 rounded-2xl p-6 border-2 border-slate-700 shadow-lg flex flex-col items-center gap-2 overflow-hidden">
            <span className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-1">{t.currentTurn}</span>
            <div className="text-2xl font-black text-white truncate text-center w-full mb-1 tracking-tight">
              {currentPlayer.name || `Player ${gameState.currentPlayerIndex + 1}`}
            </div>
            <div className="bg-indigo-900/40 px-6 py-2 rounded-2xl border-2 border-indigo-500/30 shadow-inner">
              <span className="text-2xl font-black text-indigo-400 tabular-nums">
                {currentPlayer.score} <span className="text-xs uppercase opacity-60 ml-2 tracking-widest">{t.points}</span>
              </span>
            </div>
          </div>

          <ControlPanel
            isPlaying={isPlaying}
            onStart={() => onAudioControl('start')}
            onStop={() => onAudioControl('stop')}
            onCorrect={() => onFinalizeTurn('correct')}
            onWrong={() => onFinalizeTurn('wrong')}
            currentPoints={currentRoundPoints}
            timeLeft={timeLeft}
            onFinishRound={onFinishRound}
            t={t}
            disabledActions={!activeNote || activeNote.isReveal || progress.usedNotes.has(`${activeNote.categoryId}-${activeNote.noteIndex}`)}
            isStartDisabled={!activeNote}
          />

          {/* Use the new MusicTimeline component */}
          <MusicTimeline
            isPlaying={isPlaying}
            progress={audioProgress}
            isReveal={!!activeNote?.isReveal}
            onSeek={onSeek}
            formatTime={formatTime}
            t={t}
          />

          {modal?.isOpen && modal.position === 'inline' && (
            <div className="w-full bg-slate-800 rounded-2xl p-5 border-2 border-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.3)] animate-in fade-in slide-in-from-top duration-300">
              <h3 className="text-xs font-black text-white mb-2 leading-tight uppercase tracking-widest text-center">{modal.title}</h3>
              <p className="text-slate-300 text-[11px] mb-4 font-medium text-center leading-relaxed">{modal.message}</p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={modal.onConfirm}
                  className="w-full py-2 rounded-lg bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all uppercase tracking-widest text-xs shadow-lg shadow-indigo-900/40"
                >
                  {modal.confirmLabel}
                </button>
                <button
                  onClick={() => onSetModal(null)}
                  className="w-full py-2 rounded-lg bg-slate-700 text-slate-300 font-bold hover:bg-slate-600 transition-colors uppercase tracking-widest text-xs"
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


export default RoundStandard;