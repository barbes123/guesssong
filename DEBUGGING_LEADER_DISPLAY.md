# Leader Display Data Flow - Debugging Guide

## Changes Made

### 1. **App.tsx - Data Packing (Laptop/Host)**

#### Location: Lines 310-380 (useEffect that updates stateToShareRef)

**Fixed:**
- ✅ **Song Data Extraction**: Now properly extracts `currentSong` from `getRoundData()` using `activeNote.categoryId` and `activeNote.noteIndex`
- ✅ **Hint to Notes Mapping**: Converts song `hint` object (language-keyed) to `notes` string for consistency
- ✅ **Language Support**: Extracts hint text based on `gameState.language` (falls back to 'en')
- ✅ **Data Structure**: Sends clean object with `{ id, title, artist, notes }`
- ✅ **Persistence**: Data persists even when music is paused/stopped

**New Debug Logging:**
```javascript
// Logs every time a song is packed
console.log('📦 [App.tsx] Packing song data:', {
  title: currentSong.title,
  artist: currentSong.artist,
  notes: currentSong.notes ? currentSong.notes.substring(0, 50) + '...' : '(none)',
  timestamp: new Date().toISOString()
});
```

---

### 2. **App.tsx - Socket Emission (Laptop/Host)**

#### Location: Lines 220-235 (setInterval that emits updateGameState)

**Fixed:**
- ✅ **Event Name**: Confirmed emitting to `'updateGameState'` event
- ✅ **Socket Instance**: Using `buzzerSocket` from `useBuzzer()` hook
- ✅ **Connection Check**: Only emits when `isBuzzerConnected` is true
- ✅ **Interval**: Every 500ms

**New Debug Logging:**
```javascript
console.log('🚀 [App.tsx] Emitting updateGameState:', {
  hasSong: !!stateData.currentSong,
  songTitle: stateData.currentSong?.title || 'none',
  socketConnected: buzzerSocket?.connected,
  eventName: 'updateGameState'
});
```

---

### 3. **LeaderDisplay.jsx - State Initialization**

#### Location: Lines 6-18 (useState definitions)

**Fixed:**
- ✅ **State Structure**: Changed from flat to nested structure
  ```javascript
  // BEFORE (broken)
  { title: '', artist: '', notes: '' }
  
  // AFTER (fixed)
  { currentSong: { title: '', artist: '', notes: '' } }
  ```
- ✅ **Added Timestamp**: `lastUpdate` state tracks when data was last received

---

### 4. **LeaderDisplay.jsx - Socket Listener**

#### Location: Lines 51-80 (gameStateLink listener)

**Fixed:**
- ✅ **Event Name**: Listening for `'gameStateLink'` (server broadcasts this)
- ✅ **Data Validation**: Checks for `data.currentSong` existence
- ✅ **Error Handling**: Logs available keys if data structure is unexpected
- ✅ **State Update**: Properly maps incoming data to nested structure

**Debug Logging (shows what's received):**
```javascript
console.log('🔄 [LeaderDisplay] Received gameStateLink:', JSON.stringify(data, null, 2));
console.log('✓ Song data found:', {
  title: data.currentSong.title,
  artist: data.currentSong.artist,
  hasNotes: !!data.currentSong.notes,
  notesLength: data.currentSong.notes ? data.currentSong.notes.length : 0
});
```

---

### 5. **LeaderDisplay.jsx - UI Display**

#### Location: Lines 200-270 (render section)

**Fixed:**
- ✅ **Title**: `{syncedState.currentSong?.title || '—'}`
- ✅ **Artist**: `{syncedState.currentSong?.artist || '—'}`
- ✅ **Notes**: `{syncedState.currentSong?.notes || '—'}`
- ✅ **Timestamp Display**: Shows `lastUpdate` for debugging

---

## Data Flow Checklist

```
LAPTOP (App.tsx)
  1. User plays a song → activeNote gets { categoryId, noteIndex }
  2. useEffect extracts: getRoundData → find category → find song
  3. Map hint (lang object) → notes (string)
  4. Store in stateToShareRef.current = { currentSong: {...} }
  5. setInterval emits via buzzerSocket.emit('updateGameState', state)
     └─ Console: "🚀 [App.tsx] Emitting updateGameState: ..."

SERVER (server.js - not in this repo)
  6. Receives 'updateGameState' from buzzerSocket
  7. Broadcasts to ALL clients as 'gameStateLink'

PHONE (LeaderDisplay.jsx)
  8. Receives 'gameStateLink' event
     └─ Console: "🔄 [LeaderDisplay] Received gameStateLink: ..."
  9. Extracts data.currentSong
  10. setSyncedState({ currentSong: {...} })
  11. UI renders title, artist, notes
```

---

## Testing Checklist

### Step 1: Verify Socket Connection
- [ ] Open LeaderDisplay in phone browser
- [ ] Check console: Should see "✓ Leader display connected to socket server"
- [ ] Status should show green "✓ Connected to Host"

### Step 2: Verify Data Emission from Laptop
- [ ] Open App.tsx in laptop browser (game screen)
- [ ] Open DevTools Console
- [ ] Select a song and click "Play"
- [ ] Every 500ms you should see:
  ```
  📦 [App.tsx] Packing song data: { title: "...", artist: "...", notes: "..." }
  🚀 [App.tsx] Emitting updateGameState: { hasSong: true, songTitle: "..." }
  ```

### Step 3: Verify Data Reception on Phone
- [ ] While laptop is playing a song, check phone console
- [ ] Should see:
  ```
  🔄 [LeaderDisplay] Received gameStateLink: { ... currentSong: {...} ... }
  ✓ Song data found: { title: "...", artist: "...", hasNotes: true, notesLength: X }
  ```

### Step 4: Verify UI Display
- [ ] Song title should appear on phone
- [ ] Artist name should appear on phone
- [ ] Host notes should appear on phone
- [ ] Data should update in real-time as you switch songs

---

## Console Debug Output Format

### Laptop Console (App.tsx)
```
📦 [App.tsx] Packing song data: {
  title: "Smooth Criminal",
  artist: "Michael Jackson",
  notes: "This song sounds in the moment of loneliness...",
  timestamp: "2026-02-18T10:30:45.123Z"
}

🚀 [App.tsx] Emitting updateGameState: {
  hasSong: true,
  songTitle: "Smooth Criminal",
  socketConnected: true,
  eventName: "updateGameState"
}
```

### Phone Console (LeaderDisplay.jsx)
```
🔄 [LeaderDisplay] Received gameStateLink: {
  ...lots of state...
  currentSong: {
    id: "q11",
    title: "Smooth Criminal",
    artist: "Michael Jackson",
    notes: "This song sounds in the moment of loneliness..."
  }
  ...more state...
}

✓ Song data found: {
  title: "Smooth Criminal",
  artist: "Michael Jackson",
  hasNotes: true,
  notesLength: 124
}
```

---

## Common Issues & Solutions

| Issue | Console Evidence | Fix |
|-------|-----------------|-----|
| **No data on phone** | Phone doesn't log "Received gameStateLink" | Check server is running and relaying events |
| **Data is null/undefined** | "⚠ No currentSong in gameStateLink data" | Laptop not selecting a song (no activeNote) |
| **Old data persists** | LastUpdate timestamp doesn't change | Laptop stateToShareRef not updating |
| **Socket disconnects** | Red "✗ Connecting..." on phone | Network issue or server down |
| **Wrong notes appear** | Notes don't match the song | Check `gameState.language` is correct |

---

## Key Files Modified

1. **[App.tsx](App.tsx#L220-L235)** - Socket emission with debug logging
2. **[App.tsx](App.tsx#L310-L380)** - Song data extraction and packing
3. **[LeaderDisplay.jsx](src/displays/LeaderDisplay.jsx#L1-L85)** - Socket listener and state management
4. **[LeaderDisplay.jsx](src/displays/LeaderDisplay.jsx#L200-L270)** - UI rendering with nested structure

---

## Server Requirements (server.js)

The server must:
1. Listen for `'updateGameState'` from buzzerSocket
2. Broadcast received data as `'gameStateLink'` to ALL connected clients

Expected server code (reference):
```javascript
socket.on('updateGameState', (data) => {
  console.log('📡 [Server] Received updateGameState');
  io.emit('gameStateLink', data); // Broadcast to all clients
});
```

---

## Next Steps if Still Not Working

1. **Check network**: Ensure laptop and phone are on same network
2. **Verify configBuzz.json**: Check `SOCKET_URL` points to correct server
3. **Check server logs**: Verify server is receiving 'updateGameState'
4. **Clear browser cache**: Both laptop and phone
5. **Check firewall**: Ensure port 3001 (or configured port) is open
