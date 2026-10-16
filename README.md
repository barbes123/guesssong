## 🛠️ Prerequisites

* Node.js (v18+ recommended)
* FFmpeg (for audio processing tasks)

---

## 🚀 Quick Start

1. Install dependencies:
   npm install

2. Configure environment variables:
   Set your `GEMINI_API_KEY` inside `.env.local`:
   GEMINI_API_KEY=your_gemini_api_key_here

3. Run the development server:
   npm run dev

---

## 🔌 Port Configuration

* Port 3001: Reserved for `useBuzzer`
* Port 3002: Reserved for `usePads`

If a port is locked or in use, release it using:
  fuser -k 3002/tcp
  kill -9 \$(lsof -t -i:3002)

---

## 📦 Additional Setup & Dependencies

* Install Socket.IO Client:
  ```bash
  npm install socket.io-client
  ```

* Fix CSS import issues (TypeScript):
  Create a `vite-env.d.ts` file in the root directory with the following contents:

```bash
  declare module '*.css' {
    const content: Record<string, string>;
    export default content;
  }
```

* Fetch Cloudflare/Cloudinary asset IDs:
  node get-cloudinary-ids.js

---

## Pages

```bash
/leader
```

```bash
/display
```

## 🎵 Audio Processing

Cut audio files using FFmpeg (e.g., extract segment from 00:00:50 to 00:02:00):
  ffmpeg -i nadezhda-kadysheva-techet-ruchey-minus.mp3 -vn -acodec copy -ss 00:00:50 -to 00:02:00 nadezhda-kadysheva-techet-ruchey-minus_cut.mp3

---

## 🔧 Troubleshooting

### Standard Reinstallation (Package Fixes)
If you encounter dependency issues:
  rm -rf node_modules package-lock.json
  npm cache clean --force
  npm pkg delete overrides
  npm install

### Issues with `@babel/helper-compilation-targets`
  rm -rf node_modules package-lock.json
  npm ci
  npm install

### TypeScript Errors (`import React from "react"` highlighted red)
  npm install --save-dev @types/react @types/react-dom

### Gemini Extension Infinite Loading in VS Code
Clear the extension cache and restart VS Code:
  rm -rf ~/.config/Code/User/globalStorage/google.cloud-code

```


