import { defaultSet } from './round4_default';
import { round4v2Set } from './round4_v2';
import { round4v3Set } from './round4_v3';

export const round4Sets = {
  default: defaultSet,
  round4_v2: round4v2Set,
  round4_v3: round4v3Set,
};

export type Round4SetId = keyof typeof round4Sets;

