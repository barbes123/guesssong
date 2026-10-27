import { useCallback, useRef, useEffect, useState } from 'react';
import { GameState, InputMode } from '../../types';
import { useBuzzer } from './useBuzzer';
import { usePads } from './usePads';

export function useGameEngine(
    gameState: GameState,
    setGameState: React.Dispatch<React.SetStateAction<GameState>>,
    stopSong: (fullyClear?: boolean) => void
) {
    // 1. Single instantiation of both hardware hooks
    const phoneEngine = useBuzzer(stopSong);
    const padsEngine = usePads(stopSong);

    const isPadsConnected = padsEngine.isConnected;
    const isBuzzerConnected = phoneEngine.isConnected;

    const [inputMode, setInputModeState] = useState<InputMode>('MANUAL');

    const [isBuzzAttempted, setIsBuzzAttempted] = useState(false);
    const [isPadsAttempted, setIsPadsAttempted] = useState(false);

    const activeEngine = inputMode === 'USB_PADS'
        ? padsEngine
        : inputMode === 'PHONE_HUB'
            ? phoneEngine
            : null;


    // Active responder ID derived automatically from active hardware
    const activeResponder = activeEngine?.activeResponder || null;

    const activePlayer = gameState.players.find(p => {
        if (inputMode === 'USB_PADS') {
            return String(p.padsId) === String(activeResponder);
        }
        if (inputMode === 'PHONE_HUB') {
            return String(p.hubId) === String(activeResponder);
        }
        return false;
    }) || null;


    // 3. Centralized Arm / Disarm triggers
    // Inside useGameEngine.ts

    // const handleArm = useCallback(() => {
    //     // 1. Arm USB Pads if connected
    //     if (padsEngine.isConnected && padsEngine.arm) {
    //         padsEngine.arm();
    //     }

    //     // 2. Arm Phone Hub if connected
    //     if (phoneEngine.isConnected && phoneEngine.arm) {
    //         phoneEngine.arm();
    //     }
    // }, [padsEngine, phoneEngine]);


    const handleArm = useCallback(() => {
        if (inputMode === 'USB_PADS') {
            if (padsEngine.isConnected && padsEngine.arm) {
                padsEngine.arm();
            }
        } else if (inputMode === 'PHONE_HUB') {
            if (phoneEngine.isConnected && phoneEngine.arm) {
                phoneEngine.arm();
            }
        }
    }, [inputMode, padsEngine, phoneEngine]);

    const handleDisarm = useCallback(() => {

        console.log("🛑 handleDisarm called; inputMode =", inputMode);

        if (inputMode === 'USB_PADS') {
            padsEngine.disarm();
        } else if (inputMode === 'PHONE_HUB') {
            phoneEngine.disarm();
        } else {
            console.log("ℹ️ MANUAL mode: no hardware to disarm");
        }
    }, [inputMode, padsEngine.disarm, phoneEngine.disarm]);

    // const handleDisarm = useCallback(() => {
    //     if (activeEngine && typeof activeEngine.disarm === 'function') {
    //         activeEngine.disarm();
    //     }
    // }, [activeEngine]);

    // 4. Action Handlers modifying App's single gameState
    // const setInputMode = useCallback((newMode: InputMode) => {
    //     setGameState(prev => ({ ...prev, inputMode: newMode }));
    // }, [setGameState]);

    const setInputMode = useCallback((newMode: InputMode) => {
        setInputModeState(newMode);

        setGameState(prev => ({
            ...prev,
            inputMode: newMode,
        }));
    }, [setGameState]);

    // Smartphone Connect / Disconnect
    const handleToggleBuzz = useCallback(() => {
        if (inputMode === 'PHONE_HUB') {
            phoneEngine.handleForceDisconnect();
            setIsBuzzAttempted(false);
            setInputMode('MANUAL');
            return;
        }

        // Disconnect USB pads if necessary.
        if (padsEngine.isConnected) {
            padsEngine.handleDisconnectPads();
            setIsPadsAttempted(false);
        }

        setIsBuzzAttempted(false);

        setInputMode('PHONE_HUB');
        phoneEngine.handleConnect();

        if (!phoneEngine.isConnected) {
            setIsBuzzAttempted(true);
            // setInputMode('MANUAL');
        }
    }, [
        inputMode,
        phoneEngine.isConnected,
        phoneEngine.handleForceDisconnect,
        phoneEngine.handleConnect,
        padsEngine.isConnected,
        padsEngine.handleDisconnectPads,
        setInputMode,
    ]);

    // USB Pads Connect / Disconnect
    const handleTogglePads = useCallback(() => {
        if (inputMode === 'USB_PADS') {
            padsEngine.handleDisconnectPads();
            setInputMode('MANUAL');
            return;
        }

        // Ensure the smartphone hub is disconnected first.
        if (phoneEngine.isConnected) {
            phoneEngine.handleForceDisconnect();
        }

        setInputMode('USB_PADS');
        padsEngine.handleConnectPads();
    }, [
        inputMode,
        padsEngine.handleDisconnectPads,
        padsEngine.handleConnectPads,
        phoneEngine.isConnected,
        phoneEngine.handleForceDisconnect,
        setInputMode,
    ]);

    const updatePlayer = useCallback((id: number, name: string, score: number, stars?: number) => {
        setGameState(prev => ({
            ...prev,
            players: prev.players.map(p => p.id === id ? { ...p, name, score, stars: stars ?? p.stars } : p)
        }));
    }, [setGameState]);

    // SINGLE UNIFIED ADD PLAYER (Handles Phone Hub, USB Pads, and Manual Keyboard)
    const handleAddPlayer = useCallback((nameOrEvent?: any, deviceOrSocketId?: any, slotNumber?: number) => {
        const actualName = typeof nameOrEvent === 'string' ? nameOrEvent : '';

        setGameState(prev => {
            let targetId = slotNumber;
            if (!targetId) {
                const emptySlot = [1, 2, 3].find(id => {
                    const p = prev.players.find(player => player.id === id);
                    return !p || !p.name;
                });
                targetId = emptySlot || 0;
            }

            if (targetId === 0 || targetId > 3) return prev;

            const deviceIdStr = deviceOrSocketId !== undefined && deviceOrSocketId !== null ? String(deviceOrSocketId) : '';

            if (deviceIdStr !== '') {
                const slots = [1, 2, 3];
                const isUsbPad = inputMode === 'USB_PADS' || typeof deviceOrSocketId === 'number';

                const updatedPlayers = slots.map(id => {
                    const existing = prev.players.find(p => p.id === id);

                    if (id === targetId) {
                        return {
                            id: id,
                            name: actualName || `Player ${id}`,
                            score: existing ? existing.score : 0,
                            stars: existing ? existing.stars : 0,
                            hubId: !isUsbPad ? deviceIdStr : (existing?.hubId || ''),
                            padsId: isUsbPad ? deviceIdStr : (existing?.padsId || ''),
                            manualId: existing?.manualId || String(id),
                        };
                    }

                    // Release hardware if assigned to another slot previously
                    const isSamePhone = !isUsbPad && existing?.hubId === deviceIdStr;
                    const isSamePad = isUsbPad && existing?.padsId === deviceIdStr;

                    if (existing && (isSamePhone || isSamePad)) {
                        return { id: id, name: '', score: 0, stars: 0, hubId: '', padsId: '', manualId: String(id) };
                    }

                    return existing || { id: id, name: '', score: 0, stars: 0, hubId: '', padsId: '', manualId: String(id) };
                });

                return { ...prev, players: updatedPlayers };
            }

            // Manual Mode
            // Manual Mode
            else {
                const existingSlot = prev.players.find(p => p.id === targetId);

                if (existingSlot) {
                    const updatedPlayers = prev.players.map(p =>
                        p.id === targetId
                            ? {
                                ...p,
                                name: actualName || `Player ${targetId}`,
                                hubId: '',
                                padsId: '',
                                manualId: String(targetId),
                            }
                            : p
                    );

                    return { ...prev, players: updatedPlayers };
                }

                const newPlayer = {
                    id: targetId,
                    name: actualName || `Player ${targetId}`,
                    score: 0,
                    stars: 0,
                    hubId: '',
                    padsId: '',
                    manualId: String(targetId),
                };

                return {
                    ...prev,
                    players: [...prev.players, newPlayer],
                };
            }
        });
    }, [inputMode, setGameState]);

    // RELEASES SLOT WITHOUT DELETING SLOT STRUCTURE
    // const handleRemovePlayer = useCallback((id: number) => {
    //     setGameState(prev => ({
    //         ...prev,
    //         players: prev.players.map(p =>
    //             p.id === id
    //                 ? { ...p, name: '', score: 0, stars: 0, hubId: '', padsId: '', manualId: String(id) }
    //                 : p
    //         )
    //     }));
    // }, [setGameState]);    


    // DELETE PLAYER AND RESTORE THE SLOT
    const handleRemovePlayer = useCallback((id: number) => {
        setGameState(prev => ({
            ...prev,
            players: prev.players.filter(p => p.id !== id),
        }));
    }, [setGameState]);


    const prevModeRef = useRef<InputMode>(inputMode);

    useEffect(() => {
        if (prevModeRef.current === inputMode) return;
        prevModeRef.current = inputMode;

        setGameState(prev => ({
            ...prev,
            inputMode,
            players: [],
            // players: prev.players.map(p => ({
            //     ...p,
            //     name: '',
            //     hubId: '',
            //     padsId: '',
            //     // score: 0,   ← uncomment if scores should reset too
            // })),
        }));
    }, [inputMode, setGameState]);

    return {
        // Hardware Facts
        activeResponder,
        activePlayer,
        setActiveResponder: phoneEngine.setActiveResponder,
        isPadsConnected: padsEngine.isConnected,
        usbPorts: padsEngine.devices || [], // Directly maps padsEngine.devices to usbPorts
        isBuzzerConnected: phoneEngine.isConnected,
        availableHubPlayers: phoneEngine.devices || [],
        buzzerSocket: phoneEngine.socket,
        armBuzzers: phoneEngine.arm,
        disarmBuzzers: phoneEngine.disarm,

        handleArm,
        handleDisarm,
        inputMode,
        padsSocket: padsEngine.socket,

        isBuzzAttempted,
        isPadsAttempted,

        // State Mutators
        setInputMode,
        updatePlayer,
        addPlayer: handleAddPlayer,       // Now exports the unified handleAddPlayer!
        removePlayer: handleRemovePlayer, // Now exports handleRemovePlayer!

        // Device Actions
        // handleToggleBuzz: phoneEngine.handleToggleBuzz,
        handleToggleBuzz,
        handleCheckConnection: phoneEngine.handleConnect,
        handleForceDisconnect: phoneEngine.handleForceDisconnect,
        // handleTogglePads: padsEngine.handlePadToggle,
        handleTogglePads,

    };
}