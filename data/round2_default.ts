import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 2 AUDIO FILES ====================

// Патриотические песни
const R2_1_C1B1minus = audioUrl('YA_RUSSKIJ_minus_mo2rbx', '/music/round2/YA_RUSSKIJ_minus_mo2rbx.mp3');
const R2_1_C1B1full = audioUrl('YA_RUSSKIJ_ulwgeb', '/music/round2/YA_RUSSKIJ_ulwgeb.mp3');

const R2_1_C1B2minus = audioUrl('lyube_gimn_rossii_minus_cyooz2', '/music/round2/lyube_gimn_rossii_minus_cyooz2.mp3');
const R2_1_C1B2full = audioUrl('lyube_gimn_rossii_zqowqc', '/music/round2/lyube_gimn_rossii_zqowqc.mp3');

const R2_1_C1B3minus = audioUrl('proekt-zhit-minus_kzrsp4', '/music/round2/proekt-zhit-minus_kzrsp4.mp3');
const R2_1_C1B3full = audioUrl('proekt-zhit_k0jt6r', '/music/round2/proekt-zhit_k0jt6r.mp3');

const R2_1_C1B4minus = audioUrl('shaman-shaman-vstanem_minus_tedto9', '/music/round2/shaman-shaman-vstanem_minus_tedto9.mp3');
const R2_1_C1B4full = audioUrl('shaman-shaman-vstanem_hintiz', '/music/round2/shaman-shaman-vstanem_hintiz.mp3');

// Туристические песни
const R2_1_C2B1minus = audioUrl('vecher_brodit_minus_hpm3er', '/music/round2/vecher_brodit_minus_hpm3er.mp3');
const R2_1_C2B1full = audioUrl('vecher_brodit_ez3vni', '/music/round2/vecher_brodit_ez3vni.mp3');

const R2_1_C2B2minus = audioUrl('Milaya_moya_solnyshko_lesnoe_minus_lao6px', '/music/round2/Milaya_moya_solnyshko_lesnoe_minus_lao6px.mp3');
const R2_1_C2B2full = audioUrl('Milaya_moya_solnyshko_lesnoe_rgovy7', '/music/round2/Milaya_moya_solnyshko_lesnoe_rgovy7.mp3');

const R2_1_C2B3minus = audioUrl('', '/music/round2/Yurii_Vizbor_-_Dombaiskii_vals_minus.mp3');
const R2_1_C2B3full = audioUrl('', '/music/round2/Yurii_Vizbor_-_Dombaiskii_vals.mp3');

const R2_1_C2B4minus = audioUrl('Valerij_Kaner_-_A_vse_konchaetsya_minus_ckfder', '/music/round2/Valerij_Kaner_-_A_vse_konchaetsya_minus_ckfder.mp3');
const R2_1_C2B4full = audioUrl('Valerij_Kaner_-_A_vse_konchaetsya_kehaab', '/music/round2/Valerij_Kaner_-_A_vse_konchaetsya_kehaab.mp3');

// Застольные песни
const R2_1_C3B1minus = audioUrl('odnazhdy-morem-ya-plyla_minus_vqop94', '/music/round2/odnazhdy-morem-ya-plyla_minus_vqop94.mp3');
const R2_1_C3B1full = audioUrl('odnazhdy-morem-ya-plyla_b9qk4r', '/music/round2/odnazhdy-morem-ya-plyla_b9qk4r.mp3');

const R2_1_C3B2minus = audioUrl('da_ne_vecher_minus_ql59gq', '/music/round2/da_ne_vecher_minus_ql59gq.mp3');
const R2_1_C3B2full = audioUrl('da_ne_vecher_kzkx9i', '/music/round2/da_ne_vecher_kzkx9i.mp3');

const R2_1_C3B3minus = audioUrl('Napilas_ya_pyana_minus_i9ifis', '/music/round2/Napilas_ya_pyana_minus_i9ifis.mp3');
const R2_1_C3B3full = audioUrl('Napilas_ya_pyana_fuxrry', '/music/round2/Napilas_ya_pyana_fuxrry.mp3');

const R2_1_C3B4minus = audioUrl('minus-vot-kto-to-s-gorochki-spustilsya_minus_l7l2tp', '/music/round2/minus-vot-kto-to-s-gorochki-spustilsya_minus_l7l2tp.mp3');
const R2_1_C3B4full = audioUrl('minus-vot-kto-to-s-gorochki-spustilsya_mid1se', '/music/round2/minus-vot-kto-to-s-gorochki-spustilsya_mid1se.mp3');

// Хиты 80-х
const R2_1_C4B1minus = audioUrl('deltaplan_minus_v4yvhf', '/music/round2/deltaplan_minus_v4yvhf.mp3');
const R2_1_C4B1full = audioUrl('deltaplan_njyjmo', '/music/round2/deltaplan_njyjmo.mp3');

const R2_1_C4B2minus = audioUrl('plot_minus_ap5jyk', '/music/round2/plot_minus_ap5jyk.mp3');
const R2_1_C4B2full = audioUrl('plot_rwqxbq', '/music/round2/plot_rwqxbq.mp3');

const R2_1_C4B3minus = audioUrl('MuzykaNasSviazala-minus_upocpy', '/music/round2/MuzykaNasSviazala-minus_upocpy.mp3');
const R2_1_C4B3full = audioUrl('MuzykaNasSviazala_c04h1c', '/music/round2/MuzykaNasSviazala_c04h1c.mp3');

const R2_1_C4B4minus = audioUrl('Belye_rozy_minus_uggr9o', '/music/round2/Belye_rozy_minus_uggr9o.mp3');
const R2_1_C4B4full = audioUrl('Belye_rozy_wgklth', '/music/round2/Belye_rozy_wgklth.mp3');

export const defaultSet: RoundSet = {
  id: 'default',
  name: {
    en: 'Round2-V1',
    ru: 'Раунд 2 - Набор 1'
  },
  description: {
    en: 'Patriotic songs, tourist songs, table songs and 80s hits',
    ru: 'Патриотические песни, туристические, застольные и хиты 80-х'
  },
  author: 'DT',
  version: '1.0',
  data: [
    {
      id: 'patriot',
      name: { en: 'Patriotic', ru: 'Патриотическая' },
      songs: [
        { 
          id: 'p2_1', 
          title: 'Я русский', 
          artist: 'SHAMAN (Ярослав Дронов)', 
          audioUrl: R2_1_C1B1minus, 
          audioUrlFull: R2_1_C1B1full,
          notes: 'Современная патриотическая песня, выпущенная в 2022 году, мгновенно ставшая хитом. Мощный вокал и энергичное звучание отражают национальную гордость и силу духа. Клип набрал миллионы просмотров за первые дни.\n\n«Я русский, я русский, / Я иду до конца, / Я русский, я русский, / С Богом в сердце, с правдой в глазах!»'
        },
        { 
          id: 'p2_2', 
          title: 'Гимн России', 
          artist: 'Любэ', 
          audioUrl: R2_1_C1B2minus, 
          audioUrlFull: R2_1_C1B2full,
          notes: 'Патриотическая песня группы «Любэ» в оригинальной аранжировке, посвящённая величию России. Характерное звучание и мощные аранжировки группы создают торжественное настроение.\n\n«Россия, Россия — в этом слове огонь и сила, / Россия, Россия — в этом слове святая Русь!»'
        },
        { 
          id: 'p2_3', 
          title: 'Жить', 
          artist: 'Кипелов (участник проекта)', 
          audioUrl: R2_1_C1B3minus, 
          audioUrlFull: R2_1_C1B3full,
          notes: 'Патриотический рок-гимн с мощным вокалом Валерия Кипелова, призывающий к единению и вере в лучшее. Песня стала символом сплочения и поддержки.\n\n«Жить — это жить для тебя, / Жить — это жить для меня, / Жить — это жить для России, / Для нашей страны!»'
        },
        { 
          id: 'p2_4', 
          title: 'Встанем', 
          artist: 'SHAMAN (Ярослав Дронов)', 
          audioUrl: R2_1_C1B4minus, 
          audioUrlFull: R2_1_C1B4full,
          notes: 'Патриотическая песня Шамана с призывом к единению и памяти предков. Выпущена в 2022 году и стала одним из главных патриотических хитов.\n\n«Встанем, встанем, / И никто не сломит наш народ, / Встанем, встанем, / И земля родная оживёт!»'
        },
      ]
    },
    {
      id: 'tourists',
      name: { en: 'Tourist Songs', ru: 'Туристическая' },
      songs: [
        { 
          id: 'p2_5', 
          title: 'Вечер бродит', 
          artist: 'Юрий Визбор', 
          audioUrl: R2_1_C2B1minus, 
          audioUrlFull: R2_1_C2B1full,
          notes: 'Классическая туристическая песня Визбора о вечернем костре и походной романтике. Написана в 1970-х годах и стала гимном всех туристов и путешественников.\n\n«Вечер бродит по лесным дорожкам, / Ты возьми меня с собой, дорожка, / Я хочу бродить и петь с тобой / Над вечерней тишиной.»'
        },
        { 
          id: 'p2_6', 
          title: 'Милая моя, солнышко лесное', 
          artist: 'Юрий Визбор', 
          audioUrl: R2_1_C2B2minus, 
          audioUrlFull: R2_1_C2B2full,
          notes: 'Нежная лирическая песня Визбора о природе и любви, ставшая гимном туристов. Написана в 1973 году и до сих пор звучит у костров по всей стране.\n\n«Милая моя, солнышко лесное, / Где, в каких краях встретишься со мною? / Ах, какая ты, ах, какая ты, / Ах, какая ты, милая моя.»'
        },
        { 
          id: 'p2_7', 
          title: 'Домбайский вальс', 
          artist: 'Юрий Визбор', 
          audioUrl: R2_1_C2B3minus, 
          audioUrlFull: R2_1_C2B3full,
          notes: 'Одна из самых известных песен Визбора, посвящённая горнолыжному курорту Домбай. Написана в 1961 году и стала неофициальным гимном всех покорителей гор.\n\n«Домбай, Домбай, Домбай, / Сияют снега твои, / И лыжников быстрый бег / Сливается с бегом рек.»'
        },
        { 
          id: 'p2_8', 
          title: 'А всё кончается', 
          artist: 'Валерий Канер', 
          audioUrl: R2_1_C2B4minus, 
          audioUrlFull: R2_1_C2B4full,
          notes: 'Философская песня о путешествиях и жизни в пути в исполнении барда Валерия Канера. Размышления о быстротечности времени и ценности каждого момента.\n\n«А всё кончается, кончается, / И поезд вдаль умчится, / И только песня остаётся, / И в сердце огонёк теплится.»'
        },
      ]
    },
    {
      id: 'table',
      name: { en: 'Table Songs', ru: 'Застольная' },
      songs: [
        { 
          id: 'p2_9', 
          title: 'Однажды морем я плыла', 
          artist: 'Надежда Кадышева / ансамбль «Золотое кольцо»', 
          audioUrl: R2_1_C3B1minus, 
          audioUrlFull: R2_1_C3B1full,
          notes: 'Русская народная песня в современной обработке, популярная на застольях. Рассказ о девушке, плывущей по морю и вспоминающей о любимом.\n\n«Однажды морем я плыла, / Вдали увидела скалу. / На той скале стоял мой милый, / Махал мне белою рукой.»'
        },
        { 
          id: 'p2_10', 
          title: 'Да не вечер', 
          artist: 'Русская народная песня', 
          audioUrl: R2_1_C3B2minus, 
          audioUrlFull: R2_1_C3B2full,
          notes: 'Классическая русская народная песня, часто исполняемая на застольях и праздниках. Имеет глубокие исторические корни и множество вариантов исполнения.\n\n«Да не вечер, да не вечер, / Мне малым-мало спалось, / Мне малым-мало спалось, / Во сне привиделось.»'
        },
        { 
          id: 'p2_11', 
          title: 'Напилась я пьяна', 
          artist: 'Русская народная песня', 
          audioUrl: R2_1_C3B3minus, 
          audioUrlFull: R2_1_C3B3full,
          notes: 'Шуточная народная песня, популярная в застольных исполнениях. Весёлый рассказ о девушке, которая выпила лишнего и теперь не может дойти до дома.\n\n«Напилась я пьяна, не дойду до дома, / Напилась я пьяна, не дойду до дома. / Ой, калина, ой, малина, / Не дойду до дома.»'
        },
        { 
          id: 'p2_12', 
          title: 'Вот кто-то с горочки спустился', 
          artist: 'Русская народная песня', 
          audioUrl: R2_1_C3B4minus, 
          audioUrlFull: R2_1_C3B4full,
          notes: 'Лирическая русская народная песня с красивой мелодией. Рассказ о девушке, которая ждёт своего любимого, спускающегося с горы.\n\n«Вот кто-то с горочки спустился, / Наверно, милый мой идёт. / На нём защитна гимнастёрка, / Она с ума меня сведёт.»'
        },
      ]
    },
    {
      id: 'hits80',
      name: { en: 'Hits of the 80s', ru: 'Хиты 80-х' },
      songs: [
        { 
          id: 'p2_13', 
          title: 'Дельтаплан', 
          artist: 'Алла Пугачёва', 
          audioUrl: R2_1_C4B1minus, 
          audioUrlFull: R2_1_C4B1full,
          notes: 'Популярный хит Примадонны 80-х годов с запоминающейся мелодией. Песня о полёте, свободе и стремлении к мечте.\n\n«Дельтаплан, дельтаплан, / Подари мне полёт, / Дельтаплан, дельтаплан, / Пусть душа моя поёт.»'
        },
        { 
          id: 'p2_14', 
          title: 'Плот', 
          artist: 'Юрий Лоза', 
          audioUrl: R2_1_C4B2minus, 
          audioUrlFull: R2_1_C4B2full,
          notes: 'Легендарная песня Юрия Лозы, написанная в 1982 году, ставшая визитной карточкой исполнителя. Метафора жизненного пути и поиска своего места в мире.\n\n«Плот плывёт по воде, / А за ним ни души, / Только чайки кричат, / И косяк у воблы спешит.»'
        },
        { 
          id: 'p2_15', 
          title: 'Музыка нас связала', 
          artist: 'Группа «Мираж»', 
          audioUrl: R2_1_C4B3minus, 
          audioUrlFull: R2_1_C4B3full,
          notes: 'Культовая песня советской диско-группы «Мираж», символ эпохи 80-х. Выпущена в 1988 году и до сих пор звучит на всех дискотеках.\n\n«Музыка нас связала, / Тайною нашей стала, / Музыка нас связала, / Всё растворила, всё. / Музыка нас связала, / Тайною нашей стала, / И от всех скрывала, / И уносила ввысь.»'
        },
        { 
          id: 'p2_16', 
          title: 'Белые розы', 
          artist: 'Группа «Ласковый май»', 
          audioUrl: R2_1_C4B4minus, 
          audioUrlFull: R2_1_C4B4full,
          notes: 'Самый известный хит группы «Ласковый май», символ молодёжной культуры конца 80-х. Песня о холодном мире и нежности, написанная Сергеем Кузнецовым.\n\n«Белые розы, белые розы — / Беззащитны шипы. / Что с ними сделал снег и морозы, / Лёд витрин голубых. / Белые розы, белые розы — / Неприступны для всех. / Что с ними сделал снег и морозы, / Только красивей их грех.»'
        },
      ]
    }
  ]
};