
import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  position?: 'center' | 'inline';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Yes",
  cancelLabel = "No",
  position = 'center'
}) => {
  if (!isOpen) return null;

  const overlayClasses = position === 'inline' 
    ? "relative w-[450px] mt-6" 
    : "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md";

  const containerClasses = position === 'inline'
    ? "bg-slate-900 rounded-[2.5rem] p-8 w-full shadow-[0_40px_100px_rgba(0,0,0,0.8)] border-4 border-indigo-500 animate-in slide-in-from-top duration-300 ring-4 ring-indigo-500/20"
    : "bg-slate-800 rounded-[3rem] p-12 max-w-md w-full shadow-[0_50px_100px_rgba(0,0,0,0.8)] border-2 border-slate-700 transform transition-all";

  return (
    <div className={overlayClasses}>
      <div className={containerClasses}>
        <h3 className="text-2xl font-black text-white mb-4 tracking-tight leading-none uppercase flex items-center gap-3">
          <div className="w-2 h-8 bg-indigo-500 rounded-full" />
          {title}
        </h3>
        <p className="text-slate-300 mb-8 text-lg font-bold leading-relaxed">{message}</p>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onConfirm}
            className="px-6 py-4 rounded-2xl bg-indigo-600 text-white font-black text-base hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-900/20 active:scale-95 uppercase tracking-widest"
          >
            {confirmLabel}
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-4 rounded-2xl bg-slate-700 text-slate-300 font-black text-base hover:bg-slate-600 transition-colors uppercase tracking-widest"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

