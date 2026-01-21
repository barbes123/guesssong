import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 4 SPRINT - SET 3 (Songs 15–21) ====================

// Source: Round 5, player 3, tracks 1–7
const R5R31minus = audioUrl('nastoyashiy_drug_minus_hf79gf', '/music/round5/3/nastoyashiy_drug_minus.mp3');
const R5R31full  = audioUrl('nastoyashiy_drug_rgxpe8', '/music/round5/3/nastoyashiy_drug.mp3');

const R5R32minus = audioUrl('my_malenkie_deti_minus_cut_igpiue', '/music/round5/3/my_malenkie_deti_minus_cut.mp3');
const R5R32full  = audioUrl('my_malenkie_deti_bidbr8', '/music/round5/3/my_malenkie_deti.mp3');

const R5R33minus = audioUrl('lesnoy-olen-minus_cut_slxeg7', '/music/round5/3/lesnoy-olen-minus_cut.mp3');
const R5R33full  = audioUrl('lesnoy-olen_alsf9y', '/music/round5/3/lesnoy-olen.mp3');

const R5R34minus = audioUrl('kuda-uhodit-detstvo_minus_ont8wl', '/music/round5/3/kuda-uhodit-detstvo_minus.mp3');
const R5R34full  = audioUrl('kuda-uhodit-detstvo_bgbpo7', '/music/round5/3/kuda-uhodit-detstvo.mp3');

const R5R35minus = audioUrl(
  'yuriy-nikulin-esli-b-ya-byil-sultan-minus_yn2jry',
  '/music/round5/3/yuriy-nikulin-esli-b-ya-byil-sultan-minus.mp3'
);
const R5R35full  = audioUrl(
  'yuriy-nikulin-esli-b-ya-byil-sultan_dxwjw2',
  '/music/round5/3/yuriy-nikulin-esli-b-ya-byil-sultan.mp3'
);

const R5R36minus = audioUrl(
  'razgovor-so-schast-em-minus-koroche_rhzrco',
  '/music/round5/3/razgovor-so-schast-em-minus-koroche.mp3'
);
const R5R36full  = audioUrl('razgovor-so-schast-em_pvnq1z', '/music/round5/3/razgovor-so-schast-em.mp3');

const R5R37minus = audioUrl('Landyshi-GelenaVelikanova-minus_xbaf0v', '/music/round5/3/Landyshi-GelenaVelikanova-minus.mp3');
const R5R37full  = audioUrl('Landyshi-GelenaVelikanova_k1vxod', '/music/round5/3/Landyshi-GelenaVelikanova.mp3');

export const round4v3Set: RoundSet = {
  id: 'round4_v3',
  name: {
    en: 'Sprint – Set 3',
    ru: 'Спринт – Набор 3',
  },
  description: {
    en: 'Third sprint set (songs 15–21)',
    ru: 'Третий набор спринта (песни 15–21)',
  },
  author: 'DT',
  version: '1.0',
  data: [
    {
      id: 'r4_sprint',
      name: { en: 'Sprint', ru: 'Спринт' },
      songs: [
        { id: 's5_15', title: 'Sprint 1 (P3)', artist: 'Artist 15', audioUrl: R5R31minus, audioUrlFull: R5R31full },
        { id: 's5_16', title: 'Sprint 2 (P3)', artist: 'Artist 16', audioUrl: R5R32minus, audioUrlFull: R5R32full },
        { id: 's5_17', title: 'Sprint 3 (P3)', artist: 'Artist 17', audioUrl: R5R33minus, audioUrlFull: R5R33full },
        { id: 's5_18', title: 'Sprint 4 (P3)', artist: 'Artist 18', audioUrl: R5R34minus, audioUrlFull: R5R34full },
        { id: 's5_19', title: 'Sprint 5 (P3)', artist: 'Artist 19', audioUrl: R5R35minus, audioUrlFull: R5R35full },
        { id: 's5_20', title: 'Sprint 6 (P3)', artist: 'Artist 20', audioUrl: R5R36minus, audioUrlFull: R5R36full },
        { id: 's5_21', title: 'Sprint 7 (P3)', artist: 'Artist 21', audioUrl: R5R37minus, audioUrlFull: R5R37full },
      ],
    },
  ],
};

