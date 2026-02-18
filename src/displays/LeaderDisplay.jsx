import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import configBuzz from '../../configBuzz.json';

const LeaderDisplay = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [songInfo, setSongInfo] = useState({ title: '', artist: '', notes: '' });
    const [error, setError] = useState('');
    const [socketConnected, setSocketConnected] = useState(false);

    useEffect(() => {
        // Check if already authenticated in session
        const isAuth = sessionStorage.getItem('leaderAuthenticated');
        if (isAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        const socket = io(configBuzz.SOCKET_URL, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5,
            transports: ['websocket', 'polling']
        });

        socket.on('connect', () => {
            console.log('Leader display connected to socket server');
            setSocketConnected(true);
        });

        socket.on('disconnect', () => {
            console.log('Leader display disconnected from socket server');
            setSocketConnected(false);
        });

        // Listen for song data from main app
        socket.on('songUpdate', (data) => {
            console.log('Received songUpdate:', data);
            if (data && data.title) {
                setSongInfo({
                    title: data.title || '',
                    artist: data.artist || '',
                    notes: data.notes || ''
                });
                // Also save to sessionStorage as fallback for other tabs/polling
                sessionStorage.setItem('currentSongInfo', JSON.stringify({
                    title: data.title || '',
                    artist: data.artist || '',
                    notes: data.notes || ''
                }));
            }
        });

        // Fallback: listen for gameStateLink
        socket.on('gameStateLink', (data) => {
            console.log('Received gameStateLink:', data);
            if (data && data.currentSong) {
                setSongInfo({
                    title: data.currentSong.title || '',
                    artist: data.currentSong.artist || '',
                    notes: data.currentSong.notes || ''
                });
            }
        });

        // Fallback: listen for updateGameState
        socket.on('updateGameState', (data) => {
            console.log('Received updateGameState:', data);
            if (data && data.currentSong) {
                setSongInfo({
                    title: data.currentSong.title || '',
                    artist: data.currentSong.artist || '',
                    notes: data.currentSong.notes || ''
                });
            }
        });

        return () => { socket.disconnect(); };
    }, []);

    // Poll the server for current song state (works on any network device)
    // useEffect(() => {
    //     if (!isAuthenticated) return;

    //     const pollInterval = setInterval(async () => {
    //         try {
    //             // Get the host from the current URL or use config server
    //             const hostUrl = window.location.origin === 'http://localhost:5173' 
    //                 ? 'http://localhost:5173'
    //                 : `http://${window.location.hostname}:5173`;
                
    //             const response = await fetch(`${hostUrl}/api/current-song`);
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 if (data.currentSong && data.currentSong.title) {
    //                     setSongInfo({
    //                         title: data.currentSong.title || '',
    //                         artist: data.currentSong.artist || '',
    //                         notes: data.currentSong.notes || ''
    //                     });
    //                 }
    //             }
    //         } catch (e) {
    //             console.log('Could not fetch from HTTP endpoint:', e.message);
    //         }
    //     }, 300);

    //     return () => clearInterval(pollInterval);
    // }, [isAuthenticated]);

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordInput === configBuzz.leaderPassword) {
            setIsAuthenticated(true);
            sessionStorage.setItem('leaderAuthenticated', 'true');
            setPasswordInput('');
            setError('');
        } else {
            setError('Invalid password');
            setPasswordInput('');
        }
    };

    useEffect(() => {
        if (!isAuthenticated) return;

        let lastActiveNote = null;

        const handleStorageChange = () => {
            const savedState = localStorage.getItem('musicQuizPlayerState');
            if (savedState) {
                const state = JSON.parse(savedState);

                // Convert activeNote to string for comparison
                const currentActiveNote = JSON.stringify(state.activeNote);

                // Only update when activeNote changes (new song selected with PLAY button)
                // Song info PERSISTS even if STOP or BUZZ is pressed
                if (currentActiveNote !== lastActiveNote && state.activeNote && state.currentSong) {
                    lastActiveNote = currentActiveNote;
                    setSongInfo({
                        title: state.currentSong?.title || '',
                        artist: state.currentSong?.artist || '',
                        notes: state.currentSong?.notes || ''
                    });
                }
            }
        };

        const interval = setInterval(handleStorageChange, 500);
        return () => clearInterval(interval);
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div style={{
                backgroundColor: '#fff',
                color: '#000',
                height: '100vh',
                padding: '0',
                fontFamily: 'sans-serif',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    backgroundColor: '#f5f5f5',
                    padding: '40px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    maxWidth: '400px',
                    width: '90%'
                }}>
                    <h1 style={{
                        textAlign: 'center',
                        marginBottom: '30px',
                        fontSize: '28px',
                        fontWeight: 'bold'
                    }}>Leader Display</h1>
                    <form onSubmit={handlePasswordSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                fontWeight: 'bold',
                                marginBottom: '8px',
                                fontSize: '14px'
                            }}>Password</label>
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    fontSize: '16px',
                                    border: '2px solid #ddd',
                                    borderRadius: '6px',
                                    boxSizing: 'border-box'
                                }}
                                placeholder="Enter password"
                            />
                        </div>
                        {error && (
                            <div style={{
                                color: '#d32f2f',
                                marginBottom: '15px',
                                fontSize: '14px',
                                textAlign: 'center'
                            }}>
                                {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: '#1976d2',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            backgroundColor: '#fff',
            color: '#000',
            height: '100vh',
            padding: '20px',
            fontFamily: 'sans-serif',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                width: '100%'
            }}>
                <div style={{
                    marginBottom: '30px',
                    borderBottom: '3px solid #000',
                    paddingBottom: '15px'
                }}>
                    <h1 style={{
                        fontSize: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        margin: '0'
                    }}>Now Playing</h1>
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <label style={{
                        fontWeight: 'bold',
                        display: 'block',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '8px',
                        color: '#666'
                    }}>Title</label>
                    <p style={{
                        fontSize: '32px',
                        margin: '0',
                        fontWeight: 'bold',
                        minHeight: '50px',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        {songInfo.title || '—'}
                    </p>
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <label style={{
                        fontWeight: 'bold',
                        display: 'block',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '8px',
                        color: '#666'
                    }}>Artist</label>
                    <p style={{
                        fontSize: '24px',
                        margin: '0',
                        fontWeight: 'bold',
                        minHeight: '40px',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        {songInfo.artist || '—'}
                    </p>
                </div>

                <div style={{
                    backgroundColor: '#f0f0f0',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '2px solid #ddd'
                }}>
                    <label style={{
                        fontWeight: 'bold',
                        display: 'block',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '10px',
                        color: '#666'
                    }}>Host Notes</label>
                    <p style={{
                        fontSize: '16px',
                        margin: '0',
                        lineHeight: '1.5',
                        minHeight: '60px',
                        display: 'flex',
                        alignItems: 'flex-start'
                    }}>
                        {songInfo.notes || ''}
                    </p>
                </div>

                <div style={{
                    marginTop: '30px',
                    textAlign: 'center',
                    fontSize: '12px',
                    color: '#999'
                }}>
                    Waiting for song to start...
                </div>
            </div>
        </div>
    );
};

export default LeaderDisplay;