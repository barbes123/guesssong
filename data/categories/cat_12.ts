import { RoundSet } from '../../types';
import { audioUrl } from '../audioUtils';
import { Category } from '../../types';

// ==================== ROUND 1-2 AUDIO FILES ====================


export const romanianCat: Category = {
  id: 'children',
  name: { en: "Children's songs", ru: 'Детские песни' },
  description: {
    ru: 'Ностальгия в чистом виде. После этих песен захочется найти старые игрушки и поплакать от умиления.',
    en: "Nostalgia in its purest form. After these songs, you'll want to find old toys and cry with tenderness."
  },
  songs: [
    { 
      id: 'MAMONTENOK', 
      title: 'Песенка мамонтёнка', 
      artist: 'Клара Румянова', 
      audioUrl: audioUrl('pesnya-mamontenka_esiasy.mp3', '/music/round1/pesnya-mamontenka_minus.mp3'), 
      audioUrlFull: audioUrl('pesnya-mamontenka_esiasy.mp3', '/music/round1/pesnya-mamontenka.mp3'),
      notes: 'Классическая детская песня о поиске мамы, которую знают все поколения. Трогательная песня о поиске мамы, которая заставляет плакать даже взрослых. История маленького мамонтёнка, который отправился через океан на льдине, чтобы найти самого родного человека. «По синему морю, к зелёной земле / Плыву я на белом своём корабле.» «Мама, мама, я тебя так люблю, / Что просто не найти таких слов!»'
    },
    { 
      id: 'NASTODRUG', 
      title: 'Настоящий друг', 
      artist: 'Из м/ф «Тимка и Димка»', 
      audioUrl: audioUrl('nastoyashiy_drug_minus_hf79gf', '/music/round1/nastoyashiy_drug_minus_hf79gf.mp3'), 
      audioUrlFull: audioUrl('nastoyashiy_drug_rgxpe8', '/music/round1/nastoyashiy_drug_rgxpe8.mp3'),
      notes: 'Детская песня о дружбе из мультфильма «Тимка и Димка» (1976). Музыка Бориса Савельева, стихи Михаила Пляцковского. Учит ценить настоящих друзей.\n\n«Друг в беде не бросит, лишнего не спросит, / Вот что значит настоящий, верный друг.»'
    },
    { 
      id: 'SMALLKIDS', 
      title: 'Мы маленькие дети', 
      artist: 'Из к/ф «Приключения Электроника»', 
      audioUrl: audioUrl('my_malenkie_deti_minus_hr8ms3', '/music/round1/my_malenkie_deti_minus_hr8ms3.mp3'), 
      audioUrlFull: audioUrl('my_malenkie_deti_bidbr8', '/music/round1/my_malenkie_deti_bidbr8.mp3'),
      notes: 'Песня из культового фильма «Приключения Электроника» (1979). Музыка Евгения Крылатова, стихи Юрия Энтина. Исполняет Елена Камбурова.\n\n«Мы маленькие дети, нам хочется гулять, / А нам говорят, что скоро уже ночь.»'
    },
    { 
      id: 'KACHELI', 
      title: 'Крылатые качели', 
      artist: 'Из к/ф «Приключения Электроника»', 
      audioUrl: audioUrl('krylatye_kacheli_minus_exthl0', '/music/round1/krylatye_kacheli_minus_exthl0.mp3'), 
      audioUrlFull: audioUrl('krylatye_kacheli_gmtcac', '/music/round1/krylatye_kacheli_gmtcac.mp3'),
      notes: 'Ещё одна знаменитая песня из того же фильма о мечтах и надеждах. Музыка Евгения Крылатова, стихи Юрия Энтина.\n\n«В юном месяце апреле в старом парке тает снег, / И весёлые качели начинают свой разбег.»'
    }
  ]
};



export const childrenCat: Category = {
  id: 'children',
  name: { en: "Children's songs", ru: 'Детские песни' },
  description: {
    ru: 'Ностальгия в чистом виде. После этих песен захочется найти старые игрушки и поплакать от умиления.',
    en: "Nostalgia in its purest form. After these songs, you'll want to find old toys and cry with tenderness."
  },
  songs: [
    { 
      id: 'MAMONTENOK', 
      title: 'Песенка мамонтёнка', 
      artist: 'Клара Румянова', 
      audioUrl: audioUrl('pesnya-mamontenka_esiasy.mp3', '/music/round1/pesnya-mamontenka_minus.mp3'), 
      audioUrlFull: audioUrl('pesnya-mamontenka_esiasy.mp3', '/music/round1/pesnya-mamontenka.mp3'),
      notes: 'Классическая детская песня о поиске мамы, которую знают все поколения. Трогательная песня о поиске мамы, которая заставляет плакать даже взрослых. История маленького мамонтёнка, который отправился через океан на льдине, чтобы найти самого родного человека. «По синему морю, к зелёной земле / Плыву я на белом своём корабле.» «Мама, мама, я тебя так люблю, / Что просто не найти таких слов!»'
    },
    { 
      id: 'NASTODRUG', 
      title: 'Настоящий друг', 
      artist: 'Из м/ф «Тимка и Димка»', 
      audioUrl: audioUrl('nastoyashiy_drug_minus_hf79gf', '/music/round1/nastoyashiy_drug_minus_hf79gf.mp3'), 
      audioUrlFull: audioUrl('nastoyashiy_drug_rgxpe8', '/music/round1/nastoyashiy_drug_rgxpe8.mp3'),
      notes: 'Детская песня о дружбе из мультфильма «Тимка и Димка» (1976). Музыка Бориса Савельева, стихи Михаила Пляцковского. Учит ценить настоящих друзей.\n\n«Друг в беде не бросит, лишнего не спросит, / Вот что значит настоящий, верный друг.»'
    },
    { 
      id: 'SMALLKIDS', 
      title: 'Мы маленькие дети', 
      artist: 'Из к/ф «Приключения Электроника»', 
      audioUrl: audioUrl('my_malenkie_deti_minus_hr8ms3', '/music/round1/my_malenkie_deti_minus_hr8ms3.mp3'), 
      audioUrlFull: audioUrl('my_malenkie_deti_bidbr8', '/music/round1/my_malenkie_deti_bidbr8.mp3'),
      notes: 'Песня из культового фильма «Приключения Электроника» (1979). Музыка Евгения Крылатова, стихи Юрия Энтина. Исполняет Елена Камбурова.\n\n«Мы маленькие дети, нам хочется гулять, / А нам говорят, что скоро уже ночь.»'
    },
    { 
      id: 'KACHELI', 
      title: 'Крылатые качели', 
      artist: 'Из к/ф «Приключения Электроника»', 
      audioUrl: audioUrl('krylatye_kacheli_minus_exthl0', '/music/round1/krylatye_kacheli_minus_exthl0.mp3'), 
      audioUrlFull: audioUrl('krylatye_kacheli_gmtcac', '/music/round1/krylatye_kacheli_gmtcac.mp3'),
      notes: 'Ещё одна знаменитая песня из того же фильма о мечтах и надеждах. Музыка Евгения Крылатова, стихи Юрия Энтина.\n\n«В юном месяце апреле в старом парке тает снег, / И весёлые качели начинают свой разбег.»'
    }
  ]
};
