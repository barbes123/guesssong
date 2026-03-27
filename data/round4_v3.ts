import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 4 SPRINT - SET 3 (Songs 15–21) ====================

const R5R31minus = audioUrl('', '/music/round4/pesnya-druzey-minus.mp3');
const R5R31full  = audioUrl('', '/music/round4/pesnya-druzey.mp3');

const R5R32minus = audioUrl('', '/music/round4/pesnya-shapoklyak_minus_cut.mp3');
const R5R32full  = audioUrl('', '/music/round4/pesnya-shapoklyak.mp3');

const R5R33minus = audioUrl('lesnoy-olen-minus_cut_slxeg7', '/music/round4/lesnoy-olen-minus_cut_slxeg7.mp3');
const R5R33full  = audioUrl('lesnoy-olen_alsf9y', '/music/round4/lesnoy-olen_alsf9y.mp3');

const R5R34minus = audioUrl('', '/music/round4/kuda-uhodit-detstvo_minus.mp3');
const R5R34full  = audioUrl('kuda-uhodit-detstvo_bgbpo7', '/music/round4/kuda-uhodit-detstvo_bgbpo7.mp3');

const R5R35minus = audioUrl(
  '',
  '/music/round4/YUrij_Nikulin_-_Esli_b_ya_byl_sultan_minus_cut.mp3'
);
const R5R35full  = audioUrl(
  'yuriy-nikulin-esli-b-ya-byil-sultan_dxwjw2',
  '/music/round4/YUrij_Nikulin_-_Esli_b_ya_byl_sultan.mp3'
);

const R5R36minus = audioUrl(
  '', '/music/round4/razgovor-so-schast-em-minus1_cut.mp3'
);
const R5R36full  = audioUrl(
  'razgovor-so-schast-em_pvnq1z', '/music/round4/razgovor-so-schast-em_pvnq1z.mp3'
);

const R5R37minus = audioUrl('', '/music/round4/kruchu-pedali_minus.mp3');
const R5R37full  = audioUrl('', '/music/round4/kruchu-pedali.mp3');

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
        {
          id: 's5_15',
          title: 'Ничего на свете лучше нету',
          artist: 'Олег Анофриев (из м/ф «Бременские музыканты»)',
          audioUrl: R5R31minus,
          audioUrlFull: R5R31full,
          notes: 'Главная песня о дружбе из культового мультфильма, узнаваемая с первых аккордов. Трубадур и его верные друзья-звери доказывают, что вместе можно всё. «Ничего на свете лучше нету, / Чем бродить друзьям по белу свету.» «Наш ковчег — гитара и труба, / А с нами вместе — верные друзья.»'
        },
        {
          id: 's5_16',
          title: 'Кто людям помогает...',
          artist: 'Ирина Мазинг (Шапокляк)',
          audioUrl: R5R32minus,
          audioUrlFull: R5R32full,
          notes: 'Хулиганская, но обаятельная песенка старухи Шапокляк о том, что «хорошими делами прославиться нельзя». Задорная мелодия и ироничный текст делают её идеальной для быстрого узнавания в спринте. «Кто людям помогает — тот тратит время зря, / Хорошими делами прославиться нельзя.» «Я, Шапокляк, я, Шапокляк, / Я — старушка хоть куда!» «Лариска, моя крыска, / Со мной всегда, со мной везде.»'
        },
        {
          id: 's5_17',
          title: 'Лесной олень',
          artist: 'Аида Ведищева (из к/ф «Ох уж эта Настя!»)',
          audioUrl: R5R33minus,
          audioUrlFull: R5R33full,
          notes: 'Песня Евгения Крылатова на стихи Юрия Энтина прозвучала в фильме «Ох уж эта Настя!» (1971) и стала одной из самых любимых лирических песен о детстве.\n\nОсенью в дождливый серый день\nПроскакал по городу олень,\nОн летел над гулкой мостовой\nРыжим лесом, пущенной стрелой.\nВернись, лесной олень, по моему хотенью!'
        },
        {
          id: 's5_18',
          title: 'Куда уходит детство',
          artist: 'Татьяна Анциферова',
          audioUrl: R5R34minus,
          audioUrlFull: R5R34full,
          notes: 'Композитор Александр Зацепин и поэт Леонид Дербенёв написали эту песню для фильма «Фантазии Веснухина» (1976). В исполнении Татьяны Анциферовой она стала ностальгическим хитом на все времена.\n\nКуда уходит детство, в какие города?\nИ где найти нам средство, чтоб вновь попасть туда?\nОно уйдет неслышно, пока весь город спит,\nИ писем не напишет, и вряд ли позвонит.'
        },
        {
          id: 's5_19',
          title: 'Если б я был султан',
          artist: 'Юрий Никулин (из к/ф «Кавказская пленница»)',
          audioUrl: R5R35minus,
          audioUrlFull: R5R35full,
          notes: 'Знаменитая песня Александра Зацепина на стихи Леонида Дербенёва из комедии Леонида Гайдая «Кавказская пленница» (1967). Исполняет Юрий Никулин в роли Балбеса.\n\nЕсли б я был султан, я б имел трёх жён\nИ тройной красотой был бы окружён.\nНо с другой стороны, при таких делах\nСтолько бед и забот – ах, спаси, аллах!'
        },
        {
          id: 's5_20',
          title: 'Разговор со счастьем',
          artist: 'Валерий Золотухин (из к/ф «Иван Васильевич меняет профессию»)',
          audioUrl: R5R36minus,
          audioUrlFull: R5R36full,
          notes: 'Песня Александра Зацепина на слова Леонида Дербенёва из культовой комедии «Иван Васильевич меняет профессию» (1973). В фильме её поёт герой Валерия Золотухина – Иван Грозный / управдом Бунша.\n\nВдруг как в сказке скрипнула дверь,\nВсё мне ясно стало теперь.\nСколько лет я спорил с судьбой\nРади этой встречи со мной.\nАх, какое блаженство, знать, что я совершенство!'
        },
        {
          id: 's5_21',
          title: 'Кручу педали, кручу',
          artist: 'Александр Калягин (Кот Леопольд из м/ф «Приключения кота Леопольда»)',
          audioUrl: R5R37minus,
          audioUrlFull: R5R37full,
          notes: 'Добрая, солнечная песенка кота Леопольда о том, что главное в жизни — солнце, дружба и спокойствие. В отличие от своих хулиганистых мышей, Леопольд предпочитает наслаждаться прогулками на велосипеде и мечтать о мире во всём мире. Узнаваемая с первых слов мелодия дарит ощущение уюта и беззаботности. «Кручу педали, кручу — / Вдаль улетаю, лечу.» «Солнце светит в вышине, / Солнце светит очень мне.» «Если добрый ты, / То всегда легко, / А когда наоборот — / Трудно.'
        }
      ],
    },
  ],
};