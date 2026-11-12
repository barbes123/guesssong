import 'dotenv/config';
import express from "express";
import OpenAI from "openai";

import fs from "node:fs/promises";
import path from "node:path";

import { readFileSync } from 'fs';

const systemPrompt = readFileSync('./ai/system_prompt.txt', 'utf8');
const configBuzz = JSON.parse(readFileSync('./configBuzz.json', 'utf8'));

const app = express();
app.use(express.json());

const allowedOrigins = new Set(
  [5173, 5174].map((port) => `http://${configBuzz.SERVER_IP}:${port}`)
);

app.use((req, res, next) => {
  const origin = req.get('Origin');

  if (origin && allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Vary', 'Origin');
  }

  if (req.method === 'OPTIONS') {
    if (!origin || !allowedOrigins.has(origin)) {
      return res.sendStatus(403);
    }
    return res.sendStatus(204);
  }

  next();
});


// Initialize an OpenAI client for your provider using env vars
const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});


// const lyricsDir = path.join(process.cwd(), "lyrics");
const lyricsDir = path.join(process.cwd(), "public", "lyrics");

async function getSongLyrics(songId) {
  if (!/^[a-zA-Z0-9_\-.,!?()' ]+$/.test(songId)) {
    throw new Error("Invalid song ID");
  }

  const filePath = path.join(lyricsDir, `${songId}.txt`);
  return await fs.readFile(filePath, "utf-8");
}

app.get("/test", (req, res) => {
    console.log("TEST REQUEST RECEIVED");
    res.send("AI server is reachable!");
});

// Challenge: See challenge.md for instructions
app.post("/api/gift", async (req, res) => {
  // TODO: Step 2 — extract userPrompt from req.body and add to messages
  // const { userPrompt } = req.body
  console.log("REQUEST RECEIVED");
  const { songId, userPrompt, requestHistory } = req.body;

  console.log("BACK-END:", songId)

  const songLyrics = await getSongLyrics(songId)

  console.log(songLyrics)

  const messages = [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: JSON.stringify({
        script: songLyrics,
        playerAnswer: userPrompt,
        previousAttempts: requestHistory
      })
    }
  ];

  try {
    // TODO: Step 3 — send chat completions request
    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL,
      messages,
    });

    // TODO: Step 4 — extract content and send back as JSON
    const giftSuggestions = response.choices[0].message.content
    console.log(giftSuggestions)

    res.json({ giftSuggestions });
  } catch (e) {
    console.error(e)
    res.status(500).json({
      message: `It's not you, it's us. 
    Something went wrong on the server` })
  }
});

// const PORT = process.env.PORT || 3004;
const PORT = 3004
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI server running on port ${PORT}`);
});
