import { useState, useEffect, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import configBuzz from '../../configBuzz.json';

export const useBuzzer = (stopSong: (fullyClear?: boolean) => void) => {
    const socketRef = useRef<Socket | null>(null);

    // States
    const [isBuzzerConnected, setIsBuzzerConnected] = useState(false);
    const [hubPlayers, setHubPlayers] = useState<any[]>([]);
    const [activeResponder, setActiveResponder] = useState<string | null>(null);
    const [buzzerMapping, setBuzzerMapping] = useState<Record<string, number>>({});

    // Initialize Socket
    if (!socketRef.current) {
        socketRef.current = io(configBuzz.SOCKET_URL, {
            autoConnect: true,
            reconnection: true
        });
    }
    const socket = socketRef.current;

    const handleConnect = useCallback(() => {
        if (!socket.connected) socket.connect();
    }, [socket]);

    const handleForceDisconnect = useCallback(() => {
        socket.disconnect();
        setIsBuzzerConnected(false);
        setHubPlayers([]);
    }, [socket]);

    /**
     * armBuzzers
     * Triggered by the Game App to start a round.
     * Uses RESET + START_ROUND to sync the server clock and activate phones.
     */
    const armBuzzers = useCallback(() => {
        setActiveResponder(null);

        // 1. Tell the server to RESET (clears old buzzes)
        socket.emit('gameAction', { type: 'RESET' });

        // 2. Small delay then START_ROUND (Sets state to ACTIVE and starts server timer)
        setTimeout(() => {
            socket.emit('gameAction', { type: 'START_ROUND' });
            console.log("%c🚀 START_ROUND sent. Phones should show timer.", "color: #3b82f6; font-weight: bold;");
        }, 150);
    }, [socket]);

    useEffect(() => {
        if (!socket) return;

        // --- REGISTRATION LOGIC ---
        const registerAsHost = () => {
            console.log("👑 Game App: Attempting to register as Master Host...");
            socket.emit('register', {
                name: 'MasterHost', 
                role: 'host',
                code: '' // IMPORTANT: If your server uses a code, it must go here
            });
        };

        // --- LISTENER LOGIC ---
        const handleRegistered = (data: { success: boolean; error?: string }) => {
            if (data.success) {
                // GREEN LOG if successful
                console.log("%c✅ HOST CONNECTED: Game App has control.", "color: #00ff00; font-weight: bold; background: #002200; padding: 2px 5px;");
                setIsBuzzerConnected(true);
            } else {
                // RED LOG if failed
                console.log(`%c❌ NOT HOST: ${data.error || 'Check Gate Code'}`, "color: #ff0000; font-weight: bold; background: #220000; padding: 2px 5px;");
                setIsBuzzerConnected(false);
            }
        };

        const handleLiveBuzz = (buzzList: any[]) => {
            // Check if there is a buzz and we haven't already reacted
            if (buzzList.length > 0 && !activeResponder) {
                const winner = buzzList[0];
                console.log("%c🎯 BUZZ DETECTED!", "color: #eab308; font-weight: bold;");

                // 1. STOP THE MUSIC
                stopSong(false);

                // 2. Identify the slot via mapping
                setActiveResponder(winner.playerId);
                // const mappedSlot = buzzerMapping[winner.playerId];
                // if (mappedSlot) {
                //     setActiveResponder(`${winner.playerName} (Slot ${mappedSlot})`);
                // } else {
                //     setActiveResponder(winner.playerName);
                // }

                // 3. Immediately lock the game to turn other phones gray
                socket.emit('gameAction', { type: 'SET_STATE', data: { state: 'LOCKED' } });
            }
        };

        const handlePlayerList = (list: any[]) => setHubPlayers(list);
        const handleDisconnect = () => setIsBuzzerConnected(false);

        // Attach listeners
        socket.on('connect', registerAsHost);
        socket.on('registered', handleRegistered);
        socket.on('liveBuzzUpdate', handleLiveBuzz);
        socket.on('playerListUpdate', handlePlayerList);
        socket.on('disconnect', handleDisconnect);

        // Immediate check
        if (socket.connected) registerAsHost();

        return () => {
            socket.off('connect', registerAsHost);
            socket.off('registered', handleRegistered);
            socket.off('liveBuzzUpdate', handleLiveBuzz);
            socket.off('playerListUpdate', handlePlayerList);
            socket.off('disconnect', handleDisconnect);
        };
    }, [socket, stopSong, buzzerMapping, activeResponder]);

    return {
        isBuzzerConnected,
        hubPlayers,
        activeResponder,
        setActiveResponder,
        buzzerMapping,
        setBuzzerMapping,
        handleConnect,
        handleForceDisconnect,
        armBuzzers,
        socket
    };
};