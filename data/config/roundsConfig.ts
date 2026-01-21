import { RoundConfig } from '../../types';
import { round1Sets } from '../round1_index';
import { round2Sets } from '../round2_index';
import { round3Sets } from '../round3_index';
import { ROUND_DATA } from '../constants_main';	
import { round4Sets } from '../round4_index';
// import { round5Sets } from '../round5_index';
// import { round6Sets } from '../round6_index';

// Temporary config with just Round 1
export const roundsConfig: Record<number, RoundConfig> = {
  1: {
    roundNumber: 1,
    defaultSet: 'default',
    availableSets: round1Sets
  },
  2: {  // ADD ROUND 2
    roundNumber: 2,
    defaultSet: 'default',
    availableSets: round2Sets  // Make sure round2Sets is defined
  },
  3: {  // ADD ROUND 3 (final)
    roundNumber: 3,
    defaultSet: 'default',
    availableSets: round3Sets
  },
  4: {  // ADD ROUND 4 (sprint)
    roundNumber: 4,
    defaultSet: 'default',
    availableSets: round4Sets
  }
};

// Helper functions
export const getRoundData = (roundId: number, setId?: string) => {
  const config = roundsConfig[roundId];
  
  // If round has modular config, use that
  if (config) {
    const setKey = setId || config.defaultSet;
    const set = config.availableSets[setKey];
    return set?.data || null;
  }
  
  // Otherwise fall back to original ROUND_DATA for rounds 2-6
  return ROUND_DATA[roundId] || null;
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
