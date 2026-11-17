import { defaultSet } from './round2_default';
import { round2v2Set } from './round2_v2';
import { round2v3Set } from './round2_v3';
import { round2v4Set } from './round2_v4';
import { round2v5Set } from './round2_v5';
import { round2v6Set } from './round2_v6';




export const round2Sets = {
  default: defaultSet,
  round2_v2: round2v2Set,
  round2_v3: round2v3Set,
  round2_v4: round2v4Set,
  round2_v5: round2v5Set,
  round2_v6: round2v6Set,
  };

export type Round2SetId = keyof typeof round2Sets;
