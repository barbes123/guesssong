import { defaultSet } from './round3_default';
import { round3v2Set } from './round3_v2';
import { round3v3Set } from './round3_v3';

export const round3Sets = {
  default: defaultSet,
  round3_v2: round3v2Set,
  round3_v3: round3v3Set,
};

export type Round3SetId = keyof typeof round3Sets;

