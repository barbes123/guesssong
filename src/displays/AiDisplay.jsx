import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { Maximize, Minimize } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import configBuzz from '../../configBuzz.json';
import { autoResizeTextarea } from './ai-utils.js';

// Main App Socket.IO server and AI backend are configured separately.
// configBuzz.SERVER_IP / LEADER_PORT are used only for the Main App.
const AI_SERVER_URL = `http://${configBuzz.AI_IP}:${configBuzz.AI_PORT}`;

const AiDisplay = () => {
    // -------------------------------------------------------------------------
    // Authentication and Leader Display state
    // -------------------------------------------------------------------------
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [songInfo, setSongInfo] = useState({ title: '', artist: '', notes: '' });
    const [categoryInfo, setCategoryInfo] = useState({ name: '', description: '' });
    const [error, setError] = useState('');
    const [socketConnected, setSocketConnected] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [fullscreenError, setFullscreenError] = useState(false);

    // AI request state
    const [userPrompt, setUserPrompt] = useState('');
    const [outputHtml, setOutputHtml] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [requestHistory, setRequestHistory] = useState([]);

    // Video reference for the stay-awake workaround
    const videoRef = useRef(null);

    // -------------------------------------------------------------------------
    // Fullscreen handling
    // -------------------------------------------------------------------------
    useEffect(() => {
        const syncFullscreenState = () => {
            setIsFullscreen(Boolean(document.fullscreenElement));
        };

        document.addEventListener('fullscreenchange', syncFullscreenState);
        syncFullscreenState();

        return () => {
            document.removeEventListener('fullscreenchange', syncFullscreenState);
        };
    }, []);

    const toggleFullscreen = async () => {
        setFullscreenError(false);

        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else {
                await document.documentElement.requestFullscreen();
            }
        } catch (fullscreenException) {
            console.error('Failed to toggle AI display fullscreen mode', fullscreenException);
            setFullscreenError(true);
        }
    };

    // Supports category names/descriptions stored either as strings or
    // language objects, e.g. { ru: 'Россия', en: 'Russia' }.
    const getDisplayText = (value) => {
        if (!value) return '';
        if (typeof value === 'string') return value;
        return value.ru || value.en || '';
    };


    // -------------------------------------------------------------------------
    // 1. Restore authentication from this browser's session
    // -------------------------------------------------------------------------
    useEffect(() => {
        const isAuth = sessionStorage.getItem('leaderAuthenticated');
        if (isAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    // -------------------------------------------------------------------------
    // 2. Socket.IO: receive the current game state from the Main App
    // -------------------------------------------------------------------------
    useEffect(() => {
        const socketUrl = `http://${configBuzz.SERVER_IP}:${configBuzz.LEADER_PORT}`;

        const socket = io(socketUrl, {
            reconnection: true,
            reconnectionDelay: 1000,
            transports: ['polling', 'websocket']
        });

        socket.on('connect', () => {
            console.log('AI display connected to Main App Socket.IO server');
            setSocketConnected(true);
            socket.emit('requestGameState');
        });

        socket.on('disconnect', () => {
            setSocketConnected(false);
        });

        const handleDataUpdate = (data) => {
            console.log('Socket game-state data received:', data);
            if (!data) return;

            console.log('[socket] event received, full payload:', data);
            console.log('[socket] payload keys:', Object.keys(data ?? {}));
            console.log('[socket] data.currentSong:', data?.currentSong);
            console.log('[socket] data.currentCategory:', data?.currentCategory);

            // The song object contains the song ID used by SERVER_AI to load
            // its lyrics file. Example: currentSong.id === 'p1_2_5'.
            const song = data.currentSong || data;

            if (song && (song.id || song.title || song.notes || song.hint)) {
                setCurrentSong(song);
                setSongInfo({
                    title: song.title || '',
                    artist: song.artist || '',
                    notes: song.notes || song.hint || ''
                });
            }

            // currentCategory is the category object (e.g. id: 'russia'),
            // not the individual song. The song ID is currentSong.id.
            if (data.currentCategory) {
                setCurrentCategory(data.currentCategory);
                setCategoryInfo({
                    name: data.currentCategory.name || '',
                    description: data.currentCategory.description || ''
                });
            }
        };

        socket.on('songUpdate', handleDataUpdate);
        socket.on('gameStateLink', handleDataUpdate);
        socket.on('updateGameState', handleDataUpdate);

        return () => {
            socket.disconnect();
        };
    }, []);

    // Clear previous attempts and previous AI output when a new song starts.
    useEffect(() => {
        if (!currentSong?.id) return;
        setRequestHistory([]);
        setOutputHtml('');
        setUserPrompt('');
    }, [currentSong?.id]);

    // -------------------------------------------------------------------------
    // 3. Login logic with video trigger
    // -------------------------------------------------------------------------
    const handleLoginSubmit = (e) => {
        e.preventDefault();

        if (passwordInput === configBuzz.LEADER_PASS) {
            setIsAuthenticated(true);
            sessionStorage.setItem('leaderAuthenticated', 'true');
            setError('');

            if (videoRef.current) {
                videoRef.current.play().catch((playError) => {
                    console.log('Video hack blocked:', playError);
                });
            }
        } else {
            setError('Invalid password');
            setPasswordInput('');
        }
    };

    // -------------------------------------------------------------------------
    // 4. Send the player's answer to SERVER_AI
    // -------------------------------------------------------------------------
    const handleGiftRequest = async (e) => {
        e.preventDefault();

        const prompt = userPrompt.trim();
        if (!prompt || isLoading) return;

        if (!currentSong?.id) {
            setOutputHtml(DOMPurify.sanitize(
                '<p>Waiting for song information from the Main App...</p>'
            ));
            return;
        }

        if (!AI_SERVER_URL) {
            setOutputHtml(DOMPurify.sanitize(
                '<p>AI backend is not configured. Add AI_SERVER_IP to configBuzz.json.</p>'
            ));
            return;
        }

        setIsLoading(true);

        try {
            console.log(`${AI_SERVER_URL}/api/gift`)
            const response = await fetch(`${AI_SERVER_URL}/api/gift`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    songId: currentSong.id,
                    userPrompt: prompt,
                    requestHistory
                })
            });

            // Read as text first so an empty/non-JSON error response does not
            // cause a misleading JSON.parse exception.
            const responseText = await response.text();
            let data;

            try {
                data = JSON.parse(responseText);
            } catch {
                throw new Error(
                    `AI server returned invalid JSON (HTTP ${response.status}): ${responseText || 'Empty response'}`
                );
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

            // Convert Markdown to HTML and sanitize before rendering.
            const html = marked.parse(message);
            const safeHTML = DOMPurify.sanitize(html);
            setOutputHtml(safeHTML);

            // Preserve up to the last three unsuccessful attempts.
            if (evaluation === 'CORRECT') {
                setRequestHistory([]);
            } else {
                setRequestHistory((previousHistory) => [
                    ...previousHistory,
                    {
                        userPrompt: prompt,
                        evaluation,
                        message
                    }
                ].slice(-3));
            }

            console.log('Answer attempts:', evaluation === 'CORRECT'
                ? 0
                : Math.min(requestHistory.length + 1, 3));
        } catch (requestError) {
            console.error('AI gift request failed:', requestError);
            setOutputHtml(DOMPurify.sanitize(
                `<p>${String(requestError.message || "Sorry, I can't access what I need right now.").replace(/[&<>"']/g, (char) => ({
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;'
                })[char])}</p>`
            ));
        } finally {
            setIsLoading(false);
        }
    };

    // -------------------------------------------------------------------------
    // RENDER LOGIN — original authentication UI preserved
    // -------------------------------------------------------------------------
    if (!isAuthenticated) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-950 font-sans">
                <video ref={videoRef} loop muted playsInline style={{ display: 'none' }}>
                    <source src="/video/silent.mp4" type="video/mp4" />
                </video>

                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center shadow-2xl">
                    <h1 className="mb-6 text-2xl font-bold text-white">🔒 AI Access</h1>
                    <form onSubmit={handleLoginSubmit}>
                        <input
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            autoFocus
                            className="mb-4 block w-64 rounded-xl border-2 border-transparent bg-slate-800 p-4 text-center text-white outline-none focus:border-indigo-500"
                            placeholder="Enter Password"
                            aria-label="Password"
                        />
                        {error && (
                            <div role="alert" className="mb-4 text-center text-sm text-rose-400">
                                {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-indigo-600 py-4 font-bold text-white transition-all hover:bg-indigo-500"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // -------------------------------------------------------------------------
    // RENDER AI GIFT UI — replaces the original Leader UI
    // -------------------------------------------------------------------------
    const categoryName = getDisplayText(currentCategory?.name || categoryInfo.name);
    const categoryDescription = getDisplayText(
        currentCategory?.description || categoryInfo.description
    );

    return (
        <main className="min-h-screen w-full bg-slate-950 px-4 py-8 font-sans text-white">
            <video
                ref={videoRef}
                loop
                muted
                playsInline
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
            >
                <source src="/video/silent.mp4" type="video/mp4" />
            </video>

            <div className="mx-auto w-full max-w-2xl">
                <header className="mb-8 border-b border-slate-700 pb-5">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-indigo-400">
                                Music Quiz
                            </p>
                            <h1 className="text-3xl font-bold">AI Song Guess</h1>
                        </div>

                        <button
                            type="button"
                            onClick={toggleFullscreen}
                            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                            aria-pressed={isFullscreen}
                            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-600 bg-slate-800 text-slate-100 transition hover:bg-slate-700"
                        >
                            {isFullscreen ? (
                                <Minimize size={22} aria-hidden="true" />
                            ) : (
                                <Maximize size={22} aria-hidden="true" />
                            )}
                        </button>
                    </div>

                    {fullscreenError && (
                        <p role="alert" className="mt-3 text-right text-xs text-rose-400">
                            Unable to change fullscreen mode. Please try again.
                        </p>
                    )}
                </header>

                <section className="mb-6 rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-xl">
                    <div className="mb-4">
                        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                            Category
                        </p>
                        <h2 className="text-xl font-bold">
                            {categoryName || '—'}
                        </h2>
                        {categoryDescription && (
                            <p className="mt-1 whitespace-pre-line text-sm text-slate-300">
                                {categoryDescription}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-3 border-t border-slate-700 pt-4 sm:grid-cols-2">
                        <div>
                            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                                Song ID - {currentSong?.id || ' n/a '}
                            </p>
                            <p className="text-lg font-semibold">
                                {currentSong?.title || songInfo.title || '—'}
                            </p>
                            {/* <p className="text-lg font-semibold">
                                {currentSong?.id || '—'}
                            </p> */}
                        </div>
                        <div>
                            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                                Artist
                            </p>
                            <p className="text-lg font-semibold">
                                {currentSong?.artist || songInfo.artist || '—'}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-xl sm:p-7">
                    <form id="gift-form" onSubmit={handleGiftRequest}>
                        <label
                            htmlFor="user-input"
                            className="mb-3 block text-sm font-semibold text-slate-200"
                        >
                            Your guess or message
                        </label>
                        <textarea
                            id="user-input"
                            value={userPrompt}
                            onChange={(e) => {
                                setUserPrompt(e.target.value);
                                autoResizeTextarea(e.target);
                            }}
                            rows={2}
                            placeholder="Type your answer here..."
                            className="block w-full resize-none rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                        />

                        <button
                            type="submit"
                            disabled={isLoading || !userPrompt.trim()}
                            className="mt-4 flex w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-4 font-bold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isLoading ? 'Thinking...' : 'Send answer'}
                        </button>
                    </form>

                    <div
                        id="output-content"
                        aria-live="polite"
                        aria-busy={isLoading}
                        className="prose prose-invert mt-6 max-w-none rounded-xl border border-slate-700 bg-slate-950/70 p-5 text-slate-100 empty:hidden"
                        dangerouslySetInnerHTML={{ __html: outputHtml }}
                    />
                </section>

                <footer className="mt-6 text-center text-xs font-semibold">
                    <span className={socketConnected ? 'text-emerald-400' : 'text-rose-400'}>
                        {socketConnected
                            ? '● LIVE CONNECTION ACTIVE'
                            : '○ DISCONNECTED - RECONNECTING...'}
                    </span>
                    {currentSong?.id && (
                        <span className="ml-2 text-slate-500">
                            Song ID: {currentSong.id}
                        </span>
                    )}
                </footer>
            </div>
        </main>
    );
};

export default AiDisplay;