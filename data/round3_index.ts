import { defaultSet } from './round3_default';
import { round3v2Set } from './round3_v2';
import { round3v3Set } from './round3_v3';
import { round3v4Set } from './round3_v4';

export const round3Sets = {
  default: defaultSet,
  round3_v2: round3v2Set,
  round3_v3: round3v3Set,
  round3_v4: round3v4Set,
};

export type Round3SetId = keyof typeof round3Sets;

