import { defaultSet } from './round1_default';
import { round1v2Set } from './round1_v2';
// Import other sets when you create them
// import { newyearSpecial } from './round1_special';

export const round1Sets = {
  default: defaultSet,
  round1_v2: round1v2Set,
  // Add more sets here as you create them
};

export type Round1SetId = keyof typeof round1Sets;
