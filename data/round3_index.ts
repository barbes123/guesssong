import { defaultSet } from './round3/round3_default';
import { round3v2Set } from './round3/round3_v2';
import { round3v3Set } from './round3/round3_v3';
import { round3v4Set } from './round3/round3_v4';
import { round3v5Set } from './round3/round3_v5';
import { round3v6Set } from './round3/round3_v6';

export const round3Sets = {
  default: defaultSet,
  round3_v2: round3v2Set,
  round3_v3: round3v3Set,
  round3_v4: round3v4Set,
  round3_v5: round3v5Set,
  round3_v6: round3v6Set,
};

export type Round3SetId = keyof typeof round3Sets;

