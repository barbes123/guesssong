import { Category } from './../types';
import { audioUrl } from './audioUtils';

// Using dummy audio URLs
const BASE_FOLDER = "/music/misc";
const BASE_URL = "https://www.soundhelix.com/examples/mp3/";
const DUMMY_INSTRUMENTAL = `${BASE_URL}SoundHelix-Song-1.mp3`;
const DUMMY_FULL = `${BASE_URL}SoundHelix-Song-2.mp3`;

const round_0 = audioUrl('round1_pq3xwg', `${BASE_FOLDER}/round1_pq3xwg.mp3`);
const round_1 = audioUrl('round1_pq3xwg', `${BASE_FOLDER}/round1_pq3xwg.mp3`);
const round_2 = audioUrl('round1_pq3xwg', `${BASE_FOLDER}/round1_pq3xwg.mp3`);
const round_3 = audioUrl('round2_szwye2', `${BASE_FOLDER}/round2_szwye2.mp3`);
const round_4 = audioUrl('round2_szwye2', `${BASE_FOLDER}/round2_szwye2.mp3`);
const round_5 = audioUrl('round3_nhxxjh', `${BASE_FOLDER}/round3_nhxxjh.mp3`);
const round_6 = audioUrl('round3_nhxxjh', `${BASE_FOLDER}/round3_nhxxjh.mp3`);

const setup_mp3 = audioUrl('jazz_intro_umvfjb', `${BASE_FOLDER}/jazz_intro_umvfjb.mp3`);
const start_mp3 = audioUrl('um_intro_ljemda', `${BASE_FOLDER}/um_intro_ljemda.mp3`);

export const SCREEN_BGM: { [key: string]: string } = {
  setup: setup_mp3,
  start: start_mp3,
  round_0: round_0,
  round_1: round_1,
  round_2: round_1,
  round_3: round_2,
  round_4: round_2,
  round_5: round_3,
  round_6: round_3,
};

// One-shot sound effects
export const SFX: { [key: string]: string } = {
  stop: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
  select: audioUrl('50_50_svlsr5', `${BASE_FOLDER}/50_50_svlsr5.mp3`),
  correct: audioUrl('um_right_iu4vjb', `${BASE_FOLDER}/um_right_iu4vjb.mp3`),
  wrong: audioUrl('um_wrong_s9a496', `${BASE_FOLDER}/um_wrong_s9a496.mp3`),
  scoreboard: audioUrl('um_r3_win_spbcmk', `${BASE_FOLDER}/um_r3_win_spbcmk.mp3`),
};

export const INITIAL_POINTS = [10, 20, 30, 40];

export const shuffle = <T,>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// At the end of your constants_main.ts file, add:
// export { getRoundData, getRoundSet, getAvailableSets, roundsConfig } from './index_rounds';