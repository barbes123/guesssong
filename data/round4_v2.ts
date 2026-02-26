import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 4 SPRINT - SET 2 (Songs 8–14) ====================

// Source: Round 5, player 2, tracks 1–7
const R5R21minus = audioUrl('Moskva_slezam_ne_verit_minus_cut_tbwvxu', '/music/round4/Moskva_slezam_ne_verit_minus_cut_tbwvxu.mp3');
const R5R21full  = audioUrl('Moskva_slezam_ne_verit_bgy5go', '/music/round4/Moskva_slezam_ne_verit_bgy5go.mp3');

const R5R22minus = audioUrl('krylatye_kacheli_minus_cut_zymfnb', '/music/round4/krylatye_kacheli_minus_cut_zymfnb.mp3');
const R5R22full  = audioUrl('krylatye_kacheli_onunkp', '/music/round4/krylatye_kacheli_onunkp.mp3');

const R5R23minus = audioUrl('trus_ne_igraet_v_hokkej_minus_xgbt7c', '/music/round4/trus_ne_igraet_v_hokkej_minus_xgbt7c.mp3');
const R5R23full  = audioUrl('trus_ne_igraet_v_hokkej_sxcgox', '/music/round4/trus_ne_igraet_v_hokkej_sxcgox.mp3');

const R5R24minus = audioUrl(
  'IashagaiuPoMoskve-NikitaMihalkov-minus_nifidh',
  '/music/round4/IashagaiuPoMoskve-NikitaMihalkov-minus_nifidh.mp3'
);
const R5R24full  = audioUrl(
  'IashagaiuPoMoskve-NikitaMihalkov_li8scg',
  '/music/round4/IashagaiuPoMoskve-NikitaMihalkov_li8scg.mp3'
);

const R5R25minus = audioUrl(
  'ischu-tebya-iz-k-f-31-iyunya--minus1_v9xmsj',
  '/music/round4/ischu-tebya-iz-k-f-31-iyunya--minus1_v9xmsj.mp3'
);
const R5R25full  = audioUrl(
  'ischu-tebya-iz-k-f-31-iyunya_aif0s0', 
  '/music/round4/ischu-tebya-iz-k-f-31-iyunya_aif0s0.mp3'
);

const R5R26minus = audioUrl(
  'olimpiada-v-sochi-do-svidan-ya-moy-laskovyy-mishka_minus_on4rpr',
  '/music/round4/olimpiada-v-sochi-do-svidan-ya-moy-laskovyy-mishka_minus_on4rpr.mp3'
);
const R5R26full  = audioUrl(
  'olimpiada-v-sochi-do-svidan-ya-moy-laskovyy-mishka_q2xumg',
  '/music/round4/olimpiada-v-sochi-do-svidan-ya-moy-laskovyy-mishka_q2xumg.mp3'
);

const R5R27minus = audioUrl('zamechatel-nyy-sosed-minus_f617jz', '/music/round4/zamechatel-nyy-sosed-minus_f617jz.mp3');
const R5R27full  = audioUrl('zamechatel-nyy-sosed_sqf2ux', '/music/round4/zamechatel-nyy-sosed_sqf2ux.mp3');

export const round4v2Set: RoundSet = {
  id: 'round4_v2',
  name: {
    en: 'Sprint – Set 2',
    ru: 'Спринт – Набор 2',
  },
  description: {
    en: 'Second sprint set (songs 8–14)',
    ru: 'Второй набор спринта (песни 8–14)',
  },
  author: 'DT',
  version: '1.0',
  data: [
    {
      id: 'r4_sprint',
      name: { en: 'Sprint', ru: 'Спринт' },
      songs: [
        { id: 's5_8',  title: 'Sprint 1 (P2)',  artist: 'Artist 8',  audioUrl: R5R21minus, audioUrlFull: R5R21full },
        { id: 's5_9',  title: 'Sprint 2 (P2)',  artist: 'Artist 9',  audioUrl: R5R22minus, audioUrlFull: R5R22full },
        { id: 's5_10', title: 'Sprint 3 (P2)',  artist: 'Artist 10', audioUrl: R5R23minus, audioUrlFull: R5R23full },
        { id: 's5_11', title: 'Sprint 4 (P2)',  artist: 'Artist 11', audioUrl: R5R24minus, audioUrlFull: R5R24full },
        { id: 's5_12', title: 'Sprint 5 (P2)',  artist: 'Artist 12', audioUrl: R5R25minus, audioUrlFull: R5R25full },
        { id: 's5_13', title: 'Sprint 6 (P2)',  artist: 'Artist 13', audioUrl: R5R26minus, audioUrlFull: R5R26full },
        { id: 's5_14', title: 'Sprint 7 (P2)',  artist: 'Artist 14', audioUrl: R5R27minus, audioUrlFull: R5R27full },
      ],
    },
  ],
};

