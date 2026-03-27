  import { RoundSet } from '../types';
  import { audioUrl } from './audioUtils';

  // ==================== ROUND 2 - SET 3 (R23-1) ====================
  // Песни, связанные с цветами

  const R2311 = audioUrl('roza-chaynaya-minus', '/music/round2/roza-chaynaya-minus.mp3');
  const R2311f = audioUrl('roza-chaynaya', '/music/round2/roza-chaynaya.mp3');

  const R2312 = audioUrl('zemfira-romashki_minus', '/music/round2/zemfira-romashki_minus.mp3');
  const R2312f = audioUrl('zemfira-romashki', '/music/round2/zemfira-romashki.mp3');

  const R2313 = audioUrl('natal-ya-koroleva-zheltye-tyul-pany-minus', '/music/round2/natal-ya-koroleva-zheltye-tyul-pany-minus.mp3');
  const R2313f = audioUrl('natal-ya-koroleva-zheltye-tyul-pany', '/music/round2/natal-ya-koroleva-zheltye-tyul-pany.mp3');

  const R2314 = audioUrl('sofiya-rotaru-lavanda-minus', '/music/round2/sofiya-rotaru-lavanda-minus.mp3');
  const R2314f = audioUrl('sofiya-rotaru-lavanda', '/music/round2/sofiya-rotaru-lavanda-lavanda.mp3');

  // ==================== ROUND 2 - SET 3 (R23-2) ====================
  // Песни о снеге и снежинке

  const R2321 = audioUrl('', '/music/round2/sofiya-rotaru_-_belaya-zima_minus.mp3');
  const R2321f = audioUrl('', '/music/round2/sofiya-rotaru_-_belaya-zima.mp3');

  const R2322 = audioUrl('Fristail_-_Belaya_metelica_minus', '/music/round2/Fristail_-_Belaya_metelica_minus.mp3');
  const R2322f = audioUrl('Fristail_-_Belaya_metelica', '/music/round2/Fristail_-_Belaya_metelica.mp3');

  const R2323 = audioUrl('', '/music/round2/kaby-ne-bylo-zimy-minus.mp3');
  const R2323f = audioUrl('', '/music/round2/kaby-ne-bylo-zimy.mp3');

  const R2324 = audioUrl('Alla_Pugachyova_-_Ajsberg_1983_minus', '/music/round2/Alla_Pugachyova_-_Ajsberg_1983_minus.mp3');
  const R2324f = audioUrl('Alla_Pugachyova_-_Ajsberg_1983', '/music/round2/Alla_Pugachyova_-_Ajsberg_1983.mp3');

  // ==================== ROUND 2 - SET 3 (R23-3) ====================
  // Песни о весне

  const R2331 = audioUrl('mihail-kiselev-yabloni-v-cvetu_minus', '/music/round2/mihail-kiselev-yabloni-v-cvetu_minus.mp3');
  const R2331f = audioUrl('mihail-kiselev-yabloni-v-cvetu', '/music/round2/mihail-kiselev-yabloni-v-cvetu.mp3');

  const R2332 = audioUrl('milyaev-vesennee-tango-minus', '/music/round2/milyaev-vesennee-tango-minus.mp3');
  const R2332f = audioUrl('milyaev-vesennee-tango', '/music/round2/milyaev-vesennee-tango.mp3');

  const R2333 = audioUrl('', '/music/round2/Irina_Otieva_-_Poslednyaya_poema_iz_k_f_Vam_i_ne_snilos_minus_cut.mp3');
  const R2333f = audioUrl('Irina_Otieva_-_Poslednyaya_poema_iz_k_f_Vam_i_ne_snilos', '/music/round2/Irina_Otieva_-_Poslednyaya_poema_iz_k_f_Vam_i_ne_snilos.mp3');

  const R2334 = audioUrl('alsu-vesna_minus', '/music/round2/alsu-vesna_minus.mp3');
  const R2334f = audioUrl('alsu-vesna', '/music/round2/alsu-vesna.mp3');

  // ==================== ROUND 2 - SET 3 (R23-4) ====================
  // Песни о русских городах

  const R2341 = audioUrl('oleg-gazmanov-lyubimaya-pesnya-yuriya-luzhkova-moskva_minus', '/music/round2/oleg-gazmanov-lyubimaya-pesnya-yuriya-luzhkova-moskva_minus.mp3');
  const R2341f = audioUrl('oleg-gazmanov-lyubimaya-pesnya-yuriya-luzhkova-moskva', '/music/round2/oleg-gazmanov-lyubimaya-pesnya-yuriya-luzhkova-moskva.mp3');

  const R2342 = audioUrl('ah-samara-gorodok-bespokoynaya-ya_minus', '/music/round2/ah-samara-gorodok-bespokoynaya-ya_minus.mp3');
  const R2342f = audioUrl('ah-samara-gorodok-bespokoynaya-ya', '/music/round2/ah-samara-gorodok-bespokoynaya-ya.mp3');

  const R2343 = audioUrl('odessa-shalandy-polnye-kefali_minus', '/music/round2/odessa-shalandy-polnye-kefali_minus.mp3');
  const R2343f = audioUrl('odessa-shalandy-polnye-kefali', '/music/round2/odessa-shalandy-polnye-kefali.mp3');

  const R2344 = audioUrl('oblomov_vasilij_edu_v_magadan_minus', '/music/round2/oblomov_vasilij_edu_v_magadan_minus.mp3');
  const R2344f = audioUrl('oblomov_vasilij_edu_v_magadan', '/music/round2/oblomov_vasilij_edu_v_magadan.mp3');

 export const round2v3Set: RoundSet = {
  id: 'round2_v3',
  name: { 
    en: 'Round2-V3', 
    ru: 'Раунд 2 - Набор 3' 
  },
  description: {
    en: 'Songs about flowers, snow, spring and Russian cities',
    ru: 'Песни о цветах, снеге, весне и русских городах'
  },
  author: 'DT',
  version: '1.0',
  data: [
    {
      id: 'r23_flowers',
      name: { en: 'Songs about Flowers', ru: 'Песни, связанные с цветами' },
      description: {
        ru: 'Флористика в чистом звуке. Здесь каждый трек — как свежий букет. Самый нежный плейлист вечера. Здесь цветы не вянут, а песни остаются с вами надолго.',
        en: 'A flower shop in your speakers. Here you\'ll find roses, daisies, tulips, and even lavender. Just don\'t think of giving a bouquet — they\'ll wilt before the game ends.'
      },
      songs: [
        {
          id: 'r23_q1',
          title: 'Роза чайная',
          artist: 'Филипп Киркоров',
          audioUrl: R2311,
          audioUrlFull: R2311f,
          notes: 'Нежная лирическая баллада о любви, которая расцветает, как чайная роза на рассвете. Песня стала визитной карточкой артиста и символом утонченной романтики на российской эстраде. «Роза чайная — губ твоих цвет, / Роза чайная — нежный привет...»'
        },
        {
          id: 'r23_q2',
          title: 'Ромашки',
          artist: 'Земфира',
          audioUrl: R2312,
          audioUrlFull: R2312f,
          notes: 'Ироничная и трогательная песня о девушке, которая ждет простого человеческого счастья, но вместо этого получает банальные ромашки. Контраст между наивным ожиданием и суровой реальностью делает эту песню особенной. «А я хотела джинсы, / А мне купили цветы — / Такие жёлтые, как ты...»'
        },
        {
          id: 'r23_q3',
          title: 'Жёлтые тюльпаны',
          artist: 'Наташа Королева',
          audioUrl: R2313,
          audioUrlFull: R2313f,
          notes: 'Суперхит 90-х, ставший визитной карточкой певицы. История о неразделенной любви, где желтые тюльпаны (в народе считающиеся вестниками разлуки) становятся символом напрасной надежды и одиночества среди праздника жизни. «Жёлтые тюльпаны, вестники разлуки, / Что же вы, ребята, сделали с любовью?..»'
        },
        {
          id: 'r23_q4',
          title: 'Лаванда',
          artist: 'София Ротару (дуэт с Яаком Йоалой)',
          audioUrl: R2314,
          audioUrlFull: R2314f,
          notes: 'Вечный хит о горной лаванде, цветущей в далеких краях, которая стала символом встречи двух влюбленных. Песня с неповторимой мелодией до сих пор звучит на всех дискотеках, даря ощущение тепла и южного лета. «Лаванда, горная лаванда... / Наших встреч с тобой синий цвет...»'
        }
      ]
    },
    {
      id: 'r23_winter',
      name: { en: 'Songs about Snow and Snowflakes', ru: 'Песни о снеге и снежинке' },
      description: {
        ru: 'Плейлист, от которого становится холодно и уютно одновременно. Варежки не нужны — достаточно хорошего настроения.',
        en: 'A playlist that makes you feel cold and cozy at the same time. No mittens needed — just a good mood is enough.'
      },
      songs: [
        {
          id: 'r23_q5',
          title: 'Белая зима',
          artist: 'София Ротару',
          audioUrl: R2321,
          audioUrlFull: R2321f,
          notes: 'Популярная зимняя песня в исполнении Софии Ротару о том, как зима украшает всё вокруг белым покрывалом. Мелодичная, запоминающаяся, знакомая многим с детства. «Белая зима, белая зима, / Белым снегом замела дома.» «Белая зима, белая зима, / Всё вокруг белым-бела.» «А на окнах кружева, кружева, / Это зима, зима, зима.»'
        },
        {
          id: 'r23_q6',
          title: 'Белая метелица',
          artist: 'Fristail',
          audioUrl: R2322,
          audioUrlFull: R2322f,
          notes: 'Современная танцевальная версия народного мотива, которая соединила традиционную зимнюю лирику с ритмами нового времени. Песня о том, как метель кружит голову, словно первая любовь. «Белая метелица стелется, стелется, / Над моей над крышею веретеном...» «Ах, метель-метеличица, белая зарница, / Ты зачем кудрявого парня проводила? / Проводила до крыльца — не видала молодца!»'
        },
        {
          id: 'r23_q7',
          title: 'Потолок ледяной',
          artist: 'Анна Бутурлина (Эльза)',
          audioUrl: R2323,
          audioUrlFull: R2323f,
          notes: 'Песня, которая покорила весь мир и стала новогодним гимном нового поколения. Эльза поёт о том, как важно быть собой, даже если весь мир говорит, что это неправильно. Узнаётся по завораживающему вступлению и фразе, от которой мурашки. «Потолок ледяной, дверь скрипучая, / За шершавой стеной тьма колючая.» «Отпусти и забудь, что было, / Холод не тронет меня.'
        },
        {
          id: 'r23_q8',
          title: 'Айсберг',
          artist: 'Алла Пугачёва',
          audioUrl: R2324,
          audioUrlFull: R2324f,
          notes: 'Холодная, величественная баллада о любви, где айсберг в океане становится метафорой одинокого женского сердца. Снежная тема здесь раскрывается через образ льда, который так хочется растопить теплом настоящих чувств. «Айсберг моё сердце, айсберг, / Ты не жди — растает он сам...» «Если я растаю — тебя забуду, / Тебя забуду — айсбергом стану вновь!» «Айсберг моё сердце, айсберг, / Не ищи напрасно землю, / Не гаси напрасно свечи, / Не ищи любви напрасной — / Одинокий айсберг в океане любви!»'
        }
      ]
    },
    {
      id: 'r23_spring',
      name: { en: 'Songs about Spring', ru: 'Песни о весне' },
      description: {
        ru: 'Самый оптимистичный плейлист вечера. После него хочется открыть окно и крикнуть: "Ну наконец-то!" Даже если за окном зима.',
        en: 'The sunniest playlist of the evening. After this, you\'ll want to open the window and shout: "Finally!" Even if it\'s winter outside.'
      },
      songs: [
        {
          id: 'r23_q9',
          title: 'Яблони в цвету',
          artist: 'Евгений Мартынов',
          audioUrl: R2331,
          audioUrlFull: R2331f,
          notes: 'Нежнейшая лирическая песня, ставшая визитной карточкой композитора и певца. Белоснежное цветение яблонь здесь — символ чистой любви и быстротечного счастья, которое хочется удержать вопреки бегу времени. «Яблони в цвету — весны творенье, / Яблони в цвету — любви круженье, / Радости свои мы им дарили, / С ними о любви мы говорили.» «Было и прошло, — твердит мне время, / Но ему назло тебе я верю. / Верю в майский день, от яблонь белый, / Яблонь молодых в твоем саду.» «Яблони в цвету — какое чудо, / Яблони в цвету я не забуду, / Только дни считать не стану в грусти, / Просто буду ждать весны грядущей.»'
        },
        {
          id: 'r23_q10',
          title: 'Весеннее танго',
          artist: 'ВИА "Весёлые ребята"',
          audioUrl: R2332,
          audioUrlFull: R2332f,
          notes: 'Зажигательный, солнечный хит, ассоциирующийся с первым теплом. Песня о том удивительном времени, когда люди «головы теряют» и это называется весна. «Вот идет по свету человек-чудак, / Сам себе печально улыбаясь. / В голове его какой-нибудь пустяк, / С сердцем, видно, что-нибудь не так.» «Приходит время — с юга птицы прилетают, / Снеговые горы тают — и не до сна. / Приходит время — люди головы теряют, / И это время называется весна!» «Сколько сердце валидолом не лечи — / Всё равно сплошные перебои. / Сколько головой о стенку не стучи — / Не помогут лучшие врачи.»'
        },
        {
          id: 'r23_q11',
          title: 'Последняя поэма',
          artist: 'Жанна Рождественская',
          audioUrl: R2333,
          audioUrlFull: R2333f,
          notes: 'Невероятно трогательная, ностальгическая песня о вечной любви, побеждающей смерть. Из фильма «Вам и не снилось». «Ветер ли старое имя развеял, / Нет мне дороги в мой брошенный край. / Если увидеть пытаешься издали, / Не разглядишь меня, друг мой, прощай.» «Знаю, когда-нибудь с дальнего берега, / С дальнего прошлого / Ветер весенний ночной / Принесет тебе вздох от меня.» «Это не сон, это не сон — / Это вся правда моя, это истина. / Смерть побеждающий вечный закон — / Это любовь моя!»'
        },
        {
          id: 'r23_q12',
          title: 'Весна',
          artist: 'Алсу',
          audioUrl: R2334,
          audioUrlFull: R2334f,
          notes: 'Современная поп-композиция о том лёгком весеннем наваждении, когда всего две недели знакомства способны перевернуть мир. Чистое, солнечное ощущение первой влюблённости, созвучное пробуждающейся природе. «Старая, старая сказка, ночь так длинна, в небе луна. / Самая главная тайна есть у меня одна.» «Улетели белые метели, почему же мне ночью не до сна. / Мы с тобой знакомы две недели, / Что же ты со мной делаешь, весна?» «Чистое, чистое небо, солнце в руках, льется река. / Всё расскажу я тебе, но только не знаю как.»'
        }
      ]
    },
    {
      id: 'r23_cities',
      name: { en: 'Songs about Russian Cities', ru: 'Песни о русских городах' },
      description: {
        ru: 'Музыкальная экскурсия без гида и очередей по русским городам! Здесь каждый каждый город споёт свою песню. Билеты не нужны.',
        en: ''
      },
      songs: [
        {
          id: 'r23_q13',
          title: 'Москва',
          artist: 'Олег Газманов',
          audioUrl: R2341,
          audioUrlFull: R2341f,
          notes: 'Торжественный гимн столице, который знает каждый москвич. Песня, ставшая неофициальным символом города. В ней переплетаются вековая история Красной площади и современный ритм мегаполиса. «Москва! Звонят колокола. / Москва! Златые купола. / Москва! По золоту икон / Проходит летопись времен!» «Через войны, пожары, века / Звон малиновый в небо летит, / Слышен звон этот издалека — / Это сердце России звенит.» «Я смотрю с Воробьевых высот / На ночное созвездие огней, / Пусть Москве уже за восемьсот — / Мы вовек не состаримся с ней!»'
        },
        {
          id: 'r23_q14',
          title: 'Ах, Самара-городок',
          artist: 'Народная',
          audioUrl: R2342,
          audioUrlFull: R2342f,
          notes: 'Задушевная русская народная песня, в которой Самара предстает не просто городом на Волге, а местом, где ищет покоя беспокойное девичье сердце. Простая и бесхитростная мелодия стала одной из самых любимых в народе. «Ах, Самара-городок, / Беспокойная я, / Беспокойная я, / Успокой ты меня!» «Платок тонет и не тонет, / Потихонечку плывет, — / Милый любит и не любит, / Только времечко ведет.» «Понапрасну небо ясно, / Одна звездочка горит. / Понапрасну милых много, — / Об одном сердце болит.»'
        },
        {
          id: 'r23_q15',
          title: 'Шаланды, полные кефали',
          artist: 'Марк Бернес',
          audioUrl: R2343,
          audioUrlFull: R2343f,
          notes: 'Легендарная одесская песня, воспевшая колорит портового города и его обитателей. История про Костю-моряка, которого обожали и Молдаванка, и Пересыпь, стала гимном настоящей одесской дружбы и любви. Из фильма «Два бойца». «Я вам не скажу за всю Одессу, / Вся Одесса очень велика. / Но и Молдаванка и Пересыпь / Обожают Костю-моряка!» «Шаланды, полные кефали, / В Одессу Костя приводил, / И все биндюжники вставали, / Когда в пивную он входил.» «Синеет море за бульваром, / Каштан над городом цветет, / И Константин берет гитару / И тихим голосом поет...»'
        },
        {
          id: 'r23_q16',
          title: 'Еду в Магадан',
          artist: 'Василий Обломов',
          audioUrl: R2344,
          audioUrlFull: R2344f,
          notes: 'Ироничная и пронзительная песня современного автора, обыгрывающая многослойный образ Магадана в русской культуре — от места ссылок до символа далекого края, куда уезжают за лучшей долей или от безнадежности. «Еду в Магадан, еду в Магадан, / Еду в Магадан — с вещами, / Еду в Магадан, еду в Магадан — / Ну что еще осталось с нами?» «Там где сопки и туман, где ловить не надо — сам / Ловишь эха переливы, там где Север — царь и пан...» «Загибается карман, загибается душа, / Но при этом трезвый ум твердит: "Хорош, не запивай!" / Загибается земля, загибаются края, / Загибается тайга — и значит, еду в Магадан!»'
        }
      ]
    }
  ]
};