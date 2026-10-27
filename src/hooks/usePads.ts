import { useState, useEffect, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import configBuzz from '../../configBuzz.json';

const USB_PADS_URL = (configBuzz as any).PADS_SOCKET_URL || 'http://localhost:3002';

export const usePads = (stopSong: (fullyClear?: boolean) => void) => {
    const socketRef = useRef<Socket | null>(null);


    // Hardware-specific States
    const [isPadsConnected, setIsPadsConnected] = useState(false);
    const [padPlayers, setPadPlayers] = useState<any[]>([]);
    const [activePadResponder, setActivePadResponder] = useState<string | null>(null);

    // Initialize Dedicated Hardware Socket
    if (!socketRef.current) {
        socketRef.current = io(USB_PADS_URL, {
            autoConnect: false,
            reconnection: true,
            reconnectionAttempts: 3,
            reconnectionDelay: 1000
        });
    }
    const socket = socketRef.current;



    const handleConnectPads = useCallback(() => {
        const socket = socketRef.current;
        if (socket && !socket.connected) {
            socket.connect();
        }
    }, []);

    const handleDisconnectPads = useCallback(() => {
        const socket = socketRef.current;
        if (socket) {
            socket.disconnect();
        }
        setIsPadsConnected(false);
        setPadPlayers([]);
    }, []);


    const handlePadToggle = useCallback(() => {
        if (isPadsConnected) {
            handleDisconnectPads();
        } else {
            handleConnectPads();
        }
    }, [isPadsConnected, handleConnectPads, handleDisconnectPads]);

    const debugStartRound = true;

    const armPads = useCallback(() => {
        setActivePadResponder(null);

        const socket = socketRef.current;

        if (!socket?.connected) {
            console.warn("⚠️ Cannot arm: USB Pad socket not connected");
            return;
        }

        if (debugStartRound) {
            console.log("▰▰▰▱ 🔄 Sending RESET", {
                socketId: socket.id,
                connected: socket.connected,
            });
        }

        socket.emit('gameAction', { type: 'RESET' }, (response: unknown) => {
            console.log("▰▰▰▱ 📩 RESET acknowledgement:", response);
        });

        setTimeout(() => {
            if (!socket.connected) {
                console.warn("⚠️ Cannot arm: USB Pad socket disconnected");
                return;
            }

            console.log("▰▰▰▱ ⚡ Sending START_ROUND", {
                socketId: socket.id,
                connected: socket.connected,
            });

            socket.emit('gameAction', { type: 'START_ROUND' }, (response: unknown) => {
                console.log("▰▰▰▱ 📩 START_ROUND acknowledgement:", response);
            });
        }, 150);
    }, []);


    const disarmPads = useCallback(() => {
        setActivePadResponder(null);

        const socket = socketRef.current;

        if (socket?.connected) {
            console.log("▰▰▰▱ 🛑 Sending SET_STATE: IDLE to NovaPad server");

            socket.emit('gameAction', {
                type: 'SET_STATE',
                data: { state: 'IDLE' }
            });
        } else {
            console.warn("⚠️ Cannot disarm: USB Pad socket not connected");
        }
    }, []);

    // const disarmPads = useCallback(() => {
    //     setActivePadResponder(null);
    //     // Add any USB-specific hardware disarm logic here later (e.g. stop rumble)
    // }, []);

    // Inside usePads.ts (replace the useEffect contents)

    useEffect(() => {
        if (!socket) return;

        const handleConnect = () => {
            console.log("%c🎮 CONNECTED TO NOVAPAD SERVER", "color: #00ff00; font-weight: bold;");
            setIsPadsConnected(true);
            // Register properly with host password
            socket.emit('register', { role: 'host', password: 'admin' });
        };

        // Capture winner from server's 'firstBuzzDetected' OR fallback 'gameStateUpdate'
        const handleFirstBuzz = (winnerRecord: any) => {
            console.log("🎯 WINNER CAPTURED:", winnerRecord);

            // 1. Extract port ID (e.g. assignedPortId or playerId)
            const portId = String(winnerRecord?.assignedPortId ?? winnerRecord?.playerId ?? winnerRecord?.portId ?? 1);

            // 2. Freeze audio playback immediately
            if (typeof stopSong === 'function') {
                stopSong(false);
            }

            // 3. Set active responder state
            setActivePadResponder(portId);
        };

        const handleDisconnect = () => {
            setIsPadsConnected(false);
        };

        // Attach listeners matching server_pad.ts exact emit names
        socket.on('connect', handleConnect);
        socket.on('firstBuzzDetected', handleFirstBuzz);
        socket.on('playerListUpdate', (list: any[]) => setPadPlayers(list));
        socket.on('disconnect', handleDisconnect);

        if (socket.connected) handleConnect();

        const handleGameStateUpdate = (data: { state: string; buzzes: any[] }) => {
            console.log("📢 NOVAPAD SERVER STATE CHANGED TO:", data.state);
            // When armed, server sends state: 'ACTIVE'
        };

        socket.on('gameStateUpdate', handleGameStateUpdate);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('firstBuzzDetected', handleFirstBuzz);
            socket.off('playerListUpdate');
            socket.off('disconnect', handleDisconnect);
            socket.off('gameStateUpdate', handleGameStateUpdate);

        };
    }, [socket, stopSong]);

    // useEffect(() => {
    //     if (!socket) return;

    //     const handleConnect = () => {
    //         console.log("%c🎮 USB PADS ENGINE CONNECTED", "color: #00ff00; font-weight: bold;");
    //         setIsPadsConnected(true);
    //         socket.emit('registerHost', { role: 'usbHost' });
    //     };

    //     // const handleHardwareBuzz = (buzzData: { portId: string; playerName?: string }) => {
    //     //     if (!activePadResponder) {
    //     //         console.log("%c🎯 HARDWARE PAD BUZZ DETECTED!", "color: #3b82f6; font-weight: bold;");

    //     //         // 1. Freeze audio instantly
    //     //         stopSong(false);

    //     //         // 2. Record responding port / player
    //     //         setActivePadResponder(buzzData.portId);

    //     //         // 3. Lock physical inputs
    //     //         socket.emit('gameAction', { type: 'LOCK_PADS' });
    //     //     }
    //     // };

    //     // Inside usePads.ts (useEffect)

    //     const handleHardwareBuzz = (buzzData: any) => {
    //         // Extract port or player identifier from payload
    //         const responderId = String(buzzData.portId ?? buzzData.id ?? buzzData.assignedPortId ?? buzzData);

    //         console.log("%c🎯 HARDWARE PAD BUZZ DETECTED!", "color: #3b82f6; font-weight: bold;", responderId);

    //         // 1. Freeze music playback immediately
    //         if (typeof stopSong === 'function') {
    //             stopSong(false);
    //         }

    //         // 2. Set active responder in React state
    //         setActivePadResponder(responderId);

    //         // 3. Lock USB pads so other players can't buzz in
    //         if (socketRef.current) {
    //             socketRef.current.emit('gameAction', { type: 'LOCK_PADS' });
    //         }
    //     };

    //     // Bind both common event names to handle differing server implementations
    //     socket.on('hardwareBuzz', handleHardwareBuzz);
    //     socket.on('padBuzzed', handleHardwareBuzz);

    //     const handleHardwareList = (list: any[]) => {
    //         setPadPlayers(list);
    //     };

    //     const handleDisconnect = () => {
    //         setIsPadsConnected(false);
    //     };

    //     // Attach listeners
    //     socket.on('connect', handleConnect);
    //     socket.on('hardwareBuzz', handleHardwareBuzz);
    //     socket.on('playerListUpdate', handleHardwareList);
    //     socket.on('disconnect', handleDisconnect);

    //     if (socket.connected) handleConnect();

    //     return () => {
    //         socket.off('connect', handleConnect);
    //         socket.off('hardwareBuzz', handleHardwareBuzz);
    //         socket.off('playerListUpdate', handleHardwareList);
    //         socket.off('disconnect', handleDisconnect);
    //     };
    // }, [socket, stopSong, activePadResponder]);

    return {
        isConnected: isPadsConnected,
        devices: padPlayers,
        activeResponder: activePadResponder,
        setActiveResponder: setActivePadResponder,
        arm: armPads,
        disarm: disarmPads,

        // Low-level controls (if needed)
        handlePadToggle,
        handleConnectPads,
        handleDisconnectPads,
        socket
    }
};