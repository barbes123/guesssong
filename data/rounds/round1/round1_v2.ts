import { RoundSet } from '../../../../types';
import { audioUrl } from '../../audioUtils';

// ==================== ROUND 1-2 AUDIO FILES ====================

const R1_2_C1B1minus = audioUrl('ulybka_minus_cbr12j', '/music/round2/ulybka_minus.mp3');
const R1_2_C1B1full = audioUrl('ulybka_jq85hi', '/music/round2/ulybka.mp3');

const R1_2_C1B2minus = audioUrl('nastoyashiy_drug_minus_eddrhy', '/music/round2/nastoyashiy_drug_minus.mp3');
const R1_2_C1B2full = audioUrl('nastojashhij_drug_ovdl7u', '/music/round2/nastojashhij_drug.mp3');

const R1_2_C1B3minus = audioUrl('my_malenkie_deti_minus_m1bkoj', '/music/round2/my_malenkie_deti_minus.mp3');
const R1_2_C1B3full = audioUrl('my_malenkie_deti_ixn2ct', '/music/round2/my_malenkie_deti.mp3');

const R1_2_C1B4minus = audioUrl('krylatye_kacheli_minus_exthl0', '/music/round2/krylatye_kacheli_minus.mp3');
const R1_2_C1B4full = audioUrl('krylatye_kacheli_gmtcac', '/music/round2/krylatye_kacheli.mp3');


const R1_2_C2B1minus = audioUrl('berezy-minus_sff6l8', '/music/round2/berezy-minus.mp3');
const R1_2_C2B1full = '/music/round2/berezy.mpga'; // Note: .mpga extension - might be wrong

const R1_2_C2B2minus = audioUrl('kak-upoitel-ny-v-rossii-vechera-minus_qo6pfx', '/music/round2/kak-upoitel-ny-v-rossii-vechera-minus.mp3');
const R1_2_C2B2full = audioUrl('kak-upoitel-ny-v-rossii-vechera_por3ci', '/music/round2/kak-upoitel-ny-v-rossii-vechera.mp3');

const R1_2_C2B3minus = audioUrl('s_chego_nachinaetsya_Rodina_minus_arxtzc', '/music/round2/s_chego_nachinaetsya_Rodina_minus.mp3');
const R1_2_C2B3full = audioUrl('s_chego_nachinaetsya_Rodina_c4ghwp', '/music/round2/s_chego_nachinaetsya_Rodina.mp3');

const R1_2_C2B4minus = audioUrl('russkoe-pole-minus_ruymua', '/music/round2/russkoe-pole-minus.mp3');
const R1_2_C2B4full = audioUrl('russkoe-pole_vtnc6o', '/music/round2/russkoe-pole.mp3');


const R1_2_C3B1minus = audioUrl('est-tolko-mig-minus_kk13xz', '/music/round2/est-tolko-mig-minus.mp3');
const R1_2_C3B1full = audioUrl('est-tolko-mig_fmgvto', '/music/round2/est-tolko-mig.mp3');

const R1_2_C3B2minus = audioUrl('pozvoni-mne-minus_yooxil', '/music/round2/pozvoni-mne-minus.mp3');
const R1_2_C3B2full = audioUrl('pozvoni-mne_f628en', '/music/round2/pozvoni-mne.mp3');

const R1_2_C3B3minus = audioUrl('tri-tankista-minus_ekrfdo', '/music/round2/tri-tankista-minus.mp3');
const R1_2_C3B3full = audioUrl('tri-tankista_cb59ui', '/music/round2/tri-tankista.mp3');

const R1_2_C3B4minus = audioUrl('smuglyanka-minus_ncekac', '/music/round2/smuglyanka-minus.mp3');
const R1_2_C3B4full = audioUrl('smuglyanka_mtiuoy', '/music/round2/smuglyanka.mp3');

// Round 2 Category 4
const R1_2_C4B1minus = audioUrl('landyshi-minus_xhiisn', '/music/round2/landyshi-minus.mp3');
const R1_2_C4B1full = audioUrl('landyshi_xtruct', '/music/round2/landyshi.mp3');

const R1_2_C4B2minus = audioUrl('snegIdiet-minus_qgkijc', '/music/round2/snegIdiet-minus.mp3');
const R1_2_C4B2full = audioUrl('snegIdiet_am3d45', '/music/round2/snegIdiet.mp3');

const R1_2_C4B3minus = audioUrl('NaDalneiyStanciiSoiydu-munus_rokslz', '/music/round2/NaDalneiyStanciiSoiydu-munus.mp3');
const R1_2_C4B3full = audioUrl('NaDalneiyStanciiSoiydu_sxgbnr', '/music/round2/NaDalneiyStanciiSoiydu.mp3');

const R1_2_C4B4minus = audioUrl('nadezhda_minus_h24xio', '/music/round2/nadezhda_minus.mp3');
const R1_2_C4B4full = audioUrl('nadezhda_ujmrfc', '/music/round2/nadezhda.mp3');

export const round1v2Set: RoundSet = {
  id: 'round1_v2',  // Set ID
   name: {
    en: 'Round1-2',
    ru: 'Роунд1-2'
  },
  description: {
    en: '',
    ru: ''
  },
  author: 'DT',
  version: '1.0',
  data: [  // This is the array of categories
    {
      id: 'children',
      name: { en: 'Childrens songs', ru: 'Детские песни' },
      songs: [
        { 
          id: 'p1_2_1', 
          title: 'Song 1', 
          artist: 'Artist 1', 
          audioUrl: R1_2_C1B1minus, 
          audioUrlFull: R1_2_C1B1full 
        },
        { 
          id: 'p1_2_2', 
          title: 'Song 2', 
          artist: 'Artist 2', 
          audioUrl: R1_2_C1B2minus, 
          audioUrlFull: R1_2_C1B2full 
        },
        { 
          id: 'p1_2_3', 
          title: 'Song 3', 
          artist: 'Artist 3', 
          audioUrl: R1_2_C1B3minus, 
          audioUrlFull: R1_2_C1B3full 
        },
        { 
          id: 'p1_2_4', 
          title: 'Song 4', 
          artist: 'Artist 4', 
          audioUrl: R1_2_C1B4minus, 
          audioUrlFull: R1_2_C1B4full 
        },
      ]
    },
    {
      id: 'russia',
      name: { en: 'Russia', ru: 'Россия' },
      songs: [
        { 
          id: 'p1_2_5', 
          title: 'Rock 1', 
          artist: 'Artist 1', 
          audioUrl: R1_2_C2B1minus, 
          audioUrlFull: R1_2_C2B1full 
        },
        { 
          id: 'p1_2_6', 
          title: 'Rock 2', 
          artist: 'Artist 2', 
          audioUrl: R1_2_C2B2minus, 
          audioUrlFull: R1_2_C2B2full 
        },
        { 
          id: 'p1_2_7', 
          title: 'Rock 3', 
          artist: 'Artist 3', 
          audioUrl: R1_2_C2B3minus, 
          audioUrlFull: R1_2_C2B3full 
        },
        { 
          id: 'p1_2_8', 
          title: 'Rock 4', 
          artist: 'Artist 4', 
          audioUrl: R1_2_C2B4minus, 
          audioUrlFull: R1_2_C2B4full 
        },
      ]
    },
    {
      id: 'cinema2026',
      name: { en: 'Soviet films', ru: 'Советские фильмы' },
      songs: [
        { 
          id: 'p1_2_9', 
          title: 'Movie 1', 
          artist: 'Artist 1', 
          audioUrl: R1_2_C3B1minus, 
          audioUrlFull: R1_2_C3B1full 
        },
        { 
          id: 'p1_2_10', 
          title: 'Movie 2', 
          artist: 'Artist 2', 
          audioUrl: R1_2_C3B2minus, 
          audioUrlFull: R1_2_C3B2full 
        },
        { 
          id: 'p1_2_11', 
          title: 'Movie 3', 
          artist: 'Artist 3', 
          audioUrl: R1_2_C3B3minus, 
          audioUrlFull: R1_2_C3B3full 
        },
        { 
          id: 'p1_2_12', 
          title: 'Movie 4', 
          artist: 'Artist 4', 
          audioUrl: R1_2_C3B4minus, 
          audioUrlFull: R1_2_C3B4full 
        },
      ]
    },
    {
      id: 'hit60',
      name: { en: 'Hits of the 60s and 70s', ru: 'Хиты 60-х и 70-х годов' },
      songs: [
        { 
          id: 'p1_2_13', 
          title: 'Retro 1', 
          artist: 'Artist 1', 
          audioUrl: R1_2_C4B1minus, 
          audioUrlFull: R1_2_C4B1full 
        },
        { 
          id: 'p1_2_14', 
          title: 'Retro 2', 
          artist: 'Artist 2', 
          audioUrl: R1_2_C4B2minus, 
          audioUrlFull: R1_2_C4B2full 
        },
        { 
          id: 'p1_2_15', 
          title: 'Retro 3', 
          artist: 'Artist 3', 
          audioUrl: R1_2_C4B3minus, 
          audioUrlFull: R1_2_C4B3full 
        },
        { 
          id: 'p1_2_16', 
          title: 'Retro 4', 
          artist: 'Artist 4', 
          audioUrl: R1_2_C4B4minus, 
          audioUrlFull: R1_2_C4B4full 
        },
      ]
    }
  ]
};
