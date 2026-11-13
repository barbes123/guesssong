import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Maximize, Minimize } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import configBuzz from '../configBuzz.json';

type LocalizedText = string | { en?: string; ru?: string } | null | undefined;

export interface AiSong {
  id: string;
  title: string;
  artist: string;
  notes?: string;
}

export interface AiCategory {
  id: string;
  name: LocalizedText;
  description?: LocalizedText;
}

interface RequestAttempt {
  userPrompt: string;
  evaluation: string;
  message: string;
}

export interface AIModuleProps {
  currentSong: AiSong | null;
  currentCategory: AiCategory | null;
  songContextKey: string;
  t: any;
  onAIFinalizeTurn: (status: 'correct' | 'wrong' | 'skip') => void;
}

const AI_SERVER_URL = `http://${configBuzz.AI_IP}:${configBuzz.AI_PORT}`;

const getDisplayText = (value: LocalizedText): string => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value.ru || value.en || '';
};

const escapeHtml = (value: string): string => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
} as Record<string, string>)[char] || char);

interface RevealedSong {
  song: AiSong;
  category: AiCategory | null;
}

const AISongReveal: React.FC<{ currentSong: AiSong; currentCategory: AiCategory | null; t: any }> = ({
  currentSong,
  currentCategory,
  t,
}) => {
  const categoryName = getDisplayText(currentCategory?.name);
  const categoryDescription = getDisplayText(currentCategory?.description);

  return (
    <section className="m-0 rounded-lg border-0 bg-transparent p-0 shadow-none">
      <div className="mb-3">
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
          {t.aiSongCategory}
        </p>
        <h2 className="text-base font-bold text-slate-100">
          {categoryName || '—'}
        </h2>
        {categoryDescription && (
          <p className="mt-1 whitespace-pre-line text-sm text-slate-300">
            {categoryDescription}
          </p>
        )}
      </div>

      <div className="grid gap-3 border-t border-slate-700 pt-3 sm:grid-cols-2">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
            {t.aiSongId} - {currentSong.id || ' n/a '}
          </p>
          <p className="text-lg font-semibold text-slate-100">
            {currentSong.title || '—'}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
            {t.aiSongArtist}
          </p>
          <p className="text-lg font-semibold text-slate-100">
            {currentSong.artist || '—'}
          </p>
        </div>
        {currentSong.notes && (
          <div className="sm:col-span-2">
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
              {t.aiSongNotes}
            </p>
            <p className="whitespace-pre-line text-sm text-slate-200">
              {currentSong.notes}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const AIModule: React.FC<AIModuleProps> = ({ currentSong, currentCategory, songContextKey, t, onAIFinalizeTurn }) => {
  const [error, setError] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [userPrompt, setUserPrompt] = useState('');
  const [outputHtml, setOutputHtml] = useState('');
  const [revealedSong, setRevealedSong] = useState<RevealedSong | null>(null);
  const [isWaitingForSong, setIsWaitingForSong] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requestHistory, setRequestHistory] = useState<RequestAttempt[]>([]);

  const moduleRef = useRef<HTMLElement | null>(null);
  const activeRequestRef = useRef<AbortController | null>(null);
  const actionedRequestsRef = useRef(new WeakSet<AbortController>());
  const onAIFinalizeTurnRef = useRef(onAIFinalizeTurn);
  const songContextKeyRef = useRef(songContextKey);
  const lastActiveSongContextKeyRef = useRef(songContextKey);
  onAIFinalizeTurnRef.current = onAIFinalizeTurn;
  songContextKeyRef.current = songContextKey;

  useEffect(() => {
    console.info('[AIModule diagnostic] mounted');
    return () => console.info('[AIModule diagnostic] unmounted');
  }, []);

  useEffect(() => {
    const syncFullscreenState = () => {
      setIsFullscreen(document.fullscreenElement === moduleRef.current);
    };

    document.addEventListener('fullscreenchange', syncFullscreenState);
    syncFullscreenState();
    return () => document.removeEventListener('fullscreenchange', syncFullscreenState);
  }, []);

  // Finalizing a turn temporarily clears the active note. Keep the completed AI
  // session until a different, non-empty song context is selected.
  useEffect(() => {
    if (!songContextKey) {
      activeRequestRef.current?.abort();
      activeRequestRef.current = null;
      setIsLoading(false);
      return;
    }

    if (lastActiveSongContextKeyRef.current === songContextKey) return;

    console.info('[AIModule diagnostic] songContextKey reset', {
      previous: lastActiveSongContextKeyRef.current,
      next: songContextKey,
    });
    lastActiveSongContextKeyRef.current = songContextKey;
    activeRequestRef.current?.abort();
    activeRequestRef.current = null;
    setIsLoading(false);
    setRequestHistory([]);
    setOutputHtml('');
    setRevealedSong(null);
    setIsWaitingForSong(false);
    setUserPrompt('');
  }, [songContextKey]);

  const handleGiftRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prompt = userPrompt.trim();
    if (!prompt || isLoading || activeRequestRef.current) return;

    const requestSong = currentSong;
    const requestCategory = currentCategory;
    if (!requestSong?.id) {
      setIsWaitingForSong(true);
      return;
    }

    setIsWaitingForSong(false);
    const requestContextKey = songContextKey;
    const requestController = new AbortController();
    activeRequestRef.current?.abort();
    activeRequestRef.current = requestController;
    setIsLoading(true);
    try {
      const response = await fetch(`${AI_SERVER_URL}/api/gift`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: requestController.signal,
        body: JSON.stringify({
          songId: requestSong.id,
          userPrompt: prompt,
          requestHistory,
        }),
      });

      const responseText = await response.text();
      let data: { message?: string; giftSuggestions?: string };
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(`AI server returned invalid JSON (HTTP ${response.status}): ${responseText || 'Empty response'}`);
      }

      if (!response.ok) {
        throw new Error(data.message || `AI request failed (HTTP ${response.status})`);
      }
      if (typeof data.giftSuggestions !== 'string') {
        throw new Error('AI server response does not contain a valid giftSuggestions string.');
      }

      const songGuess = JSON.parse(data.giftSuggestions);
      const evaluation = songGuess.evaluation;
      const message = typeof songGuess.message === 'string' ? songGuess.message : '';
      const html = evaluation === 'INCORRECT' ? '' : await marked.parse(message);
      if (
        requestController.signal.aborted ||
        activeRequestRef.current !== requestController ||
        songContextKeyRef.current !== requestContextKey
      ) return;
      if (evaluation === 'INCORRECT') {
        setRevealedSong({
          song: { ...requestSong },
          category: requestCategory ? { ...requestCategory } : null,
        });
      } else {
        setRevealedSong(null);
        setOutputHtml(DOMPurify.sanitize(html));
      }

      setRequestHistory((previousHistory) => [
        ...previousHistory,
        { userPrompt: prompt, evaluation: typeof evaluation === 'string' ? evaluation : '', message },
      ].slice(-3));

      if (
        (evaluation === 'CORRECT' || evaluation === 'INCORRECT') &&
        !actionedRequestsRef.current.has(requestController)
      ) {
        actionedRequestsRef.current.add(requestController);
        onAIFinalizeTurnRef.current(evaluation === 'CORRECT' ? 'correct' : 'wrong');
      }
    } catch (requestError) {
      if (requestController.signal.aborted || songContextKeyRef.current !== requestContextKey) return;
      console.error('AI gift request failed:', requestError);
      const message = requestError instanceof Error
        ? requestError.message
        : "Sorry, I can't access what I need right now.";
      setRevealedSong(null);
      setOutputHtml(DOMPurify.sanitize(`<p>${escapeHtml(message)}</p>`));
    } finally {
      if (activeRequestRef.current === requestController) {
        activeRequestRef.current = null;
        setIsLoading(false);
      }
    }
  };

  const categoryName = getDisplayText(currentCategory?.name);
  const categoryDescription = getDisplayText(currentCategory?.description);
  const remainingCharacters = 512 - userPrompt.length;

  return (
    <main
      ref={moduleRef}
      className="w-full min-w-0 bg-slate-850 p-2 font-sans text-white"
    >
      {/* <header className="mb-3 flex items-center justify-between gap-2 border-b border-slate-700 pb-3">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold">{t.aiModuleTitle}</h2>
        </div> 
      </header> */}

      {error && <p role="alert" className="mb-2 text-xs text-rose-400">{error}</p>}

      <section className="rounded-xl border border-slate-700 bg-slate-900 p-3 shadow-lg">
        <form onSubmit={handleGiftRequest}>
          <div className="mb-2 flex items-center justify-between gap-2">
            <label htmlFor="ai-user-input" className="text-xs font-semibold text-slate-200">
              {t.aiGuessLabel}
            </label>
            <span className="text-xs text-slate-400" aria-live="polite">
              {t.aiCharactersRemaining
                .replace('{remaining}', String(remainingCharacters))
                .replace('{max}', '512')}
            </span>
          </div>
          <textarea
            id="ai-user-input"
            value={userPrompt}
            maxLength={512}
            onChange={(event) => {
              console.info('[AIModule diagnostic] input change', {
                length: event.target.value.length,
                songContextKey,
              });
              setUserPrompt(event.target.value);
            }}
            rows={3}
            placeholder={t.aiInputPlaceholder}
            className="block h-24 w-full resize-none overflow-y-auto rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
          <button
            type="submit"
            disabled={isLoading || !userPrompt.trim()}
            className="mt-2 flex w-full items-center justify-center rounded-lg bg-indigo-600 px-3 py-3 text-sm font-bold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? t.aiThinking : t.aiSendAnswer}
          </button>
        </form>

        <div
          aria-live="polite"
          aria-busy={isLoading}
          className="prose prose-invert mt-3 h-[8.8rem] max-w-none overflow-y-auto rounded-lg border border-slate-700 bg-slate-950/70 p-3 text-sm text-slate-100"
        >
          {isWaitingForSong
            ? t.aiWaitingForSongInfo
            : revealedSong
              ? <AISongReveal currentSong={revealedSong.song} currentCategory={revealedSong.category} t={t} />
              : outputHtml && <div dangerouslySetInnerHTML={{ __html: outputHtml }} />}
        </div>
      </section>

      <footer className="mt-2 flex flex-wrap items-center justify-between gap-1 text-[10px] font-semibold">
        <span className={currentSong?.id ? 'text-emerald-400' : 'text-rose-400'}>
          {currentSong?.id ? t.aiSongReady : t.aiWaitingForSong}
        </span>        
      </footer>
    </main>
  );
};

export default AIModule;
