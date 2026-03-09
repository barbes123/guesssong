import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 1-3 AUDIO FILES ====================

// Category 1: Поп-хиты 2000-х (Золотая эра)
const R1_3_C1B1minus = audioUrl('gosti_buduschego_begi_ot_menya_minus_xxx1', '/music/round1/Gosti_Iz_Buduschego_Begi_ot_menya_minus.mp3');
const R1_3_C1B1full = audioUrl('gosti_buduschego_begi_ot_menya_xxx2', '/music/round1/Gosti_Iz_Buduschego_Begi_ot_menya.mp3');

const R1_3_C1B2minus = audioUrl('zveri_prosto_takaya_silnaya_lyubov_minus_xxx3', '/music/round1/Zveri_Prosto_takaya_silnaya_lyubov_minus.mp3');
const R1_3_C1B2full = audioUrl('zveri_prosto_takaya_silnaya_lyubov_xxx4', '/music/round1/Zveri_Prosto_takaya_silnaya_lyubov.mp3');

const R1_3_C1B3minus = audioUrl('diskoteka_avariya_malinki_minus_xxx5', '/music/round1/Diskoteka_Avariya_Malinki-malinki_minus.mp3');
const R1_3_C1B3full = audioUrl('diskoteka_avariya_malinki_xxx6', '/music/round1/Diskoteka_Avariya_Malinki-malinki.mp3');

const R1_3_C1B4minus = audioUrl('ruki_vverh_18_mne_uzhe_minus_xxx7', '/music/round1/ruki-vverh-18-mne-uzhe_minus.mp3');
const R1_3_C1B4full = audioUrl('ruki_vverh_18_mne_uzhe_xxx8', '/music/round1/ruki-vverh-18-mne-uzhe.mp3');

// Category 2: Рок-классика (Легенды)
const R1_3_C2B1minus = audioUrl('agata_kristi_vechnaya_lyubov_minus_xxx9', '/music/round1/Agata_Kristi_Vechnaya_lyubov_minus.mp3');
const R1_3_C2B1full = audioUrl('agata_kristi_vechnaya_lyubov_xxx10', '/music/round1/Agata_Kristi_Vechnaya_lyubov.mp3');

const R1_3_C2B2minus = audioUrl('ddt_chto_takoe_osen_minus_xxx11', '/music/round1/DDT_Chto_takoe_osen_minus.mp3');
const R1_3_C2B2full = audioUrl('ddt_chto_takoe_osen_xxx12', '/music/round1/DDT_Chto_takoe_osen.mp3');

const R1_3_C2B3minus = audioUrl('nautilus_pompilius_skovannye_odnoy_cepyu_minus_xxx13', '/music/round1/Nautilus_Pompilius_Skovannye_odnoy_cepyu_minus.mp3');
const R1_3_C2B3full = audioUrl('nautilus_pompilius_skovannye_odnoy_cepyu_xxx14', '/music/round1/Nautilus_Pompilius_Skovannye_odnoy_cepyu.mp3');

const R1_3_C2B4minus = audioUrl('ariya_shtil_minus_xxx15', '/music/round1/Ariya_Shtil_minus.mp3');
const R1_3_C2B4full = audioUrl('ariya_shtil_xxx16', '/music/round1/Ariya_Shtil.mp3');

// Category 3: Лирика & Баллады (Песни под гитару)
const R1_3_C3B1minus = audioUrl('splin_vyhoda_net_minus_xxx17', '/music/round1/Splin_Vyhoda_net_minus.mp3');
const R1_3_C3B1full = audioUrl('splin_vyhoda_net_xxx18', '/music/round1/Splin_Vyhoda_net.mp3');

const R1_3_C3B2minus = audioUrl('bi2_moy_rok_n_roll_minus_xxx19', '/music/round1/Bi-2_Moy_rok-n-roll_minus.mp3');
const R1_3_C3B2full = audioUrl('bi2_moy_rok_n_roll_xxx20', '/music/round1/Bi-2_Moy_rok-n-roll.mp3');

const R1_3_C3B3minus = audioUrl('zemfira_iskala_minus_xxx21', '/music/round1/Zemfira_ISKALA_minus.mp3');
const R1_3_C3B3full = audioUrl('zemfira_iskala_xxx22', '/music/round1/Zemfira_ISKALA.mp3');

const R1_3_C3B4minus = audioUrl('mumiy_troll_utekay_minus_xxx23', '/music/round1/Mumiy_Troll_Utekay_minus.mp3');
const R1_3_C3B4full = audioUrl('mumiy_troll_utekay_xxx24', '/music/round1/Mumiy_Troll_Utekay.mp3');

// Category 4: Песни о Солнце
const R1_3_C4B1minus = audioUrl('tamara_miansarova_pust_vsegda_budet_solnce_minus_xxx25', '/music/round1/Tamara_Miansarova_Pust_vsegda_budet_solnce_minus.mp3');
const R1_3_C4B1full = audioUrl('tamara_miansarova_pust_vsegda_budet_solnce_xxx26', '/music/round1/Tamara_Miansarova_Pust_vsegda_budet_solnce.mp3');

const R1_3_C4B2minus = audioUrl('chayf_argentina_yamayka_minus_xxx27', '/music/round1/ChayF_Argentina-Yamayka_-_5_0_minus.mp3');
const R1_3_C4B2full = audioUrl('chayf_argentina_yamayka_xxx28', '/music/round1/ChayF_Argentina-Yamayka_-_5_0.mp3');

const R1_3_C4B3minus = audioUrl('kino_zvezda_po_imeni_solnce_minus_xxx29', '/music/round1/KINO_Zvezda_po_imeni_Solnce_minus.mp3');
const R1_3_C4B3full = audioUrl('kino_zvezda_po_imeni_solnce_xxx30', '/music/round1/KINO_Zvezda_po_imeni_Solnce.mp3');

const R1_3_C4B4minus = audioUrl('monokini_dotyanutsya_do_solnca_minus_xxx31', '/music/round1/MONOKINI_Dotyanutsya_do_solnca_minus.mp3');
const R1_3_C4B4full = audioUrl('monokini_dotyanutsya_do_solnca_xxx32', '/music/round1/MONOKINI_Dotyanutsya_do_solnca.mp3');

export const round1v3Set: RoundSet = {
  id: 'round1_v3',
  name: {
    en: 'Round1-V3',
    ru: 'Роунд1-3'
  },
  description: {
    en: '',
    ru: ''
  },
  author: 'DT',
  version: '1.0',
  data: [
    {
      id: 'pop2000',
      name: { en: 'Pop Hits 2000s (Golden Era)', ru: 'Поп-хиты 2000-х (Золотая эра)' },
      songs: [
        { 
          id: 'p1_3_1', 
          title: 'Беги от меня', 
          artist: 'Гости из будущего', 
          audioUrl: R1_3_C1B1minus, 
          audioUrlFull: R1_3_C1B1full,
          notes: 'Иконичный танцевальный хит группы "Гости из будущего". Песня стала визитной карточкой дуэта Евы Польны и Юрия Усачева. Вышла в 2003 году и мгновенно покорила танцполы страны. Характерный электронный бит и проникновенный вокал создали неповторимую атмосферу нулевых.\n\n🎵 *"Беги от меня, я плохая, я опасная... / Беги от меня, я такая разная..."*'
        },
        { 
          id: 'p1_3_2', 
          title: 'Просто такая сильная любовь', 
          artist: 'Звери', 
          audioUrl: R1_3_C1B2minus, 
          audioUrlFull: R1_3_C1B2full,
          notes: 'Узнаваемый рифф с первых нот - один из главных хитов группы "Звери". Выпущен в 2003 году в альбоме "Квартал". Песня принесла группе всероссийскую известность и стала гимном влюбленных. Роман Билык создал простой, но цепляющий текст о всепоглощающем чувстве.\n\n🎵 *"Просто такая сильная любовь / Бывает только раз в жизни..."*'
        },
        { 
          id: 'p1_3_3', 
          title: 'Малинки', 
          artist: 'Дискотека Авария feat. Блестящие', 
          audioUrl: R1_3_C1B3minus, 
          audioUrlFull: R1_3_C1B3full,
          notes: 'Культовая вечеринка в песне - танцевальный хит 2004 года. Неожиданный коллаб двух популярных групп создал настоящий вирусный эффект. Песня "Малинки" до сих пор звучит на всех ретро-дискотеках и свадьбах. Запоминающийся припев про "малинки-калинки" знает вся страна.\n\n🎵 *"Малинки, малинки, малинки мои! / Калинки, калинки, калинки мои! / А ягодки-малинки меня к себе манят..."*'
        },
        { 
          id: 'p1_3_4', 
          title: '18 мне уже', 
          artist: 'Руки Вверх!', 
          audioUrl: R1_3_C1B4minus, 
          audioUrlFull: R1_3_C1B4full,
          notes: 'Гимн взросления и беззаботности, который знает абсолютно каждый. Выпущен в 2000 году, песня стала одним из самых узнаваемых треков Сергея Жукова. Текст о первом взрослом дне рождения и новых возможностях попал в самое сердце поколения. Легендарное видео с пляжа и белые штаны Жукова стали мемом.\n\n🎵 *"18 мне уже, 18 мне уже, / И мысли только о тебе, о тебе! / 18 мне уже, 18 мне уже, / И сердце бьется лишь в тебе, в тебе!"*'
        },
      ]
    },
    {
      id: 'rock_classics',
      name: { en: 'Rock Classics (Legends)', ru: 'Рок-классика (Легенды)' },
      songs: [
        { 
          id: 'p1_3_5', 
          title: 'Вечная любовь', 
          artist: 'Агата Кристи', 
          audioUrl: R1_3_C2B1minus, 
          audioUrlFull: R1_3_C2B1full,
          notes: 'Песни, которые пережили десятилетия - одна из визитных карточек группы. Выпущена в 1995 году в альбоме "Опиум". Мистическая баллада с характерным вокалом Вадима Самойлова. Текст о вечной любви, проходящей через время и пространство, до сих пор трогает слушателей. Одна из самых красивых песен русского рока.\n\n🎵 *"Вечная любовь будет жить во мне, / Даже если кто-то другой с тобой рядом. / Вечная любовь будет петь во мне, / Даже если всё вокруг будет падать..."*'
        },
        { 
          id: 'p1_3_6', 
          title: 'Что такое осень', 
          artist: 'ДДТ', 
          audioUrl: R1_3_C2B2minus, 
          audioUrlFull: R1_3_C2B2full,
          notes: 'Философский хит с характерным звучанием Юрия Шевчука. Песня вышла в 1992 году в альбоме "Актриса Весна". Осень здесь не просто время года, а метафора жизненного пути, размышлений и перемен. Хриплый голос Шевчука и пронзительный текст создали одну из самых цитируемых песен в истории русского рока.\n\n🎵 *"Что такое осень - это небо, / Плачущее небо под ногами. / В лужах разлетаются птицы с облаками, / Осень, я давно с тобою не был..."*'
        },
        { 
          id: 'p1_3_7', 
          title: 'Скованные одной цепью', 
          artist: 'Наутилус Помпилиус', 
          audioUrl: R1_3_C2B3minus, 
          audioUrlFull: R1_3_C2B3full,
          notes: 'Гимн поколения от Вячеслава Бутусова. Песня из альбома "Разлука" (1986) стала символом перестройки и перемен в обществе. Мрачная энергетика и глубокий текст Ильи Кормильцева о связанных одной судьбой людях попали в нерв времени. До сих пор звучит актуально, напоминая о том, что все мы "скованы одной цепью".\n\n🎵 *"Скованные одной цепью, / Связанные одной целью, / Скованные одной цепью, / Связанные одной..."*'
        },
        { 
          id: 'p1_3_8', 
          title: 'Штиль', 
          artist: 'Ария', 
          audioUrl: R1_3_C2B4minus, 
          audioUrlFull: R1_3_C2B4full,
          notes: 'Узнаваемое эпическое гитарное вступление - классика русского металла. Выпущена в 1998 году в альбоме "Генератор зла". Песня на стихи Пушкина (вольное переложение) с мощными гитарными риффами и высоким вокалом Валерия Кипелова. Обязательный номер на всех концертах группы, под который зажигаются тысячи зажигалок.\n\n🎵 *"Когда на море штиль, уходит в плаванье бриг, / И только чайки крик пронзает тишину. / Когда на море штиль, нам не страшна волна, / И парус, как струна, поет про глубину..."*'
        },
      ]
    },
    {
      id: 'lyrics_ballads',
      name: { en: 'Lyrics & Ballads', ru: 'Лирика & Баллады' },
      songs: [
        { 
          id: 'p1_3_9', 
          title: 'Выхода нет', 
          artist: 'Сплин', 
          audioUrl: R1_3_C3B1minus, 
          audioUrlFull: R1_3_C3B1full,
          notes: 'Одна из самых знаменитых русских рок-баллад. Песня из альбома "Гранатовый альбом" (1998) стала настоящим прорывом для группы Александра Васильева. Простой гитарный перебор и философский текст о поиске себя и безвыходных ситуациях покорил миллионы слушателей. Строчка "у меня есть нож, есть и вилы, да только нету коня" стала крылатой.\n\n🎵 *"У меня есть нож, есть и вилы, / Да только нету коня. / У меня есть нож, есть и вилы, / Да только нету коня. / Выхода нет, выхода нет, / Выхода нет, выхода нет..."*'
        },
        { 
          id: 'p1_3_10', 
          title: 'Мой рок-н-ролл', 
          artist: 'Би-2 feat. Чичерина', 
          audioUrl: R1_3_C3B2minus, 
          audioUrlFull: R1_3_C3B2full,
          notes: 'Иконичный дуэт и узнаваемая тема из культового сериала "Бригада". Выпущена в 2002 году, песня соединила мощный вокал Левы Би-2 и нежный, но драйвовый голос Юлии Чичериной. Текст о рок-н-ролле как образе жизни и последней романтике стал гимном целого поколения. Без этого трека не обходился ни один рок-фестиваль нулевых.\n\n🎵 *"Мой рок-н-ролл, ты мой герой, / Последний герой, последний бой. / Мой рок-н-ролл, я за тобой, / Ты мой герой, ты мой герой..."*'
        },
        { 
          id: 'p1_3_11', 
          title: 'Искала', 
          artist: 'Земфира', 
          audioUrl: R1_3_C3B3minus, 
          audioUrlFull: R1_3_C3B3full,
          notes: 'Хит, определивший звучание эпохи. Песня из дебютного альбома Земфиры (1999) взорвала все чарты. Резкая смена настроения от тихого куплета к мощному припеву стала визитной карточкой певицы. Честный и эмоциональный текст о поиске любви попал в самое сердце. "Искала тебя — нашла, потеряла покой" — пела вся страна.\n\n🎵 *"Искала тебя - нашла, потеряла покой. / Искала тебя - нашла, я не дружу с головой. / Искала тебя - нашла, и снова хочу искать. / Искала тебя - нашла, но хочется снова бежать..."*'
        },
        { 
          id: 'p1_3_12', 
          title: 'Утекай', 
          artist: 'Мумий Тролль', 
          audioUrl: R1_3_C3B4minus, 
          audioUrlFull: R1_3_C3B4full,
          notes: 'Легкая, летняя, но очень характерная песня Ильи Лагутенко. Вошла в эпохальный альбом "Морская" (1997), который открыл эру русского рока для нового поколения. Необычная манера исполнения Лагутенко, смесь английского и русского вайба создали уникальное звучание. Песня до сих пор ассоциируется с морем, солнцем и свободой.\n\n🎵 *"Утекай, прошу, утекай, / Не надо слов, не надо, прощай. / Утекай, прошу, утекай, / Не надо слов, не надо, прощай..."*'
        },
      ]
    },
    {
      id: 'songs_about_sun',
      name: { en: 'Songs about the Sun', ru: 'Песни о Солнце' },
      songs: [
        { 
          id: 'p1_3_13', 
          title: 'Пусть всегда будет солнце', 
          artist: 'Тамара Миансарова', 
          audioUrl: R1_3_C4B1minus, 
          audioUrlFull: R1_3_C4B1full,
          notes: 'Детский хит, ставший гимном мира и света. История песни началась с плаката 4-летнего Кости Баранникова "Пусть всегда будет солнце" на выставке. Корней Чуковский записал его стихи, а композитор Аркадий Островский создал музыку. Тамара Миансарова исполнила песню в 1962 году, и она стала международным хитом, переведенная на множество языков.\n\n🎵 *"Солнечный круг, небо вокруг - / Это рисунок мальчишки. / Нарисовал он на листке / И подписал в уголке: / Пусть всегда будет солнце, / Пусть всегда будет небо..."*'
        },
        { 
          id: 'p1_3_14', 
          title: 'Аргентина — Ямайка 5:0', 
          artist: 'Чайф', 
          audioUrl: R1_3_C4B2minus, 
          audioUrlFull: R1_3_C4B2full,
          notes: '"Ну а солнце — солнце светит всем!" — рок-гимн равенству от группы "Чайф". Песня 1999 года с чемпионата мира по футболу стала неожиданным хитом. Владимир Шахрин написал её после просмотра матча Аргентина-Ямайка, но главная мысль глубже: солнце светит всем независимо от национальности и цвета кожи. Простая истина, поданная с фирменным уральским юмором.\n\n🎵 *"Аргентина - Ямайка 5:0, / Аргентина - Ямайка 5:0. / Ну а солнце - солнце светит всем, / Солнце светит всем, всем, всем!"*'
        },
        { 
          id: 'p1_3_15', 
          title: 'Звезда по имени Солнце', 
          artist: 'Кино', 
          audioUrl: R1_3_C4B3minus, 
          audioUrlFull: R1_3_C4B3full,
          notes: 'Солнце как метафора любви и утраты в легендарной песне Виктора Цоя. Выпущена в 1989 году в альбоме того же названия, ставшем последним при жизни музыканта. Одна из самых сильных и глубоких песен "Кино" о судьбе, времени и месте человека в этом мире. Белый снег, серый лёд и солнце, которое "встанет и растопит лед" — образы, знакомые каждому.\n\n🎵 *"Белый снег, серый лёд, / На растрескавшейся земле. / Одеялом лоскутным на ней / Город в дорожной петле. / А над городом плывут облака, / Закрывая небесный свет. / А над городом - жёлтый дым, / Городу две тысячи лет..."*'
        },
        { 
          id: 'p1_3_16', 
          title: 'Дотянуться до солнца', 
          artist: 'Монокини', 
          audioUrl: R1_3_C4B4minus, 
          audioUrlFull: R1_3_C4B4full,
          notes: 'Современный инди-хит о мечте и стремлении. Песня группы "Монокини" (проект экс-участницы "Гостей из будущего" Евы Польны) вышла в 2010-х и стала гимном для нового поколения мечтателей. Легкая, воздушная мелодия с философским подтекстом о том, как важно тянуться к свету и не сдаваться. Умная поп-музыка для взрослых детей.\n\n🎵 *"Я хочу дотянуться до солнца, / Чтобы сердце согрелось моё. / Я хочу дотянуться до солнца, / Чтобы небо услышало всё..."*'
        },
      ]
    }
  ]
};