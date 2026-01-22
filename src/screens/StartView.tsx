import React from 'react';
import { PlayCircle, Music as MusicIcon, ChevronRight, Trophy } from 'lucide-react';
// We need this helper to know if a round has multiple datasets
import { getAvailableSets } from '../../data/index_data'; 

interface StartViewProps {
  t: any;
  language: string; // or 'en' | 'ru'
  roundSets: { [key: number]: string };
  playersCount: number; // Needed for the Round 4 logic
  onNavigate: (page: any, roundId: number | null) => void;
  onInitializeRound: (roundId: number) => void;
  onShowScoreboard: () => void;
  onShowVictory: () => void;
  onSetRoundSetSelection: (roundId: number) => void;
  onStopSong: () => void;
  setPage: (page: any) => void;
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
  setPage
}) => {
  return (
    <div className="min-h-screen bg-slate-950 p-6 pt-20">
      <div className="max-w-[1400px] mx-auto text-center">
        <h1 className="text-7xl font-black text-white mb-6 tracking-tighter uppercase">{t.title}</h1>
        <p className="text-xl text-slate-400 mb-10 font-bold uppercase tracking-[0.4em]">{t.chooseRound}</p>
        
        <button 
          onClick={() => { onInitializeRound(1); onNavigate('round', 1); }} 
          className="mb-12 py-8 px-20 bg-indigo-600 text-white rounded-[2.5rem] font-black text-3xl shadow-xl flex items-center gap-6 mx-auto"
        >
          <PlayCircle size={48} /> {t.startOrder}
        </button>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((num) => {
            const availableSets = getAvailableSets(num);
            const selectedSetId = roundSets[num] || 'default';
            const selectedSet = availableSets.find(s => s.id === selectedSetId);
            const hasMultipleSets = [1, 2, 3, 4].includes(num) && availableSets.length > 1;

            return (
              <div key={num} className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    if (num === 4 && playersCount > 1) {
                      onStopSong();
                      setPage('r4_select');
                      return;
                    }
                    onNavigate('round', num);
                  }} 
                  className="group w-full bg-slate-900 border-2 border-slate-800 p-10 rounded-[3rem] hover:border-indigo-500 transition-all hover:-translate-y-3 shadow-2xl"
                >
                  <MusicIcon size={60} className="text-slate-600 mx-auto mb-6" />
                  <div className="text-5xl font-black text-white mb-2">{`${t.round} ${num}`}</div>
                  <div className="text-base font-black text-slate-500 uppercase mt-3">
                    {num === 4 ? 'SPRINT' : num === 3 ? 'DUEL' : num === 2 ? 'MELODY GUESS' : 'SONG CHALLENGE'}
                  </div>
                </button>
                
                {hasMultipleSets ? (
                  <button
                    onClick={() => onSetRoundSetSelection(num)}
                    className="w-full px-6 py-3 bg-indigo-600/30 border-2 border-indigo-500 text-indigo-200 rounded-[1.5rem] hover:bg-indigo-600/50 hover:border-indigo-400 transition-all font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>{selectedSet?.name[language as 'en'|'ru'] || 'Default'}</span>
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <div className="w-full px-6 py-3 bg-slate-800/50 border-2 border-slate-700 text-slate-400 rounded-[1.5rem] font-bold text-sm uppercase tracking-wide text-center">
                    {selectedSet?.name[language as 'en'|'ru'] || 'Default'}
                  </div>
                )}
              </div>
            );
          })}
          <div className="flex flex-col gap-3">
            <button onClick={onShowScoreboard} className="bg-slate-900 border-2 border-slate-800 p-10 rounded-[3rem] hover:border-yellow-500 transition-all shadow-2xl">
              <Trophy size={60} className="text-yellow-600 mx-auto mb-6" />
              <div className="text-5xl font-black text-white">{t.scorePanel}</div>
            </button>
          </div>
        </div>
        <button onClick={onShowVictory} className="mt-20 px-16 py-6 border-4 border-rose-600/20 rounded-[2rem] text-rose-500 font-black text-xl hover:bg-rose-600 hover:text-white transition-all uppercase tracking-[0.3em]">{t.endGame}</button>
      </div>
    </div>
  );
};

export default StartView;