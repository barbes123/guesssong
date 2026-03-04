import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 4 SPRINT - DEFAULT SET (Songs 1–7) ====================

// Source: Round 5, player 1, tracks 1–7
const R5R11minus = audioUrl('ulybka_minus_cut_jsvcut', '/music/round4/ulybka_minus_cut_jsvcut.mp3');
const R5R11full  = audioUrl('ulybka_wu1dge', '/music/round4/ulybka_wu1dge.mp3');

const R5R12minus = audioUrl('sneg-kruzhitsya-minus_v5xkti', '/music/round4/sneg-kruzhitsya-minus_cut.mp3');
const R5R12full  = audioUrl('sneg-kruzhitsya_xcm1ww', '/music/round4/sneg-kruzhitsya_xcm1ww.mp3');

const R5R13minus = audioUrl('', '/music/round4/spyat-ustalye-igrushki-minus.mp3');
const R5R13full  = audioUrl('', '/music/round4/spyat-ustalye-igrushki.mp3');

const R5R14minus = audioUrl('Vsyo_chto_v_zhizni_est_u_menya_minus_ox94kc', '/music/round4/Vsyo_chto_v_zhizni_est_u_menya_minus_ox94kc.mp3');
const R5R14full  = audioUrl('Vsyo_chto_v_zhizni_est_u_menya_injifz', '/music/round4/Vsyo_chto_v_zhizni_est_u_menya_injifz.mp3');

const R5R15minus = audioUrl(
  'Reet_v_vyshine_olimpiada_80_minus_-_reet_v_vyshine_minus_h6biey',
  '/music/round4/Reet_v_vyshine_olimpiada_80_minus_-_reet_v_vyshine_minus_h6biey.mp3'
);
const R5R15full  = audioUrl(
  'Reet_v_vyshine_olimpiada_80_minus_-_reet_v_vyshine_qjyopt',
  '/music/round4/Reet_v_vyshine_olimpiada_80_minus_-_reet_v_vyshine_qjyopt.mp3'
);

const R5R16minus = audioUrl('brilliantovaya_ruka_105-minus_uclxez', '/music/round4/brilliantovaya_ruka_105-minus_uclxez.mp3');
const R5R16full  = audioUrl('brilliantovaya_ruka_105_ou82sg', '/music/round4/brilliantovaya_ruka_105_ou82sg.mp3');

const R5R17minus = audioUrl('igor-sklyar-komarovo-minus_opjmub', '/music/round4/igor-sklyar-komarovo-minus_opjmub.mp3');
const R5R17full  = audioUrl('igor-sklyar-komarovo_ov121n', '/music/round4/igor-sklyar-komarovo_ov121n.mp3');

export const defaultSet: RoundSet = {
  id: 'default',
  name: {
    en: 'Sprint – Set 1',
    ru: 'Спринт – Набор 1',
  },
  description: {
    en: 'First sprint set (songs 1–7)',
    ru: 'Первый набор спринта (песни 1–7)',
  },
  author: 'DT',
  version: '1.0',
  data: [
    {
      id: 'r4_sprint',
      name: { en: 'Sprint', ru: 'Спринт' },
      songs: [
        { 
          id: 's5_1', 
          title: 'Улыбка', 
          artist: 'Марк Бернес (из м/ф "Крошка Енот")',
          audioUrl: R5R11minus, 
          audioUrlFull: R5R11full,
          notes: 'Песня на стихи Михаила Пляцковского стала символом дружбы и хорошего настроения для нескольких поколений.\n\nОт улыбки хмурый день светлей,\nОт улыбки в небе радуга проснётся...\nПоделись улыбкою своей,\nИ она к тебе не раз ещё вернётся.'
        },
        { 
          id: 's5_2', 
          title: 'Снег кружится', 
          artist: 'ВИА "Пламя" (солист: Юрий Петерсон)',
          audioUrl: R5R12minus, 
          audioUrlFull: R5R12full,
          notes: 'Легендарная песня 1980 года, которую часто ошибочно приписывают ВИА "Самоцветы". Написана композитором Сергеем Березиным.\n\nСнег кружится, летает, летает,\nИ позёмкою клубя,\nЗаметает зима, заметает\nВсё, что было до тебя.'
        },
        { 
          id: 's5_3', 
          title: 'Спят усталые игрушки', 
          artist: 'Валентина Толкунова (в заставке "Спокойной ночи, малыши!")',
          audioUrl: R5R13minus, 
          audioUrlFull: R5R13full,
          notes: 'Главная колыбельная страны, закрывающая передачу "Спокойной ночи, малыши!" с 1964 года. Музыка Аркадия Островского, слова Зои Петровой.\n\nСпят усталые игрушки, книжки спят.\nОдеяла и подушки ждут ребят.\nДаже сказка спать ложится,\nЧтобы ночью нам присниться.\nТы ей пожелай: "Баю-бай".'
        },
        { 
          id: 's5_4', 
          title: 'Всё, что в жизни есть у меня', 
          artist: 'ВИА "Самоцветы" (солист: Юрий Маликов)',
          audioUrl: R5R14minus, 
          audioUrlFull: R5R14full,
          notes: 'Хит 1970-х годов, написанный Вячеславом Добрыниным и Леонидом Дербенёвым. Одна из визитных карточек ансамбля.\n\nВсё, что в жизни есть у меня,\nВсё, в чём радость каждого дня,\nВсё, о чём тревоги и мечты,\nЭто — ты, это — ты.'
        },
        { 
          id: 's5_5', 
          title: 'Реет в вышине (Олимпиада-80)', 
          artist: 'Татьяна Анциферова и ансамбль "Земляне"',
          audioUrl: R5R15minus, 
          audioUrlFull: R5R15full,
          notes: 'Официальная песня московской Олимпиады-80. Авторы: композитор Александра Пахмутова и поэт Николай Добронравов.\n\nРеет в вышине,\nРеет в вышине\nНад столицей древней\nОлимпийский флаг.\nЗдравствуй, праздник сильных!'
        },
        { 
          id: 's5_6', 
          title: 'Песня про зайцев', 
          artist: 'Юрий Никулин (из к/ф "Бриллиантовая рука")',
          audioUrl: R5R16minus, 
          audioUrlFull: R5R16full,
          notes: 'Знаменитая "остросюжетная" песня из комедии Леонида Гайдая. Музыка Александра Зацепина, стихи Леонида Дербенёва.\n\nА нам всё равно,\nА нам всё равно,\nНе боимся мы волка и сову.\nДело есть у нас —\nВ самый жуткий час\nМы волшебную косим трын-траву.'
        },
        { 
          id: 's5_7', 
          title: 'Комарово', 
          artist: 'Игорь Скляр',
          audioUrl: R5R17minus, 
          audioUrlFull: R5R17full,
          notes: 'Летний хит 1985 года, который навсегда сделал посёлок Комарово под Петербургом культовым местом отдыха. Музыка Игоря Николаева.\n\nНа недельку, до второго,\nЯ уеду в Комарово\nПоглядеть отвыкшим взглядом\nНа прибрежную волну.'
        },
      ],
    },
  ],
};