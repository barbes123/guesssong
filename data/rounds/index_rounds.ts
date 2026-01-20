// Export individual round sets
export { round1Sets } from "../round1_index";
// We'll export other rounds later
// export { round2Sets } from '../round2_index';
// export { round3Sets } from '../round3_index';
// export { round4Sets } from '../round4_index';
// export { round5Sets } from '../round5_index';
// export { round6Sets } from '../round6_index';

// Export config and helpers
export { roundsConfig, getRoundData, getRoundSet, getAvailableSets } from '../config/roundsConfig';

// Legacy ROUND_DATA for backward compatibility
import { roundsConfig } from '../config/roundsConfig';

export const ROUND_DATA: Record<number, any> = {};

// Initialize ROUND_DATA from config (uses default sets)
Object.entries(roundsConfig).forEach(([roundId, config]) => {
  const setId = config.defaultSet;	
  const set = config.availableSets[setId];
  if (set) {
    ROUND_DATA[parseInt(roundId)] = set.data;
  }
});
