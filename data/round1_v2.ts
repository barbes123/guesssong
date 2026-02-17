import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

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
    en: 'Round1-V2',
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
          title: 'Улыбка', 
          artist: 'Из м/ф «Крошка Енот»', 
          audioUrl: R1_2_C1B1minus, 
          audioUrlFull: R1_2_C1B1full,
          notes: 'Знаменитая детская песня из мультфильма «Крошка Енот» со словами «От улыбки станет всем светлей».'
        },
        { 
          id: 'p1_2_2', 
          title: 'Настоящий друг', 
          artist: 'Из м/ф «Тимка и Димка»', 
          audioUrl: R1_2_C1B2minus, 
          audioUrlFull: R1_2_C1B2full,
          notes: 'Детская песня о дружбе из мультфильма «Тимка и Димка»: «Друг в беде не бросит, лишнего не спросит».'
        },
        { 
          id: 'p1_2_3', 
          title: 'Мы маленькие дети', 
          artist: 'Из к/ф «Приключения Электроника»', 
          audioUrl: R1_2_C1B3minus, 
          audioUrlFull: R1_2_C1B3full,
          notes: 'Песня из культового фильма «Приключения Электроника»: «Мы маленькие дети, нам хочется гулять».'
        },
        { 
          id: 'p1_2_4', 
          title: 'Крылатые качели', 
          artist: 'Из к/ф «Приключения Электроника»', 
          audioUrl: R1_2_C1B4minus, 
          audioUrlFull: R1_2_C1B4full,
          notes: 'Ещё одна знаменитая песня из того же фильма о мечтах и надеждах: «Крылатые качели летят, летят, летят».'
        },
      ]
    },
    {
      id: 'russia',
      name: { en: 'Russia', ru: 'Россия' },
      songs: [
        { 
          id: 'p1_2_5', 
          title: 'Берёзы', 
          artist: 'Лев Лещенко', 
          audioUrl: R1_2_C2B1minus, 
          audioUrlFull: R1_2_C2B1full,
          notes: 'Лирическая песня о русской природе, берёзах как символе России.'
        },
        { 
          id: 'p1_2_6', 
          title: 'Как упоительны в России вечера', 
          artist: 'Валентина Пономарёва', 
          audioUrl: R1_2_C2B2minus, 
          audioUrlFull: R1_2_C2B2full,
          notes: 'Романс о красоте русских вечеров из репертуара Валентины Пономарёвой.'
        },
        { 
          id: 'p1_2_7', 
          title: 'С чего начинается Родина', 
          artist: 'Марк Бернес', 
          audioUrl: R1_2_C2B3minus, 
          audioUrlFull: R1_2_C2B3full,
          notes: 'Патриотическая песня о том, с чего для каждого человека начинается Родина.'
        },
        { 
          id: 'p1_2_8', 
          title: 'Русское поле', 
          artist: 'Из к/ф «Новые приключения неуловимых»', 
          audioUrl: R1_2_C2B4minus, 
          audioUrlFull: R1_2_C2B4full,
          notes: 'Песня о просторах русской земли из кинофильма «Новые приключения неуловимых».'
        },
      ]
    },
    {
      id: 'cinema2026',
      name: { en: 'Soviet films', ru: 'Советские фильмы' },
      songs: [
        { 
          id: 'p1_2_9', 
          title: 'Есть только миг', 
          artist: 'Из к/ф «Земля Санникова»', 
          audioUrl: R1_2_C3B1minus, 
          audioUrlFull: R1_2_C3B1full,
          notes: 'Философская песня из приключенческого фильма «Земля Санникова» в исполнении Олега Анофриева.'
        },
        { 
          id: 'p1_2_10', 
          title: 'Позвони мне, позвони', 
          artist: 'Из к/ф «Карнавал»', 
          audioUrl: R1_2_C3B2minus, 
          audioUrlFull: R1_2_C3B2full,
          notes: 'Популярная песня из фильма «Карнавал» в исполнении Ирины Муравьёвой.'
        },
        { 
          id: 'p1_2_11', 
          title: 'Три танкиста', 
          artist: 'Из к/ф «Трактористы»', 
          audioUrl: R1_2_C3B3minus, 
          audioUrlFull: R1_2_C3B3full,
          notes: 'Легендарная военная песня из фильма «Трактористы» о трёх танкистах-друзьях.'
        },
        { 
          id: 'p1_2_12', 
          title: 'Смуглянка', 
          artist: 'Из к/ф «В бой идут одни старики»', 
          audioUrl: R1_2_C3B4minus, 
          audioUrlFull: R1_2_C3B4full,
          notes: 'Знаменитая военная песня из фильма Леонида Быкова о девушке-партизанке.'
        },
      ]
    },
    {
      id: 'hit60',
      name: { en: 'Hits of the 60s and 70s', ru: 'Хиты 60-х и 70-х годов' },
      songs: [
        { 
          id: 'p1_2_13', 
          title: 'Ландыши', 
          artist: 'Гелена Великанова', 
          audioUrl: R1_2_C4B1minus, 
          audioUrlFull: R1_2_C4B1full,
          notes: 'Лёгкая, весенняя песня 1950-х годов, ставшая хитом в исполнении Гелены Великановой.'
        },
        { 
          id: 'p1_2_14', 
          title: 'А снег идёт', 
          artist: 'Майя Кристалинская', 
          audioUrl: R1_2_C4B2minus, 
          audioUrlFull: R1_2_C4B2full,
          notes: 'Лирическая песня Майи Кристалинской о снеге как метафоре времени и воспоминаний.'
        },
        { 
          id: 'p1_2_15', 
          title: 'На дальней станции сойду', 
          artist: 'Валерий Ободзинский', 
          audioUrl: R1_2_C4B3minus, 
          audioUrlFull: R1_2_C4B3full,
          notes: 'Романтическая песня о расставании и дальних станциях в исполнении Валерия Ободзинского.'
        },
        { 
          id: 'p1_2_16', 
          title: 'Надежда', 
          artist: 'Анна Герман', 
          audioUrl: R1_2_C4B4minus, 
          audioUrlFull: R1_2_C4B4full,
          notes: 'Одна из самых известных песен Анны Герман, ставшая символом надежды для целого поколения.'
        },
      ]
    }
  ]
};
