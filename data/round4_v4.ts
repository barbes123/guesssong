import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 4 SPRINT - SET 4 (Songs 22–28) ====================

// Source: Round 5, player 4, tracks 1–7
const R4R41minus = audioUrl('', '/music/round4/Agata_Kristi_-_Kak_na_vojne_minus.mp3');
const R4R41full  = audioUrl('', '/music/round4/Agata_Kristi_-_Kak_na_vojne.mp3');

const R4R42minus = audioUrl('', '/music/round4/bi-2_-_polkovniku_nikto_minus.mp3');
const R4R42full  = audioUrl('', '/music/round4/bi-2_-_polkovniku_nikto.mp3'); 

const R4R43minus = audioUrl('', '/music/round4/tatu-nas-ne-dogonyat--staraya_minus_cut.mp3'); 
const R4R43full  = audioUrl('', '/music/round4/tatu-nas-ne-dogonyat--staraya.mp3'); 

const R4R44minus = audioUrl('davay-za--lyube-minus_ghi789', '/music/round4/davay-za--lyube-minus.mp3');
const R4R44full  = audioUrl('davay-za--lyube_jkl012', '/music/round4/davay-za--lyube.mp3');

const R4R45minus = audioUrl('gruppa_krovi_minus_cut_mno345', '/music/round4/gruppa_krovi_minus_cut.mp3');
const R4R45full  = audioUrl('gruppa_krovi_pqr678', '/music/round4/gruppa_krovi.mp3');

const R4R46minus = audioUrl('', '/music/round4/mumiy-troll-live-nik--vladivostok-2000_minus_cut.mp3'); // Minus not found in the list
const R4R46full  = audioUrl('', '/music/round4/mumiy-troll-live-nik--vladivostok-2000'); // Full not found in the list

const R4R47minus = audioUrl('Diskoteka_Avariya_Novogodnyaya_minus_cut_stu901', '/music/round4/Diskoteka_Avariya_Novogodnyaya_minus_cut.mp3');
const R4R47full  = audioUrl('Diskoteka_Avariya_Novogodnyaya_vwx234', '/music/round4/Diskoteka_Avariya_Novogodnyaya.mp3');

export const round4v4Set: RoundSet = {
  id: 'round4_v4',
  name: {
    en: 'Sprint – Set 4',
    ru: 'Спринт – Набор 4',
  },
  description: {
    en: 'Fourth sprint set (songs 22–28)',
    ru: 'Четвёртый набор спринта (песни 22–28)',
  },
  author: 'DT',
  version: '1.0',
  data: [
    {
      id: 'r4_sprint',
      name: { en: 'Sprint', ru: 'Спринт' },
      songs: [
        { 
          id: 's5_22', 
          title: 'Как на войне', 
          artist: 'Агата Кристи', 
          audioUrl: R4R41minus, 
          audioUrlFull: R4R41full,
          notes: 'Один из самых мощных и узнаваемых хитов Агаты Кристи, который врывается в сознание с первых секунд гитарным риффом. Песня о любви, которая ощущается как сражение, о жизни, проходящей на грани, и об усталости от вечной борьбы. Мрачная, завораживающая атмосфера и характерный вокал Вадима Самойлова сделали этот трек визитной карточкой группы и гимном для миллионов слушателей. Идеально для спринта — мгновенная узнаваемость и энергия с первой ноты. «Я устал от этой вечной войны, / Я устал от любви, я устал от тебя.» «Как на войне, как на войне, / Нас с тобой никто не ждёт на этой земле.» «Я вчера смотрел в глаза урагану, / Я сегодня устал, я сегодня устал.» «И я знаю, что так будет всегда, / И я знаю, что так будет всегда.»'
        },
        { 
          id: 's5_23', 
          title: 'Полковнику никто не пишет', 
          artist: 'Би-2', 
          audioUrl: R4R42minus, 
          audioUrlFull: R4R42full,
          notes: 'Культовый хит Би-2, который мгновенно узнаётся по гитарному риффу и голосу Лёвы Би-2. Песня о поиске смысла, надежде на лучшее и ощущении, что мир замер в ожидании. Стала гимном целого поколения в конце 1990-х, а сегодня звучит так же свежо, как и двадцать лет назад. Идеально для спринта — энергичная, с запоминающимся припевом и характерным звучанием. «Полковнику никто не пишет, / Полковника никто не ждёт.» «Всё будет так, как мы захочешь, / Всё будет так, как мы решим.» «На пепел серых облаков / Ложится белый свет.» «Летят, летят, летят года, / А я всё жду, а я всё жду.".'
        },
        { 
          id: 's5_24', 
          title: 'Нас не догонят', 
          artist: 'Тату', 
          audioUrl: R4R43minus, 
          audioUrlFull: R4R43full,
          notes: 'Узнать по: Электронному голосу "I\'m your doll" и резкому вступлению ударных. Первые строки: "Нас не догонят, нас не догонят / Нас не догонят, мы улетаем". Припев: "Нас не догонят, нас не догонят / Мы в небесах, ты меня не ищи".'
        },
        { 
          id: 's5_25', 
          title: 'Давай за...', 
          artist: 'Любэ', 
          audioUrl: R4R44minus, 
          audioUrlFull: R4R44full,
          notes: 'Узнать по: Звуку вертолётных лопастей в самом начале и мощному гитарному аккорду. Первые строки: "Давай за жизнь, давай за братву / Давай за тех, кто с нами был". Припев: "Давай за... давай за... / За тех, кто в поле, за тех, кто в море".'
        },
        { 
          id: 's5_26', 
          title: 'Группа крови', 
          artist: 'Кино', 
          audioUrl: R4R45minus, 
          audioUrlFull: R4R45full,
          notes: 'Узнать по: Иконному перезвону колокольчиков/камертону в первых секундах. Первые строки: "Тёплое место, но улицы ждут отпечатков наших ног". Припев: "Группа крови — на рукаве, мой порядковый номер — на рукаве / Пожелай мне удачи в бою, пожелай мне".'
        },
        { 
          id: 's5_27', 
          title: 'Владивосток 2000', 
          artist: 'Мумий Тролль', 
          audioUrl: R4R46minus, 
          audioUrlFull: R4R46full,
          notes: 'Узнать по: Фразе "Один-н-н-н!", выкрикиваемой Ильей Лагутенко, и сразу энергичному биту. Первые строки: "Владивосток 2000, я остаюсь с тобой / Владивосток 2000, мы делаем новый год". Припев: "И мы как будто в последний раз / И мы не ищем лишних фраз".'
        },
        { 
          id: 's5_28', 
          title: 'Новогодняя', 
          artist: 'Дискотека Авария', 
          audioUrl: R4R47minus, 
          audioUrlFull: R4R47full,
          notes: 'Узнать по: Звуку лопающегося шампанского и праздничному синтезаторному вступлению. Первые строки: "Новый год к нам мчится, скоро всё случится / Сбываются мечты, и мы с тобой близки". Припев: "И раз, и два, и три, и раз, и два, и три / И Новый год, и Новый год, и Новый год в пути".'
        },
      ],
    },
  ],
};