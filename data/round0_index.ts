import { defaultSet } from './round0_default';
//import { round1v2Set } from './round1_v2';

export const round0Sets = {
  default: defaultSet,
//  round1_v2: round1v2Set,
  // Add more sets here as you create them
};

export type Round0SetId = keyof typeof round0Sets;
