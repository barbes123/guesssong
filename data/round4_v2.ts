import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 4 SPRINT - SET 2 (Songs 8–14) ====================

// Source: Round 5, player 2, tracks 1–7
const R5R21minus = audioUrl('Moskva_slezam_ne_verit_minus_cut_tbwvxu', '/music/round4/Moskva_slezam_ne_verit_minus_cut_tbwvxu.mp3');
const R5R21full  = audioUrl('Moskva_slezam_ne_verit_bgy5go', '/music/round4/Moskva_slezam_ne_verit_bgy5go.mp3');

const R5R22minus = audioUrl('', '/music/round4/prekrasnoe-daleko-minus_cut.mp3');
const R5R22full  = audioUrl('', '/music/round4/prekrasnoe-daleko.mp3');

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
  '/music/round4/ischu-tebya-iz-k-f-31-iyunya--minus1_cut.mp3'
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
        {
          id: 's5_8',
          title: 'Александра',
          artist: 'Сергей и Татьяна Никитины (из к/ф «Москва слезам не верит»)',
          audioUrl: R5R21minus,
          audioUrlFull: R5R21full,
          notes: 'Песня из кинофильма «Москва слезам не верит» (1979). Музыка Сергея Никитина, стихи Дмитрия Сухарева и Юрия Визбора. Стала неофициальным гимном Москвы.\n\nНе сразу всё устроилось,\nМосква не сразу строилась,\nМосква слезам не верила –\nА верила любви.'
        },
        {
          id: 's5_9',
          title: 'Прекрасное далёко',
          artist: 'Татьяна Дасковская',
          audioUrl: R5R22minus,
          audioUrlFull: R5R22full,
          notes: 'Главная песня из культового фильма о путешествиях во времени и мечтах о будущем. Пронзительный детский голос и философские строки, которые запоминаются навсегда. «Прекрасное далёко, не будь ко мне жестоко, / Не будь ко мне жестоко, жестоко не будь.» «Я начинаю путь, а впереди — мечта, / Мне только б не свернуть, мне только б удержаться!'
        },
        {
          id: 's5_10',
          title: 'Трус не играет в хоккей',
          artist: 'Вадим Мулерман',
          audioUrl: R5R23minus,
          audioUrlFull: R5R23full,
          notes: 'Спортивный гимн, написанный Александрой Пахмутовой и Николаем Добронравовым в 1968 году. Песня стала неофициальным гимном хоккеистов и болельщиков.\n\nВ хоккей играют настоящие мужчины,\nТрус не играет в хоккей.\nСуров ты был, хоккейный бой,\nВ борьбе нелегкой.'
        },
        {
          id: 's5_11',
          title: 'Я шагаю по Москве',
          artist: 'Никита Михалков (из к/ф «Я шагаю по Москве»)',
          audioUrl: R5R24minus,
          audioUrlFull: R5R24full,
          notes: 'Песня Андрея Петрова на стихи Геннадия Шпаликова из фильма Георгия Данелии (1964). Исполняет сам Никита Михалков в кадре.\n\nА я иду, шагаю по Москве,\nИ я пройти ещё смогу\nСолёным Тихим океаном,\nИ тундрой, и тайгой.'
        },
        {
          id: 's5_12',
          title: 'Ищу тебя',
          artist: 'Татьяна Анциферова (из к/ф «31 июня»)',
          audioUrl: R5R25minus,
          audioUrlFull: R5R25full,
          notes: 'Песня Александра Зацепина на стихи Леонида Дербенёва из музыкального фильма «31 июня» (1978). Фантастическая лирическая композиция.\n\nИщу тебя в который раз,\nСпешу к тебе, но каждый раз\nЯ опаздываю, мой друг,\nИ мы не встретимся вдвоём.'
        },
        {
          id: 's5_13',
          title: 'До свиданья, Москва',
          artist: 'Лев Лещенко и Татьяна Анциферова',
          audioUrl: R5R26minus,
          audioUrlFull: R5R26full,
          notes: 'Прощальная песня XXII летних Олимпийских игр 1980 года. Музыка Александры Пахмутовой, слова Николая Добронравова. Именно под эту песню улетал олимпийский Мишка.\n\nНа трибунах становится тише,\nТает быстрое время чудес.\nДо свиданья, наш ласковый Миша,\nВозвращайся в свой сказочный лес.'
        },
        {
          id: 's5_14',
          title: 'Замечательный сосед',
          artist: 'Эдуард Хиль',
          audioUrl: R5R27minus,
          audioUrlFull: R5R27full,
          notes: 'Жизнерадостная песня Бориса Потемкина на стихи Михаила Пляцковского (1967). В исполнении Эдуарда Хиля стала всесоюзным хитом.\n\nРаньше думал я о том,\nПочему зима и лето\nВ этом доме, в доме том\nТак похожи друг на друга?'
        }
      ],
    },
  ],
};