import React from 'react';
import { ChevronRight, Music as MusicIcon, CheckCircle } from 'lucide-react';

interface RoundSet {
  id: string;
  name: {
    en: string;
    ru: string;
  };
}

interface RoundSetSelectorProps {
  roundId: number;
  availableSets: { id: string; name: { en: string; ru: string } }[];
  selectedSetId: string;
  onSelect: (setId: string) => void;
  onConfirm: () => void;
  language: 'en' | 'ru';
  t: any;
}

const RoundSetSelector: React.FC<RoundSetSelectorProps> = ({
  roundId,
  availableSets,
  selectedSetId,
  onSelect,
  onConfirm,
  language,
  t
}) => {
  const [tempSelection, setTempSelection] = React.useState(selectedSetId);
  
  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center bg-black/80 backdrop-blur-sm p-8 animate-in fade-in duration-300">
      <div className="bg-slate-900 rounded-[4rem] p-20 max-w-3xl w-full border-2 border-slate-800 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex items-center gap-4 mb-12">
          <div className="bg-indigo-600/20 p-4 rounded-[2rem]">
            <MusicIcon size={48} className="text-indigo-500" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t.selectDataset || 'Select Dataset'}</p>
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter">
              {t.round} {roundId}
            </h2>
          </div>
        </div>
        
        <p className="text-lg text-slate-300 font-bold mb-10 uppercase tracking-[0.15em]">
          {t.availableOptions || 'Available Options'}:
        </p>
        
        <div className="space-y-3 mb-16">
          {availableSets.map((set, idx) => (
            <button
              key={set.id}
              onClick={() => setTempSelection(set.id)}
              className={`w-full p-6 rounded-[2.5rem] border-3 transition-all text-left font-black text-lg flex items-center justify-between group ${
                tempSelection === set.id
                  ? 'bg-indigo-600/40 border-indigo-500 scale-[1.02] shadow-lg shadow-indigo-500/30'
                  : 'bg-slate-800/40 border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  tempSelection === set.id
                    ? 'bg-indigo-500 border-indigo-400'
                    : 'border-slate-600 group-hover:border-indigo-400'
                }`}>
                  {tempSelection === set.id && (
                    <CheckCircle size={20} className="text-white" />
                  )}
                </div>
                <div>
                  <div className="text-white uppercase tracking-tight">
                    {set.name[language]}
                  </div>
                  <div className="text-xs text-slate-500 font-bold mt-1">
                    ID: {set.id}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={() => {
              setTempSelection(selectedSetId);
              onConfirm();
            }}
            className="flex-1 py-4 rounded-[2rem] bg-slate-800 text-white font-black text-lg uppercase hover:bg-slate-700 transition-colors"
          >
            {t.cancel || 'Cancel'}
          </button>
          <button
            onClick={() => {
              onSelect(tempSelection);
              onConfirm();
            }}
            className="flex-1 py-4 rounded-[2rem] bg-indigo-600 text-white font-black text-lg uppercase hover:bg-indigo-700 transition-colors flex items-center justify-center gap-3 shadow-lg"
          >
            {t.confirm || 'Confirm'} <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoundSetSelector;
