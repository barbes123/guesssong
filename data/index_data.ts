import { round0Sets } from './round0_index';
import { round1Sets } from './round1_index';
import { round2Sets } from './round2_index';
import { round3Sets } from './round3_index';
import { round4Sets } from './round4_index';

// DEFINE THIS HERE - DO NOT IMPORT IT
export const ROUND_DATA: Record<number, any> = {
  0: round0Sets,
  1: round1Sets,
  2: round2Sets,
  3: round3Sets,
  4: round4Sets,
};

export const getAvailableSets = (roundId: number) => {
  const round = ROUND_DATA[roundId];
  if (!round) return [];
  return Object.entries(round).map(([key, value]: [string, any]) => ({
    id: key,
    ...(value.name ? value : Object.values(value)[0]) // Safety for nested exports
  }));
};

export const getRoundData = (roundId: number, setId: string = 'default') => {
  const round = ROUND_DATA[roundId];
  if (!round) return null;
  const set = round[setId] || Object.values(round)[0];
  return set?.data || set?.categories || null;
};