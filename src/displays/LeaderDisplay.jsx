import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import configBuzz from '../../configBuzz.json';

const LeaderDisplay = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [songInfo, setSongInfo] = useState({ title: '', artist: '', notes: '' });
    const [error, setError] = useState('');
    const [socketConnected, setSocketConnected] = useState(false);
    
    // Video reference for the "Stay Awake" hack
    const videoRef = useRef(null);

    // 1. Initial Authentication Check
    useEffect(() => {
        const isAuth = sessionStorage.getItem('leaderAuthenticated');
        if (isAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    // 2. Socket Connection & Listeners
    useEffect(() => {
        const socket = io(configBuzz.SOCKET_URL, {
            reconnection: true,
            reconnectionDelay: 1000,
            transports: ['websocket', 'polling']
        });

        socket.on('connect', () => {
            console.log('Leader display connected to socket server');
            setSocketConnected(true);
        });

        socket.on('disconnect', () => {
            setSocketConnected(false);
        });

        // Unified data handler
        const handleDataUpdate = (data) => {
            console.log('📦 Socket Data received:', data);
            const song = data.currentSong || data;
            if (song && (song.title || song.notes)) {
                setSongInfo({
                    title: song.title || '',
                    artist: song.artist || '',
                    notes: song.notes || song.hint || ''
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
        if (passwordInput === configBuzz.leaderPassword) {
            setIsAuthenticated(true);
            sessionStorage.setItem('leaderAuthenticated', 'true');
            setError('');

            // 🚀 TRIGGER THE STAY-AWAKE VIDEO
            // Browsers only allow .play() if triggered by a user click
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
            }
        };

        const interval = setInterval(checkStorage, 1000);
        return () => clearInterval(interval);
    }, [isAuthenticated]);

    // --- RENDER LOGIN ---
    if (!isAuthenticated) {
        return (
            <div style={{ backgroundColor: '#fff', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
                {/* Pre-load video element */}
                <video ref={videoRef} loop muted playsInline style={{ display: 'none' }}>
                    <source src="/video/silent.mp4" type="video/mp4" />
                </video>

                <div style={{ backgroundColor: '#f5f5f5', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxWidth: '400px', width: '90%' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '28px', fontWeight: 'bold' }}>Leader Display</h1>
                    <form onSubmit={handleLoginSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>Password</label>
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                style={{ width: '100%', padding: '12px', fontSize: '16px', border: '2px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }}
                                placeholder="Enter password"
                            />
                        </div>
                        {error && <div style={{ color: '#d32f2f', marginBottom: '15px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}
                        <button
                            type="submit"
                            style={{ width: '100%', padding: '12px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
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
            style={{ backgroundColor: '#fff', color: '#000', height: '100vh', padding: '20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            onClick={() => videoRef.current?.play() /* Re-trigger video on tap */}
        >
            {/* The "Stay Awake" Ghost Video */}
            <video ref={videoRef} loop muted playsInline style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
                <source src="/video/silent.mp4" type="video/mp4" />
            </video>

            <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
                <div style={{ marginBottom: '30px', borderBottom: '3px solid #000', paddingBottom: '15px' }}>
                    <h1 style={{ fontSize: '24px', textTransform: 'uppercase', fontWeight: 'bold', margin: '0' }}>Now Playing</h1>
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px', color: '#666' }}>Title</label>
                    <p style={{ fontSize: '32px', margin: '0', fontWeight: 'bold', minHeight: '50px', display: 'flex', alignItems: 'center' }}>
                        {songInfo.title || '—'}
                    </p>
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px', color: '#666' }}>Artist</label>
                    <p style={{ fontSize: '24px', margin: '0', fontWeight: 'bold', minHeight: '40px', display: 'flex', alignItems: 'center' }}>
                        {songInfo.artist || '—'}
                    </p>
                </div>

                <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', border: '2px solid #ddd' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', fontSize: '12px', textTransform: 'uppercase', marginBottom: '10px', color: '#666' }}>Host Notes</label>
                    <p style={{ fontSize: '16px', margin: '0', lineHeight: '1.5', minHeight: '60px', display: 'flex', alignItems: 'flex-start' }}>
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