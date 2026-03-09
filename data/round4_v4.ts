import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 4 SPRINT - SET 4 (Songs 22–28) ====================

// Source: Round 5, player 4, tracks 1–7
const R4R41minus = audioUrl('Agata_Kristi_-_Vechnaya_lyubov_minus_abc123', '/music/round4/Agata_Kristi_-_Vechnaya_lyubov_minus.mp3');
const R4R41full  = audioUrl('Agata_Kristi_-_Vechnaya_lyubov_xyz789', '/music/round4/Agata_Kristi_-_Vechnaya_lyubov.mp3');

const R4R42minus = audioUrl('moy-rok-n-roll-minus_def456', '/music/round4/moy-rok-n-roll-minus.mp3');
const R4R42full  = audioUrl('', '/music/round4/moy-rok-n-roll.mp3'); // Full version not found in the list

const R4R43minus = audioUrl('tatu-nas-ne-dogonyat--staraya_minus_cut_xxx', '/music/round4/tatu-nas-ne-dogonyat--staraya_minus_cut.mp3'); // Minus not found in the list
const R4R43full  = audioUrl('tatu-nas-ne-dogonyat--staraya_minus_yyy', '/music/round4/tatu-nas-ne-dogonyat--staraya.mp3'); // Full not found in the list

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
          title: 'Вечная Любовь', 
          artist: 'Агата Кристи', 
          audioUrl: R4R41minus, 
          audioUrlFull: R4R41full,
          notes: 'Узнать по: Характерному женскому смеху в начале и сразу за ним гитарному рифу.'
        },
        { 
          id: 's5_23', 
          title: 'Мой рок-н-ролл', 
          artist: 'Би-2 (feat. Чичерина)', 
          audioUrl: R4R42minus, 
          audioUrlFull: R4R42full,
          notes: 'Узнать по: Характерному женскому смеху в начале и сразу за ним гитарному рифу.'
        },
        { 
          id: 's5_24', 
          title: 'Нас не догонят', 
          artist: 'Тату', 
          audioUrl: R4R43minus, 
          audioUrlFull: R4R43full,
          notes: 'Узнать по: Электронному голосу "I\'m your doll" и резкому вступлению ударных.'
        },
        { 
          id: 's5_25', 
          title: 'Давай за...', 
          artist: 'Любэ', 
          audioUrl: R4R44minus, 
          audioUrlFull: R4R44full,
          notes: 'Узнать по: Звуку вертолётных лопастей в самом начале и мощному гитарному аккорду.'
        },
        { 
          id: 's5_26', 
          title: 'Группа крови', 
          artist: 'Кино', 
          audioUrl: R4R45minus, 
          audioUrlFull: R4R45full,
          notes: 'Узнать по: Иконному перезвону колокольчиков/камертону в первых секундах.'
        },
        { 
          id: 's5_27', 
          title: 'Владивосток 2000', 
          artist: 'Мумий Тролль', 
          audioUrl: R4R46minus, 
          audioUrlFull: R4R46full,
          notes: 'Узнать по: Фразе "Один-н-н-н!", выкрикиваемой Ильей Лагутенко, и сразу энергичному биту.'
        },
        { 
          id: 's5_28', 
          title: 'Новогодняя', 
          artist: 'Дискотека Авария', 
          audioUrl: R4R47minus, 
          audioUrlFull: R4R47full,
          notes: 'Узнать по: Звуку лопающегося шампанского и праздничному синтезаторному вступлению.'
        },
      ],
    },
  ],
};