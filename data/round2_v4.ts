import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 2 - SET 4 [FINAL] ====================
// Четыре тематических блока: дождь, поэзия, кони, именинники

// -------------------- R24-1: Песни о дожде --------------------
const R2411 = audioUrl('deti-online.com_-_vinovataya-tuchka_minus', '/music/round2/deti-online.com_-_vinovataya-tuchka_minus.mp3');
const R2411f = audioUrl('deti-online.com_-_vinovataya-tuchka', '/music/round2/deti-online.com_-_vinovataya-tuchka.mp3');

const R2412 = audioUrl('a-po-temnym-ulicam-gulyaet-dozhd_minus', '/music/round2/a-po-temnym-ulicam-gulyaet-dozhd_minus.mp3');
const R2412f = audioUrl('a-po-temnym-ulicam-gulyaet-dozhd', '/music/round2/a-po-temnym-ulicam-gulyaet-dozhd.mp3');

const R2413 = audioUrl('YUrij_Loza_-_Plot_minus', '/music/round2/YUrij_Loza_-_Plot_minus_cut.mp3');
const R2413f = audioUrl('YUrij_Loza_-_Plot', '/music/round2/YUrij_Loza_-_Plot.mp3');

const R2414 = audioUrl('Demo_-_Dozhdik_minus', '/music/round2/Demo_-_Dozhdik_minus_cut.mp3');
const R2414f = audioUrl('Demo_-_Dozhdik', '/music/round2/Demo_-_Dozhdik.mp3');

// -------------------- R24-2: Искусственный Интеллект: Песни на стихи великих русских поэтов --------------------
const R2421 = audioUrl('Marina Tsvetaeva - Prokhozhiy', '/music/round2/Marina Tsvetaeva - Prokhozhiy.mp3');
const R2421f = audioUrl('Marina Tsvetaeva - Prokhozhiy-full', '/music/round2/Marina Tsvetaeva - Prokhozhiy.mp3');

const R2422 = audioUrl('Sergey Yesenin - Ne zhaleyu-ne-zovu-neplachu', '/music/round2/Sergey Yesenin - Ne zhaleyu-ne-zovu-neplachu.mp3');
const R2422f = audioUrl('Sergey Yesenin - Ne zhaleyu-ne-zovu-neplachu-full', '/music/round2/Sergey Yesenin - Ne zhaleyu-ne-zovu-neplachu.mp3');

const R2423 = audioUrl('Boris Pasternak - Zimnyaya noch', '/music/round2/Boris Pasternak - Zimnyaya noch.mp3');
const R2423f = audioUrl('Boris Pasternak - Zimnyaya noch-full', '/music/round2/Boris Pasternak - Zimnyaya noch.mp3');

const R2424 = audioUrl('Vladimir Mayakovskiy - Pasport', '/music/round2/Vladimir Mayakovskiy - Pasport .mp3');
const R2424f = audioUrl('Vladimir Mayakovskiy - Pasport-full', '/music/round2/Vladimir Mayakovskiy - Pasport .mp3');

// -------------------- R24-3: Песни о Конях --------------------
const R2431 = audioUrl('Chizh_I_Co_-_Vot_pulya_prosvistela_minus', '/music/round2/Chizh_I_Co_-_Vot_pulya_prosvistela_minus.mp3');
const R2431f = audioUrl('vot-pulya-prosvistela-chizh-i-ko', '/music/round2/vot-pulya-prosvistela-chizh-i-ko.mp3');

const R2432 = audioUrl('nesomnenno-no-tol-ko-loshadi-letayut-vdohnovenno_minus', '/music/round2/nesomnenno-no-tol-ko-loshadi-letayut-vdohnovenno_minus.mp3');
const R2432f = audioUrl('nesomnenno-no-tol-ko-loshadi-letayut-vdohnovenno', '/music/round2/nesomnenno-no-tol-ko-loshadi-letayut-vdohnovenno.mp3');

const R2433 = audioUrl('andrey-makarevich-mashina-vremeni-skachki_minus', '/music/round2/andrey-makarevich-mashina-vremeni-skachki_minus.mp3');
const R2433f = audioUrl('andrey-makarevich-mashina-vremeni-skachki', '/music/round2/andrey-makarevich-mashina-vremeni-skachki.mp3');

const R2434 = audioUrl('v-vysockiy---koni-priveredlivye_minus', '/music/round2/v-vysockiy---koni-priveredlivye_minus.mp3');
const R2434f = audioUrl('v-vysockiy---koni-priveredlivye', '/music/round2/v-vysockiy---koni-priveredlivye.mp3');

// -------------------- R24-4: ТыГыДы-ки (Песни, переделанные для именинников) --------------------
const R2441 = audioUrl('oleg-gazmanov-yasnye-dni-olga-minus', '/music/round2/oleg-gazmanov-yasnye-dni-olga-minus.mp3');
const R2441f = audioUrl('oleg-gazmanov-yasnye-dni-olga', '/music/round2/oleg-gazmanov-yasnye-dni-olga.mp3');

const R2442 = audioUrl('Sergej_Bezrukov_i_Lyube_-_Berezy_otchego_tak_v_Rossii_berezy_shumyat_OlgaT_minus', '/music/round2/Sergej_Bezrukov_i_Lyube_-_Berezy_otchego_tak_v_Rossii_berezy_shumyat_OlgaT_minus.mp3');
const R2442f = audioUrl('Sergej_Bezrukov_i_Lyube_-_Berezy_otchego_tak_v_Rossii_berezy_shumyat_OlgaT', '/music/round2/Sergej_Bezrukov_i_Lyube_-_Berezy_otchego_tak_v_Rossii_berezy_shumyat_OlgaT.mp3');

const R2443 = audioUrl('Anastasia_OlgaP_minus', '/music/round2/Anastasia_OlgaP_minus.mp3');
const R2443f = audioUrl('Anastasia_OlgaP', '/music/round2/Anastasia_OlgaP.mp3');

const R2444 = audioUrl('smuglyanka-vitaliy_minus', '/music/round2/smuglyanka-vitaliy_minus.mp3');
const R2444f = audioUrl('smuglyanka-vitaliy', '/music/round2/smuglyanka-vitaliy.mp3');

export const round2v4Set: RoundSet = {
  id: 'round2_v4',
  name: { en: 'round2_v4', ru: 'round2_v4' },
  author: 'DT',
  version: '1.0',
  data: [
    // ==================== R24-1: Песни о дожде ====================
    {
      id: 'r24_rain',
      name: { 
        en: 'Songs about Rain', 
        ru: 'Песни о дожде' 
      },
    //   description: {
    //     en: 'Lyrics in which rain becomes an interlocutor, an obstacle or salvation',
    //     ru: 'Лирика, в которой дождь становится собеседником, преградой или спасением'
    //   },
      songs: [
        {
          id: 'r24_q1',
          title: 'Виноватая тучка',
          artist: 'Непоседы (Давид Тухманов, Юрий Энтин)',
          audioUrl: R2411,
          audioUrlFull: R2411f,
          notes: 'Детская песня, ставшая любимой для нескольких поколений. Остроумная история о тучке, которую наказали и она заплакала дождиком, а потом её простили, и дождик кончился. Простая и добрая мелодия учит не бояться дождя, а радоваться лужам.\n\n«Злую тучку наказали: / "Ты плохая!" — ей сказали. / И она заплакала, / Да кап-кап-кап — закапала.»\n«Ну а мы с тобой не тужим, / Босиком бежим по лужам! / Брызги прямо ввысь летят, / С тучею встречаются.»',
          hint: {
            en: 'A children\'s song about a cloud that was punished and it started crying with rain.',
            ru: 'Детская песня о тучке, которую наказали, и она заплакала дождиком.'
          }
        },
        {
          id: 'r24_q2',
          title: 'По темным улицам гуляет дождь',
          artist: 'АГОНЬ',
          audioUrl: R2412,
          audioUrlFull: R2412f,
          notes: 'Современный хит о расставании, где дождь становится главным действующим лицом. Он гуляет по пустым улицам, мерцает в свете фонарей и становится той самой причиной (или оправданием), по которой любимый человек не пришел на встречу.\n\n«А по тёмным улицам гуляет дождь! / Фонарей далёких мерцает свет. / Ты сегодня уже наверно не придёшь… / Тебя нет сейчас со мною, нет.»\n«Почему ты не пришла, я же ждал! / Может дождь тебе помехой стал?»',
          hint: {
            en: 'A modern hit about parting, where rain becomes the main character.',
            ru: 'Современный хит о расставании, где дождь становится главным действующим лицом.'
          }
        },
        {
          id: 'r24_q3',
          title: 'Плот',
          artist: 'Юрий Лоза',
          audioUrl: R2413,
          audioUrlFull: R2413f,
          notes: 'Легендарная песня о побеге от обыденности, где дождь и бури — не препятствие, а часть пути к новой жизни. Главный хит Юрия Лозы, который он написал ещё в 1982 году, но популярность обрёл только в конце 80-х. Плот, свитый из песен и слов, плывет сквозь непогоду к мечте.\n\n«На маленьком плоту, сквозь бури, дождь и грозы, / Взяв только сны и грёзы, и детскую мечту, / Я тихо уплыву, лишь в дом проникнет полночь...»\n«Но мой плот, свитый из песен и слов, / Всем моим бедам назло вовсе не так уж плох.»',
          hint: {
            en: 'A legendary song about escaping from everyday life, where rain and storms are part of the journey.',
            ru: 'Легендарная песня о побеге от обыденности, где дождь и бури — часть пути.'
          }
        },
        {
          id: 'r24_q4',
          title: 'Дождик',
          artist: 'Демо',
          audioUrl: R2414,
          audioUrlFull: R2414f,
          notes: 'Нежная поп-песня конца 90-х о расставании под звуки дождя. Лирическая героиня просит дождик передать привет бывшему возлюбленному и невзначай напомнить о себе. Лёгкая мелодия и трогательный текст сделали эту песню хитом своего времени.\n\n«Дождик, дождик, на окнах узоры рисуя, / Передай ему привет, / Что скучаю и очень люблю я, / Что хочу забыть, но сил нет.»\n«За окошком дождик, а мне не спится, / И в тишине ночной он снится, снится...»',
          hint: {
            en: 'A gentle pop song from the late 90s about parting to the sound of rain.',
            ru: 'Нежная поп-песня конца 90-х о расставании под звуки дождя.'
          }
        }
      ]
    },
    // ==================== R24-2: Искусственный Интеллект: Песни на стихи великих русских поэтов ====================
    {
      id: 'r24_poetry',
      name: { 
        en: 'AI: Songs to poems by great Russian poets', 
        ru: 'Искусственный Интеллект: Песни на стихи великих русских поэтов' 
      },
    //   description: {
    //     en: 'When immortal lines acquire musical breath',
    //     ru: 'Когда бессмертные строки обретают музыкальное дыхание'
    //   },
      songs: [
        {
          id: 'r24_q5',
          title: 'Прохожий',
          artist: 'Марина Цветаева',
          audioUrl: R2421,
          audioUrlFull: R2421f,
          notes: 'Лирическое стихотворение Серебряного века, написанное в Коктебеле 3 мая 1913 года. Обращение к случайному прохожему, остановившемуся у могилы, — разговор через вечность, полный света и жизнелюбия. Поэтесса просит не скорбеть, а легко вспомнить ту, что «слишком сама любила смеяться, когда нельзя».\n\n«Идёшь на меня похожий, / Глаза устремляя вниз. / Я их опускала — тоже! / Прохожий, остановись!»\n«Легко обо мне подумай, / Легко обо мне забудь.»',
          hint: {
            en: 'A lyrical poem by Marina Tsvetaeva about a conversation with a passerby through eternity.',
            ru: 'Лирическое стихотворение Марины Цветаевой о разговоре с прохожим через вечность.'
          }
        },
        {
          id: 'r24_q6',
          title: 'Не жалею, не зову, не плачу',
          artist: 'Сергей Есенин',
          audioUrl: R2422,
          audioUrlFull: R2422f,
          notes: 'Хрестоматийное стихотворение Есенина, написанное в 1921 году, стало философским размышлением о принятии уходящей молодости. «Увяданья золотом охваченный, я не буду больше молодым» — эти строки знает практически каждый. Стихотворение многократно положено на музыку разными композиторами.\n\n«Не жалею, не зову, не плачу, / Всё пройдёт, как с белых яблонь дым.»\n«Увяданья золотом охваченный, / Я не буду больше молодым.»',
          hint: {
            en: 'A classic poem by Yesenin about accepting passing youth.',
            ru: 'Хрестоматийное стихотворение Есенина о принятии уходящей молодости.'
          }
        },
        {
          id: 'r24_q7',
          title: 'Зимняя ночь',
          artist: 'Борис Пастернак',
          audioUrl: R2423,
          audioUrlFull: R2423f,
          notes: 'Легендарное стихотворение из романа «Доктор Живаго» (1946 год), ставшее одним из самых узнаваемых в русской поэзии. Рефрен «Свеча горела на столе» — это не просто строка, а символ домашнего тепла, любви и жизни, противостоящей зимней метели. Музыка Микаэла Таривердиева в фильме «Ирония судьбы».\n\n«Мело, мело по всей земле / Во все пределы. / Свеча горела на столе, / Свеча горела.»\n«На озаренный потолок / Ложились тени, / Скрещенья рук, скрещенья ног, / Судьбы скрещенья.»',
          hint: {
            en: 'A legendary poem from Doctor Zhivago, symbolizing warmth and love against a winter blizzard.',
            ru: 'Легендарное стихотворение из «Доктора Живаго», символ тепла и любви в противовес зимней метели.'
          }
        },
        {
          id: 'r24_q8',
          title: 'Стихи о советском паспорте',
          artist: 'Владимир Маяковский',
          audioUrl: R2424,
          audioUrlFull: R2424f,
          notes: 'Стихотворение 1929 года, написанное под впечатлением от зарубежных поездок поэта. Маяковский описывает сцену на таможне, контрастно показывая отношение чиновников к паспортам разных стран. Кульминация — предъявление советского паспорта, вызывающее у европейских жандармов страх и оцепенение, а у лирического героя — чувство гордости.\n\n«Я волком бы выгрыз / бюрократизм. / К мандатам / почтения нету.»\n«Читайте, / завидуйте, / я — / гражданин / Советского Союза.»',
          hint: {
            en: 'A poem by Mayakovsky about pride in one\'s country and a Soviet passport.',
            ru: 'Стихотворение Маяковского о гордости за свою страну и советский паспорт.'
          }
        }
      ]
    },
    // ==================== R24-3: Песни о Конях ====================
    {
      id: 'r24_horses',
      name: { 
        en: 'Songs about Horses', 
        ru: 'Песни о Конях' 
      },
    //   description: {
    //     en: 'Songs in which the image of a horse is used as a powerful artistic symbol',
    //     ru: 'Песни, в которых образ коня используется как мощный художественный символ'
    //   },
      songs: [
        {
          id: 'r24_q9',
          title: 'Вот пуля просвистела',
          artist: 'Чиж & Co',
          audioUrl: R2431,
          audioUrlFull: R2431f,
          notes: 'Трагическая баллада о казаке, вернувшемся с Гражданской войны, у которого комиссар отнял коня и жену. Конь становится единственным верным товарищем, спасающим хозяина в последней отчаянной схватке.\n\n«Вот пуля просвистела, в грудь попала мне, / Я на лихом коне ускакал...»',
          hint: {
            en: 'A tragic ballad about a Cossack whose horse becomes his only true comrade.',
            ru: 'Трагическая баллада о казаке, у которого конь становится единственным верным товарищем.'
          }
        },
        {
          id: 'r24_q10',
          title: 'Но только лошади летают вдохновенно',
          artist: 'Несчастный Случай',
          audioUrl: R2432,
          audioUrlFull: R2432f,
          notes: 'Интеллектуальная притча о природе творчества, где лошадь — символ поэта и вдохновения, противопоставленный грубой силе быка. Кульминация — лошадь разбивает небо, открывая новые миры.\n\n«Бык берет упорством, весом, потом, / Но только лошади летают вдохновенно... / И разбивает небо на куски!»',
          hint: {
            en: 'An intellectual parable about the nature of creativity, where the horse symbolizes the poet and inspiration.',
            ru: 'Интеллектуальная притча о природе творчества, где лошадь — символ поэта и вдохновения.'
          }
        },
        {
          id: 'r24_q11',
          title: 'Скачки',
          artist: 'Машина Времени',
          audioUrl: R2433,
          audioUrlFull: R2433f,
          notes: 'Философская рок-баллада о скоротечности жизни, где скачки — метафора бега времени, которое не остановить. Кони мчат по полю, а всадники (люди) пытаются удержаться в этом бешеном ритме.\n\n«Конь привередливый, / Бег твой размеренный, / Но если можешь, лети!»',
          hint: {
            en: 'A philosophical rock ballad about the fleeting nature of life, where racing is a metaphor for the passage of time.',
            ru: 'Философская рок-баллада о скоротечности жизни, где скачки — метафора бега времени.'
          }
        },
        {
          id: 'r24_q12',
          title: 'Кони привередливые',
          artist: 'Владимир Высоцкий',
          audioUrl: R2434,
          audioUrlFull: R2434f,
          notes: 'Одна из самых пронзительных песен Высоцкого — крик души, застывшей на грани жизни и смерти. Образ коней, несущих сани к краю пропасти, символизирует неумолимый бег судьбы и отчаянную мольбу остановить мгновение.\n\n«Чуть помедленнее, кони, чуть помедленнее! / Вы тугую не слушайте плеть!»',
          hint: {
            en: 'One of Vysotsky\'s most poignant songs — a cry of the soul on the brink of life and death.',
            ru: 'Одна из самых пронзительных песен Высоцкого — крик души на грани жизни и смерти.'
          }
        }
      ]
    },
    // ==================== R24-4: ТыГыДы-ки (Песни, переделанные для именинников) ====================
    {
      id: 'r24_birthday',
      name: { 
        en: 'Songs remade for our birthday people', 
        ru: 'ТыГыДы-ки: Песни, переделанные для наших именинников' 
      },
    //   description: {
    //     en: 'Musical gifts with soul and humor',
    //     ru: 'Музыкальные подарки с душой и юмором'
    //   },
      songs: [
        {
          id: 'r24_q13',
          title: 'Ясные дни',
          artist: 'Олег Газманов',
          audioUrl: R2441,
          audioUrlFull: R2441f,
          notes: 'Светлая, жизнерадостная песня, которая как нельзя лучше подходит для именинницы с именем Ольга. Тёплые строки про «ясные дни» и солнце — пожелание, чтобы в жизни было только хорошее. Переделана для Ольги Д.\n\nВ оригинале: «Ясные дни, ясные дни / В дом мой спешат, словно кони...»\nСтало: «Ясные дни, ясные дни / Для Ольги нашей спешат...»',
          hint: {
            en: 'A bright, joyful song remade for a birthday girl named Olga D.',
            ru: 'Светлая, жизнерадостная песня, переделанная для именинницы Ольги Д.'
          }
        },
        {
          id: 'r24_q14',
          title: 'Берёзы',
          artist: 'Любэ / Сергей Безруков',
          audioUrl: R2442,
          audioUrlFull: R2442f,
          notes: 'Проникновенная, душевная песня о России и родной природе. Для Ольги Т, которая поёт лирику, этот выбор — попадание в самое сердце. «Берёзы» здесь становятся символом чистоты и красоты.\n\nВ оригинале: «Отчего так в России берёзы шумят? / Отчего белоствольные всё понимают?»\nСтало: «Отчего так у Ольги глаза блестят, / Отчего мы сегодня её поздравляем?»',
          hint: {
            en: 'A heartfelt song about Russia, remade for Olga T.',
            ru: 'Проникновенная, душевная песня о России, переделанная для Ольги Т.'
          }
        },
        {
          id: 'r24_q15',
          title: 'Анастасия',
          artist: 'Группа «Сливки»',
          audioUrl: R2443,
          audioUrlFull: R2443f,
          notes: 'Поп-хит начала 2000-х, который переделали специально для Ольги П. Трогательная история про то, как парень ищет свою Настю, превратилась в милое поздравление для другой Ольги.\n\nВ оригинале: «Анастасия, Анастасия, / Ты — моя Россия, ты — моя стихия...»\nСтало: «Ольга Прекрасная, Ольга Прекрасная, / Ты у нас такая — самая прекрасная!»',
          hint: {
            en: 'A pop hit from the early 2000s remade especially for Olga P.',
            ru: 'Поп-хит начала 2000-х, переделанный специально для Ольги П.'
          }
        },
        {
          id: 'r24_q16',
          title: 'Смуглянка',
          artist: 'Из к/ф «В бой идут одни старики»',
          audioUrl: R2444,
          audioUrlFull: R2444f,
          notes: 'Легендарная песня о девушке-молдаванке, которая собирает грибы в лесу. Переделана для Виталия — возможно, у него тёмные волосы, или он просто фанат этого фильма и старого доброго шлягера.\n\nВ оригинале: «Как-то летом на рассвете заглянул в соседний сад, / Там смуглянка-молдаванка собирала виноград...»\nСтало: «Как-то вечером в припеве наш Виталий зажигал, / Он так здорово на сцене всех вокруг очаровал!»',
          hint: {
            en: 'A legendary song remade for Vitaly.',
            ru: 'Легендарная песня, переделанная для Виталия.'
          }
        }
      ]
    }
  ]
};