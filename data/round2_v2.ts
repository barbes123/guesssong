import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 2-2 AUDIO FILES ====================

const R4_2_C1B1minus = audioUrl('kapitan-kapitan-ulybnites_minus_qechen', '/music/round4/kapitan-kapitan-ulybnites_minus.mp3');
const R4_2_C1B1full = audioUrl('kapitan-kapitan-ulybnites_tjrbhp', '/music/round4/kapitan-kapitan-ulybnites.mp3');

const R4_2_C1B2minus = audioUrl('ya_ubyu_tebya_lodochnik_minus_jzos0v', '/music/round4/ya_ubyu_tebya_lodochnik_minus.mp3');
const R4_2_C1B2full = audioUrl('ya_ubyu_tebya_lodochnik_rsyk6a', '/music/round4/ya_ubyu_tebya_lodochnik.mp3');

const R4_2_C1B3minus = audioUrl('pesenka-shofera-minus_uvrqev', '/music/round4/pesenka-shofera-minus.mp3');
const R4_2_C1B3full = audioUrl('pesenka-shofera_itiv3b', '/music/round4/pesenka-shofera.mp3');

const R4_2_C1B4minus = audioUrl('vse_mogut_koroli_minus_cloitv', '/music/round4/vse_mogut_koroli_minus.mp3');
const R4_2_C1B4full = audioUrl('vse_mogut_koroli_whymlj', '/music/round4/vse_mogut_koroli.mp3');

const R4_2_C2B1minus = audioUrl('ya_vstretil_Vas-minus_xpzsgo', '/music/round4/ya_vstretil_Vas-minus.mp3');
const R4_2_C2B1full = audioUrl('ya_vstretil_Vas_mbhwzg', '/music/round4/ya_vstretil_Vas.mp3');

const R4_2_C2B2minus = audioUrl('ochi-chernye-minus_usug0j', '/music/round4/ochi-chernye-minus.mp3');
const R4_2_C2B2full = audioUrl('ochi-chernye_marugh', '/music/round4/ochi-chernye.mp3');

const R4_2_C2B3minus = audioUrl('iz-daleka-dolgo-techet-reka-volga-minus_xhz9ay', '/music/round4/iz-daleka-dolgo-techet-reka-volga-minus.mp3');
const R4_2_C2B3full = audioUrl('iz-daleka-dolgo-techet-reka-volga_vubrfo', '/music/round4/iz-daleka-dolgo-techet-reka-volga.mp3');

const R4_2_C2B4minus = audioUrl('Gori_moya_zvezda_minus_rjkalc', '/music/round4/Gori_moya_zvezda_minus.mp3');
const R4_2_C2B4full = audioUrl('Gori_moya_zvezda_oyiiyz', '/music/round4/Gori_moya_zvezda.mp3');

const R4_2_C3B1minus = audioUrl('zvenit-yanvarskaya-vyuga-miunus_ud7wws', '/music/round4/zvenit-yanvarskaya-vyuga-miunus.mp3');
const R4_2_C3B1full = audioUrl('zvenit-yanvarskaya-vyuga_ftkwkk', '/music/round4/zvenit-yanvarskaya-vyuga.mp3');

const R4_2_C3B2minus = audioUrl('belye-snezhinki-minus_rbeer1', '/music/round4/belye-snezhinki-minus.mp3');
const R4_2_C3B2full = audioUrl('belye-snezhinki_qlznjl', '/music/round4/belye-snezhinki.mp3');

const R4_2_C3B3minus = audioUrl('a-sneg-idet-minus_zb5kmn', '/music/round4/a-sneg-idet-minus.mp3');
const R4_2_C3B3full = audioUrl('a-sneg-idet_zjq1yz', '/music/round4/a-sneg-idet.mp3');

const R4_2_C3B4minus = audioUrl('tri_belykh_konja_minus_w08ixy', '/music/round4/tri_belykh_konja_minus.mp3');
const R4_2_C3B4full = audioUrl('tri_belykh_konja_a5nho4', '/music/round4/tri_belykh_konja.mp3');

const R4_2_C4B1minus = audioUrl('Ne_plach_Alisa_minus_jxgzpq', '/music/round4/Ne_plach_Alisa_minus.mp3');
const R4_2_C4B1full = audioUrl('Ne_plach_Alisa_d65ppd', '/music/round4/Ne_plach_Alisa.mp3');

const R4_2_C4B2minus = audioUrl('nikolaev_igor_den_rozhdeniya_minus_zwlatc', '/music/round4/nikolaev_igor_den_rozhdeniya_minus.mp3');
const R4_2_C4B2full = audioUrl('nikolaev_igor_den_rozhdeniya_c7fp0y', '/music/round4/nikolaev_igor_den_rozhdeniya.mp3');

const R4_2_C4B3minus = audioUrl('chay-vdvoem-den-rozhdeniya_minus_nilcuf', '/music/round4/chay-vdvoem-den-rozhdeniya_minus.mp3');
const R4_2_C4B3full = audioUrl('chay-vdvoem-den-rozhdeniya_uybsfs', '/music/round4/chay-vdvoem-den-rozhdeniya.mp3');

const R4_2_C4B4minus = audioUrl('Irina_Alegrova_-_s_dnem_rozhdeniya-minus_vgfiwg', '/music/round4/Irina_Alegrova_-_s_dnem_rozhdeniya-minus.mp3');
const R4_2_C4B4full = audioUrl('Irina_Alegrova_-_s_dnem_rozhdeniya_cjrkaa', '/music/round4/Irina_Alegrova_-_s_dnem_rozhdeniya.mp3');

export const round2v2Set: RoundSet = {
  id: 'round2_v2',  // Set ID
   name: {
    en: 'Round2-V2',
    ru: 'Роунд2-2'
  },
  description: {
    en: '',
    ru: ''
  },
  author: 'DT',
  version: '1.0',
  data: [  // This is the array of categories
    {
      id: 'prof',
      name: { en: 'Professions', ru: 'Профессии' },
      songs: [
        { 
          id: 'p1_2_1', 
          title: 'Капитан, капитан, улыбнитесь', 
          artist: 'Леонид Утёсов', 
          audioUrl: R4_2_C1B1minus, 
          audioUrlFull: R4_2_C1B1full,
          notes: 'Весёлая песня из советской кинокомедии. Легко узнаваемая по жизнерадостной мелодии и призыву капитану улыбнуться.'
        },
        { 
          id: 'p1_2_2', 
          title: 'Я убью тебя, лодочник', 
          artist: 'Николай Караченцов', 
          audioUrl: R4_2_C1B2minus, 
          audioUrlFull: R4_2_C1B2full,
          notes: 'Страстная песня из легендарной рок-оперы "Юнона и Авось". Мощное драматическое исполнение Караченцова.'
        },
        { 
          id: 'p1_2_3', 
          title: 'Песенка шофёра', 
          artist: 'Михаил Боярский', 
          audioUrl: R4_2_C1B3minus, 
          audioUrlFull: R4_2_C1B3full,
          notes: 'Шуточная песня о философии дальнобойщика из фильма "Не бойся, я с тобой". Характерный голос Боярского.'
        },
        { 
          id: 'p1_2_4', 
          title: 'Всё могут короли', 
          artist: 'Алла Пугачёва', 
          audioUrl: R4_2_C1B4minus, 
          audioUrlFull: R4_2_C1B4full,
          notes: 'Знаменитая песня о пределах власти в вопросах сердца. Визитная карточка Примадонны 80-х.'
        },
      ]
    },
    {
      id: 'romances',
      name: { en: 'Romances', ru: 'Романсы' },
      songs: [
        { 
          id: 'p1_2_5', 
          title: 'Я встретил Вас', 
          artist: 'Иван Козловский', 
          audioUrl: R4_2_C2B1minus, 
          audioUrlFull: R4_2_C2B1full,
          notes: 'Классический романс на стихи Тютчева. Неповторимый тенор великого оперного певца.'
        },
        { 
          id: 'p1_2_6', 
          title: 'Очи чёрные', 
          artist: 'Фёдор Шаляпин', 
          audioUrl: R4_2_C2B2minus, 
          audioUrlFull: R4_2_C2B2full,
          notes: 'Самый известный русский романс в эталонном исполнении великого баса.'
        },
        { 
          id: 'p1_2_7', 
          title: 'Издалека долго течёт река Волга', 
          artist: 'Людмила Зыкина', 
          audioUrl: R4_2_C2B3minus, 
          audioUrlFull: R4_2_C2B3full,
          notes: 'Лирическая народная песня-символ родины в исполнении "голоса России".'
        },
        { 
          id: 'p1_2_8', 
          title: 'Гори, гори, моя звезда', 
          artist: 'Александр Вертинский', 
          audioUrl: R4_2_C2B4minus, 
          audioUrlFull: R4_2_C2B4full,
          notes: 'Трогательный старинный романс в аристократичном исполнении Вертинского.'
        },
      ]
    },
    {
      id: 'winter',
      name: { en: 'Winter', ru: 'Песни о зиме' },
      songs: [
        { 
          id: 'p1_2_9', 
          title: 'Звенит январская вьюга', 
          artist: 'Клавдия Шульженко', 
          audioUrl: R4_2_C3B1minus, 
          audioUrlFull: R4_2_C3B1full,
          notes: 'Лирическая зимняя песня с тёплым, бархатным голосом Шульженко.'
        },
        { 
          id: 'p1_2_10', 
          title: 'Белые снежинки', 
          artist: 'Гелена Великанова', 
          audioUrl: R4_2_C3B2minus, 
          audioUrlFull: R4_2_C3B2full,
          notes: 'Лёгкая танцевальная песня, сравнивающая снежинки со свадебным конфетти.'
        },
        { 
          id: 'p1_2_11', 
          title: 'А снег идёт', 
          artist: 'Майя Кристалинская', 
          audioUrl: R4_2_C3B3minus, 
          audioUrlFull: R4_2_C3B3full,
          notes: 'Философская песня, где снег — метафора времени и воспоминаний.'
        },
        { 
          id: 'p1_2_12', 
          title: 'Три белых коня', 
          artist: 'Лариса Долина', 
          audioUrl: R4_2_C3B4minus, 
          audioUrlFull: R4_2_C3B4full,
          notes: 'Песня из новогоднего фильма "Чародеи" о зимних месяцах как белых конях.'
        },
      ]
    },
    {
      id: 'birthday',
      name: { en: 'Birthday', ru: 'День Рождения' },
      songs: [
        { 
          id: 'p1_2_13', 
          title: 'Не плачь, Алиса', 
          artist: 'Группа «Браво»', 
          audioUrl: R4_2_C4B1minus, 
          audioUrlFull: R4_2_C4B1full,
          notes: 'Энергичный пост-панк с саксофонным риффом, утешающий в день рождения.'
        },
        { 
          id: 'p1_2_14', 
          title: 'День рождения', 
          artist: 'Игорь Николаев', 
          audioUrl: R4_2_C4B2minus, 
          audioUrlFull: R4_2_C4B2full,
          notes: 'Лирический поп-хит 90-х о праздновании и загадывании желаний.'
        },
        { 
          id: 'p1_2_15', 
          title: 'День рождения', 
          artist: 'Группа «Чай вдвоём»', 
          audioUrl: R4_2_C4B3minus, 
          audioUrlFull: R4_2_C4B3full,
          notes: 'Весёлая танцевальная песня-приглашение отметить день рождения вместе.'
        },
        { 
          id: 'p1_2_16', 
          title: 'С днём рождения', 
          artist: 'Ирина Аллегрова', 
          audioUrl: R4_2_C4B4minus, 
          audioUrlFull: R4_2_C4B4full,
          notes: 'Праздничная поздравительная песня от знаменитой поп-дивы.'
        },
      ]
    }
  ]
};
