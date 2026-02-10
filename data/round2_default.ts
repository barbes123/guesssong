import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 2 AUDIO FILES ====================

const R2_1_C1B1minus = audioUrl('YA_RUSSKIJ_minus_mo2rbx', '/music/round3/YA_RUSSKIJ_minus.mp3');
const R2_1_C1B1full = audioUrl('YA_RUSSKIJ_ulwgeb', '/music/round3/YA_RUSSKIJ.mp3');

const R2_1_C1B2minus = audioUrl('lyube_gimn_rossii_minus_cyooz2', '/music/round3/lyube_gimn_rossii_minus.mp3');
const R2_1_C1B2full = audioUrl('lyube_gimn_rossii_zqowqc', '/music/round3/lyube_gimn_rossii.mp3');

const R2_1_C1B3minus = audioUrl('proekt-zhit-minus_kzrsp4', '/music/round3/proekt-zhit-minus.mp3');
const R2_1_C1B3full = audioUrl('proekt-zhit_k0jt6r', '/music/round3/proekt-zhit.mp3');

const R2_1_C1B4minus = audioUrl('shaman-shaman-vstanem_minus_tedto9', '/music/round3/shaman-shaman-vstanem_minus.mp3');
const R2_1_C1B4full = audioUrl('shaman-shaman-vstanem_hintiz', '/music/round3/shaman-shaman-vstanem.mp3');

const R2_1_C2B1minus = audioUrl('vecher_brodit_minus_hpm3er', '/music/round3/vecher_brodit_minus.mp3');
const R2_1_C2B1full = audioUrl('vecher_brodit_ez3vni', '/music/round3/vecher_brodit.mp3');

const R2_1_C2B2minus = audioUrl('Milaya_moya_solnyshko_lesnoe_minus_lao6px', '/music/round3/Milaya_moya_solnyshko_lesnoe_minus.mp3');
const R2_1_C2B2full = audioUrl('Milaya_moya_solnyshko_lesnoe_rgovy7', '/music/round3/Milaya_moya_solnyshko_lesnoe.mp3');

const R2_1_C2B3minus = audioUrl('YUrij_Vizbor-Dombajskij_vals_minus_mugp6o', '/music/round3/YUrij_Vizbor-Dombajskij_vals_minus.mp3');
const R2_1_C2B3full = audioUrl('YUrij_Vizbor-Dombajskij_vals_nkbqil', '/music/round3/YUrij_Vizbor-Dombajskij_vals.mp3');

const R2_1_C2B4minus = audioUrl('Valerij_Kaner_-_A_vse_konchaetsya_minus_ckfder', '/music/round3/Valerij_Kaner_-_A_vse_konchaetsya_minus.mp3');
const R2_1_C2B4full = audioUrl('Valerij_Kaner_-_A_vse_konchaetsya_kehaab', '/music/round3/Valerij_Kaner_-_A_vse_konchaetsya.mp3');

const R2_1_C3B1minus = audioUrl('odnazhdy-morem-ya-plyla_minus_vqop94', '/music/round3/odnazhdy-morem-ya-plyla_minus.mp3');
const R2_1_C3B1full = audioUrl('odnazhdy-morem-ya-plyla_b9qk4r', '/music/round3/odnazhdy-morem-ya-plyla.mp3');

const R2_1_C3B2minus = audioUrl('da_ne_vecher_minus_ql59gq', '/music/round3/da_ne_vecher_minus.mp3');
const R2_1_C3B2full = audioUrl('da_ne_vecher_kzkx9i', '/music/round3/da_ne_vecher.mp3');

const R2_1_C3B3minus = audioUrl('Napilas_ya_pyana_minus_i9ifis', '/music/round3/Napilas_ya_pyana_minus.mp3');
const R2_1_C3B3full = audioUrl('Napilas_ya_pyana_fuxrry', '/music/round3/Napilas_ya_pyana.mp3');

const R2_1_C3B4minus = audioUrl('minus-vot-kto-to-s-gorochki-spustilsya_minus_l7l2tp', '/music/round3/minus-vot-kto-to-s-gorochki-spustilsya_minus.mp3');
const R2_1_C3B4full = audioUrl('minus-vot-kto-to-s-gorochki-spustilsya_mid1se', '/music/round3/minus-vot-kto-to-s-gorochki-spustilsya.mp3');

const R2_1_C4B1minus = audioUrl('deltaplan_minus_v4yvhf', '/music/round3/deltaplan_minus.mp3');
const R2_1_C4B1full = audioUrl('deltaplan_njyjmo', '/music/round3/deltaplan.mp3');

const R2_1_C4B2minus = audioUrl('plot_minus_ap5jyk', '/music/round3/plot_minus.mp3');
const R2_1_C4B2full = audioUrl('plot_rwqxbq', '/music/round3/plot.mp3');	

const R2_1_C4B3minus = audioUrl('MuzykaNasSviazala-minus_upocpy', '/music/round3/MuzykaNasSviazala-minus.mp3');
const R2_1_C4B3full = audioUrl('MuzykaNasSviazala_c04h1c', '/music/round3/MuzykaNasSviazala.mp3');

const R2_1_C4B4minus = audioUrl('Belye_rozy_minus_uggr9o', '/music/round3/Belye_rozy_minus.mp3');
const R2_1_C4B4full = audioUrl('Belye_rozy_wgklth', '/music/round3/Belye_rozy.mp3');

export const defaultSet: RoundSet = {
  id: 'round2_v1',
  name: {
    en: 'Round 2: Set 1',
    ru: 'Раунд 2: Набор 1'
  },
  description: {
    en: 'Themed categories: Patriotic, Tourist, Table Songs, 80s Hits',
    ru: 'Тематические категории: Патриотичная, Туристическая, Застольная, Хиты 80-х'
  },
  author: 'DT',
  version: '1.0',
  data: [
    {
      id: 'patriot',
      name: { en: 'Patriotic Songs', ru: 'Патриотичные песни' },
      songs: [
        { 
          id: 'p2_1', 
          title: 'Я русский', 
          artist: 'Шаман', 
          audioUrl: R2_1_C1B1minus, 
          audioUrlFull: R2_1_C1B1full,
          hint: {
            en: 'Modern patriotic song with powerful vocals and energetic sound.',
            ru: 'Современная патриотическая песня с мощным вокалом и энергичным звучанием.'
          }
        },
        { 
          id: 'p2_2', 
          title: 'Гимн России', 
          artist: 'Любэ', 
          audioUrl: R2_1_C1B2minus, 
          audioUrlFull: R2_1_C1B2full,
          hint: {
            en: 'Patriotic song dedicated to Russia with characteristic sound of the group.',
            ru: 'Патриотическая песня, посвящённая России, с характерным звучанием группы.'
          }
        },
        { 
          id: 'p2_3', 
          title: 'Проект "Жить"', 
          artist: 'Кипелов', 
          audioUrl: R2_1_C1B3minus, 
          audioUrlFull: R2_1_C1B3full,
          hint: {
            en: 'Patriotic rock anthem with powerful vocals of Valery Kipelov.',
            ru: 'Патриотический рок-гимн с мощным вокалом Валерия Кипелова.'
          }
        },
        { 
          id: 'p2_4', 
          title: 'Встанем', 
          artist: 'Шаман', 
          audioUrl: R2_1_C1B4minus, 
          audioUrlFull: R2_1_C1B4full,
          hint: {
            en: 'Patriotic song calling for unity and spiritual strength.',
            ru: 'Патриотическая песня с призывом к единению и силе духа.'
          }
        },
      ]
    },
    {
      id: 'tourists',
      name: { en: 'Tourist Songs', ru: 'Туристические песни' },
      songs: [
        { 
          id: 'p2_5', 
          title: 'Вечер бродит', 
          artist: 'Юрий Визбор', 
          audioUrl: R2_1_C2B1minus, 
          audioUrlFull: R2_1_C2B1full,
          hint: {
            en: 'Classic tourist song about evening campfire and hiking romance.',
            ru: 'Классическая туристическая песня о вечернем костре и походной романтике.'
          }
        },
        { 
          id: 'p2_6', 
          title: 'Милая моя, солнышко лесное', 
          artist: 'Юрий Визбор', 
          audioUrl: R2_1_C2B2minus, 
          audioUrlFull: R2_1_C2B2full,
          hint: {
            en: 'Tender lyrical song about nature and love, a tourist anthem.',
            ru: 'Нежная лирическая песня о природе и любви, ставшая гимном туристов.'
          }
        },
        { 
          id: 'p2_7', 
          title: 'Домбайский вальс', 
          artist: 'Юрий Визбор', 
          audioUrl: R2_1_C2B3minus, 
          audioUrlFull: R2_1_C2B3full,
          hint: {
            en: 'One of the most famous songs dedicated to the Dombay ski resort.',
            ru: 'Одна из самых известных песен, посвящённая горнолыжному курорту Домбай.'
          }
        },
        { 
          id: 'p2_8', 
          title: 'А всё кончается', 
          artist: 'Валерий Канер', 
          audioUrl: R2_1_C2B4minus, 
          audioUrlFull: R2_1_C2B4full,
          hint: {
            en: 'Philosophical song about travels and life on the road.',
            ru: 'Философская песня о путешествиях и жизни в пути.'
          }
        },
      ]
    },
    {
      id: 'table',
      name: { en: 'Table Songs', ru: 'Застольные песни' },
      songs: [
        { 
          id: 'p2_9', 
          title: 'Однажды морем я плыла', 
          artist: 'Надежда Кадышева', 
          audioUrl: R2_1_C3B1minus, 
          audioUrlFull: R2_1_C3B1full,
          hint: {
            en: 'Russian folk song in modern arrangement, popular at feasts.',
            ru: 'Русская народная песня в современной обработке, популярная на застольях.'
          }
        },
        { 
          id: 'p2_10', 
          title: 'Да не вечер', 
          artist: 'Русская народная песня', 
          audioUrl: R2_1_C3B2minus, 
          audioUrlFull: R2_1_C3B2full,
          hint: {
            en: 'Classic Russian folk song often performed at feasts and holidays.',
            ru: 'Классическая русская народная песня, часто исполняемая на застольях и праздниках.'
          }
        },
        { 
          id: 'p2_11', 
          title: 'Напилась я пьяна', 
          artist: 'Русская народная песня', 
          audioUrl: R2_1_C3B3minus, 
          audioUrlFull: R2_1_C3B3full,
          hint: {
            en: 'Humorous folk song popular in feast performances.',
            ru: 'Шуточная народная песня, популярная в застольных исполнениях.'
          }
        },
        { 
          id: 'p2_12', 
          title: 'Вот кто-то с горочки спустился', 
          artist: 'Русская народная песня', 
          audioUrl: R2_1_C3B4minus, 
          audioUrlFull: R2_1_C3B4full,
          hint: {
            en: 'Lyrical Russian folk song with beautiful melody.',
            ru: 'Лирическая русская народная песня с красивой мелодией.'
          }
        },
      ]
    },
    {
      id: 'hits80',
      name: { en: '80s Hits', ru: 'Хиты 80-х' },
      songs: [
        { 
          id: 'p2_13', 
          title: 'Дельтаплан', 
          artist: 'Алла Пугачёва', 
          audioUrl: R2_1_C4B1minus, 
          audioUrlFull: R2_1_C4B1full,
          hint: {
            en: 'Popular hit of the 80s by the Primadonna with memorable melody.',
            ru: 'Популярный хит Примадонны 80-х годов с запоминающейся мелодией.'
          }
        },
        { 
          id: 'p2_14', 
          title: 'Плот', 
          artist: 'Александр Малинин', 
          audioUrl: R2_1_C4B2minus, 
          audioUrlFull: R2_1_C4B2full,
          hint: {
            en: 'Lyrical ballad by Alexander Malinin, one of his main hits of the 80s.',
            ru: 'Лирическая баллада Александра Малинина, один из его главных хитов 80-х.'
          }
        },
        { 
          id: 'p2_15', 
          title: 'Музыка нас связала', 
          artist: 'Мираж', 
          audioUrl: R2_1_C4B3minus, 
          audioUrlFull: R2_1_C4B3full,
          hint: {
            en: 'Cult song of Soviet disco group "Mirage", symbol of the 80s era.',
            ru: 'Культовая песня советской диско-группы «Мираж», символ эпохи 80-х.'
          }
        },
        { 
          id: 'p2_16', 
          title: 'Белые розы', 
          artist: 'Ласковый май', 
          audioUrl: R2_1_C4B4minus, 
          audioUrlFull: R2_1_C4B4full,
          hint: {
            en: 'The most famous hit of group "Laskovy Mai", symbol of youth culture of late 80s.',
            ru: 'Самый известный хит группы «Ласковый май», символ молодёжной культуры конца 80-х.'
          }
        },
      ]
    }
  ]
};
