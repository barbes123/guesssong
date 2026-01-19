
export type Language = 'en' | 'ru';

export interface Player {
  id: number;
  name: string;
  score: number;
  stars: number; // New: Stars for Round 6
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  audioUrlFull?: string;
  hint?: { // New: Hint for Round 6
    en: string;
    ru: string;
  };
}

export interface Category {
  id: string;
  name: {
    en: string;
    ru: string;
  };
  songs: Song[];
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  currentRound: number;
  isMusicEnabled: boolean;
  language: Language;
  gameStarted: boolean;
  activeRoundId: number | null;
  roundProgress: {
    [roundId: number]: {
      usedNotes: Set<string>; // categoryId-noteIndex
      activatedCategories: Set<string>;
      pointMap: { [categoryId: string]: number[] };
      activationCounts: { [noteId: string]: number };
      persistentPoints?: { [noteId: string]: number };
      results: { [noteId: string]: 'correct' | 'wrong' };
      activePlayerIds?: number[]; // New: Track which players are participating in R6
      currentTurnIndex?: number; // New: Turn index for R6 (0-4)
    };
  };
}

export type Page = 'setup' | 'start' | 'round' | 'r6_select';
