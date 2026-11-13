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

const AIModule: React.FC<AIModuleProps> = ({ currentSong, currentCategory, songContextKey, t }) => {
  const [error, setError] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [userPrompt, setUserPrompt] = useState('');
  const [outputHtml, setOutputHtml] = useState('');
  const [isWaitingForSong, setIsWaitingForSong] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requestHistory, setRequestHistory] = useState<RequestAttempt[]>([]);

  const moduleRef = useRef<HTMLElement | null>(null);
  const activeRequestRef = useRef<AbortController | null>(null);
  const songContextKeyRef = useRef(songContextKey);
  const previousSongContextKeyRef = useRef(songContextKey);
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

  // A new note is a new guessing session, even if it happens to reuse a song ID.
  useEffect(() => {
    console.info('[AIModule diagnostic] songContextKey reset', {
      previous: previousSongContextKeyRef.current,
      next: songContextKey,
    });
    previousSongContextKeyRef.current = songContextKey;
    activeRequestRef.current?.abort();
    activeRequestRef.current = null;
    setIsLoading(false);
    setRequestHistory([]);
    setOutputHtml('');
    setIsWaitingForSong(false);
    setUserPrompt('');
  }, [songContextKey]);

  const handleGiftRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prompt = userPrompt.trim();
    if (!prompt || isLoading) return;

    if (!currentSong?.id) {
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
          songId: currentSong.id,
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
      const message = songGuess.message || '';
      const html = await marked.parse(message);
      if (songContextKeyRef.current !== requestContextKey) return;
      setOutputHtml(DOMPurify.sanitize(html));

      if (evaluation === 'CORRECT') {
        setRequestHistory([]);
      } else {
        setRequestHistory((previousHistory) => [
          ...previousHistory,
          { userPrompt: prompt, evaluation, message },
        ].slice(-3));
      }
    } catch (requestError) {
      if (requestController.signal.aborted || songContextKeyRef.current !== requestContextKey) return;
      console.error('AI gift request failed:', requestError);
      const message = requestError instanceof Error
        ? requestError.message
        : "Sorry, I can't access what I need right now.";
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
  const remainingCharacters = 256 - userPrompt.length;

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
                .replace('{max}', '256')}
            </span>
          </div>
          <textarea
            id="ai-user-input"
            value={userPrompt}
            maxLength={256}
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
