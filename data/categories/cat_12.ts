// import { RoundSet } from '../../types';
import { audioUrl } from '../audioUtils';
import { Category } from '../../types';

// ==================== ROUND 1-2 AUDIO FILES ====================



export const romanceCat: Category =  {
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
          audioUrl: audioUrl('ya_vstretil_Vas-minus_xpzsgo', '/music/round2/ya_vstretil_Vas-minus_xpzsgo.mp3'), 
          audioUrlFull: audioUrl('ya_vstretil_Vas_mbhwzg', '/music/round2/ya_vstretil_Vas_mbhwzg.mp3'),
          notes: 'Старинный романс на стихи Фёдора Тютчева «Я встретил вас — и всё былое», написанный в 1870 году. В исполнении легендарного тенора Ивана Козловского обрёл особую проникновенность и глубину. Козловский был солистом Большого театра и одним из самых узнаваемых голосов СССР.\n\n«Я встретил вас — и всё былое / В отжившем сердце ожило; / Я вспомнил время золотое — / И сердцу стало так тепло...»'
        },
        { 
          id: 'p1_2_6', 
          title: 'Очи чёрные', 
          artist: 'Фёдор Шаляпин', 
          audioUrl: audioUrl('ochi-chernye-minus_usug0j', '/music/round2/ochi-chernye-minus_usug0j.mp3'), 
          audioUrlFull: audioUrl('ochi-chernye_marugh', '/music/round2/ochi-chernye_marugh.mp3'),
          notes: 'Самый известный русский романс в эталонном исполнении великого баса Фёдора Шаляпина. Цыганский романс на стихи Евгения Гребёнки (1843) стал визитной карточкой русской культуры за рубежом. Шаляпин исполнял его на всех своих концертах, и именно в его версии романс обрёл всемирную известность.\n\n«Очи чёрные, очи страстные, / Очи жгучие и прекрасные! / Как люблю я вас, как боюсь я вас, / Знать, увидел вас я в недобрый час!»'
        },
        { 
          id: 'p1_2_7', 
          title: 'Издалека долго течёт река Волга', 
          artist: 'Людмила Зыкина', 
          audioUrl: audioUrl('iz-daleka-dolgo-techet-reka-volga-minus_xhz9ay', '/music/round2/iz-daleka-dolgo-techet-reka-volga-minus_xhz9ay_cut.mp3'), 
          audioUrlFull: audioUrl('iz-daleka-dolgo-techet-reka-volga_vubrfo', '/music/round2/iz-daleka-dolgo-techet-reka-volga_vubrfo.mp3'),
          notes: 'Знаменитая песня Марка Фрадкина на стихи Льва Ошанина (1962). В исполнении Людмилы Зыкиной стала символом России и русской души — широкой, глубокой и печальной. Зыкину называли "голосом эпохи", а эту песню — неофициальным гимном великой русской реки.\n\n«Издалека долго течёт река Волга, / Течёт река Волга — конца и края нет. / Среди хлебов спелых, среди снегов белых / Течёт река Волга — а мне семнадцать лет.»'
        },
        { 
          id: 'p1_2_8', 
          title: 'Гори, гори, моя звезда', 
          artist: 'Александр Вертинский', 
          audioUrl: audioUrl('Gori_moya_zvezda_minus_rjkalc', '/music/round2/Gori_moya_zvezda_minus_rjkalc.mp3'), 
          audioUrlFull: audioUrl('Gori_moya_zvezda_oyiiyz', '/music/round2/Gori_moya_zvezda_oyiiyz.mp3'),
          notes: 'Старинный русский романс композитора Петра Булахова на стихи Василия Чуевского (1846). В аристократичном, немного надрывном исполнении Вертинского обрёл вторую жизнь и стал одним из символов Серебряного века. Вертинский вернулся из эмиграции в СССР в 1943 году и привёз с собой этот романс в новой аранжировке.\n\n«Гори, гори, моя звезда, / Гори, звезда приветная! / Ты у меня одна заветная, / Другой не будет никогда.»'
        },
      ]
    };


export const charmAndAttitudeCat: Category = {
  id: 'charm-and-attitude',
  name: { en: 'Wit, Charm & Attitude', ru: 'Ирония, шарм и эпатаж' },
  description: {
    ru: 'Яркие песни с характером: ирония, флирт, самоирония и немного эпатажа. Здесь важны не только слова, но и артистичная подача — угадай хит с первых секунд!',
    en: 'Bold, character-filled hits blending irony, flirtation, self-confidence and a touch of outrageous fun. It is all about the attitude — guess the song from the first seconds!'
  },
  songs: [
    {
      id: 'NE_PUGAISYA_DETKA',
      title: 'Не пугайся, детка',
      artist: 'Константин Меладзе',
      audioUrl: audioUrl('Konstantin_Meladze_Ne_pugaisya_detka_minus.mp3', '/music/round1/Konstantin_Meladze_Ne_pugaisya_detka_minus.mp3'),
      audioUrlFull: audioUrl('Konstantin_Meladze_Ne_pugaisya_detka.mp3', '/music/round1/Konstantin_Meladze_Ne_pugaisya_detka.mp3'),
      notes: 'Сингл Константина Меладзе, выпущенный в марте 2025 года. Автор песни — сам Константин Меладзе. В композиции сочетаются театральная интонация, игривость и характерная мелодическая драматургия автора. Хорошо открывает категорию благодаря необычной подаче и запоминающемуся мотиву.'
    },
    {
      id: 'TSVET_NASTROYENIYA_SINIY',
      title: 'Цвет настроения синий',
      artist: 'Филипп Киркоров',
      audioUrl: audioUrl('Filipp_Kirkorov_Tsvet_nastroeniya_siniy_minus.mp3', '/music/round1/Filipp_Kirkorov_Tsvet_nastroeniya_siniy_minus.mp3'),
      audioUrlFull: audioUrl('Filipp_Kirkorov_Tsvet_nastroeniya_siniy.mp3', '/music/round1/Filipp_Kirkorov_Tsvet_nastroeniya_siniy.mp3'),
      notes: 'Поп-сингл Филиппа Киркорова, выпущенный в марте 2018 года. Автор музыки и текста — Антон Пустовой, музыкальный продюсер — Светлана Лобода. Песня построена вокруг яркого образа ночной вечеринки и демонстративно беззаботного настроения. Клип и фраза из припева быстро стали частью массовой поп-культуры.'
    },
    {
      id: 'EKSPONAT',
      title: 'Экспонат',
      artist: 'Ленинград',
      audioUrl: audioUrl('Leningrad_Eksponat_minus.mp3', '/music/round1/Leningrad_Eksponat_minus_cut.mp3'),
      audioUrlFull: audioUrl('Leningrad_Eksponat.mp3', '/music/round1/Leningrad_Eksponat.mp3'),
      notes: 'Хит группы «Ленинград», выпущенный отдельным синглом в январе 2016 года; песня исполнялась группой с 2015 года. Автор — Сергей Шнуров. Ироничная история о подготовке к свиданию стала широко известна благодаря клипу и запоминающемуся припеву. Важно: оригинальная версия содержит ненормативную лексику — для семейной игры лучше использовать проверенную clean-версию или инструментальный фрагмент.'
    },
    {
      id: 'SOLNTSE_MONAKO',
      title: 'Солнце Монако',
      artist: 'Люся Чеботина',
      audioUrl: audioUrl('Lyusya_Chebotina_Solntse_Monako_minus.mp3', '/music/round1/Lyusya_Chebotina_Solntse_Monako_minus_cut.mp3'),
      audioUrlFull: audioUrl('Lyusya_Chebotina_Solntse_Monako.mp3', '/music/round1/Lyusya_Chebotina_Solntse_Monako.mp3'),
      notes: 'Поп-хит Люси Чеботиной, выпущенный в октябре 2021 года и вошедший в альбом The End. За лёгкой танцевальной мелодией скрывается мысль о том, что дорогие курорты и красивые декорации ничего не значат без близкого человека. Песня стала одним из самых узнаваемых хитов певицы и получила широкую ротацию.'
    }
  ]
};

export const tableCat: Category = {
      id: 'table',
      name: { en: 'Table Songs', ru: 'Застольная' },
      description: {
        ru: 'Музыка для момента, когда тарелки уже отодвинуты, а тосты ещё не закончились. Голоса становятся громче, соседи — счастливее.',
        en: 'Music for that moment when plates have been pushed aside, but toasts are still going. Voices get louder, neighbors get happier.'
      },
      songs: [
        { 
          id: 'p2_9', 
          title: 'Однажды морем я плыла', 
          artist: 'Надежда Кадышева / ансамбль «Золотое кольцо»', 
          audioUrl: audioUrl('odnazhdy-morem-ya-plyla_minus_vqop94', '/music/round2/odnazhdy-morem-ya-plyla_minus_vqop94_cut.mp3'), 
          audioUrlFull: audioUrl('odnazhdy-morem-ya-plyla_b9qk4r', '/music/round2/odnazhdy-morem-ya-plyla_b9qk4r.mp3'),
          notes: 'Русская народная песня в современной обработке, популярная на застольях. Рассказ о девушке, плывущей по морю и вспоминающей о любимом.\n\n«Однажды морем я плыла, / Вдали увидела скалу. / На той скале стоял мой милый, / Махал мне белою рукой.»'
        },
        { 
          id: 'p2_10', 
          title: 'Да не вечер', 
          artist: 'Русская народная песня', 
          audioUrl: audioUrl('da_ne_vecher_minus_ql59gq', '/music/round2/da_ne_vecher_minus_ql59gq_cut.mp3'), 
          audioUrlFull: audioUrl('da_ne_vecher_kzkx9i', '/music/round2/da_ne_vecher_kzkx9i.mp3'),
          notes: 'Классическая русская народная песня, часто исполняемая на застольях и праздниках. Имеет глубокие исторические корни и множество вариантов исполнения.\n\n«Да не вечер, да не вечер, / Мне малым-мало спалось, / Мне малым-мало спалось, / Во сне привиделось.»'
        },
        { 
          id: 'p2_11', 
          title: 'Напилась я пьяна', 
          artist: 'Русская народная песня', 
          audioUrl: audioUrl('Napilas_ya_pyana_minus_i9ifis', '/music/round2/Napilas_ya_pyana_minus_i9ifis.mp3'), 
          audioUrlFull: audioUrl('Napilas_ya_pyana_fuxrry', '/music/round2/Napilas_ya_pyana_fuxrry.mp3'),
          notes: 'Шуточная народная песня, популярная в застольных исполнениях. Весёлый рассказ о девушке, которая выпила лишнего и теперь не может дойти до дома.\n\n«Напилась я пьяна, не дойду до дома, / Напилась я пьяна, не дойду до дома. / Ой, калина, ой, малина, / Не дойду до дома.»'
        },
        { 
          id: 'p2_12', 
          title: 'Вот кто-то с горочки спустился', 
          artist: 'Русская народная песня', 
          audioUrl: audioUrl('minus-vot-kto-to-s-gorochki-spustilsya_minus_l7l2tp', '/music/round2/minus-vot-kto-to-s-gorochki-spustilsya_minus_l7l2tp.mp3'), 
          audioUrlFull: audioUrl('minus-vot-kto-to-s-gorochki-spustilsya_mid1se', '/music/round2/minus-vot-kto-to-s-gorochki-spustilsya_mid1se.mp3'),
          notes: 'Лирическая русская народная песня с красивой мелодией. Рассказ о девушке, которая ждёт своего любимого, спускающегося с горы.\n\n«Вот кто-то с горочки спустился, / Наверно, милый мой идёт. / На нём защитна гимнастёрка, / Она с ума меня сведёт.»'
        },
      ]
    };

export const timesOfChangeCat: Category = {
    id: 'times-of-change',
    name: { en: 'Times of Change', ru: 'Время перемен' },
    description: {
      ru: 'Песни о свободе, надежде и переменах. Время что-то изменить!',
      en: 'Songs about freedom, hope and change. Time for a change!'
    },
    songs: [
      {
        id: 'WIND_OF_CHANGE',
        title: 'Wind of Change',
        artist: 'Scorpions',
        audioUrl: audioUrl('Scorpions_Wind_of_Change_minus.mp3', '/music/round1/Scorpions_Wind_of_Change_minus.mp3'),
        audioUrlFull: audioUrl('Scorpions_Wind_of_Change.mp3', '/music/round1/Scorpions_Wind_of_Change.mp3'),
        notes: 'Легендарная рок-баллада немецкой группы Scorpions, выпущенная в 1990 году. Песня стала музыкальным символом перемен в Европе после окончания холодной войны. Знаменитое вступление со свистом узнаётся с первых секунд.'
      },
      {
        id: 'ITS_MY_LIFE',
        title: "It's My Life",
        artist: 'Bon Jovi',
        audioUrl: audioUrl('Bon_Jovi_Its_My_Life_minus.mp3', '/music/round1/Bon_Jovi_Its_My_Life_minus.mp3'),
        audioUrlFull: audioUrl('Bon_Jovi_Its_My_Life.mp3', '/music/round1/Bon_Jovi_Its_My_Life.mp3'),
        notes: 'Один из самых известных хитов американской рок-группы Bon Jovi, выпущенный в 2000 году. Песня о независимости, смелости принимать решения и желании самому распоряжаться своей жизнью. Знаменитая строчка «It’s my life» стала настоящим гимном самостоятельности.'
      },
      {
        id: 'I_WANT_TO_BREAK_FREE',
        title: 'I Want to Break Free',
        artist: 'Queen',
        audioUrl: audioUrl('Queen_I_Want_to_Break_Free_minus.mp3', '/music/round1/Queen_I_Want_to_Break_Free_minus.mp3'),
        audioUrlFull: audioUrl('Queen_I_Want_to_Break_Free.mp3', '/music/round1/Queen_I_Want_to_Break_Free.mp3'),
        notes: 'Знаменитый хит британской группы Queen из альбома The Works (1984). Песня о стремлении освободиться от ограничений и жить по собственным правилам. Особенно известен видеоклип, в котором музыканты предстали в необычных образах.'
      },
      {
        id: 'LET_IT_BE',
        title: 'Let It Be',
        artist: 'The Beatles',
        audioUrl: audioUrl('The_Beatles_Let_It_Be_minus.mp3', '/music/round1/The_Beatles_Let_It_Be_minus.mp3'),
        audioUrlFull: audioUrl('The_Beatles_Let_It_Be.mp3', '/music/round1/The_Beatles_Let_It_Be.mp3'),
        notes: 'Одна из самых знаменитых баллад The Beatles, выпущенная в 1970 году. Пол Маккартни написал её после сна о своей матери. Песня напоминает о принятии жизненных трудностей, надежде и спокойствии перед лицом перемен. Её фортепианное вступление узнаваемо во всём мире.'
      }
    ]
  };

  export const romanianCat: Category = {
    id: 'romanian',
    name: { en: 'Romanian hits', ru: 'Румынские хиты' },
    description: {
      ru: 'Солнечная музыка из Румынии и Молдовы. От танцпольных хитов нулевых до задушевных баллад — угадай, что играет.',
      en: 'Sunny music from Romania and Moldova. From 2000s dancefloor anthems to heartfelt ballads — guess what is playing.'
    },
    songs: [
      {
        id: 'PLOUA',
        title: 'Și afară plouă',
        artist: 'Marina Voica',
        audioUrl: audioUrl('Marina_Voica_Si_afara_ploua_ploua_minus_cut_u7istl.mp3', '/music/round1/Marina_Voica_Si_afara_ploua_ploua_minus_cut.mp3'),
        audioUrlFull: audioUrl('Marina_Voica_Si_afara_ploua_ploua_p2h2sm.mp3', '/music/round1/Marina_Voica_Si_afara_ploua_ploua.mp3'),
        notes: 'Лирическая румынская песня о дожде и тоске по любимому. Исполняет Marina Voica — одна из самых узнаваемых голосов румынской эстрады. Название переводится как «И на улице идёт дождь».'
      },
      {
        id: 'DRAGOSTEA',
        title: 'Dragostea din tei',
        artist: 'O-Zone',
        audioUrl: audioUrl('O-Zone-Dragostea-Din-Tei_minus_cut', '/music/round1/O-Zone-Dragostea-Din-Tei_minus_cut.mp3'),
        audioUrlFull: audioUrl('O-Zone-Dragostea-Din-Tei_minus_cut_zb8mnu.mp3', '/music/round1/O-Zone-Dragostea-Din-Tei.mp3'),
        notes: 'Легендарный хит 2004 года, известный во всём мире как «Numa Numa». Молдавская группа O-Zone (Dan Bălan, Arsenie Todiraș, Radu Sîrbu). Музыка и слова — Dan Bălan. «Dragostea din tei» переводится как «Любовь из липы». Одна из самых продаваемых песен в истории Европы.'
      },
      {
        id: 'EROINA',
        title: 'Sub pielea mea (Eroina)',
        artist: 'Carla\'s Dreams',
        audioUrl: audioUrl('Carlas_Dreams_Sub_Pielea_Mea_eroina_minus_cut_cnalsf.mp3', '/music/round1/Carlas_Dreams_Sub_Pielea_Mea_eroina_minus_cut.mp3'),
        audioUrlFull: audioUrl('Carlas__Dreams__Sub_Pielea_Mea_eroina_pwfemn.mp3', '/music/round1/Carlas_ Dreams _Sub_Pielea_Mea_eroina.mp3'),
        notes: 'Современный румынский хит от Carla\'s Dreams (Carla и Alex Cotoi). Название переводится как «Под кожей моей, героиня». Танцевальный трек с элементами румынского фольклора и поп-музыки.'
      },
      {
        id: 'LUMEMI',
        title: 'O lume minunată',
        artist: 'Mihai Constantinescu',
        audioUrl: audioUrl('Mihai_Constantinescu_O_lume_minunata_minus_cut_bq9mhv.mp3', '/music/round1/Mihai_Constantinescu_O_lume_minunata_minus_cut.mp3'),
        audioUrlFull: audioUrl('Mihai_Constantinescu_O_lume_minunata_new_gagene.mp3', '/music/round1/Mihai_Constantinescu_O_lume_minunata_new.mp3'),
        notes: 'Задушевная песня Mihai Constantinescu — одного из классиков румынской эстрады. Название переводится как «Прекрасный мир».'
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
