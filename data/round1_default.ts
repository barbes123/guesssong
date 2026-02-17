import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

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
          title: 'Бубенцы', 
          artist: 'Русская народная песня', 
          audioUrl: R1C1B1minus, 
          audioUrlFull: R1C1B1full,
          notes: 'Народная зимняя песня про бубенцы, популярная на новогодних праздниках.'
        },
        { 
          id: 'p1_2', 
          title: 'В лесу родилась ёлочка', 
          artist: 'Детская новогодняя песня', 
          audioUrl: R1C1B2minus, 
          audioUrlFull: R1C1B2full,
          notes: 'Самая известная новогодняя детская песня, которую знают все поколения.'
        },
        { 
          id: 'p1_3', 
          title: 'Ёлочка, ёлка, лесной аромат', 
          artist: 'Детская новогодняя песня', 
          audioUrl: R1C1B3minus, 
          audioUrlFull: R1C1B3full,
          notes: 'Ещё одна популярная детская песня о новогодней ёлке и праздничном настроении.'
        },
        { 
          id: 'p1_4', 
          title: 'Новогодние игрушки', 
          artist: 'Детская новогодняя песня', 
          audioUrl: R1C1B4minus, 
          audioUrlFull: R1C1B4full,
          notes: 'Весёлая песня о ёлочных игрушках и подготовке к Новому году.'
        },
      ]
    },
    {
      id: 'cinema2026',
      name: { en: 'Cinema', ru: 'Кино' },
      songs: [
        { 
          id: 'r1_1', 
          title: 'Песня мушкетёров', 
          artist: 'Из к/ф «Д\'Артаньян и три мушкетёра»', 
          audioUrl: R1C2B1minus, 
          audioUrlFull: R1C2B1full,
          notes: 'Знаменитая песня мушкетёров из культового фильма: «Пора-пора-порадуемся на своём веку...»'
        },
        { 
          id: 'r1_2', 
          title: 'Звенит январская вьюга', 
          artist: 'Из к/ф «Карнавальная ночь»', 
          audioUrl: R1C2B2minus, 
          audioUrlFull: R1C2B2full,
          notes: 'Новогодняя песня из фильма «Карнавальная ночь» в исполнении Людмилы Гурченко.'
        },
        { 
          id: 'r1_3', 
          title: 'Песенка о медведях', 
          artist: 'Из к/ф «Кавказская пленница»', 
          audioUrl: R1C2B3minus, 
          audioUrlFull: R1C2B3full,
          notes: 'Шуточная песня из комедии «Кавказская пленница» про медведей в дремучем лесу.'
        },
        { 
          id: 'r1_4', 
          title: 'Джентльмены удачи', 
          artist: 'Из к/ф «Джентльмены удачи»', 
          audioUrl: R1C2B4minus, 
          audioUrlFull: R1C2B4full,
          notes: 'Песня из одноимённого фильма о детском саде и воспитателях.'
        },
      ]
    },
    {
      id: 'school',
      name: { en: 'School', ru: 'Школа' },
      songs: [
        { 
          id: 'c1_1', 
          title: 'Дважды два — четыре', 
          artist: 'Детская песня', 
          audioUrl: R1C3B1minus, 
          audioUrlFull: R1C3B1full,
          notes: 'Весёлая обучающая песня о таблице умножения: «Дважды два — четыре, это всем известно в целом мире».'
        },
        { 
          id: 'c1_2', 
          title: 'Чему учат в школе', 
          artist: 'Владимир Шаинский', 
          audioUrl: R1C3B2minus, 
          audioUrlFull: R1C3B2full,
          notes: 'Песня о школьных предметах и знаниях, которые получают дети в школе.'
        },
        { 
          id: 'c1_3', 
          title: 'Песенка первоклассника', 
          artist: 'Детская песня', 
          audioUrl: R1C3B3minus, 
          audioUrlFull: R1C3B3full,
          notes: 'Песня о первом классе, школьных принадлежностях и начале учёбы.'
        },
        { 
          id: 'c1_4', 
          title: 'Мой добрый учитель', 
          artist: 'Детская песня', 
          audioUrl: R1C3B4minus, 
          audioUrlFull: R1C3B4full,
          notes: 'Трогательная песня о первом учителе и школьных годах.'
        },
      ]
    },
    {
      id: 'animals',
      name: { en: 'Our smaller brothers', ru: 'Братья наши меньшие' },
      songs: [
        { 
          id: 'rt1_1', 
          title: 'В траве сидел кузнечик', 
          artist: 'Из м/ф «Приключения Незнайки»', 
          audioUrl: R1C4B1minus, 
          audioUrlFull: R1C4B1full,
          notes: 'Весёлая детская песня из мультфильма про кузнечика, который «сидел в траве».'
        },
        { 
          id: 'rt1_2', 
          title: 'Два весёлых гуся', 
          artist: 'Детская песня', 
          audioUrl: R1C4B2minus, 
          audioUrlFull: R1C4B2full,
          notes: 'Игровая песня-потешка о двух гусях, популярная в детских садах.'
        },
        { 
          id: 'rt1_3', 
          title: 'Чёрный кот', 
          artist: 'Юрий Савичев / группа «Браво»', 
          audioUrl: R1C4B3minus, 
          audioUrlFull: R1C4B3full,
          notes: 'Энергичная песня о чёрном коте как символе неудачи, ставшая хитом 80-х.'
        },
        { 
          id: 'rt1_4', 
          title: '33 коровы', 
          artist: 'Из м/ф «Мэри Поппинс, до свидания!»', 
          audioUrl: R1C4B4minus, 
          audioUrlFull: R1C4B4full,
          notes: 'Забавная песня из фильма-мюзикла про 33 коровы и свежее молоко.'
        },
      ]
    }
  ]
};
