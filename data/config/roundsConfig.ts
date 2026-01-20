import { RoundConfig } from '../../types';
import { round1Sets } from '../round1_index';	
// We'll import other rounds later
// import { round2Sets } from '../round2_index';
// import { round3Sets } from '../round3_index';
// import { round4Sets } from '../round4_index';
// import { round5Sets } from '../round5_index';
// import { round6Sets } from '../round6_index';

// Temporary config with just Round 1
export const roundsConfig: Record<number, RoundConfig> = {
  1: {
    roundNumber: 1,
    defaultSet: 'default',
    availableSets: round1Sets
  },
  // We'll add other rounds later
  // 2: { ... },
  // 3: { ... },
  // 4: { ... },
  // 5: { ... },
  // 6: { ... },
};

// Helper functions
export const getRoundData = (roundId: number, setId?: string) => {
  const config = roundsConfig[roundId];
  if (!config) return null;
  
  const setKey = setId || config.defaultSet;
  const set = config.availableSets[setKey];
  
  return set?.data || null;
};

export const getRoundSet = (roundId: number, setId?: string) => {
  const config = roundsConfig[roundId];
  if (!config) return null;
  
  const setKey = setId || config.defaultSet;
  return config.availableSets[setKey] || null;
};

export const getAvailableSets = (roundId: number) => {
  const config = roundsConfig[roundId];
  if (!config) return [];
  
  return Object.entries(config.availableSets).map(([id, set]) => ({
    id,
    name: set.name,
    description: set.description,
    author: set.author,
    version: set.version
  }));
};
