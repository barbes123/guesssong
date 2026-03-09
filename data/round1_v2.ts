import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 1-2 AUDIO FILES ====================

// Детские песни
const R1_2_C1B1minus = audioUrl('ulybka_minus_cut_jsvcut', '/music/round2/ulybka_minus_cut_jsvcut.mp3');
const R1_2_C1B1full = audioUrl('ulybka_wu1dge', '/music/round2/ulybka_wu1dge.mp3');

const R1_2_C1B2minus = audioUrl('nastoyashiy_drug_minus_hf79gf', '/music/round2/nastoyashiy_drug_minus_hf79gf.mp3');
const R1_2_C1B2full = audioUrl('nastoyashiy_drug_rgxpe8', '/music/round2/nastoyashiy_drug_rgxpe8.mp3');

const R1_2_C1B3minus = audioUrl('my_malenkie_deti_minus_hr8ms3', '/music/round2/my_malenkie_deti_minus_hr8ms3.mp3');
const R1_2_C1B3full = audioUrl('my_malenkie_deti_bidbr8', '/music/round2/my_malenkie_deti_bidbr8.mp3');

const R1_2_C1B4minus = audioUrl('krylatye_kacheli_minus_exthl0', '/music/round2/krylatye_kacheli_minus_exthl0.mp3');
const R1_2_C1B4full = audioUrl('krylatye_kacheli_gmtcac', '/music/round2/krylatye_kacheli_gmtcac.mp3');


// Песни о России
const R1_2_C2B1minus = audioUrl('berezy-minus_sff6l8', '/music/round2/berezy-minus_sff6l8.mp3');
const R1_2_C2B1full = audioUrl('berezy_bvoiea', '/music/round2/berezy_bvoiea.mp3');

const R1_2_C2B2minus = audioUrl('kak-upoitel-ny-v-rossii-vechera-minus_qo6pfx', '/music/round2/kak-upoitel-ny-v-rossii-vechera-minus_qo6pfx.mp3');
const R1_2_C2B2full = audioUrl('kak-upoitel-ny-v-rossii-vechera_por3ci', '/music/round2/kak-upoitel-ny-v-rossii-vechera_por3ci.mp3');

const R1_2_C2B3minus = audioUrl('s_chego_nachinaetsya_Rodina_minus_arxtzc', '/music/round2/s_chego_nachinaetsya_Rodina_minus_arxtzc.mp3');
const R1_2_C2B3full = audioUrl('s_chego_nachinaetsya_Rodina_c4ghwp', '/music/round2/s_chego_nachinaetsya_Rodina_c4ghwp.mp3');

const R1_2_C2B4minus = audioUrl('russkoe-pole-minus_ruymua', '/music/round2/russkoe-pole-minus_ruymua.mp3');
const R1_2_C2B4full = audioUrl('russkoe-pole_vtnc6o', '/music/round2/russkoe-pole_vtnc6o.mp3');


// Песни из советских фильмов
const R1_2_C3B1minus = audioUrl('est-tolko-mig-minus_kk13xz', '/music/round2/est-tolko-mig-minus_kk13xz.mp3');
const R1_2_C3B1full = audioUrl('est-tolko-mig_fmgvto', '/music/round2/est-tolko-mig_fmgvto.mp3');

const R1_2_C3B2minus = audioUrl('pozvoni-mne-minus_yooxil', '/music/round2/pozvoni-mne-minus_yooxil.mp3');
const R1_2_C3B2full = audioUrl('pozvoni-mne_f628en', '/music/round2/pozvoni-mne_f628en.mp3');

const R1_2_C3B3minus = audioUrl('tri-tankista-minus_ekrfdo', '/music/round2/tri-tankista-minus_ekrfdo.mp3');
const R1_2_C3B3full = audioUrl('tri-tankista_cb59ui', '/music/round2/tri-tankista_cb59ui.mp3');

const R1_2_C3B4minus = audioUrl('smuglyanka-minus_ncekac', '/music/round2/smuglyanka-minus_ncekac.mp3');
const R1_2_C3B4full = audioUrl('smuglyanka_mtiuoy', '/music/round2/smuglyanka_mtiuoy.mp3');


// Хиты 60-х и 70-х годов
const R1_2_C4B1minus = audioUrl('Landyshi-GelenaVelikanova-minus_xbaf0v', '/music/round2/Landyshi-GelenaVelikanova-minus_xbaf0v.mp3');
const R1_2_C4B1full = audioUrl('Landyshi-GelenaVelikanova_k1vxod', '/music/round2/Landyshi-GelenaVelikanova_k1vxod.mp3');

const R1_2_C4B2minus = audioUrl('snegIdiet-minus_qgkijc', '/music/round2/snegIdiet-minus_qgkijc.mp3');
const R1_2_C4B2full = audioUrl('snegIdiet_am3d45', '/music/round2/snegIdiet_am3d45.mp3');

const R1_2_C4B3minus = audioUrl('NaDalneiyStanciiSoiydu-munus_rokslz', '/music/round2/NaDalneiyStanciiSoiydu-munus_rokslz.mp3');
const R1_2_C4B3full = audioUrl('NaDalneiyStanciiSoiydu_sxgbnr', '/music/round2/NaDalneiyStanciiSoiydu_sxgbnr.mp3');

const R1_2_C4B4minus = audioUrl('nadezhda_minus_h24xio', '/music/round2/nadezhda_minus_h24xio.mp3');
const R1_2_C4B4full = audioUrl('nadezhda_ujmrfc', '/music/round2/nadezhda_ujmrfc.mp3');

export const round1v2Set: RoundSet = {
  id: 'round1_v2',
  name: {
    en: 'Round1-V2',
    ru: 'Раунд 1 - Набор 2'
  },
  description: {
    en: 'Children\'s songs, songs about Russia, Soviet film songs and hits of the 60s-70s',
    ru: 'Детские песни, песни о России, песни из советских фильмов и хиты 60-70-х годов'
  },
  author: 'DT',
  version: '1.0',
  data: [
    {
      id: 'children',
      name: { en: 'Children\'s songs', ru: 'Детские песни' },
      songs: [
        { 
          id: 'p1_2_1', 
          title: 'Улыбка', 
          artist: 'Из м/ф «Крошка Енот»', 
          audioUrl: R1_2_C1B1minus, 
          audioUrlFull: R1_2_C1B1full,
          notes: 'Знаменитая детская песня из мультфильма «Крошка Енот» (1974). Музыка Владимира Шаинского, стихи Михаила Пляцковского. Стала гимном дружбы и хорошего настроения.\n\n«От улыбки хмурый день светлей, / От улыбки в небе радуга проснётся. / Поделись улыбкою своей, / И она к тебе не раз ещё вернётся.»'
        },
        { 
          id: 'p1_2_2', 
          title: 'Настоящий друг', 
          artist: 'Из м/ф «Тимка и Димка»', 
          audioUrl: R1_2_C1B2minus, 
          audioUrlFull: R1_2_C1B2full,
          notes: 'Детская песня о дружбе из мультфильма «Тимка и Димка» (1976). Музыка Бориса Савельева, стихи Михаила Пляцковского. Учит ценить настоящих друзей.\n\n«Друг в беде не бросит, лишнего не спросит, / Вот что значит настоящий, верный друг.»'
        },
        { 
          id: 'p1_2_3', 
          title: 'Мы маленькие дети', 
          artist: 'Из к/ф «Приключения Электроника»', 
          audioUrl: R1_2_C1B3minus, 
          audioUrlFull: R1_2_C1B3full,
          notes: 'Песня из культового фильма «Приключения Электроника» (1979). Музыка Евгения Крылатова, стихи Юрия Энтина. Исполняет Елена Камбурова.\n\n«Мы маленькие дети, нам хочется гулять, / А нам говорят, что скоро уже ночь.»'
        },
        { 
          id: 'p1_2_4', 
          title: 'Крылатые качели', 
          artist: 'Из к/ф «Приключения Электроника»', 
          audioUrl: R1_2_C1B4minus, 
          audioUrlFull: R1_2_C1B4full,
          notes: 'Ещё одна знаменитая песня из того же фильма о мечтах и надеждах. Музыка Евгения Крылатова, стихи Юрия Энтина.\n\n«В юном месяце апреле в старом парке тает снег, / И весёлые качели начинают свой разбег.»'
        },
      ]
    },
    {
      id: 'russia',
      name: { en: 'Songs about Russia', ru: 'Россия' },
      songs: [
        { 
          id: 'p1_2_5', 
          title: 'Берёзы', 
          artist: 'Любэ / Сергей Безруков', 
          audioUrl: R1_2_C2B1minus, 
          audioUrlFull: R1_2_C2B1full,
          notes: 'Лирическая песня о русской природе, берёзах как символе России. Музыка Игоря Матвиенко, стихи Михаила Андреева.\n\n«Отчего так в России берёзы шумят? / Отчего белоствольные всё понимают?»'
        },
        { 
          id: 'p1_2_6', 
          title: 'Как упоительны в России вечера', 
          artist: 'Белый орёл', 
          audioUrl: R1_2_C2B2minus, 
          audioUrlFull: R1_2_C2B2full,
          notes: 'Романс о красоте русских вечеров, ставший суперхитом в исполнении группы «Белый орёл» (1998). Музыка и стихи Александра Добронравова.\n\n«Как упоительны в России вечера, / Любовь, шампанское, закаты, переулки.»'
        },
        { 
          id: 'p1_2_7', 
          title: 'С чего начинается Родина', 
          artist: 'Марк Бернес', 
          audioUrl: R1_2_C2B3minus, 
          audioUrlFull: R1_2_C2B3full,
          notes: 'Патриотическая песня о том, с чего для каждого человека начинается Родина. Музыка Вениамина Баснера, стихи Михаила Матусовского.\n\n«С чего начинается Родина? / С картинки в твоём букваре.»'
        },
        { 
          id: 'p1_2_8', 
          title: 'Русское поле', 
          artist: 'Из к/ф «Новые приключения неуловимых»', 
          audioUrl: R1_2_C2B4minus, 
          audioUrlFull: R1_2_C2B4full,
          notes: 'Песня о просторах русской земли из кинофильма «Новые приключения неуловимых» (1968). Музыка Яна Френкеля, стихи Инны Гофф.\n\n«Поле, русское поле, / Светит луна или падает снег, / Я с тобой, русское поле.»'
        },
      ]
    },
    {
      id: 'soviet_films',
      name: { en: 'Soviet films', ru: 'Советские фильмы' },
      songs: [
        { 
          id: 'p1_2_9', 
          title: 'Есть только миг', 
          artist: 'Из к/ф «Земля Санникова»', 
          audioUrl: R1_2_C3B1minus, 
          audioUrlFull: R1_2_C3B1full,
          notes: 'Философская песня из приключенческого фильма «Земля Санникова» (1973). Музыка Александра Зацепина, стихи Леонида Дербенёва. Исполняет Олег Анофриев.\n\n«Есть только миг между прошлым и будущим, / Именно он называется жизнь.»'
        },
        { 
          id: 'p1_2_10', 
          title: 'Позвони мне, позвони', 
          artist: 'Из к/ф «Карнавал»', 
          audioUrl: R1_2_C3B2minus, 
          audioUrlFull: R1_2_C3B2full,
          notes: 'Популярная песня из фильма «Карнавал» (1981). Музыка Максима Дунаевского, стихи Роберта Рождественского. Исполняет Ирина Муравьёва.\n\n«Позвони мне, позвони, / Позвони мне, ради Бога!»'
        },
        { 
          id: 'p1_2_11', 
          title: 'Три танкиста', 
          artist: 'Из к/ф «Трактористы»', 
          audioUrl: R1_2_C3B3minus, 
          audioUrlFull: R1_2_C3B3full,
          notes: 'Легендарная военная песня из фильма «Трактористы» (1939). Музыка братьев Покрасс, стихи Бориса Ласкина.\n\n«На границе тучи ходят хмуро, / Край суровый тишиной объят.»'
        },
        { 
          id: 'p1_2_12', 
          title: 'Смуглянка', 
          artist: 'Из к/ф «В бой идут одни старики»', 
          audioUrl: R1_2_C3B4minus, 
          audioUrlFull: R1_2_C3B4full,
          notes: 'Знаменитая военная песня из фильма Леонида Быкова (1973). Музыка Анатолия Новикова, стихи Якова Шведова. Написана в 1940 году.\n\n«Как-то летом на рассвете заглянул в соседний сад, / Там смуглянка-молдаванка собирала виноград.»'
        },
      ]
    },
    {
      id: 'hits60_70',
      name: { en: 'Hits of the 60s and 70s', ru: 'Хиты 60-х и 70-х годов' },
      songs: [
        { 
          id: 'p1_2_13', 
          title: 'Ландыши', 
          artist: 'Гелена Великанова', 
          audioUrl: R1_2_C4B1minus, 
          audioUrlFull: R1_2_C4B1full,
          notes: 'Лёгкая, весенняя песня 1950-х годов, ставшая хитом в исполнении Гелены Великановой. Музыка Оскара Фельцмана, стихи Ольги Фадеевой.\n\n«Ты сегодня мне принёс не тюльпаны, не мимозы, / А простые ландыши на примятой травке.»'
        },
        { 
          id: 'p1_2_14', 
          title: 'А снег идёт', 
          artist: 'Майя Кристалинская', 
          audioUrl: R1_2_C4B2minus, 
          audioUrlFull: R1_2_C4B2full,
          notes: 'Лирическая песня Майи Кристалинской о снеге как метафоре времени и воспоминаний. Музыка Андрея Эшпая, стихи Евгения Евтушенко.\n\n«А снег идёт, а снег идёт, / И всё вокруг чего-то ждёт.»'
        },
        { 
          id: 'p1_2_15', 
          title: 'На дальней станции сойду', 
          artist: 'Валерий Ободзинский', 
          audioUrl: R1_2_C4B3minus, 
          audioUrlFull: R1_2_C4B3full,
          notes: 'Романтическая песня о расставании и дальних станциях в исполнении Валерия Ободзинского.\n\n«На дальней станции сойду, / Трава по пояс.»'
        },
        { 
          id: 'p1_2_16', 
          title: 'Надежда', 
          artist: 'Анна Герман', 
          audioUrl: R1_2_C4B4minus, 
          audioUrlFull: R1_2_C4B4full,
          notes: 'Одна из самых известных песен Анны Герман, ставшая символом надежды для целого поколения. Музыка Александры Пахмутовой, стихи Николая Добронравова.\n\n«Надежда — мой компас земной, / А удача — награда за смелость.»'
        },
      ]
    }
  ]
};