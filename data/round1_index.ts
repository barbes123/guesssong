import { defaultSet } from './round1_default';
import { round1v2Set } from './round1_v2';
import { round1v3Set } from './round1_v3';
import { round1v4Set } from './round1_v4';

export const round1Sets = {
  default: defaultSet,
  round1_v2: round1v2Set,
  round1_v3: round1v3Set,
  round1_v4: round1v4Set,
};

export type Round1SetId = keyof typeof round1Sets;
