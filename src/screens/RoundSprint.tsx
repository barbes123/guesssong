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
  onArmSprintPlayer: () => void;
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
  onFinishRound,
  onArmSprintPlayer
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

  // const playerProg = progress.r4PlayerProgress?.[gameState.players[gameState.currentPlayerIndex].id];

  // This checks the status of the CURRENTLY SELECTED note
  const playerProg = progress.r4PlayerProgress?.[gameState.players[gameState.currentPlayerIndex].id];

  // Logic for the CURRENTLY SELECTED song
  const isCurrentSongCorrect = playerProg?.correctIndices.has(r4CurrentSongIdx) ?? false;
  const isCurrentSongWrong = playerProg?.wrongIndex === r4CurrentSongIdx;
  const isSongFinished = isCurrentSongCorrect || isCurrentSongWrong;

  // The Timer State
  const isTimeOver = timeLeft === 0;
  const isCurrentFinished =
    playerProg?.correctIndices.has(r4CurrentSongIdx) ||
    playerProg?.wrongIndex === r4CurrentSongIdx;

  const sidebarLocked = isTimeOver || isCurrentFinished || !r4IsActiveSession;

  // Global Action Lock (Correct/Wrong buttons)
  const shouldDisableActions =
    !r4IsActiveSession ||
    (activeNote?.isReveal ?? false) ||
    isSongFinished ||
    isTimeOver;
  // const isCurrentSongCorrect = playerProg?.correctIndices.has(r4CurrentSongIdx) ?? false;
  // const shouldDisableActions = !r4IsActiveSession || activeNote.isReveal || (isCurrentSongCorrect && r4IsActiveSession);


  //const shouldDisableActions = !r4IsActiveSession || !activeNote || activeNote.isReveal || (isCurrentSongCorrect && r4IsActiveSession);
  // const shouldDisableActions = activeNote?.isReveal ?? false;

  return (
    <div className="min-h-screen bg-slate-950 p-6 pt-20"> {/* Standardized padding/top */}
      {/* TIMER SETTINGS MODAL stays as is */}

      <div className="max-w-[1600px] mx-auto flex gap-8"> {/* Gap reduced from 12 to 8 */}
        <div className="flex-1 flex flex-col gap-8"> {/* Gap reduced from 12 to 8 */}

          {/* HEADER & GRID AREA */}
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-slate-800 text-center relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-600 text-white w-14 h-14 rounded-xl flex items-center justify-center text-3xl font-black shadow-lg shadow-indigo-900/30 ring-4 ring-indigo-500/20">4</div>
                <div>
                  <h2 className="text-4xl font-black text-white tracking-tighter uppercase">{t.RoundSprint}</h2>
                  <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-1">{t.round} 4</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (isPlaying) return;
                    onStopSong();
                    onInitializeRound(3);
                    onNavigate('round', 3);
                  }}
                  className={`p-3 rounded-lg transition-all ${isPlaying ? 'opacity-20 bg-slate-800' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                  disabled={isPlaying}
                >
                  <ChevronLeft size={24} />
                </button>
              </div>
            </div>

            {/* TIMER DISPLAY */}
            {/* {r4IsActiveSession && (
            <div className="mb-6 flex items-center justify-center gap-4">
              <div className="bg-slate-800/50 px-6 py-4 rounded-2xl border-2 border-slate-700">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t.timeLeft}</div>
                <div className={`text-4xl font-black tabular-nums ${timeLeft && timeLeft <= 10 ? 'text-rose-500' : 'text-indigo-400'}`}>
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>
          )} */}
            <div className="mb-8 flex items-stretch justify-center gap-3"> {/* items-stretch makes children equal height */}

              {/* TIMER BOX */}
              <div className="bg-slate-800/50 px-8 py-4 rounded-2xl border-2 border-slate-700 min-w-[200px] flex flex-col justify-center">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                  {t.timeLeft || "Time Left"}
                </div>
                <div className={`text-4xl font-black tabular-nums leading-none ${timeLeft && timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-indigo-400'}`}>
                  {formatTime(timeLeft || timerDuration)}
                </div>
              </div>

              {/* SETTINGS BUTTON - Matches height perfectly */}
              <button
                onClick={() => onSetShowTimerSettings(true)}
                disabled={isPlaying}
                className={`px-6 rounded-2xl font-bold border-2 transition-all flex items-center justify-center shadow-lg ${isPlaying
                  ? 'bg-slate-900/50 border-slate-800 text-slate-600'
                  : 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700 active:scale-95'
                  }`}
              >
                <Timer size={24} />
              </button>
            </div>

            {/* GRID ROWS */}
            <div className="mb-8">
              {[0].map(row => {
                const startIdx = row * 7;
                // const isPlayerRow = selectedRow === row;
                // const isRowUsed = usedRowsSet.has(row);
                const isPlayerRow = true;
                const isRowUsed = false;
                return (
                  <div key={row} className="mb-4 p-4 rounded-2xl border-2 bg-slate-800/50 border-slate-600">
                    <div className="grid grid-cols-7 gap-3">
                      {Array.from({ length: 7 }, (_, i) => startIdx + i).map(songIdx => {
                        // Check the status for THIS specific button
                        const thisSongCorrect = playerProg?.correctIndices.has(songIdx);
                        const thisSongWrong = playerProg?.wrongIndex === songIdx;
                        const thisSongFinished = thisSongCorrect || thisSongWrong;

                        // 🔴 THE LOCK: If time is up, only allow if this specific song is finished
                        const canSelect = !isTimeOver || thisSongFinished;

                        const isActive = activeNote ? (r4CurrentSongIdx === songIdx) : (songIdx === r4CurrentSongIdx);

                        return (
                          <button
                            key={songIdx}
                            onClick={() => {
                              if (canSelect) onNoteClick('r4_sprint', songIdx);
                            }}
                            className={`h-20 rounded-xl border-2 transition-all flex flex-col items-center justify-center 
        ${isActive ? 'bg-indigo-600 border-white scale-105 z-10' :
                                thisSongCorrect ? 'bg-emerald-600 border-emerald-400' :
                                  thisSongWrong ? 'bg-rose-600 border-rose-400' :
                                    'bg-slate-800 border-slate-700 hover:bg-slate-700'}
        ${!canSelect ? 'opacity-20 grayscale cursor-not-allowed pointer-events-none' : 'opacity-100'} 
      `}
                          >
                            {thisSongCorrect ? <CheckCircle size={24} /> : thisSongWrong ? <XCircle size={24} /> : <MusicIcon size={24} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PLAYER BOARD CONTAINER */}
          <div className="bg-slate-900/50 p-6 rounded-3xl border-2 border-slate-800">
            <PlayerBoard
              players={gameState.players}
              currentPlayerIndex={gameState.currentPlayerIndex}
              onUpdatePlayer={onUpdatePlayer}
              onSetCurrentPlayer={onSetCurrentPlayer}
              t={t}
              activePlayerIds={[gameState.players[gameState.currentPlayerIndex].id]}
            />
          </div>
        </div>

        {/* SIDEBAR - DEZOOMED TO MATCH ROUND 1 */}
        <div className="w-[380px] flex flex-col gap-6 relative">
          {/* Player info panel */}
          <div className="bg-slate-800 rounded-2xl p-6 border-2 border-slate-700 shadow-lg flex flex-col items-center gap-2 overflow-hidden">
            <span className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-1">{t.currentTurn}</span>
            <div className="text-2xl font-black text-white truncate text-center w-full mb-1 tracking-tight">
              {gameState.players[gameState.currentPlayerIndex].name || `Player ${gameState.currentPlayerIndex + 1}`}
            </div>
            <div className="bg-indigo-900/40 px-6 py-2 rounded-2xl border-2 border-indigo-500/30 shadow-inner">
              <span className="text-2xl font-black text-indigo-400 tabular-nums">
                {gameState.players[gameState.currentPlayerIndex].score} <span className="text-xs uppercase opacity-60 ml-2 tracking-widest">{t.points || "PTS"}</span>
              </span>
            </div>
          </div>

          {/* <ControlPanel
            isPlaying={isPlaying}
            // 🟢 FIXED: Removed the "if (!activeNote) onNoteClick(..., 0)" 
            // This stops the jump to the first song.
            onStart={() => {
              onArmSprintPlayer();
              onAudioControl('start');
            }}
            onStop={() => onAudioControl('stop')}
            onCorrect={() => onFinalizeTurn('correct')}
            onWrong={() => onFinalizeTurn('wrong')}
            timeLeft={timeLeft}
            onFinishRound={onFinishRound}
            t={t}

            // 🟢 Play only enabled if a note is selected AND (Time > 0 OR that specific song is finished)
            isStartDisabled={!activeNote || (isTimeOver && !isSongFinished)}

            // 🟢 Actions locked by the global state (including timeLeft === 0)
            disabledActions={!activeNote || shouldDisableActions}


          /> */}

        <ControlPanel
  isPlaying={isPlaying}
  onStart={() => {
    // Only arm the specific player if this song is NOT already correct
    if (!isCurrentSongCorrect) {
      onArmSprintPlayer();
    }
    onAudioControl('start');
  }}
  onStop={() => onAudioControl('stop')}
  onCorrect={() => onFinalizeTurn('correct')}
  onWrong={() => onFinalizeTurn('wrong')}
  timeLeft={timeLeft}
  onFinishRound={onFinishRound}
  t={t}
  disabledActions={shouldDisableActions}
  isStartDisabled={!activeNote || (isTimeOver && !isSongFinished)}
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


export default RoundSprint;