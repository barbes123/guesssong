import { RoundSet, Category } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 2 AUDIO FILES ====================

const R2_1_C1B1minus = audioUrl('YA_RUSSKIJ_minus_mo2rbx', '/music/round3/YA_RUSSKIJ_minus.mp3');
const R2_1_C1B1full = audioUrl('YA_RUSSKIJ_ulwgeb', '/music/round3/YA_RUSSKIJ.mp3');

const R2_1_C1B2minus = audioUrl('lyube_gimn_rossii_minus_cyooz2', '/music/round3/lyube_gimn_rossii_minus.mp3');
const R2_1_C1B2full = audioUrl('lyube_gimn_rossii_zqowqc', '/music/round3/lyube_gimn_rossii.mp3');

const R2_1_C1B3minus = audioUrl('proekt-zhit-minus_kzrsp4', '/music/round3/proekt-zhit-minus.mp3');
const R2_1_C1B3full = audioUrl('proekt-zhit_k0jt6r', '/music/round3/proekt-zhit.mp3');

const R2_1_C1B4minus = audioUrl('shaman-shaman-vstanem_minus_tedto9', '/music/round3/shaman-shaman-vstanem_minus.mp3');
const R2_1_C1B4full = audioUrl('shaman-shaman-vstanem_hintiz', '/music/round3/shaman-shaman-vstanem.mp3');


const R2_1_C2B1minus = audioUrl('vecher_brodit_minus_hpm3er', '/music/round3/vecher_brodit_minus.mp3');
const R2_1_C2B1full = audioUrl('vecher_brodit_ez3vni', '/music/round3/vecher_brodit.mp3');

const R2_1_C2B2minus = audioUrl('Milaya_moya_solnyshko_lesnoe_minus_lao6px', '/music/round3/Milaya_moya_solnyshko_lesnoe_minus.mp3');
const R2_1_C2B2full = audioUrl('Milaya_moya_solnyshko_lesnoe_rgovy7', '/music/round3/Milaya_moya_solnyshko_lesnoe.mp3');

const R2_1_C2B3minus = audioUrl('YUrij_Vizbor-Dombajskij_vals_minus_mugp6o', '/music/round3/YUrij_Vizbor-Dombajskij_vals_minus.mp3');
const R2_1_C2B3full = audioUrl('YUrij_Vizbor-Dombajskij_vals_nkbqil', '/music/round3/YUrij_Vizbor-Dombajskij_vals.mp3');

const R2_1_C2B4minus = audioUrl('Valerij_Kaner_-_A_vse_konchaetsya_minus_ckfder', '/music/round3/Valerij_Kaner_-_A_vse_konchaetsya_minus.mp3');
const R2_1_C2B4full = audioUrl('Valerij_Kaner_-_A_vse_konchaetsya_kehaab', '/music/round3/Valerij_Kaner_-_A_vse_konchaetsya.mp3');


const R2_1_C3B1minus = audioUrl('odnazhdy-morem-ya-plyla_minus_vqop94', '/music/round3/odnazhdy-morem-ya-plyla_minus.mp3');
const R2_1_C3B1full = audioUrl('odnazhdy-morem-ya-plyla_b9qk4r', '/music/round3/odnazhdy-morem-ya-plyla.mp3');

const R2_1_C3B2minus = audioUrl('da_ne_vecher_minus_ql59gq', '/music/round3/da_ne_vecher_minus.mp3');
const R2_1_C3B2full = audioUrl('da_ne_vecher_kzkx9i', '/music/round3/da_ne_vecher.mp3');

const R2_1_C3B3minus = audioUrl('Napilas_ya_pyana_minus_i9ifis', '/music/round3/Napilas_ya_pyana_minus.mp3');
const R2_1_C3B3full = audioUrl('Napilas_ya_pyana_fuxrry', '/music/round3/Napilas_ya_pyana.mp3');

const R2_1_C3B4minus = audioUrl('minus-vot-kto-to-s-gorochki-spustilsya_minus_l7l2tp', '/music/round3/minus-vot-kto-to-s-gorochki-spustilsya_minus.mp3');
const R2_1_C3B4full = audioUrl('minus-vot-kto-to-s-gorochki-spustilsya_mid1se', '/music/round3/minus-vot-kto-to-s-gorochki-spustilsya.mp3');



const R2_1_C4B1minus = audioUrl('deltaplan_minus_v4yvhf', '/music/round3/deltaplan_minus.mp3');
const R2_1_C4B1full = audioUrl('deltaplan_njyjmo', '/music/round3/deltaplan.mp3');

const R2_1_C4B2minus = audioUrl('plot_minus_ap5jyk', '/music/round3/plot_minus.mp3');
const R2_1_C4B2full = audioUrl('plot_rwqxbq', '/music/round3/plot.mp3');	

const R2_1_C4B3minus = audioUrl('MuzykaNasSviazala-minus_upocpy', '/music/round3/MuzykaNasSviazala-minus.mp3');
const R2_1_C4B3full = audioUrl('MuzykaNasSviazala_c04h1c', '/music/round3/MuzykaNasSviazala.mp3');

const R2_1_C4B4minus = audioUrl('Belye_rozy_minus_uggr9o', '/music/round3/Belye_rozy_minus.mp3');
const R2_1_C4B4full = audioUrl('Belye_rozy_wgklth', '/music/round3/Belye_rozy.mp3');

export const defaultSet: RoundSet = {
  id: 'default',  // Set ID
  name: {
    en: 'Round2-V1',
    ru: 'Роунд2-1'
  },
  description: {
    en: '',
    ru: ''
  },
  author: 'DT',
  version: '1.0',
  data: [  // This is the array of categories
    {
      id: 'patriot',
      name: { en: 'Patriot', ru: 'Патриотичная' },
      songs: [
        { 
          id: 'p2_1', 
          title: 'Song 1', 
          artist: 'Artist 1', 
          audioUrl: R2_1_C1B1minus, 
          audioUrlFull: R2_1_C1B1full 
        },
        { 
          id: 'p2_2', 
          title: 'Song 2', 
          artist: 'Artist 2', 
          audioUrl: R2_1_C1B2minus, 
          audioUrlFull: R2_1_C1B2full 
        },
        { 
          id: 'p2_3', 
          title: 'Song 3', 
          artist: 'Artist 3', 
          audioUrl: R2_1_C1B3minus, 
          audioUrlFull: R2_1_C1B3full 
        },
        { 
          id: 'p2_4', 
          title: 'Song 4', 
          artist: 'Artist 4', 
          audioUrl: R2_1_C1B4minus, 
          audioUrlFull: R2_1_C1B4full 
        },
      ]
    },
    {
      id: 'tourists',
      name: { en: 'Tourist', ru: 'Туристическая' },
      songs: [
        { 
          id: 'p2_5', 
          title: 'Rock 1', 
          artist: 'Artist 1', 
          audioUrl: R2_1_C2B1minus, 
          audioUrlFull: R2_1_C2B1full 
        },
        { 
          id: 'p2_6', 
          title: 'Rock 2', 
          artist: 'Artist 2', 
          audioUrl: R2_1_C2B2minus, 
          audioUrlFull: R2_1_C2B2full 
        },
        { 
          id: 'p2_7', 
          title: 'Rock 3', 
          artist: 'Artist 3', 
          audioUrl: R2_1_C2B3minus, 
          audioUrlFull: R2_1_C2B3full 
        },
        { 
          id: 'p2_8', 
          title: 'Rock 4', 
          artist: 'Artist 4', 
          audioUrl: R2_1_C2B4minus, 
          audioUrlFull: R2_1_C2B4full 
        },
      ]
    },
    {
      id: 'table',
      name: { en: 'Table', ru: 'Застольная' },
      songs: [
        { 
          id: 'p2_9', 
          title: 'Movie 1', 
          artist: 'Artist 1', 
          audioUrl: R2_1_C3B1minus, 
          audioUrlFull: R2_1_C3B1full 
        },
        { 
          id: 'p2_10', 
          title: 'Movie 2', 
          artist: 'Artist 2', 
          audioUrl: R2_1_C3B2minus, 
          audioUrlFull: R2_1_C3B2full 
        },
        { 
          id: 'p2_11', 
          title: 'Movie 3', 
          artist: 'Artist 3', 
          audioUrl: R2_1_C3B3minus, 
          audioUrlFull: R2_1_C3B3full 
        },
        { 
          id: 'p2_12', 
          title: 'Movie 4', 
          artist: 'Artist 4', 
          audioUrl: R2_1_C3B4minus, 
          audioUrlFull: R2_1_C3B4full 
        },
      ]
    },
    {
      id: 'hits80',
      name: { en: 'Hits of the 80s', ru: 'Хиты 80-х' },
      songs: [
        { 
          id: 'p2_13', 
          title: 'Retro 1', 
          artist: 'Artist 1', 
          audioUrl: R2_1_C4B1minus, 
          audioUrlFull: R2_1_C4B1full 
        },
        { 
          id: 'p2_14', 
          title: 'Retro 2', 
          artist: 'Artist 2', 
          audioUrl: R2_1_C4B2minus, 
          audioUrlFull: R2_1_C4B2full 
        },
        { 
          id: 'p2_15', 
          title: 'Retro 3', 
          artist: 'Artist 3', 
          audioUrl: R2_1_C4B3minus, 
          audioUrlFull: R2_1_C4B3full 
        },
        { 
          id: 'p2_16', 
          title: 'Retro 4', 
          artist: 'Artist 4', 
          audioUrl: R2_1_C4B4minus, 
          audioUrlFull: R2_1_C4B4full 
        },
      ]
    }
  ]
};
