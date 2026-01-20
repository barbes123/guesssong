import { defaultSet } from './round2_default';
import { round2v2Set } from './round2_v2';

export const round2Sets = {
  default: defaultSet,
  round2_v2: round2v2Set,
  };

export type Round2SetId = keyof typeof round2Sets;
