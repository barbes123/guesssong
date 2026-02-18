# Leader Display Feature

## Overview
A new **Leader Display** has been added to show song information (title, artist, and host notes) in real-time as songs are played during the game. This is perfect for displaying on a separate device for the host/audience to see additional context about each song.

## Features

### 1. Password Protection
- The Leader Display is protected by a password stored in `configBuzz.json`
- Users must authenticate before viewing song information
- Session persistence: Once authenticated, remains authenticated for the browser session
- Default password: `leader123` (configurable in `configBuzz.json`)

### 2. Real-time Song Display
- Displays the currently playing song's information:
  - **Title**: Large, bold text (32px)
  - **Artist**: Medium text (24px)
  - **Host Notes**: In a highlighted gray box for emphasis
- Updates every 500ms as songs change
- Shows "—" (dash) for any missing fields instead of errors

### 3. Responsive Mobile Design
- Optimized for smartphone screens
- Clean white background with black text
- Large, readable fonts
- Simple layout centered on screen
- Includes status indicator while waiting for song to start

## How to Use

### Accessing the Leader Display

Open the Leader Display at:
```
http://localhost:5173/?role=leader
```

Replace `localhost:5173` with your actual server URL.

### Authentication

1. Open the URL above
2. A login form will appear
3. Enter the password (default: `leader123`)
4. Click "Login"
5. Once authenticated, the display will show "Waiting for song to start..."

### During Gameplay

When a song starts playing:
- **Title** appears at the top
- **Artist** appears below the title
- **Host Notes** appear in a gray box at the bottom
- Display updates automatically as each new song plays

### Logout

To logout, clear browser cache or open in a new incognito/private window.

## Configuration

### Password Setup

Edit `configBuzz.json`:
```json
{
  "SERVER_IP": "10.42.0.1",
  "SERVER_PORT": 3000,  
  "SOCKET_URL": "http://100.109.59.68:3001",
  "MAX_PLAYERS": 10,
  "leaderPassword": "your_custom_password"
}
```

## Adding Notes to Songs

The `notes` field is now available on all Song objects. Update song data in round files like this:

### Example: round1_default.ts
```typescript
{
  id: 'p1_1', 
  title: 'Song Name', 
  artist: 'Artist Name',
  audioUrl: audioPath,
  audioUrlFull: audioPathFull,
  notes: 'This is a fun fact or context about the song'
}
```

## Technical Details

### Type Definition
The `Song` interface now includes an optional `notes` field:

```typescript
export interface Song {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  audioUrlFull?: string;
  notes?: string;  // Host notes about the song
}
```

### Data Flow

1. **Game State Update**: When a song starts, the main App component updates the game state
2. **localStorage Share**: Every 300ms, the current song data is written to `localStorage.musicQuizPlayerState`
3. **Leader Display Monitor**: LeaderDisplay reads from localStorage every 500ms
4. **Display Update**: Song information is rendered on the screen

### State Shared to Leader Display

The LeaderDisplay accesses:
- `activeNote`: Which song/category is currently active
- `isPlaying`: Whether music is playing
- `currentSong`: The song object with title, artist, and notes

## Browser Compatibility

Works on:
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Styling

The display uses inline CSS with:
- Clean typography
- High contrast (white background, black text)
- Responsive padding and sizing
- Accessible font sizes (minimum 12px, maximum 32px)

## Troubleshooting

### Display shows "Waiting for song to start..."
- Normal when no song is playing
- Once you click START in the main game, the song info should appear

### Password not working
- Check that `configBuzz.json` has the correct `leaderPassword` value
- Clear browser cache and try again
- Check browser console for errors (F12)

### No song information showing
- Verify localStorage is enabled in browser
- Check that main game app is running on the same localhost
- Verify the `currentSong` is being shared in the game state

### Display not updating
- Check browser refresh - display updates every 500ms
- Verify the main app is still running
- Check browser console (F12) for JavaScript errors

## Files Modified

1. **types.ts**: Added `notes?: string` to Song interface
2. **configBuzz.json**: Added `leaderPassword` field
3. **App.tsx**: 
   - Added LeaderDisplay import
   - Added role query parameter detection
   - Added conditional rendering for leader screen
   - Modified state sharing to include currentSong data
4. **src/displays/LeaderDisplay.jsx**: Completely rewritten with password protection and improved styling
5. **data/round1_default.ts**: Added empty `notes: ''` fields to all songs (apply similar changes to all round files)

## Future Enhancements

Possible improvements:
- Category name display
- Song difficulty indicator
- Countdown timer sync
- Sound toggle indicator
- Multi-language notes support
- Admin panel to edit notes without code changes
