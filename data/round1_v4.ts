import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 1-4 AUDIO FILES ====================

// Category 1: Барды & Авторская песня
const R1_4_C1B1minus = audioUrl('tariverdiev_so_mnoyu_vot_chto_proishodit_minus_xxx33', '/music/round1/Mikael_Leonovich_Tariverdiev_So_mnoyu_vot_chto_proishodit_minus.mp3');
const R1_4_C1B1full = audioUrl('tariverdiev_so_mnoyu_vot_chto_proishodit_xxx34', '/music/round1/Mikael_Leonovich_Tariverdiev_So_mnoyu_vot_chto_proishodit.mp3');

const R1_4_C1B2minus = audioUrl('', '/music/round1/Igor_Savoshinskiy_A_vse_konchaetsya_minus_cut.mp3');
const R1_4_C1B2full = audioUrl('', '/music/round1/Igor_Savoshinskiy_A_vse_konchaetsya.mp3');

const R1_4_C1B3minus = audioUrl('aleksandr_gorodnickiy_atlanty_minus_xxx37', '/music/round1/Aleksandr_Gorodnickiy_Atlanty_minus.mp3');
const R1_4_C1B3full = audioUrl('aleksandr_gorodnickiy_atlanty_xxx38', '/music/round1/Aleksandr_Gorodnickiy_Atlanty.mp3');

const R1_4_C1B4minus = audioUrl('', '/music/round1/Elena_Kamburova_Zelenaya_kareta_minus_cut.mp3');
const R1_4_C1B4full = audioUrl('', '/music/round1/Elena_Kamburova_Zelenaya_kareta.mp3');

// Category 2: Булат Окуджава. Арбатский романс
const R1_4_C2B1minus = audioUrl('bulat_okudzhava_molitva_minus_xxx41', '/music/round1/Bulat_Okudzhava_Molitva_minus.mp3');
const R1_4_C2B1full = audioUrl('bulat_okudzhava_molitva_xxx42', '/music/round1/Bulat_Okudzhava_Molitva.mp3');

const R1_4_C2B2minus = audioUrl('bulat_okudzhava_gruzinskaya_pesnya_minus_xxx43', '/music/round1/Bulat_Okudzhava_Gruzinskaya_pesnya_minus.mp3');
const R1_4_C2B2full = audioUrl('bulat_okudzhava_gruzinskaya_pesnya_xxx44', '/music/round1/Bulat_Okudzhava_Gruzinskaya_pesnya.mp3');

const R1_4_C2B3minus = audioUrl('bulat_okudzhava_vashe_blagorodie_minus_xxx45', '/music/round1/Bulat_Okudzhava_Vashe_blagorodie_gospozha_Udacha_minus.mp3');
const R1_4_C2B3full = audioUrl('bulat_okudzhava_vashe_blagorodie_xxx46', '/music/round1/Bulat_Okudzhava_Vashe_blagorodie_gospozha_Udacha.mp3');

const R1_4_C2B4minus = audioUrl('bulat_okudzhava_davayte_vosklicat_minus_xxx47', '/music/round1/Bulat_Okudzhava_Davayte_vosklicat_minus.mp3');
const R1_4_C2B4full = audioUrl('bulat_okudzhava_davayte_vosklicat_xxx48', '/music/round1/Bulat_Okudzhava_Davayte_vosklicat.mp3');

// Category 3: Песни о дороге - ОБНОВЛЕНО с правильными файлами
const R1_4_C3B1minus = audioUrl('vladimir_vysockiy_korabli_minus_xxx49', '/music/round1/Vladimir_Vysockiy_Korabli_minus.mp3');
const R1_4_C3B1full = audioUrl('vladimir_vysockiy_korabli_xxx50', '/music/round1/Vladimir_Vysockiy_Korabli.mp3');

// Обновлённые файлы для "Эх, дороги" и "Дороги" (Любэ)
const R1_4_C3B2minus = audioUrl('eh-dorogi_minus_cut', '/music/round1/eh-dorogi_minus_cut.mp3');
const R1_4_C3B2full = audioUrl('eh-dorogi_minus', '/music/round1/eh-dorogi_minus.mp3');

const R1_4_C3B3minus = audioUrl('lyube_dorogi_minus_cut', '/music/round1/Lyube_-_Dorogi_-_minus_cut.mp3');
const R1_4_C3B3full = audioUrl('lyube_dorogi', '/music/round1/Lyube_-_Dorogi.mp3');

const R1_4_C3B4minus = audioUrl('po_doroge_s_oblakami_minus_xxx55', '/music/round1/po_doroge_s_oblakami_minus.mp3');
const R1_4_C3B4full = audioUrl('po_doroge_s_oblakami_xxx56', '/music/round1/po_doroge_s_oblakami.mp3');

// Category 4: Автолегенды
const R1_4_C4B1minus = audioUrl('kombinaciya_vishnevaya_devyatka_minus_xxx57', '/music/round1/Kombinaciya_Vishnevaya_devyatka_minus.mp3');
const R1_4_C4B1full = audioUrl('kombinaciya_vishnevaya_devyatka_xxx58', '/music/round1/Kombinaciya_Vishnevaya_devyatka.mp3');

const R1_4_C4B2minus = audioUrl('leprikonsy_moskvich_minus_xxx59', '/music/round1/Leprikonsy_Moskvich_minus.mp3');
const R1_4_C4B2full = audioUrl('leprikonsy_moskvich_xxx60', '/music/round1/Leprikonsy_Moskvich.mp3');

const R1_4_C4B3minus = audioUrl('', '/music/round1/Lyubov_Uspenskaya_-_A_ya_syadu_v_kabriolet_low_bass_minus_cut.mp3');
const R1_4_C4B3full = audioUrl('l', '/music/round1/Lyubov_Uspenskaya_-_A_ya_syadu_v_kabriolet_low_bass.mp3');

const R1_4_C4B4minus = audioUrl('seryoga_chernyy_bumer_minus_xxx63', '/music/round1/SERYOGA_Chernyy_bumer_minus.mp3');
const R1_4_C4B4full = audioUrl('seryoga_chernyy_bumer_xxx64', '/music/round1/SERYOGA_Chernyy_bumer.mp3');

export const round1v4Set: RoundSet = {
  id: 'round1_v4',
  name: {
    en: 'Round1-V4',
    ru: 'Раунд 1 - Набор 4'
  },
  description: {
    en: 'Bards, Okudzhava, Road Songs and Auto Legends',
    ru: 'Барды, Окуджава, Песни о дороге и Автолегенды'
  },
  author: 'DT',
  version: '1.0',
  data: [
    {
      id: 'bards',
      name: { en: 'Bards & Author\'s Song', ru: 'Барды & Авторская песня' },
      description: {
        ru: 'Гитарный перебор и слова, которые хочется записывать в блокнот. Интеллигентный вечер у костра гарантирован.',
        en: 'Guitar picking and lyrics you want to write down in a notebook. An intellectual evening is guaranteed.'
      },
      songs: [
        { 
          id: 'p1_4_1', 
          title: 'Со мною вот что происходит', 
          artist: 'Сергей Никитин', 
          audioUrl: R1_4_C1B1minus, 
          audioUrlFull: R1_4_C1B1full,
          notes: 'Проникновенный романс на стихи Евгения Евтушенко из кинофильма "Ирония судьбы, или С лёгким паром!". Музыку написал Микаэл Таривердиев, а исполнил Сергей Никитин. Песня стала символом новогодней ностальгии и размышлений о быстротечности времени. Каждое слово здесь пропитано щемящей грустью и теплотой.\n\n🎵 *"Со мною вот что происходит: / Ко мне мой старый друг не ходит, / А ходят в праздной суете / Разнообразные не те..."*'
        },
        { 
          id: 'p1_4_2', 
          title: 'А всё кончается', 
          artist: 'Игорь Савошинский', 
          audioUrl: R1_4_C1B2minus, 
          audioUrlFull: R1_4_C1B2full,
          notes: 'Лирическая песня о быстротечности жизни и неизбежности перемен. В жанре авторской песни, где слово важнее аранжировки, этот трек выделяется своей искренностью и простотой. Философские размышления о том, что всё в этом мире имеет своё начало и конец, но память остаётся с нами навсегда.\n\n🎵 *"А всё кончается, и звёзды падают с небес, / А всё кончается, и это вовсе не конец. / А всё кончается, чтоб начинаться всё сначала, / И то, что было нам подвластно, вдруг нами перестало..."*'
        },
        { 
          id: 'p1_4_3', 
          title: 'Атланты', 
          artist: 'Александр Городницкий', 
          audioUrl: R1_4_C1B3minus, 
          audioUrlFull: R1_4_C1B3full,
          notes: 'Неофициальный гимн Ленинграда-Петербурга, песня-символ северной столицы. Написана в 1963 году поэтом и бардом Александром Городницким. Посвящена атлантам портика Нового Эрмитажа, которые "держат небо на каменных руках". Песня стала настолько популярной, что её исполняли многие артисты, а сам Городницкий считает её своей визитной карточкой.\n\n🎵 *"Атланты держат небо на каменных руках, / Атланты держат небо, а в белых облаках / Растаяло былое, и нет былых обид, / Атланты держат небо, гранитные на век..."*'
        },
        { 
          id: 'p1_4_4', 
          title: 'Зелёная карета', 
          artist: 'Елена Камбурова', 
          audioUrl: R1_4_C1B4minus, 
          audioUrlFull: R1_4_C1B4full,
          notes: 'Щемящая песня о детстве, которое уходит безвозвратно. Музыка Александра Суханова, стихи Овсея Дриза в переводе Генриха Сапгира. В исполнении Елены Камбуровой эта композиция приобрела особую трогательность и глубину. "Зелёная карета" - метафора уходящего детства, которое "сонная, зелёная, карета, ты нас детство увози..."\n\n🎵 *"Зелёная карета, зелёная карета, / По городу везёт, везёт, везёт нас без билета, / Зелёная карета, зелёная карета, / По городу везёт, везёт, везёт нас без билета..."*'
        },
      ]
    },
    {
      id: 'okudzhava',
      name: { en: 'Bulat Okudzhava', ru: 'Булат Окуджава' },
      description: {
        ru: 'Московский дворик, старый Арбат и голос, который знает всё о жизни. Доставайте душевные запасы.',
        en: 'A Moscow courtyard, the old Arbat, and a voice that knows everything about life. Tap into your emotional reserves.'
      },
      songs: [
        { 
          id: 'p1_4_5', 
          title: 'Молитва', 
          artist: 'Булат Окуджава', 
          audioUrl: R1_4_C2B1minus, 
          audioUrlFull: R1_4_C2B1full,
          notes: 'Фраза "Пока Земля ещё вертится, ещё вертится, прощайте..." узнаваема мгновенно. Одна из самых сильных песен Окуджавы, написанная в 1964 году. Это не религиозная молитва в прямом смысле, а обращение к высшим силам с просьбой о самом главном: любви, надежде, милосердии. Песня стала гимном поколения шестидесятников.\n\n🎵 *"Пока Земля ещё вертится, пока ещё ярок свет, / Господи, дай же ты каждому, чего у него нет: / Умному дай голову, трусливому дай коня, / Дай счастливому память, а несчастному дай меня..."*'
        },
        { 
          id: 'p1_4_6', 
          title: 'Грузинская песня', 
          artist: 'Булат Окуджава', 
          audioUrl: R1_4_C2B2minus, 
          audioUrlFull: R1_4_C2B2full,
          notes: 'Тёплая, солнечная песня, в которой Окуджава воспевает простые радости жизни и дружбу. Написана под влиянием грузинской культуры, которую поэт очень любил. "Виноградную косточку в тёплую землю зарою..." - эти строки знает каждый, кто хоть раз брал в руки гитару. Песня о том, что настоящее счастье - в умении ценить то, что имеешь.\n\n🎵 *"Виноградную косточку в тёплую землю зарою, / И лозу поцелую, и спелые гроздья сорву, / И друзей созову, на любовь своё сердце настрою... / А иначе зачем на земле этой вечной живу?"*'
        },
        { 
          id: 'p1_4_7', 
          title: 'Ваше благородие, госпожа Удача', 
          artist: 'Булат Окуджава', 
          audioUrl: R1_4_C2B3minus, 
          audioUrlFull: R1_4_C2B3full,
          notes: 'Песня из культового фильма "Белое солнце пустыни" (1970), где её исполнил Павел Луспекаев в роли таможенника Верещагина. Хотя в титрах указан Окуджава, авторство до сих пор вызывает споры. Песня стала символом русского характера: "Повезёт мне или не повезёт?" - вопрос, который задаёт себе каждый.\n\n🎵 *"Ваше благородие, госпожа Удача, / Для кого ты добрая, а кому иначе. / Девять граммов в сердце, постой, не зови... / Не везёт мне в смерти, повезёт в любви!"*'
        },
        { 
          id: 'p1_4_8', 
          title: 'Давайте восклицать', 
          artist: 'Булат Окуджава', 
          audioUrl: R1_4_C2B4minus, 
          audioUrlFull: R1_4_C2B4full,
          notes: 'Оптимистичный, дружеский гимн, идеально подходящий для завершения категории. Окуджава призывает нас ценить друг друга, говорить комплименты и радоваться жизни, пока мы живы. Это не просто песня, а философское напутствие, в котором слышится мудрость человека, многое пережившего и понявшего главное.\n\n🎵 *"Давайте восклицать, друг другом восхищаться, / Высокопарных слов не надо опасаться. / Давайте говорить друг другу комплименты, / Ведь это всё любви счастливые моменты..."*'
        },
      ]
    },
    {
      id: 'songs_about_road',
      name: { en: 'Songs about the Road', ru: 'Песни о дороге' },
      description: {
        ru: 'Для тех, кто всегда в пути или только собирается. Дорога зовёт — подпевайте на остановках.',
        en: 'For those who are always on the road or just about to leave. The road is calling — sing along at the stops.'
      },
      songs: [
        { 
          id: 'p1_4_9', 
          title: 'Корабли', 
          artist: 'Владимир Высоцкий', 
          audioUrl: R1_4_C3B1minus, 
          audioUrlFull: R1_4_C3B1full,
          notes: 'Одна из самых морских песен Высоцкого, хотя сам он не служил на флоте. Написана в 1967 году и мгновенно стала популярной среди моряков и всех, кто любит романтику дальних странствий. Высоцкий создал удивительный образ кораблей, которые "стоят у причалов" и ждут своего часа, чтобы уйти в открытое море.\n\n🎵 *"Корабли постоят — и ложатся на курс, / Но они возвращаются сквозь непогоды. / Не пройдёт и полгода — и я появлюсь, / Чтобы снова уйти, чтобы снова уйти на полгода..."*'
        },
        { 
          id: 'p1_4_10', 
          title: 'Эх, дороги', 
          artist: 'Иван Шмелёв (солист Ансамбля Александрова)', 
          audioUrl: R1_4_C3B2minus, 
          audioUrlFull: R1_4_C3B2full,
          notes: 'Легендарная песня, написанная композитором Анатолием Новиковым и поэтом Львом Ошаниным в 1945 году. Она стала одним из самых пронзительных символов Великой Отечественной войны, отражая и тяготы солдатского пути, и надежду на возвращение. По официальной версии, песня была написана сразу после войны, но многие ветераны вспоминали, что слышали её ещё на фронте. "Эх, дороги" - это не просто песня, это исповедь поколения, прошедшего через огонь.\n\n🎵 *"Эх, дороги, пыль да туман, / Холода, тревоги, да степной бурьян. / Снег ли, ветер, вспомним, друзья, / Нам забыть нельзя..."*'
        },
        { 
          id: 'p1_4_11', 
          title: 'Дороги', 
          artist: 'Любэ', 
          audioUrl: R1_4_C3B3minus, 
          audioUrlFull: R1_4_C3B3full,
          notes: 'Проникновенная песня группы «Любэ» о бесконечных российских дорогах и судьбах людей, по ним идущих. Композиция выделяется своей лиричностью и глубиной на фоне более боевого репертуара группы. Это размышление о пути, о жизни, о том, что ждёт за поворотом. Характерный вокал Николая Расторгуева придаёт песне особую искренность и душевность, заставляя слушателя задуматься о вечном.\n\n🎵 *"Дороги, дороги, / Вы нас вели через огонь и воду. / Дороги, дороги, / Вы нас вели сквозь годы и невзгоды..."*'
        },
        { 
          id: 'p1_4_12', 
          title: 'По дороге с облаками', 
          artist: 'Из м/ф «По дороге с облаками»', 
          audioUrl: R1_4_C3B4minus, 
          audioUrlFull: R1_4_C3B4full,
          notes: 'Добрая детская песенка из одноимённого мультфильма о дружбе и прогулках. Мелодия Владимира Быстрякова, стихи Александра Тимофеевского. Песня учит ценить каждый момент и радоваться простым вещам: прогулке с другом, солнцу, облакам. Знакома каждому ребёнку, выросшему в СССР и постсоветской России.\n\n🎵 *"По дороге с облаками, по дороге с облаками / Очень нравится, когда мы / По дороге с облаками, по дороге с облаками / В синем небе без следа..."*'
        },
      ]
    },
    {
      id: 'auto_legends',
      name: { en: 'Auto Legends', ru: 'Автолегенды' },
      description: {
        ru: 'Мотор, бензин и немного хулиганства. Даже если у вас нет прав, эти песни заставят нажать на газ.',
        en: 'Engine, gasoline, and a bit of mischief. Even if you don\'t have a license, these songs will make you step on the gas.'
      },
      songs: [
        { 
          id: 'p1_4_13', 
          title: 'Вишнёвая девятка', 
          artist: 'Комбинация', 
          audioUrl: R1_4_C4B1minus, 
          audioUrlFull: R1_4_C4B1full,
          notes: 'Культовый хит 90-х о первой любви и первой машине. Группа "Комбинация" и их бессменный лидер Алёна Апина создали настоящий гимн для всех, кто мечтал о "вишнёвой девятке" - автомобиле ВАЗ-2109. Песня до сих пор звучит на дискотеках 90-х и вызывает ностальгию по ушедшей эпохе.\n\n🎵 *"Вишнёвая девятка, вишнёвая девятка, / А я в неё влюбилась, а я в неё влюбилась - / И мне теперь не сладко, и мне теперь не сладко, / И всё, что было с нами, навеки позабылось..."*'
        },
        { 
          id: 'p1_4_14', 
          title: 'Москвич', 
          artist: 'Леприконсы', 
          audioUrl: R1_4_C4B2minus, 
          audioUrlFull: R1_4_C4B2full,
          notes: 'Задорная песня белорусской группы "Леприконсы" о легендарном автомобиле "Москвич". В 90-е и нулевые этот автомобиль был мечтой многих, и песня точно передаёт ту смесь любви и иронии, с которой относились к отечественному автопрому. Запоминающийся припев и народный юмор сделали трек хитом.\n\n🎵 *"Москвич, Москвич, Москвич - / Ты моя мечта, ты мой кулич. / Москвич, Москвич, Москвич - / Хоть старая, но ты не плачь..."*'
        },
        { 
          id: 'p1_4_15', 
          title: 'А я сяду в кабриолет', 
          artist: 'Любовь Успенская', 
          audioUrl: R1_4_C4B3minus, 
          audioUrlFull: R1_4_C4B3full,
          notes: 'Роскошный шансон-хит о красивой жизни от королевы русской эмиграции Любови Успенской. Кабриолет здесь - символ свободы, успеха и независимости. Песня вышла в 2000-х и мгновенно стала популярной благодаря характерному вокалу Успенской и запоминающемуся припеву. Трек о том, как важно иногда позволять себе мечтать.\n\n🎵 *"А я сяду в кабриолет и уеду куда-нибудь, / А я сяду в кабриолет и забуду про что-нибудь. / А я сяду в кабриолет, ветер в волосах, / А я сяду в кабриолет и растаю в небесах..."*'
        },
        { 
          id: 'p1_4_16', 
          title: 'Чёрный бумер', 
          artist: 'Серёга', 
          audioUrl: R1_4_C4B4minus, 
          audioUrlFull: R1_4_C4B4full,
          notes: 'Абсолютный хит 2004 года, который знала наизусть вся страна. Белорусский рэпер Серёга (Сергей Пархоменко) создал настоящий феномен: песня о BMW (бумере) и "новых белорусских" стала гимном автомобильной культуры нулевых. Ритмичный бит, юмористический текст и запоминающийся припев сделали трек вирусным задолго до появления TikTok.\n\n🎵 *"А я еду за туманом, за мечтами и за запахом тайги, / А я еду за туманом, за мечтами и за запахом тайги. / Чёрный бумер, чёрный бумер - / Это мой автомобиль, это мой автомобиль..."*'
        },
      ]
    }
  ]
};