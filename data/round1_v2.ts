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
const R1_2_C2B1full = audioUrl('berezy', '/music/round2/berezy.mp3'); // Исправлено расширение

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

const R1_2_C4B1minus = audioUrl('landyshi-minus_xhiisn', '/music/round2/landyshi-minus.mp3');
const R1_2_C4B1full = audioUrl('landyshi_xtruct', '/music/round2/landyshi.mp3');

const R1_2_C4B2minus = audioUrl('snegIdiet-minus_qgkijc', '/music/round2/snegIdiet-minus.mp3');
const R1_2_C4B2full = audioUrl('snegIdiet_am3d45', '/music/round2/snegIdiet.mp3');

const R1_2_C4B3minus = audioUrl('NaDalneiyStanciiSoiydu-munus_rokslz', '/music/round2/NaDalneiyStanciiSoiydu-munus.mp3');
const R1_2_C4B3full = audioUrl('NaDalneiyStanciiSoiydu_sxgbnr', '/music/round2/NaDalneiyStanciiSoiydu.mp3');

const R1_2_C4B4minus = audioUrl('nadezhda_minus_h24xio', '/music/round2/nadezhda_minus.mp3');
const R1_2_C4B4full = audioUrl('nadezhda_ujmrfc', '/music/round2/nadezhda.mp3');

export const round1v2Set: RoundSet = {
  id: 'round1_v2',
  name: {
    en: 'Round 1: Set 2',
    ru: 'Раунд 1: Набор 2'
  },
  description: {
    en: 'Themed categories: Children\'s Songs, Russia, Soviet Films, 60s-70s Hits',
    ru: 'Тематические категории: Детские песни, Россия, Советские фильмы, Хиты 60-70-х'
  },
  author: 'DT',
  version: '1.0',
  data: [
    {
      id: 'children',
      name: { en: 'Children\'s Songs', ru: 'Детские песни' },
      songs: [
        { 
          id: 'p1_2_1', 
          title: 'Улыбка', 
          artist: 'Из м/ф "Крошка Енот"', 
          audioUrl: R1_2_C1B1minus, 
          audioUrlFull: R1_2_C1B1full,
          hint: {
            en: 'Famous children\'s song from a cartoon about a little raccoon with the words "From a smile it will become brighter for everyone".',
            ru: 'Знаменитая детская песня из мультфильма о маленьком еноте со словами «От улыбки станет всем светлей».'
          }
        },
        { 
          id: 'p1_2_2', 
          title: 'Настоящий друг', 
          artist: 'Из м/ф "Тимка и Димка"', 
          audioUrl: R1_2_C1B2minus, 
          audioUrlFull: R1_2_C1B2full,
          hint: {
            en: 'Children\'s song about friendship from the cartoon: "A friend will not leave in trouble, will not ask too much".',
            ru: 'Детская песня о дружбе из мультфильма: «Друг в беде не бросит, лишнего не спросит».'
          }
        },
        { 
          id: 'p1_2_3', 
          title: 'Мы маленькие дети', 
          artist: 'Из к/ф "Приключения Электроника"', 
          audioUrl: R1_2_C1B3minus, 
          audioUrlFull: R1_2_C1B3full,
          hint: {
            en: 'Song from the cult film "The Adventures of Electronics": "We are little children, we want to walk".',
            ru: 'Песня из культового фильма «Приключения Электроника»: «Мы маленькие дети, нам хочется гулять».'
          }
        },
        { 
          id: 'p1_2_4', 
          title: 'Крылатые качели', 
          artist: 'Из к/ф "Приключения Электроника"', 
          audioUrl: R1_2_C1B4minus, 
          audioUrlFull: R1_2_C1B4full,
          hint: {
            en: 'Another famous song from the same film about dreams and hopes: "Winged swings fly, fly, fly".',
            ru: 'Ещё одна знаменитая песня из того же фильма о мечтах и надеждах: «Крылатые качели летят, летят, летят».'
          }
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
          hint: {
            en: 'Lyrical song about Russian nature, birches as a symbol of Russia.',
            ru: 'Лирическая песня о русской природе, берёзах как символе России.'
          }
        },
        { 
          id: 'p1_2_6', 
          title: 'Как упоительны в России вечера', 
          artist: 'Валентина Пономарёва', 
          audioUrl: R1_2_C2B2minus, 
          audioUrlFull: R1_2_C2B2full,
          hint: {
            en: 'Romance about the beauty of Russian evenings from the repertoire of Valentina Ponomareva.',
            ru: 'Романс о красоте русских вечеров из репертуара Валентины Пономарёвой.'
          }
        },
        { 
          id: 'p1_2_7', 
          title: 'С чего начинается Родина', 
          artist: 'Марк Бернес', 
          audioUrl: R1_2_C2B3minus, 
          audioUrlFull: R1_2_C2B3full,
          hint: {
            en: 'Patriotic song about what the Motherland begins with for each person.',
            ru: 'Патриотическая песня о том, с чего для каждого человека начинается Родина.'
          }
        },
        { 
          id: 'p1_2_8', 
          title: 'Русское поле', 
          artist: 'Из к/ф "Новые приключения неуловимых"', 
          audioUrl: R1_2_C2B4minus, 
          audioUrlFull: R1_2_C2B4full,
          hint: {
            en: 'Song about the expanses of the Russian land from the film "The New Adventures of the Elusive".',
            ru: 'Песня о просторах русской земли из кинофильма «Новые приключения неуловимых».'
          }
        },
      ]
    },
    {
      id: 'cinema',
      name: { en: 'Soviet Films', ru: 'Советские фильмы' },
      songs: [
        { 
          id: 'p1_2_9', 
          title: 'Есть только миг', 
          artist: 'Из к/ф "Земля Санникова"', 
          audioUrl: R1_2_C3B1minus, 
          audioUrlFull: R1_2_C3B1full,
          hint: {
            en: 'Philosophical song from the adventure film "Sannikov Land" performed by Oleg Anofriev.',
            ru: 'Философская песня из приключенческого фильма «Земля Санникова» в исполнении Олега Анофриева.'
          }
        },
        { 
          id: 'p1_2_10', 
          title: 'Позвони мне, позвони', 
          artist: 'Из к/ф "Карнавал"', 
          audioUrl: R1_2_C3B2minus, 
          audioUrlFull: R1_2_C3B2full,
          hint: {
            en: 'Popular song from the film "Carnival" performed by Irina Muravyova.',
            ru: 'Популярная песня из фильма «Карнавал» в исполнении Ирины Муравьёвой.'
          }
        },
        { 
          id: 'p1_2_11', 
          title: 'Три танкиста', 
          artist: 'Из к/ф "Трактористы"', 
          audioUrl: R1_2_C3B3minus, 
          audioUrlFull: R1_2_C3B3full,
          hint: {
            en: 'Legendary military song from the film "Tractor Drivers" about three tanker friends.',
            ru: 'Легендарная военная песня из фильма «Трактористы» о трёх танкистах-друзьях.'
          }
        },
        { 
          id: 'p1_2_12', 
          title: 'Смуглянка', 
          artist: 'Из к/ф "В бой идут одни старики"', 
          audioUrl: R1_2_C3B4minus, 
          audioUrlFull: R1_2_C3B4full,
          hint: {
            en: 'Famous military song from Leonid Bykov\'s film about a partisan girl.',
            ru: 'Знаменитая военная песня из фильма Леонида Быкова о девушке-партизанке.'
          }
        },
      ]
    },
    {
      id: 'hit60',
      name: { en: '60s-70s Hits', ru: 'Хиты 60-70-х' },
      songs: [
        { 
          id: 'p1_2_13', 
          title: 'Ландыши', 
          artist: 'Гелена Великанова', 
          audioUrl: R1_2_C4B1minus, 
          audioUrlFull: R1_2_C4B1full,
          hint: {
            en: 'Light, spring song of the 1950s, which became a hit performed by Helena Velikanova.',
            ru: 'Лёгкая, весенняя песня 50-х годов, ставшая хитом в исполнении Гелены Великановой.'
          }
        },
        { 
          id: 'p1_2_14', 
          title: 'А снег идёт', 
          artist: 'Майя Кристалинская', 
          audioUrl: R1_2_C4B2minus, 
          audioUrlFull: R1_2_C4B2full,
          hint: {
            en: 'Lyrical song by Maya Kristalinskaya about snow as a metaphor for time and memories.',
            ru: 'Лирическая песня Майи Кристалинской о снеге как метафоре времени и воспоминаний.'
          }
        },
        { 
          id: 'p1_2_15', 
          title: 'На дальней станции сойду', 
          artist: 'Валерий Ободзинский', 
          audioUrl: R1_2_C4B3minus, 
          audioUrlFull: R1_2_C4B3full,
          hint: {
            en: 'Romantic song about parting and distant stations performed by Valery Obodzinsky.',
            ru: 'Романтическая песня о расставании и дальних станциях в исполнении Валерия Ободзинского.'
          }
        },
        { 
          id: 'p1_2_16', 
          title: 'Надежда', 
          artist: 'Анна Герман', 
          audioUrl: R1_2_C4B4minus, 
          audioUrlFull: R1_2_C4B4full,
          hint: {
            en: 'One of the most famous songs by Anna German, which became a symbol of hope for a whole generation.',
            ru: 'Одна из самых известных песен Анны Герман, ставшая символом надежды для целого поколения.'
          }
        },
      ]
    }
  ]
};
