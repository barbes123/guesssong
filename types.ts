
export type Language = 'en' | 'ru';

export interface Player {
  id: number;
  name: string;
  score: number;
  stars: number; // New: Stars for Round 6
  hubId?: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  audioUrlFull?: string;
  notes?: string; // Host notes about the song
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

// Add to your existing types
export interface RoundSet {
  id: string;
  name: {
    en: string;
    ru: string;
  };
  description?: {
    en: string;
    ru: string;
  };
  author?: string;
  version?: string;
  data: Category[];
}

export interface RoundConfig {
  roundNumber: number;
  defaultSet: string;
  availableSets: Record<string, RoundSet>;
}

// Add to GameState if not already there
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
      usedNotes: Set<string>;
      activatedCategories: Set<string>;
      pointMap: { [categoryId: string]: number[] };
      activationCounts: { [noteId: string]: number };
      persistentPoints?: { [noteId: string]: number };
      results: { [noteId: string]: 'correct' | 'wrong' };
      activePlayerIds?: number[];
      currentTurnIndex?: number;
      // For Round 5
      r5PlayerProgress?: { [playerId: number]: any };
      usedRows?: Set<number>;
    };
  };
  // Add round set selections
  roundSets: Record<number, string>; // roundId -> setId
}

export interface BuzzerPopupProps {
  show: boolean;
  playerName: string;
  points: number;
  isWarmup: boolean;
  onClose?: () => void;
}

export type Page = 'setup' | 'start' | 'round' | 'r3_select' | 'r4_select';
