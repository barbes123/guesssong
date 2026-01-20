import { RoundSet } from '../../../../types';
import { audioUrl } from '../../audioUtils';

// ==================== ROUND 1 AUDIO FILES ====================
// Category 1: New Year Songs
const R1C1B1minus = audioUrl('Bubency-detskaya-minus_pyhep9', '/music/round1/Bubency-detskaya-minus.mp3');
const R1C1B1full = audioUrl('Bubency-detskaya_egddvx', '/music/round1/Bubency-detskaya.mp3');

const R1C1B2minus = audioUrl('v_lesu_rodilas_elochka-minus_jl95xw', '/music/round1/v_lesu_rodilas_elochka-minus.mp3');
const R1C1B2full = audioUrl('v_lesu_rodilas_elochka_ava2tn', '/music/round1/v_lesu_rodilas_elochka.mp3');

const R1C1B3minus = audioUrl('elochka_elka_lesnoj_aromat_minus_r46ke5', '/music/round1/elochka_elka_lesnoj_aromat_minus.mp3');
const R1C1B3full = audioUrl('elochka_elka_lesnoj_aromat_ygpqcp', '/music/round1/elochka_elka_lesnoj_aromat.mp3');

const R1C1B4minus = audioUrl('novogodnie-igrushki-minus_hbjhwq', '/music/round1/novogodnie-igrushki-minus.mp3');
const R1C1B4full = audioUrl('novogodnie-igrushki_wv0i3m', '/music/round1/novogodnie-igrushki.mp3');

// Category 2: Cinema Songs
const R1C2B1minus = audioUrl('tri-mushketera-minus_m00pud', '/music/round1/tri-mushketera-minus.mp3');
const R1C2B1full = audioUrl('tri-mushketera_pbxarx', '/music/round1/tri-mushketera.mp3');

const R1C2B2minus = audioUrl('zvenit-janvarskaja-vjuga-minus_ctftqa', '/music/round1/zvenit-janvarskaja-vjuga-minus.mp3');
const R1C2B2full = audioUrl('zvenit-janvarskaja-vjuga_mrwszb', '/music/round1/zvenit-janvarskaja-vjuga.mp3');

const R1C2B3minus = audioUrl('pesenka-o-medvedjah-minus_ccuru1', '/music/round1/pesenka-o-medvedjah-minus.mp3');
const R1C2B3full = audioUrl('pesenka-o-medvedjah_ptrxzr', '/music/round1/pesenka-o-medvedjah.mp3');

const R1C2B4minus = audioUrl('dzhentelmeny-udachi_dlwpir', '/music/round1/dzhentelmeny-udachi.mp3');
const R1C2B4full = audioUrl('dzhentelmeny-udachi_dlwpir', '/music/round1/dzhentelmeny-udachi.mp3'); // Same ID for both minus/full

// Category 3: School Songs
const R1C3B1minus = audioUrl('dvazhdy_dva_chetyre-minus_itvint', '/music/round1/dvazhdy_dva_chetyre-minus.mp3');
const R1C3B1full = audioUrl('dvazhdy_dva_chetyre_h4ps2v', '/music/round1/dvazhdy_dva_chetyre.mp3');

const R1C3B2minus = audioUrl('chemu-uchat_v_shkole-minus_wvevyw', '/music/round1/chemu-uchat_v_shkole-minus.mp3');
const R1C3B2full = audioUrl('chemu_uchat_v_shkole_neq4va', '/music/round1/chemu_uchat_v_shkole.mp3');

const R1C3B3minus = audioUrl('pesenka_pervoklassnika_minus_j5c4ho', '/music/round1/pesenka_pervoklassnika_minus.mp3');
const R1C3B3full = audioUrl('pesenka_pervoklassnika_aveqhs', '/music/round1/pesenka_pervoklassnika.mp3');

const R1C3B4minus = audioUrl('Moy-dobry-uchitel_minus_yi3kem', '/music/round1/Moy-dobry-uchitel_minus.mp3');
const R1C3B4full = audioUrl('Moy-dobry-uchitel_u30wy8', '/music/round1/Moy-dobry-uchitel.mp3');

// Category 4: Animals Songs
const R1C4B1minus = audioUrl('v_trave_sidel_kuznechik_minus_yfib4c', '/music/round1/v_trave_sidel_kuznechik_minus.mp3');
const R1C4B1full = audioUrl('v_trave_sidel_kuznechik_b6ghyx', '/music/round1/v_trave_sidel_kuznechik.mp3');

const R1C4B2minus = audioUrl('dva_veselyh_gusya_minus_prbjiv', '/music/round1/dva_veselyh_gusya_minus.mp3');
const R1C4B2full = audioUrl('dva_veselyh_gusya_jrlfds', '/music/round1/dva_veselyh_gusya.mp3');

const R1C4B3minus = audioUrl('chernyy-kot-minus_edfpoe', '/music/round1/chernyy-kot-minus.mp3');
const R1C4B3full = audioUrl('chernyy-kot_gw0k50', '/music/round1/chernyy-kot.mp3');

const R1C4B4minus = audioUrl('33_korovy_minus_wgviha', '/music/round1/33_korovy_minus.mp3');
const R1C4B4full = audioUrl('33_korovy_siv4yd', '/music/round1/33_korovy.mp3');

export const defaultSet: RoundSet = {
  id: 'default',  // Set ID
  name: {
    en: 'Round1-V1',
    ru: 'Роунд1-1'
  },
  description: {
    en: '',
    ru: ''
  },
  author: 'DT',
  version: '1.0',
  data: [  // This is the array of categories
    {
      id: 'newyear',
      name: { en: 'New Year', ru: 'Новый Год' },
      songs: [
        { 
          id: 'p1_1', 
          title: 'Song 1', 
          artist: 'Artist 1', 
          audioUrl: R1C1B1minus, 
          audioUrlFull: R1C1B1full 
        },
        { 
          id: 'p1_2', 
          title: 'Song 2', 
          artist: 'Artist 2', 
          audioUrl: R1C1B2minus, 
          audioUrlFull: R1C1B2full 
        },
        { 
          id: 'p1_3', 
          title: 'Song 3', 
          artist: 'Artist 3', 
          audioUrl: R1C1B3minus, 
          audioUrlFull: R1C1B3full 
        },
        { 
          id: 'p1_4', 
          title: 'Song 4', 
          artist: 'Artist 4', 
          audioUrl: R1C1B4minus, 
          audioUrlFull: R1C1B4full 
        },
      ]
    },
    {
      id: 'cinema2026',
      name: { en: 'Cinema', ru: 'Кино' },
      songs: [
        { 
          id: 'r1_1', 
          title: 'Rock 1', 
          artist: 'Artist 1', 
          audioUrl: R1C2B1minus, 
          audioUrlFull: R1C2B1full 
        },
        { 
          id: 'r1_2', 
          title: 'Rock 2', 
          artist: 'Artist 2', 
          audioUrl: R1C2B2minus, 
          audioUrlFull: R1C2B2full 
        },
        { 
          id: 'r1_3', 
          title: 'Rock 3', 
          artist: 'Artist 3', 
          audioUrl: R1C2B3minus, 
          audioUrlFull: R1C2B3full 
        },
        { 
          id: 'r1_4', 
          title: 'Rock 4', 
          artist: 'Artist 4', 
          audioUrl: R1C2B4minus, 
          audioUrlFull: R1C2B4full 
        },
      ]
    },
    {
      id: 'school',
      name: { en: 'School', ru: 'Школа' },
      songs: [
        { 
          id: 'c1_1', 
          title: 'Movie 1', 
          artist: 'Artist 1', 
          audioUrl: R1C3B1minus, 
          audioUrlFull: R1C3B1full 
        },
        { 
          id: 'c1_2', 
          title: 'Movie 2', 
          artist: 'Artist 2', 
          audioUrl: R1C3B2minus, 
          audioUrlFull: R1C3B2full 
        },
        { 
          id: 'c1_3', 
          title: 'Movie 3', 
          artist: 'Artist 3', 
          audioUrl: R1C3B3minus, 
          audioUrlFull: R1C3B3full 
        },
        { 
          id: 'c1_4', 
          title: 'Movie 4', 
          artist: 'Artist 4', 
          audioUrl: R1C3B4minus, 
          audioUrlFull: R1C3B4full 
        },
      ]
    },
    {
      id: 'animals',
      name: { en: 'Our smaller brothers', ru: 'Братья наши меньшие' },
      songs: [
        { 
          id: 'rt1_1', 
          title: 'Retro 1', 
          artist: 'Artist 1', 
          audioUrl: R1C4B1minus, 
          audioUrlFull: R1C4B1full 
        },
        { 
          id: 'rt1_2', 
          title: 'Retro 2', 
          artist: 'Artist 2', 
          audioUrl: R1C4B2minus, 
          audioUrlFull: R1C4B2full 
        },
        { 
          id: 'rt1_3', 
          title: 'Retro 3', 
          artist: 'Artist 3', 
          audioUrl: R1C4B3minus, 
          audioUrlFull: R1C4B3full 
        },
        { 
          id: 'rt1_4', 
          title: 'Retro 4', 
          artist: 'Artist 4', 
          audioUrl: R1C4B4minus, 
          audioUrlFull: R1C4B4full 
        },
      ]
    }
  ]
};
