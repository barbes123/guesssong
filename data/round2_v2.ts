import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 2-2 AUDIO FILES ====================

const R4_2_C1B1minus = audioUrl('kapitan-kapitan-ulybnites_minus_qechen', '/music/round4/kapitan-kapitan-ulybnites_minus.mp3');
const R4_2_C1B1full = audioUrl('kapitan-kapitan-ulybnites_tjrbhp', '/music/round4/kapitan-kapitan-ulybnites.mp3');

const R4_2_C1B2minus = audioUrl('ya_ubyu_tebya_lodochnik_minus_jzos0v', '/music/round4/ya_ubyu_tebya_lodochnik_minus.mp3');
const R4_2_C1B2full = audioUrl('ya_ubyu_tebya_lodochnik_rsyk6a', '/music/round4/ya_ubyu_tebe_lodochnik.mp3');

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
  id: 'round2_v2',
  name: {
    en: 'Round 2: Set 2',
    ru: 'Раунд 2: Набор 2'
  },
  description: {
    en: 'Themed categories: Professions, Romances, Winter, Birthday',
    ru: 'Тематические категории: Профессии, Романсы, Зима, День Рождения'
  },
  author: 'DT',
  version: '1.0',
  data: [
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
          hint: {
            en: 'A cheerful song from a Soviet comedy film, where the main character encourages the captain to smile.',
            ru: 'Весёлая песня из советской кинокомедии, где главный герой призывает капитана улыбнуться.'
          }
        },
        { 
          id: 'p1_2_2', 
          title: 'Я убью тебя, лодочник', 
          artist: 'Николай Караченцов', 
          audioUrl: R4_2_C1B2minus, 
          audioUrlFull: R4_2_C1B2full,
          hint: {
            en: 'A passionate song from the legendary rock opera, where a boatman faces a dramatic choice.',
            ru: 'Страстная песня из легендарной рок-оперы, где лодочник сталкивается с драматическим выбором.'
          }
        },
        { 
          id: 'p1_2_3', 
          title: 'Песенка шофёра', 
          artist: 'Михаил Боярский', 
          audioUrl: R4_2_C1B3minus, 
          audioUrlFull: R4_2_C1B3full,
          hint: {
            en: 'A humorous song about the life and philosophy of a truck driver from a popular Soviet movie.',
            ru: 'Шуточная песня о жизни и философии шофёра-дальнобойщика из популярного советского фильма.'
          }
        },
        { 
          id: 'p1_2_4', 
          title: 'Всё могут короли', 
          artist: 'Алла Пугачёва', 
          audioUrl: R4_2_C1B4minus, 
          audioUrlFull: R4_2_C1B4full,
          hint: {
            en: 'A famous song about the limitations of power when it comes to matters of the heart.',
            ru: 'Знаменитая песня о том, что власть имеет ограничения, когда дело касается вопросов сердца.'
          }
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
          hint: {
            en: 'A classic romance based on Tyutchev\'s poem about an unexpected meeting that revives old feelings.',
            ru: 'Классический романс на стихи Тютчева о неожиданной встрече, воскрешающей старые чувства.'
          }
        },
        { 
          id: 'p1_2_6', 
          title: 'Очи чёрные', 
          artist: 'Фёдор Шаляпин', 
          audioUrl: R4_2_C2B2minus, 
          audioUrlFull: R4_2_C2B2full,
          hint: {
            en: 'The most famous Russian romance about captivating black eyes that haunt in dreams.',
            ru: 'Самый известный русский романс о пленительных чёрных очах, преследующих в сновидениях.'
          }
        },
        { 
          id: 'p1_2_7', 
          title: 'Издалека долго течёт река Волга', 
          artist: 'Людмила Зыкина', 
          audioUrl: R4_2_C2B3minus, 
          audioUrlFull: R4_2_C2B3full,
          hint: {
            en: 'A lyrical folk song about the great Russian river, symbolizing the motherland and its vast expanses.',
            ru: 'Лирическая народная песня о великой русской реке, символизирующей родину и её просторы.'
          }
        },
        { 
          id: 'p1_2_8', 
          title: 'Гори, гори, моя звезда', 
          artist: 'Александр Вертинский', 
          audioUrl: R4_2_C2B4minus, 
          audioUrlFull: R4_2_C2B4full,
          hint: {
            en: 'A touching old romance where a star symbolizes hope, love and guidance through life\'s journey.',
            ru: 'Трогательный старинный романс, где звезда символизирует надежду, любовь и путеводный свет.'
          }
        },
      ]
    },
    {
      id: 'winter',
      name: { en: 'Winter Songs', ru: 'Песни о зиме' },
      songs: [
        { 
          id: 'p1_2_9', 
          title: 'Звенит январская вьюга', 
          artist: 'Клавдия Шульженко', 
          audioUrl: R4_2_C3B1minus, 
          audioUrlFull: R4_2_C3B1full,
          hint: {
            en: 'A lyrical winter song about waiting and hope during a cold January blizzard.',
            ru: 'Лирическая зимняя песня о ожидании и надежде во время холодной январской вьюги.'
          }
        },
        { 
          id: 'p1_2_10', 
          title: 'Белые снежинки', 
          artist: 'Гелена Великанова', 
          audioUrl: R4_2_C3B2minus, 
          audioUrlFull: R4_2_C3B2full,
          hint: {
            en: 'A light, dancing song comparing falling snowflakes to wedding confetti.',
            ru: 'Лёгкая, танцевальная песня, где падающие снежинки сравниваются со свадебным конфетти.'
          }
        },
        { 
          id: 'p1_2_11', 
          title: 'А снег идёт', 
          artist: 'Майя Кристалинская', 
          audioUrl: R4_2_C3B3minus, 
          audioUrlFull: R4_2_C3B3full,
          hint: {
            en: 'A philosophical song where falling snow becomes a metaphor for the passage of time and memories.',
            ru: 'Философская песня, где падающий снег становится метафорой течения времени и воспоминаний.'
          }
        },
        { 
          id: 'p1_2_12', 
          title: 'Три белых коня', 
          artist: 'Лариса Долина', 
          audioUrl: R4_2_C3B4minus, 
          audioUrlFull: R4_2_C3B4full,
          hint: {
            en: 'A song from a popular New Year\'s film where three winter months are represented as white horses.',
            ru: 'Песня из популярного новогоднего фильма, где три зимних месяца представлены в виде белых коней.'
          }
        },
      ]
    },
    {
      id: 'birthday',
      name: { en: 'Birthday Songs', ru: 'Песни ко Дню Рождения' },
      songs: [
        { 
          id: 'p1_2_13', 
          title: 'Не плачь, Алиса', 
          artist: 'Браво', 
          audioUrl: R4_2_C4B1minus, 
          audioUrlFull: R4_2_C4B1full,
          hint: {
            en: 'An energetic post-punk song with a recognizable saxophone riff, comforting a girl on her birthday.',
            ru: 'Энергичная песня в стиле пост-панк с узнаваемым саксофонным риффом, утешающая девушку в день рождения.'
          }
        },
        { 
          id: 'p1_2_14', 
          title: 'День рождения', 
          artist: 'Игорь Николаев', 
          audioUrl: R4_2_C4B2minus, 
          audioUrlFull: R4_2_C4B2full,
          hint: {
            en: 'A lyrical pop hit about birthday celebrations, wishes and the special atmosphere of this day.',
            ru: 'Лирический поп-хит о праздновании дня рождения, загадывании желаний и особой атмосфере этого дня.'
          }
        },
        { 
          id: 'p1_2_15', 
          title: 'Чай вдвоём', 
          artist: 'Чай вдвоём', 
          audioUrl: R4_2_C4B3minus, 
          audioUrlFull: R4_2_C4B3full,
          hint: {
            en: 'A cheerful song from the popular duo, inviting to celebrate a birthday together.',
            ru: 'Весёлая песня популярного дуэта, приглашающая вместе отметить день рождения.'
          }
        },
        { 
          id: 'p1_2_16', 
          title: 'С днём рождения', 
          artist: 'Ирина Аллегрова', 
          audioUrl: R4_2_C4B4minus, 
          audioUrlFull: R4_2_C4B4full,
          hint: {
            en: 'A festive birthday greeting song from one of Russia\'s most famous pop divas.',
            ru: 'Праздничная поздравительная песня от одной из самых известных поп-див России.'
          }
        },
      ]
    }
  ]
};
