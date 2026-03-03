import React from 'react';
import { ChevronLeft, ChevronRight, Music as MusicIcon, CheckCircle, XCircle, Timer } from 'lucide-react';
import PlayerBoard from '../../components/PlayerBoard'; // Adjust path
import ControlPanel from '../../components/ControlPanel'; // Adjust path
import MusicTimeline from '../../components/MusicTimeline'; // Adjust path
import ConfirmationModal from '../../components/ConfirmationModal'; // Adjust path
import { getRoundData } from '../../data/index_data'; // Adjust path
import { SFX } from '../../data/constants_main'; // Adjust path
import { GameState } from '../../types'; // Adjust path

interface RoundSprintProps {
  gameState: GameState;
  isPlaying: boolean;
  timeLeft: number | undefined;
  audioProgress: { current: number; total: number };
  modal: any;
  t: any;
  // Sprint Specific State
  r4IsActiveSession: boolean;
  selectedRow: number | null;
  r4CurrentSongIdx: number;
  playedButNotEvaluated: number[];
  showTimerSettings: boolean;
  timerDuration: number;
  activeNote: { categoryId: string; noteIndex: number; isReveal?: boolean } | null;
  // Actions
  onNavigate: (page: any, roundId: number | null) => void;
  onInitializeRound: (roundId: number) => void;
  onUpdatePlayer: (id: number, name: string, score: number, stars?: number) => void;
  onShowModal: (title: string, message: string, onConfirm: () => void, confirmLabel?: string, cancelLabel?: string, position?: 'center' | 'inline') => void;
  onSetModal: (modal: any) => void;
  onSetCurrentPlayer: (index: number) => void;
  onAudioControl: (action: 'start' | 'stop') => void;
  onFinalizeTurn: (status: 'correct' | 'wrong' | 'skip') => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatTime: (seconds: number | undefined) => string;
  onNoteClick: (categoryId: string, noteIndex: number) => void;
  onSetR4IsActiveSession: (isActive: boolean) => void;
  onSetSelectedRow: (row: number | null) => void;
  onSetTimeLeft: (time: number | undefined) => void;
  onSetShowTimerSettings: (show: boolean) => void;
  onSetPlayedButNotEvaluated: (indices: number[]) => void;
  onSetTimerDuration: (duration: number) => void;
  onResetTimer: () => void;
  onStopSong: () => void;
  onShowRoundSummary: () => void;
  onFinishRound: () => void;
}

const RoundSprint: React.FC<RoundSprintProps> = ({
  gameState,
  isPlaying,
  timeLeft,
  audioProgress,
  modal,
  t,
  r4IsActiveSession,
  selectedRow,
  r4CurrentSongIdx,
  playedButNotEvaluated,
  showTimerSettings,
  timerDuration,
  activeNote,
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
  onNoteClick,
  onSetR4IsActiveSession,
  onSetSelectedRow,
  onSetTimeLeft,
  onSetShowTimerSettings,
  onSetPlayedButNotEvaluated,
  onSetTimerDuration,
  onResetTimer,
  onStopSong,
  onShowRoundSummary,
  onFinishRound
}) => {
  const roundId = 4;
  const progress = gameState.roundProgress[roundId];
  if (!progress) return <div className="pt-40 text-center text-white">Missing Progress</div>; console.log("Round 4 Progress Data:", progress);

  const dataRoundId = 4; // This matches your ROUND_DATA[4]


  const selectedSetId = gameState.roundSets[roundId] || 'default';
  const roundData = getRoundData(dataRoundId, selectedSetId);

  // Now you can safely uncomment this because it should NOT be empty anymore!
  if (!roundData || roundData.length === 0) {
    console.error("Data missing for Round 4 Set:", selectedSetId);
    return <div className="text-white p-20">Data Error: Check Console</div>;
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const pId = currentPlayer.id;

  // Ensure player progress exists
  // let playerProg = progress.r4PlayerProgress?.[pId];

  const usedRowsSet = progress.usedRows || new Set();

  const playerProg = progress.r4PlayerProgress?.[gameState.players[gameState.currentPlayerIndex].id];
  const isCurrentSongCorrect = playerProg?.correctIndices.has(r4CurrentSongIdx) ?? false;
  const shouldDisableActions = !r4IsActiveSession || !activeNote || activeNote.isReveal || (isCurrentSongCorrect && r4IsActiveSession);

  return (
    <div className="min-h-screen bg-slate-950 p-8 pt-24">
      {/* TIMER SETTINGS MODAL */}
      {showTimerSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-3xl p-8 max-w-md w-full border-2 border-slate-700">
            <h3 className="text-2xl font-black text-white mb-6">{t.timerSettings || "Timer Settings"}</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">{t.timerDuration || "Timer Duration (seconds)"}</label>
                <input
                  type="number"
                  min="10"
                  max="300"
                  value={timerDuration}
                  onChange={(e) => onSetTimerDuration(parseInt(e.target.value) || 60)}
                  className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl px-4 py-3 text-white text-xl font-bold outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => onSetShowTimerSettings(false)} className="flex-1 py-3 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700">{t.cancel}</button>
              <button onClick={() => { onSetShowTimerSettings(false); onResetTimer(); }} className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500">{t.save || "Save"}</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto flex gap-12">
        <div className="flex-1 flex flex-col gap-12">
          {/* HEADER & GRID */}
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-[5rem] p-16 border-2 border-slate-800 text-center relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-6">
                <div className="bg-indigo-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center text-5xl font-black shadow-lg shadow-indigo-900/30 ring-4 ring-indigo-500/20">4</div>
                <div>
                  <h2 className="text-6xl font-black text-white tracking-tighter uppercase">{t.RoundSprint}</h2>
                  <div className="text-xl font-black text-slate-400 uppercase tracking-[0.3em] mt-2">{t.round} 4</div>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    if (isPlaying) return;
                    onStopSong();
                    onInitializeRound(3); // Go back to Round 3 (Duel)
                    onNavigate('round', 3);
                  }}
                  className={`p-6 rounded-2xl transition-all ${isPlaying ? 'opacity-20 cursor-not-allowed bg-slate-800' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:scale-105 active:scale-95 shadow-lg'
                    }`}
                  disabled={isPlaying}
                >
                  <ChevronLeft size={40} />
                </button>
                <button className="p-6 bg-slate-800/20 text-slate-700 rounded-2xl cursor-not-allowed transition-all" disabled>
                  <ChevronRight size={40} />
                </button>
              </div>
            </div>

            {!r4IsActiveSession && (
              <div className="mb-10 flex justify-center">
                <button onClick={() => onSetShowTimerSettings(true)} className="px-8 py-4 bg-slate-800 text-white rounded-3xl font-bold border-2 border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-3 shadow-lg">
                  <Timer size={24} />
                  {t.TimerSettings}
                </button>
              </div>
            )}

            {r4IsActiveSession && (
              <div className="mb-10 flex items-center justify-center gap-6">
                <div className="bg-slate-800/50 px-10 py-6 rounded-3xl border-2 border-slate-700">
                  <div className="text-sm font-black text-slate-500 uppercase tracking-widest mb-2">{t.timeLeft || "Time Left"}</div>
                  <div className={`text-6xl font-black tabular-nums ${timeLeft && timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-indigo-400'}`}>
                    {formatTime(timeLeft)}
                  </div>
                </div>
                <button onClick={() => onSetShowTimerSettings(true)} className="px-8 py-6 bg-slate-800 text-white rounded-3xl font-bold border-2 border-slate-700">
                  {t.settings || "Settings"}
                </button>
              </div>
            )}

            <div className="mb-16">
              {[0].map(row => {
                const startIdx = row * 7;
                const isPlayerRow = selectedRow === row;
                const isRowUsed = usedRowsSet.has(row);
                return (
                  <div key={row} className={`mb-8 p-8 rounded-[3rem] border-4 ${isPlayerRow && r4IsActiveSession ? 'bg-slate-800/50 border-slate-600' : isRowUsed ? 'opacity-50' : 'bg-slate-900/30'}`}>
                    <div className="grid grid-cols-7 gap-4">
                      {Array.from({ length: 7 }, (_, i) => startIdx + i).map(songIdx => {
                        const isCorrect = playerProg?.correctIndices.has(songIdx);
                        const isWrong = playerProg?.wrongIndex === songIdx;
                        const isActive = r4CurrentSongIdx === songIdx;
                        const isSelectable = !playerProg?.hasFinished && !isRowUsed && (!r4IsActiveSession || (isPlayerRow && r4IsActiveSession && !isCorrect));

                        return (
                          <button
                            key={songIdx}
                            onClick={() => { if (isSelectable || playerProg?.hasFinished || isCorrect || isWrong) onNoteClick('r4_sprint', songIdx); }}
                            className={`h-24 rounded-2xl border-3 transition-all flex flex-col items-center justify-center ${isActive && r4IsActiveSession ? 'bg-indigo-600 border-white scale-110 z-10' :
                              isCorrect ? 'bg-emerald-600 border-emerald-400' :
                                isWrong ? 'bg-rose-600 border-rose-400' :
                                  playedButNotEvaluated.includes(songIdx) ? 'bg-yellow-600 border-yellow-400' :
                                    isSelectable ? 'bg-slate-800 border-slate-600 hover:bg-slate-700' :
                                      'bg-slate-900/50 opacity-60'
                              }`}
                          >
                            {isCorrect ? <CheckCircle size={28} /> : isWrong ? <XCircle size={28} /> : <MusicIcon size={28} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {!r4IsActiveSession && playerProg?.hasFinished && (
              <div className="flex flex-col items-center animate-in fade-in duration-700">
                <div className="text-3xl font-black text-indigo-400 mb-4 uppercase">
                  {playerProg.correctIndices.size === 7 ? t.perfectRound || "Perfect Round!" : `${playerProg.correctIndices.size} Correct`}
                </div>
                <button
                  onClick={onShowRoundSummary}
                  className="py-8 px-20 rounded-[2.5rem] bg-indigo-600 text-white font-black text-3xl uppercase"
                >
                  {t.continue || "Continue"}
                </button>
              </div>
            )}
          </div>

          <div className="bg-slate-900/50 p-12 rounded-[5rem] border-2 border-slate-800">
            <PlayerBoard
              players={gameState.players}
              currentPlayerIndex={gameState.currentPlayerIndex}
              onUpdatePlayer={onUpdatePlayer}
              onSetCurrentPlayer={(idx) => {
                if (r4IsActiveSession) return;
                onShowModal(t.playerName, t.confirmPlayerActive, () => {
                  onSetCurrentPlayer(idx);
                  onSetR4IsActiveSession(false);
                  onSetModal(null);
                });
              }}
              t={t}
              activePlayerIds={[gameState.players[gameState.currentPlayerIndex].id]} // 👈 only this player
            />
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="w-[450px] flex flex-col gap-10 relative">
          <div className="bg-slate-800 rounded-[3rem] p-12 border-2 border-slate-700 shadow-2xl flex flex-col items-center gap-4">
            <div className="text-4xl font-black text-white text-center truncate w-full">
              {currentPlayer.name || `Player ${gameState.currentPlayerIndex + 1}`}
            </div>
            <div className="bg-indigo-900/40 px-10 py-4 rounded-3xl border-2 border-indigo-500/30 shadow-inner">
              <span className="text-4xl font-black text-indigo-400 tabular-nums">
                {currentPlayer.score} <span className="text-xs uppercase opacity-60 ml-2 tracking-widest">PTS</span>
              </span>
            </div>
          </div>



          {/* <ControlPanel
            isPlaying={isPlaying}
            onStart={() => onAudioControl('start')}
            onStop={() => onAudioControl('stop')}
            onCorrect={() => onFinalizeTurn('correct')}
            onWrong={() => onFinalizeTurn('wrong')}
            onSkip={() => onFinalizeTurn('skip')}
            onFinishRound={onFinishRound}
            timeLeft={timeLeft}
            t={t}
            disabledActions={!r4IsActiveSession}
          /> */}

          {/* <ControlPanel
            isPlaying={isPlaying}
            onStart={() => onAudioControl('start')}
            onStop={() => onAudioControl('stop')}
            onCorrect={() => onFinalizeTurn('correct')}
            onWrong={() => onFinalizeTurn('wrong')}
            onSkip={() => onFinalizeTurn('skip')}
            onFinishRound={onFinishRound}
            timeLeft={timeLeft}
            t={t}
            disabledActions={!r4IsActiveSession || !activeNote || activeNote.isReveal}
          // disabledActions={!r4IsActiveSession}
          /> */}




          <ControlPanel
            isPlaying={isPlaying}
            onStart={() => onAudioControl('start')}
            onStop={() => onAudioControl('stop')}
            onCorrect={() => onFinalizeTurn('correct')}
            onWrong={() => onFinalizeTurn('wrong')}
            timeLeft={timeLeft}
            onFinishRound={onFinishRound}
            t={t}
            disabledActions={shouldDisableActions}
            isStartDisabled={!activeNote}
          />

          <MusicTimeline
            isPlaying={isPlaying}
            progress={audioProgress}
            isReveal={!!activeNote?.isReveal}
            onSeek={onSeek}
            formatTime={formatTime}
            t={t}
          />

          {modal?.isOpen && modal.position === 'inline' && (
            <ConfirmationModal
              isOpen={modal.isOpen}
              title={modal.title}
              message={modal.message}
              onConfirm={modal.onConfirm}
              onCancel={() => onSetModal(null)}
              confirmLabel={modal.confirmLabel}
              cancelLabel={modal.cancelLabel}
              position={modal.position}
            />
          )}
        </div>
      </div>
    </div>
  );
};


export default RoundSprint;