import React from 'react';
import { PlayCircle, Music as MusicIcon, ChevronRight, Trophy, Sparkles } from 'lucide-react';
import { getAvailableSets } from '../../data/index_data'; 

interface StartViewProps {
  t: any;
  language: string;
  roundSets: { [key: number]: string };
  playersCount: number;
  onNavigate: (page: any, roundId: number | null) => void;
  onInitializeRound: (roundId: number) => void;
  onShowScoreboard: () => void;
  onShowVictory: () => void;
  onSetRoundSetSelection: (roundId: number) => void;
  onStopSong: () => void;
  setPage: (page: any) => void;
  includeWarmup?: boolean;
}

const StartView: React.FC<StartViewProps> = ({
  t,
  language,
  roundSets,
  playersCount,
  onNavigate,
  onInitializeRound,
  onShowScoreboard,
  onShowVictory,
  onSetRoundSetSelection,
  onStopSong,
  setPage,
  includeWarmup
}) => {

  // Helper function to render a Round Button to keep code clean but full
  const renderRoundButton = (num: number) => {
    const dataId = num === 0 ? 1 : num;

    const availableSets = getAvailableSets(dataId);
    const selectedSetId = roundSets[dataId] || 'default';
    const selectedSet = availableSets.find(s => s.id === selectedSetId);
    
    const hasMultipleSets = availableSets.length > 1;
    const isWarmup = num === 0;

    return (
      <div className="flex flex-col gap-2">
        <button 
          onClick={() => {
            if (num === 4 && playersCount > 1) {
              onStopSong();
              setPage('r4_select');
              return;
            }
            onNavigate('round', num);
          }} 
          className={`group w-full bg-slate-900 border-2 p-6 sm:p-8 rounded-3xl transition-all hover:-translate-y-1 shadow-2xl ${
            isWarmup ? 'border-emerald-500/30 hover:border-emerald-500' : 'border-slate-800 hover:border-indigo-500'
          }`}
        >
          {isWarmup ? (
            <Sparkles size={44} className="text-emerald-500 mx-auto mb-4" />
          ) : (
            <MusicIcon size={44} className="text-slate-600 mx-auto mb-4" />
          )}

          <div className="text-3xl sm:text-4xl font-black text-white mb-2">
            {isWarmup ? "ROUND 0" : `${t.round} ${num}`}
          </div>

          <div className={`text-sm font-black uppercase mt-2 ${isWarmup ? 'text-emerald-500' : 'text-slate-500'}`}>
            {num === 0 ? 'WARM UP' : 
             num === 4 ? 'SPRINT' : 
             num === 3 ? 'DUEL' : 
             num === 2 ? 'MELODY' : 'SONGS'}
          </div>
        </button>
        
        {/* Dataset Selector Logic */}
        {isWarmup ? (
           <div className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 text-slate-400 rounded-xl font-bold text-sm uppercase text-center">
              Practice Mode
           </div>
        ) : hasMultipleSets ? (
          <button
            onClick={() => onSetRoundSetSelection(num)}
            className="w-full px-4 py-3 bg-indigo-600/30 border-2 border-indigo-500 text-indigo-200 rounded-xl hover:bg-indigo-600/50 hover:border-indigo-400 transition-all font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg"
          >
            <span>{selectedSet?.name[language as 'en'|'ru'] || 'Default'}</span>
            <ChevronRight size={16} />
          </button>
        ) : (
          <div className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 text-slate-400 rounded-xl font-bold text-sm uppercase tracking-wide text-center">
            {selectedSet?.name[language as 'en'|'ru'] || 'Default'}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 pt-20 sm:pt-24">
      <div className="max-w-[1400px] mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tighter uppercase">{t.title}</h1>
        
        {/* BIG BUTTON: Starts from Round 1 */}
        <button 
          onClick={() => {
            onInitializeRound(1);
            onNavigate('round', 1);
          }}
          className="mb-8 py-5 sm:py-6 px-6 sm:px-10 bg-indigo-600 text-white rounded-3xl font-black text-xl sm:text-2xl shadow-xl flex flex-wrap items-center justify-center gap-3 sm:gap-4 mx-auto hover:scale-105 transition-all"
        >
          <PlayCircle size={36} /> {t.startOrder}
        </button>

        {/* CUSTOM GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* LINE 1: Round 0, Round 1, Round 2 */}
          {renderRoundButton(0)}
          {renderRoundButton(1)}
          {renderRoundButton(2)}

          {/* LINE 2: ScoreBoard, Round 3, Round 4 */}
          <div className="flex flex-col gap-2">
            <button 
              onClick={onShowScoreboard} 
              className="bg-slate-900 border-2 border-slate-800 p-6 sm:p-8 rounded-3xl hover:border-yellow-500 transition-all shadow-2xl h-full"
            >
              <Trophy size={44} className="text-yellow-600 mx-auto mb-4" />
              <div className="text-3xl sm:text-4xl font-black text-white">{t.scorePanel}</div>
            </button>
            {/* Spacer to align with buttons above */}
            <div className="w-full px-4 py-3 opacity-0">spacer</div>
          </div>
          
          {renderRoundButton(3)}
          {renderRoundButton(4)}

        </div>

        <button onClick={onShowVictory} className="mt-12 px-10 py-4 border-2 border-rose-600/20 rounded-2xl text-rose-500 font-black text-lg hover:bg-rose-600 hover:text-white transition-all uppercase tracking-[0.2em]">{t.endGame}</button>
      </div>
    </div>
  );
};

export default StartView;
