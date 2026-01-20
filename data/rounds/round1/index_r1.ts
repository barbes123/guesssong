import { defaultSet } from './default';
import { round1v2Set } from './round1_v2';
// Import other sets when you create them
// import { newyearSpecial } from './sets/newyear_special';

export const round1Sets = {
  default: defaultSet,
  // newyear_special: newyearSpecial,
  // Add more sets here as you create them
};

export type Round1SetId = keyof typeof round1Sets;
