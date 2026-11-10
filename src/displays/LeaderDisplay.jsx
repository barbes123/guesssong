import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { Maximize, Minimize } from 'lucide-react';
import configBuzz from '../../configBuzz.json';

const LeaderDisplay = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [songInfo, setSongInfo] = useState({ title: '', artist: '', notes: '' });
    const [categoryInfo, setCategoryInfo] = useState({ name: '', description: '' });
    const [error, setError] = useState('');
    const [socketConnected, setSocketConnected] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [fullscreenError, setFullscreenError] = useState(false);


    // Video reference for the "Stay Awake" hack
    const videoRef = useRef(null);

    useEffect(() => {
        const syncFullscreenState = () => setIsFullscreen(Boolean(document.fullscreenElement));

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
            console.error('Failed to toggle LeaderDisplay fullscreen mode', fullscreenException);
            setFullscreenError(true);
        }
    };

    // Helper function to get display text (handles both string and object formats)
    const getDisplayText = (obj) => {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj.ru || obj.en || '';
    };

    // 1. Initial Authentication Check
    useEffect(() => {
        const isAuth = sessionStorage.getItem('leaderAuthenticated');
        if (isAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    // 2. Socket Connection & Listeners
    useEffect(() => {

        const socketUrl = `http://${configBuzz.SERVER_IP}:${configBuzz.LEADER_PORT}`;

        // const socket = io(configBuzz.SOCKET_URL, {
        const socket = io(socketUrl, {
            reconnection: true,
            reconnectionDelay: 1000,
            transports: ['polling', 'websocket']
            // transports: ['websocket', 'polling']
        });

        socket.on('connect', () => {
            console.log('Leader display connected to socket server');
            setSocketConnected(true);
            socket.emit('requestGameState');
        });

        socket.on('disconnect', () => {
            setSocketConnected(false);
        });

        // Unified data handler
        const handleDataUpdate = (data) => {
            console.log('📦 Socket Data received:', data);
            const song = data.currentSong || data;

            // Update song info
            if (song && (song.title || song.notes)) {
                setSongInfo({
                    title: song.title || '',
                    artist: song.artist || '',
                    notes: song.notes || song.hint || ''
                });
            }

            // Update category info if available
            if (data.currentCategory) {
                console.log('🎯 Category data received:', data.currentCategory);
                setCategoryInfo({
                    name: data.currentCategory.name || '',
                    description: data.currentCategory.description || ''
                });
            }
        };

        socket.on('songUpdate', handleDataUpdate);
        socket.on('gameStateLink', handleDataUpdate);
        socket.on('updateGameState', handleDataUpdate);

        return () => { socket.disconnect(); };
    }, []);

    // 3. Login Logic with Video Trigger
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (passwordInput === configBuzz.LEADER_PASS) {
            setIsAuthenticated(true);
            sessionStorage.setItem('leaderAuthenticated', 'true');
            setError('');

            // 🚀 TRIGGER THE STAY-AWAKE VIDEO
            if (videoRef.current) {
                videoRef.current.play().catch(err => console.log("Video hack blocked:", err));
            }
        } else {
            setError('Invalid password');
            setPasswordInput('');
        }
    };

    // 4. LocalStorage Sync (For same-device testing)
    useEffect(() => {
        if (!isAuthenticated) return;
        let lastTitle = '';

        const checkStorage = () => {
            const saved = localStorage.getItem('musicQuizPlayerState');
            if (saved) {
                const state = JSON.parse(saved);
                const song = state.currentSong;
                if (song && song.title !== lastTitle) {
                    lastTitle = song.title;
                    setSongInfo({
                        title: song.title || '',
                        artist: song.artist || '',
                        notes: song.notes || ''
                    });
                }

                // Also try to get category from localStorage
                if (state.currentCategory) {
                    setCategoryInfo({
                        name: state.currentCategory.name || '',
                        description: state.currentCategory.description || ''
                    });
                }
            }
        };

        const interval = setInterval(checkStorage, 1000);
        return () => clearInterval(interval);
    }, [isAuthenticated]);

    // --- RENDER LOGIN ---
    if (!isAuthenticated) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-950 font-sans">
                <video ref={videoRef} loop muted playsInline style={{ display: 'none' }}>
                    <source src="/video/silent.mp4" type="video/mp4" />
                </video>

                <div className="bg-slate-900 p-10 rounded-3xl border border-slate-800 shadow-2xl text-center">
                    <h1 className="text-white text-2xl font-bold mb-6">🔒 Leader Access</h1>
                    <form onSubmit={handleLoginSubmit}>
                        <input
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            autoFocus
                            className="bg-slate-800 text-white p-4 rounded-xl block mb-4 w-64 border-2 border-transparent focus:border-indigo-500 outline-none text-center"
                            placeholder="Enter Password"
                            aria-label="Password"
                        />
                        {error && <div role="alert" className="text-rose-400 text-sm text-center mb-4">{error}</div>}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all"
                        >
                            Login & Keep Screen On
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // --- RENDER LEADER UI ---
    return (
        <div
            style={{
                backgroundColor: '#fff',
                color: '#000',
                minHeight: '100vh',
                width: '100%',
                boxSizing: 'border-box',
                padding: '20px',
                fontFamily: 'sans-serif',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                overflowY: 'auto'
            }}
        >
            {/* style={{ backgroundColor: '#fff', color: '#000', height: '100vh', padding: '20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} */}
            <video ref={videoRef} loop muted playsInline style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
                <source src="/video/silent.mp4" type="video/mp4" />
            </video>

            <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>

                <div style={{ marginBottom: '15px', borderBottom: '3px solid #000', paddingBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <h1 style={{ fontSize: '24px', textTransform: 'uppercase', fontWeight: 'bold', margin: '0' }}>
                        Now Playing
                    </h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {fullscreenError && (
                                <div role="alert" style={{ maxWidth: 'min(240px, 55vw)', color: '#b91c1c', fontSize: '12px', textAlign: 'right' }}>
                                    Unable to change fullscreen mode. Please try again.
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={toggleFullscreen}
                                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                                aria-pressed={isFullscreen}
                                title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: '0 0 44px',
                                    width: '44px',
                                    height: '44px',
                                    padding: 0,
                                    border: '1px solid rgba(148, 163, 184, 0.5)',
                                    borderRadius: '50%',
                                    background: 'rgba(15, 23, 42, 0.8)',
                                    color: '#e2e8f0',
                                    cursor: 'pointer',
                                    backdropFilter: 'blur(8px)'
                                }}
                            >
                                {isFullscreen ? <Minimize size={22} aria-hidden="true" /> : <Maximize size={22} aria-hidden="true" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Category Section - NEW */}
                {categoryInfo.name && getDisplayText(categoryInfo.name) && (
                    <div style={{
                        marginBottom: '5px',
                        backgroundColor: '#e3f2fd',
                        padding: '15px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #1976d2'
                    }}>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{
                                fontWeight: 'bold',
                                display: 'block',
                                fontSize: '12px',
                                textTransform: 'uppercase',
                                marginBottom: '5px',
                                color: '#1976d2'
                            }}>
                                {/* Current Category */}
                            </label>
                            <p style={{ fontSize: '24px', margin: '0', fontWeight: 'bold' }}>
                                {getDisplayText(categoryInfo.name)}
                            </p>
                        </div>
                        {categoryInfo.description && getDisplayText(categoryInfo.description) && (
                            <div>
                                <label style={{
                                    fontWeight: 'bold',
                                    display: 'block',
                                    fontSize: '12px',
                                    textTransform: 'uppercase',
                                    marginBottom: '5px',
                                    color: '#1976d2'
                                }}>
                                    {/* Category Theme */}
                                </label>
                                <p style={{ fontSize: '22px', margin: '0', lineHeight: '1.4', fontStyle: 'italic' }}>
                                    {getDisplayText(categoryInfo.description)}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <div style={{ marginBottom: '5px' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px', color: '#666' }}>
                        {/* Title */}
                    </label>
                    <p style={{ fontSize: '32px', margin: '0', fontWeight: 'bold', minHeight: '50px', display: 'flex', alignItems: 'center' }}>
                        {songInfo.title || '—'}
                    </p>
                </div>

                <div style={{ marginBottom: '5px' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px', color: '#666' }}>
                        {/* Artist */}
                    </label>
                    <p style={{ fontSize: '24px', margin: '0', fontWeight: 'bold', minHeight: '40px', display: 'flex', alignItems: 'center' }}>
                        {songInfo.artist || '—'}
                    </p>
                </div>

                <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', border: '2px solid #ddd' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', fontSize: '12px', textTransform: 'uppercase', marginBottom: '10px', color: '#666' }}>Host Notes</label>
                    <p style={{ fontSize: '22px', margin: '0', lineHeight: '1.5', minHeight: '60px', display: 'flex', alignItems: 'flex-start' }}>
                        {songInfo.notes || 'No notes for this song.'}
                    </p>
                </div>

                <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '11px', color: socketConnected ? '#4caf50' : '#f44336', fontWeight: 'bold' }}>
                    {socketConnected ? '● LIVE CONNECTION ACTIVE' : '○ DISCONNECTED - RECONNECTING...'}
                </div>
            </div>
        </div>
    );
};

export default LeaderDisplay;