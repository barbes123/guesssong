import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 2-2 AUDIO FILES ====================

// Исправленные пути к файлам согласно списку
const R4_2_C1B1minus = audioUrl('kapitan-kapitan-ulybnites_minus_qechen', '/music/round2/kapitan-kapitan-ulybnites_minus_qechen.mp3');
const R4_2_C1B1full = audioUrl('kapitan-kapitan-ulybnites_tjrbhp', '/music/round2/kapitan-kapitan-ulybnites_tjrbhp.mp3');

const R4_2_C1B2minus = audioUrl('ya_ubyu_tebya_lodochnik_minus_jzos0v', '/music/round2/ya_ubyu_tebya_lodochnik_minus_jzos0v.mp3');
const R4_2_C1B2full = audioUrl('ya_ubyu_tebya_lodochnik_rsyk6a', '/music/round2/ya_ubyu_tebya_lodochnik_rsyk6a.mp3');

const R4_2_C1B3minus = audioUrl('pesenka-shofera-minus_uvrqev', '/music/round2/pesenka-shofera-minus_uvrqev.mp3');
const R4_2_C1B3full = audioUrl('pesenka-shofera_itiv3b', '/music/round2/pesenka-shofera_itiv3b.mp3');

const R4_2_C1B4minus = audioUrl('vse_mogut_koroli_minus_cloitv', '/music/round2/vse_mogut_koroli_minus_cloitv.mp3');
const R4_2_C1B4full = audioUrl('vse_mogut_koroli_whymlj', '/music/round2/vse_mogut_koroli_whymlj.mp3');

const R4_2_C2B1minus = audioUrl('ya_vstretil_Vas-minus_xpzsgo', '/music/round2/ya_vstretil_Vas-minus_xpzsgo.mp3');
const R4_2_C2B1full = audioUrl('ya_vstretil_Vas_mbhwzg', '/music/round2/ya_vstretil_Vas_mbhwzg.mp3');

const R4_2_C2B2minus = audioUrl('ochi-chernye-minus_usug0j', '/music/round2/ochi-chernye-minus_usug0j.mp3');
const R4_2_C2B2full = audioUrl('ochi-chernye_marugh', '/music/round2/ochi-chernye_marugh.mp3');

const R4_2_C2B3minus = audioUrl('iz-daleka-dolgo-techet-reka-volga-minus_xhz9ay', '/music/round2/iz-daleka-dolgo-techet-reka-volga-minus_xhz9ay_cut.mp3');
const R4_2_C2B3full = audioUrl('iz-daleka-dolgo-techet-reka-volga_vubrfo', '/music/round2/iz-daleka-dolgo-techet-reka-volga_vubrfo.mp3');

const R4_2_C2B4minus = audioUrl('Gori_moya_zvezda_minus_rjkalc', '/music/round2/Gori_moya_zvezda_minus_rjkalc.mp3');
const R4_2_C2B4full = audioUrl('Gori_moya_zvezda_oyiiyz', '/music/round2/Gori_moya_zvezda_oyiiyz.mp3');

const R4_2_C3B1minus = audioUrl('', '/music/round2/zvenit-yanvarskaya-vyuga-minus.mp3');
const R4_2_C3B1full = audioUrl('', '/music/round2/zvenit-yanvarskaya-vyuga.mp3');

const R4_2_C3B2minus = audioUrl('belye-snezhinki-minus_rbeer1', '/music/round2/belye-snezhinki-minus_rbeer1.mp3');
const R4_2_C3B2full = audioUrl('belye-snezhinki_qlznjl', '/music/round2/belye-snezhinki_qlznjl.mp3');

const R4_2_C3B3minus = audioUrl('a-sneg-idet-minus_zb5kmn', '/music/round2/a-sneg-idet-minus_zb5kmn.mp3');
const R4_2_C3B3full = audioUrl('a-sneg-idet_zjq1yz', '/music/round2/a-sneg-idet_zjq1yz.mp3');

const R4_2_C3B4minus = audioUrl('tri_belykh_konja_minus_w08ixy', '/music/round2/tri_belykh_konja_minus_w08ixy.mp3');
const R4_2_C3B4full = audioUrl('tri_belykh_konja_a5nho4', '/music/round2/tri_belykh_konja_a5nho4.mp3');

const R4_2_C4B1minus = audioUrl('Ne_plach_Alisa_minus_jxgzpq', '/music/round2/Ne_plach_Alisa_minus_jxgzpq.mp3');
const R4_2_C4B1full = audioUrl('Ne_plach_Alisa_d65ppd', '/music/round2/Ne_plach_Alisa_d65ppd.mp3');

const R4_2_C4B2minus = audioUrl('nikolaev_igor_den_rozhdeniya_minus_zwlatc', '/music/round2/nikolaev_igor_den_rozhdeniya_minus_zwlatc.mp3');
const R4_2_C4B2full = audioUrl('nikolaev_igor_den_rozhdeniya_c7fp0y', '/music/round2/nikolaev_igor_den_rozhdeniya_c7fp0y.mp3');

const R4_2_C4B3minus = audioUrl('chay-vdvoem-den-rozhdeniya_minus_nilcuf', '/music/round2/chay-vdvoem-den-rozhdeniya_minus_nilcuf.mp3');
const R4_2_C4B3full = audioUrl('chay-vdvoem-den-rozhdeniya_uybsfs', '/music/round2/chay-vdvoem-den-rozhdeniya_uybsfs.mp3');

const R4_2_C4B4minus = audioUrl('', '/music/round2/Irina_Alegrova_-_s_dnem_rozhdeniya_minus.mp3');
const R4_2_C4B4full = audioUrl('', '/music/round2/Irina_Alegrova_-_s_dnem_rozhdeniya.mp3');

export const round2v2Set: RoundSet = {
  id: 'round2_v2',
  name: {
    en: 'Round2-V2',
    ru: 'Раунд 2 - Набор 2'
  },
  description: {
    en: 'Songs about professions, romances, winter and birthdays',
    ru: 'Песни о профессиях, романсы, зимние песни и песни о дне рождения'
  },
  author: 'DT',
  version: '1.0',
  data: [
    {
      id: 'prof',
      name: { en: 'Professions', ru: 'Профессии' },
      description: {
        ru: 'Песни для тех, кто хочет сменить работу, не вставая с дивана. Выбирайте, какая профессия вам ближе по духу.',
        en: 'Songs for those who want to change jobs without leaving the couch. Captain, boatman, driver — choose who resonates with your spirit.'
      },
      songs: [
        { 
          id: 'p1_2_1', 
          title: 'Капитан, капитан, улыбнитесь', 
          artist: 'Леонид Утёсов', 
          audioUrl: R4_2_C1B1minus, 
          audioUrlFull: R4_2_C1B1full,
          notes: 'Знаменитая песня из кинофильма "Дети капитана Гранта" (1936). Музыка Исаака Дунаевского, слова Василия Лебедева-Кумача. Стала неофициальным гимном моряков и путешественников.\n\n«Капитан, капитан, улыбнитесь, / Ведь улыбка — это флаг корабля. / Капитан, капитан, подтянитесь, / Только смелым покоряются моря!»'
        },
        { 
          id: 'p1_2_2', 
          title: 'Я убью тебя, лодочник', 
          artist: 'Николай Караченцов', 
          audioUrl: R4_2_C1B2minus, 
          audioUrlFull: R4_2_C1B2full,
          notes: 'Страстная ария из легендарной рок-оперы "Юнона и Авось" композитора Алексея Рыбникова на стихи Андрея Вознесенского. Премьера состоялась в 1981 году в театре Ленинского комсомола. Мощное драматическое исполнение Караченцова в роли графа Резанова стало визитной карточкой артиста.\n\n«Я тебя никогда не увижу, / Я тебя никогда не забуду. / Я убью тебя, лодочник, / Сегодня ночью, лодочник...»'
        },
        { 
          id: 'p1_2_3', 
          title: 'Песенка шофёра', 
          artist: 'Михаил Боярский', 
          audioUrl: R4_2_C1B3minus, 
          audioUrlFull: R4_2_C1B3full,
          notes: 'Шуточная песня из фильма-мюзикла "Не бойся, я с тобой" (1981) режиссёра Юлия Гусмана. Характерный голос Боярского и лёгкая мелодия создают образ романтика-дальнобойщика, философски относящегося к жизни.\n\n«Если б я родился в Африке, / Я бы бегал там по Африке / И жевал бы баобабы на обед. / Но родился я в России, / Где берёзы и осины, / Где зимой и летом белый снег.»'
        },
        { 
          id: 'p1_2_4', 
          title: 'Всё могут короли', 
          artist: 'Алла Пугачёва', 
          audioUrl: R4_2_C1B4minus, 
          audioUrlFull: R4_2_C1B4full,
          notes: 'Знаменитая песня Бориса Рычкова на стихи Леонида Дербенёва (1980). Визитная карточка Примадонны, в которой высмеивается ограниченность власти перед силой любви. Песня вошла в альбом "То ли ещё будет" и мгновенно стала хитом.\n\n«Ах, как хочется вернуться, / Ах, как хочется ворваться в городок, / Где с любимым расставаясь, / Я в любви ему клялась и не могла наклясться... / Всё могут короли, / Всё могут короли, / И судьбы всей земли вершат они порой, / Но что ни говори, / Жениться по любви / Не может ни один король!»'
        },
      ]
    },
    {
      id: 'romances',
      name: { en: 'Romances', ru: 'Романсы' },
      description: {
        ru: 'Для тех, у кого есть хотя бы одна несчастная любовь в багаже. И даже если нет — после этих песен захочется её придумать.',
        en: 'For those who have at least one unhappy love in their baggage. And even if not — after these songs, you\'ll want to invent one.'
      },
      songs: [
        { 
          id: 'p1_2_5', 
          title: 'Я встретил Вас', 
          artist: 'Иван Козловский', 
          audioUrl: R4_2_C2B1minus, 
          audioUrlFull: R4_2_C2B1full,
          notes: 'Старинный романс на стихи Фёдора Тютчева «Я встретил вас — и всё былое», написанный в 1870 году. В исполнении легендарного тенора Ивана Козловского обрёл особую проникновенность и глубину. Козловский был солистом Большого театра и одним из самых узнаваемых голосов СССР.\n\n«Я встретил вас — и всё былое / В отжившем сердце ожило; / Я вспомнил время золотое — / И сердцу стало так тепло...»'
        },
        { 
          id: 'p1_2_6', 
          title: 'Очи чёрные', 
          artist: 'Фёдор Шаляпин', 
          audioUrl: R4_2_C2B2minus, 
          audioUrlFull: R4_2_C2B2full,
          notes: 'Самый известный русский романс в эталонном исполнении великого баса Фёдора Шаляпина. Цыганский романс на стихи Евгения Гребёнки (1843) стал визитной карточкой русской культуры за рубежом. Шаляпин исполнял его на всех своих концертах, и именно в его версии романс обрёл всемирную известность.\n\n«Очи чёрные, очи страстные, / Очи жгучие и прекрасные! / Как люблю я вас, как боюсь я вас, / Знать, увидел вас я в недобрый час!»'
        },
        { 
          id: 'p1_2_7', 
          title: 'Издалека долго течёт река Волга', 
          artist: 'Людмила Зыкина', 
          audioUrl: R4_2_C2B3minus, 
          audioUrlFull: R4_2_C2B3full,
          notes: 'Знаменитая песня Марка Фрадкина на стихи Льва Ошанина (1962). В исполнении Людмилы Зыкиной стала символом России и русской души — широкой, глубокой и печальной. Зыкину называли "голосом эпохи", а эту песню — неофициальным гимном великой русской реки.\n\n«Издалека долго течёт река Волга, / Течёт река Волга — конца и края нет. / Среди хлебов спелых, среди снегов белых / Течёт река Волга — а мне семнадцать лет.»'
        },
        { 
          id: 'p1_2_8', 
          title: 'Гори, гори, моя звезда', 
          artist: 'Александр Вертинский', 
          audioUrl: R4_2_C2B4minus, 
          audioUrlFull: R4_2_C2B4full,
          notes: 'Старинный русский романс композитора Петра Булахова на стихи Василия Чуевского (1846). В аристократичном, немного надрывном исполнении Вертинского обрёл вторую жизнь и стал одним из символов Серебряного века. Вертинский вернулся из эмиграции в СССР в 1943 году и привёз с собой этот романс в новой аранжировке.\n\n«Гори, гори, моя звезда, / Гори, звезда приветная! / Ты у меня одна заветная, / Другой не будет никогда.»'
        },
      ]
    },
    {
      id: 'winter',
      name: { en: 'Winter', ru: 'Песни о зиме' },
      description: {
        ru: 'Саундтрек к самому холодному времени года. Включайте, когда захочется снега, а за окном — мартвское солнце.',
        en: 'The soundtrack to the coldest season of the year. Play it when you want snow, but outside it\'s November slush.'
      },
      songs: [
        { 
          id: 'p1_2_9', 
          title: 'Звенит январская вьюга', 
          artist: 'Клавдия Шульженко', 
          audioUrl: R4_2_C3B1minus, 
          audioUrlFull: R4_2_C3B1full,
          notes: 'Лирическая зимняя песня из кинофильма «Иван Васильевич меняет профессию» (1973). Композитор Александр Зацепин, стихи Леонида Дербенёва. Тёплый, бархатный голос Шульженко создаёт атмосферу уюта и лёгкой грусти зимнего вечера.\n\n«Звенит январская вьюга, / И ливни хлещут упруго, / И звёзды мчатся по кругу, / И тонет в музыке снегопад.»'
        },
        { 
          id: 'p1_2_10', 
          title: 'Белые снежинки', 
          artist: 'Гелена Великанова', 
          audioUrl: R4_2_C3B2minus, 
          audioUrlFull: R4_2_C3B2full,
          notes: 'Лёгкая танцевальная песня 1950-х годов, сравнивающая кружение снежинок со свадебным конфетти. Одна из визитных карточек Гелены Великановой, чей голос ассоциируется с оптимизмом и светлой радостью. Великанова была одной из самых популярных эстрадных певиц своего времени.\n\n«Белые снежинки кружатся с утра, / Выросли сугробы посреди двора. / Стала от снежинок улица светлей, / Только одевайтесь потеплей.»'
        },
        { 
          id: 'p1_2_11', 
          title: 'А снег идёт', 
          artist: 'Майя Кристалинская', 
          audioUrl: R4_2_C3B3minus, 
          audioUrlFull: R4_2_C3B3full,
          notes: 'Философская песня Андрея Эшпая на стихи Евгения Евтушенко (1964). В проникновенном исполнении Майи Кристалинской снег становится метафорой времени, воспоминаний и тихой грусти. Кристалинская обладала уникальным, немного хрипловатым голосом, который делал каждую песню исповедью.\n\n«А снег идёт, а снег идёт, / И всё вокруг чего-то ждёт. / Под этот снег, под тихий снег / Хочу сказать при всех: / "Мой главный человек, / Взгляни со мной на этот снег".»'
        },
        { 
          id: 'p1_2_12', 
          title: 'Три белых коня', 
          artist: 'Лариса Долина', 
          audioUrl: R4_2_C3B4minus, 
          audioUrlFull: R4_2_C3B4full,
          notes: 'Знаменитая песня Евгения Крылатова на стихи Леонида Дербенёва из новогоднего фильма «Чародеи» (1982). Три белых коня символизируют зимние месяцы — декабрь, январь и февраль. В фильме песню исполняет Лариса Долина, и этот момент стал одним из самых запоминающихся в картине.\n\n«И уносят меня, и уносят меня / В звенящую снежную даль / Три белых коня, эх, три белых коня — / Декабрь, январь и февраль!»'
        },
      ]
    },
    {
      id: 'birthday',
      name: { en: 'Birthday', ru: 'День Рождения' },
      description: {
        ru: 'Торт, свечи, гости и эти мелодии. Если вы не знаете, что спеть имениннику — мы уже всё придумали. Останется только не фальшивить.',
        en: 'Cake, candles, guests, and these melodies. If you don\'t know what to sing to the birthday person — we\'ve already figured it out. Just don\'t sing off-key.'
      },
      songs: [
        { 
          id: 'p1_2_13', 
          title: 'Не плачь, Алиса', 
          artist: 'Группа «Браво»', 
          audioUrl: R4_2_C4B1minus, 
          audioUrlFull: R4_2_C4B1full,
          notes: 'Энергичная песня группы «Браво» с альбома «Стиляги из Москвы» (1994). Зажигательный рок-н-ролл с характерным саксофонным риффом утешает Алису в день её рождения. Автором музыки и слов выступил Евгений Хавтан, основатель группы.\n\n«Не плачь, Алиса, ты уже большая, / Сегодня день рожденья у тебя. / И я тебе, Алиса, обещаю, / Что ты увидишь целый мир, любя.»'
        },
        { 
          id: 'p1_2_14', 
          title: 'День рождения', 
          artist: 'Игорь Николаев', 
          audioUrl: R4_2_C4B2minus, 
          audioUrlFull: R4_2_C4B2full,
          notes: 'Лирический поп-хит 1995 года, посвящённый дню рождения — времени, когда загадывают самые заветные желания и верят в чудеса. Одна из самых тёплых песен Игоря Николаева, которая до сих пор звучит на праздниках.\n\n«День рождения — грустный праздник, / Взрослый стал ты — и сразу ясно, / Что уже не игрушки даришь ты друзьям, / А надежды и сны.»'
        },
        { 
          id: 'p1_2_15', 
          title: 'День рождения', 
          artist: 'Группа «Чай вдвоём»', 
          audioUrl: R4_2_C4B3minus, 
          audioUrlFull: R4_2_C4B3full,
          notes: 'Весёлая танцевальная песня-приглашение отметить день рождения вместе. Хит начала 2000-х, который звучал на всех праздничных дискотеках. «Чай вдвоём» — один из самых популярных поп-дуэтов того времени.\n\n«А в день рожденья, как в день рожденья, / Подарки, музыка, цветы. / А в день рожденья, как в день рожденья, / Сбываются мечты.»'
        },
        { 
          id: 'p1_2_16', 
          title: 'С днём рождения', 
          artist: 'Ирина Аллегрова', 
          audioUrl: R4_2_C4B4minus, 
          audioUrlFull: R4_2_C4B4full,
          notes: 'Праздничная поздравительная песня от знаменитой поп-дивы. Искренние пожелания счастья, здоровья и любви в характерном эмоциональном исполнении Аллегровой. Песня входит в репертуар певицы с конца 1990-х и до сих пор популярна.\n\n«С днём рождения! / Я хочу тебе пожелать / Жить без огорчения, / Ни о чём не жалеть, / Только счастья хочу пожелать, / Только в лучшее верить.»'
        },
      ]
    }
  ]
};