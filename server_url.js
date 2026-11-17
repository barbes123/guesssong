import { createServer } from 'node:http';
import { Server } from 'socket.io';

const PORT = 3003;

const httpServer = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Game State Server Online');
});

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

let latestGameState = null;

io.on('connection', (socket) => {
    console.log(`[STATE] Client connected: ${socket.id}`);

    socket.on('requestGameState', () => {
        if (latestGameState !== null) {
            socket.emit('gameStateLink', latestGameState);
        }
    });

    socket.on('updateGameState', (state) => {
        if (!state || typeof state !== 'object') return;

        //Check the data
        // console.log('[STATE] updateGameState received:',
            // JSON.stringify(state, null, 2).slice(0, 2000));
        // console.log('[STATE] keys:', Object.keys(state),
            // '| currentSong:', state.currentSong);

        latestGameState = state;
        io.emit('gameStateLink', latestGameState);
    });

    socket.on('disconnect', () => {
        console.log(`[STATE] Client disconnected: ${socket.id}`);
    });
});

httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`[STATE] Game State Server listening on port ${PORT}`);
});