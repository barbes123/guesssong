# Leader Display Setup - Real-time Host Data Sync

## Architecture Overview

The Leader Display (`/leader` route) now synchronizes **secret host data (song hints/notes)** in real-time from the Host laptop using **socket.io**.

### Data Flow

```
Host Laptop (App.tsx)
  ↓ emits updateGameState every 500ms
  ↓
Server (socket.io at configBuzz.SOCKET_URL)
  ↓ listens for updateGameState
  ↓ broadcasts as "gameStateLink" to all clients
  ↓
Mobile Device (/leader component)
  ↓ listens for "gameStateLink" event
  ↓ updates display with synced state
```

## LeaderDisplay.jsx Implementation

### Key Features

✅ **Socket.io Connection**
- Connects to `configBuzz.SOCKET_URL` (172.18.4.146:3001 per config)
- Auto-reconnects with exponential backoff
- Supports both WebSocket and polling transports

✅ **Data Listening**
- Listens for `gameStateLink` event from server
- Extracts: `title`, `artist`, `notes` from `data.currentSong`
- Updates UI in real-time as host changes songs

✅ **Socket Cleanup**
- Properly disconnects socket on component unmount
- Prevents memory leaks on mobile browsers

✅ **Connection Status Indicator**
- Shows green "✓ Connected to Host" when socket active
- Shows red "✗ Connecting..." when disconnected
- Helps users debug connectivity issues

### State Management

```javascript
const [syncedState, setSyncedState] = useState({
  title: '',       // Song title from Host
  artist: '',      // Artist name from Host
  notes: ''        // Host's secret hints/notes
});
```

## Mobile Responsiveness

- Fixed `height: 100vh` layout for full-screen display
- Responsive font sizes using inline styles
- Touch-friendly password input
- Large, readable text for audience viewing

## Usage

1. **On Host Laptop**: Run the game as normal
   - App.tsx automatically emits `updateGameState` every 500ms
   - Server relays as `gameStateLink` broadcast

2. **On Mobile Device** (same network):
   - Navigate to `/leader`
   - Enter password (from `configBuzz.leaderPassword`)
   - Display updates in real-time with current song info

## API Events

### Socket Events (LeaderDisplay listens)

- **`connect`**: Socket connected, status indicator turns green
- **`disconnect`**: Connection lost, status indicator turns red
- **`gameStateLink`**: Receives full game state from server
  - Contains: `currentSong` with `title`, `artist`, `notes`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Display shows "✗ Connecting..." | Check server at `configBuzz.SOCKET_URL` is running |
| Stale data on mobile | Verify Host is emitting updates (App.tsx line ~220) |
| Connection drops | Mobile/host network connection issue - reconnects auto |
| Password rejected | Check `configBuzz.leaderPassword` matches |

## Future Enhancement: Send Actions Back

To support features like "Skip Song from Phone":

```javascript
// In LeaderDisplay.jsx socket setup
socket.emit('gameAction', {
  type: 'SKIP_SONG',
  data: { reason: 'user_request' }
});

// Server receives and relays to Host
// Host (App.tsx) listens and processes the action
```

## Configuration

Edit `configBuzz.json`:
```json
{
  "SOCKET_URL": "http://172.18.4.146:3001",
  "leaderPassword": "leader123"
}
```

---
✅ **Architecture**: Socket.io relay (server-side broadcasting required)
✅ **Mobile**: Fully responsive design
✅ **Real-time**: 500ms update frequency from Host
✅ **Reliable**: Auto-reconnect with status feedback
