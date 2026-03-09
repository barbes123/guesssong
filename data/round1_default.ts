import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 1 AUDIO FILES ====================

// Category 1: New Year Songs
const R1C1B1minus = audioUrl('Bubency-detskaya-minus_pyhep9', '/music/round1/Bubency-detskaya-minus_pyhep9.mp3');
const R1C1B1full = audioUrl('Bubency-detskaya_egddvx', '/music/round1/Bubency-detskaya_egddvx.mp3');

const R1C1B2minus = audioUrl('v_lesu_rodilas_elochka-minus_jl95xw', '/music/round1/v_lesu_rodilas_elochka-minus_jl95xw.mp3');
const R1C1B2full = audioUrl('v_lesu_rodilas_elochka_ava2tn', '/music/round1/v_lesu_rodilas_elochka_ava2tn.mp3');

const R1C1B3minus = audioUrl('elochka_elka_lesnoj_aromat_minus_r46ke5', '/music/round1/elochka_elka_lesnoj_aromat_minus_r46ke5.mp3');
const R1C1B3full = audioUrl('elochka_elka_lesnoj_aromat_ygpqcp', '/music/round1/elochka_elka_lesnoj_aromat_ygpqcp.mp3');

const R1C1B4minus = audioUrl('novogodnie-igrushki-minus_hbjhwq', '/music/round1/novogodnie-igrushki-minus_hbjhwq.mp3');
const R1C1B4full = audioUrl('novogodnie-igrushki_wv0i3m', '/music/round1/novogodnie-igrushki_wv0i3m.mp3');

// Category 2: Cinema Songs
const R1C2B1minus = audioUrl('tri-mushketera-minus_m00pud', '/music/round1/tri-mushketera-minus_m00pud.mp3');
const R1C2B1full = audioUrl('tri-mushketera_pbxarx', '/music/round1/tri-mushketera_pbxarx.mp3');

const R1C2B2minus = audioUrl('zvenit-yanvarskaya-vyuga-minus', '/music/round1/zvenit-yanvarskaya-vyuga-minus.mp3');
const R1C2B2full = audioUrl('zvenit-yanvarskaya-vyuga', '/music/round1/zvenit-yanvarskaya-vyuga.mp3');

const R1C2B3minus = audioUrl('pesenka-o-medvedjah-minus_ccuru1', '/music/round1/pesenka-o-medvedjah-minus_ccuru1.mp3');
const R1C2B3full = audioUrl('pesenka-o-medvedjah_ptrxzr', '/music/round1/pesenka-o-medvedjah_ptrxzr.mp3');

const R1C2B4minus = audioUrl('dzhentelmeny-udachi_dlwpir', '/music/round1/dzhentelmeny-udachi_dlwpir.mp3');
const R1C2B4full = audioUrl('dzhentelmeny-udachi_dlwpir', '/music/round1/dzhentelmeny-udachi_dlwpir.mp3'); // Same file for both

// Category 3: School Songs
const R1C3B1minus = audioUrl('dvazhdy_dva_chetyre-minus_itvint', '/music/round1/dvazhdy_dva_chetyre-minus_itvint.mp3');
const R1C3B1full = audioUrl('dvazhdy_dva_chetyre_h4ps2v', '/music/round1/dvazhdy_dva_chetyre_h4ps2v.mp3');

const R1C3B2minus = audioUrl('chemu-uchat_v_shkole-minus_wvevyw', '/music/round1/chemu-uchat_v_shkole-minus_wvevyw.mp3');
const R1C3B2full = audioUrl('chemu_uchat_v_shkole_neq4va', '/music/round1/chemu_uchat_v_shkole_neq4va.mp3');

const R1C3B3minus = audioUrl('pesenka_pervoklassnika_minus_j5c4ho', '/music/round1/pesenka_pervoklassnika_minus_j5c4ho.mp3');
const R1C3B3full = audioUrl('pesenka_pervoklassnika_aveqhs', '/music/round1/pesenka_pervoklassnika_aveqhs.mp3');

const R1C3B4minus = audioUrl('Moy-dobry-uchitel_minus_yi3kem', '/music/round1/Moy-dobry-uchitel_minus_yi3kem.mp3');
const R1C3B4full = audioUrl('Moy-dobry-uchitel_u30wy8', '/music/round1/Moy-dobry-uchitel_u30wy8.mp3');

// Category 4: Animals Songs
const R1C4B1minus = audioUrl('v_trave_sidel_kuznechik_minus_yfib4c', '/music/round1/v_trave_sidel_kuznechik_minus_yfib4c.mp3');
const R1C4B1full = audioUrl('v_trave_sidel_kuznechik_b6ghyx', '/music/round1/v_trave_sidel_kuznechik_b6ghyx.mp3');

const R1C4B2minus = audioUrl('dva_veselyh_gusya_minus_prbjiv', '/music/round1/dva_veselyh_gusya_minus_prbjiv.mp3');
const R1C4B2full = audioUrl('dva_veselyh_gusya_jrlfds', '/music/round1/dva_veselyh_gusya_jrlfds.mp3');

const R1C4B3minus = audioUrl('chernyy-kot-minus_edfpoe', '/music/round1/chernyy-kot-minus_edfpoe.mp3');
const R1C4B3full = audioUrl('chernyy-kot_gw0k50', '/music/round1/chernyy-kot_gw0k50.mp3');

const R1C4B4minus = audioUrl('33_korovy_minus_wgviha', '/music/round1/33_korovy_minus_wgviha.mp3');
const R1C4B4full = audioUrl('33_korovy_siv4yd', '/music/round1/33_korovy_siv4yd.mp3');

export const defaultSet: RoundSet = {
  id: 'default',
  name: {
    en: 'Round1-V1',
    ru: 'Раунд 1 - Набор 1'
  },
  description: {
    en: 'New Year songs, cinema songs, school songs and songs about animals',
    ru: 'Новогодние песни, песни из кино, школьные песни и песни о животных'
  },
  author: 'DT',
  version: '1.0',
  data: [
    {
      id: 'newyear',
      name: { en: 'New Year', ru: 'Новый Год' },
      songs: [
        { 
          id: 'p1_1', 
          title: 'Бубенцы', 
          artist: 'Русская народная песня', 
          audioUrl: R1C1B1minus, 
          audioUrlFull: R1C1B1full,
          notes: 'Народная зимняя песня про бубенцы, популярная на новогодних праздниках. Звон бубенцов ассоциируется с санями, мчащимися по заснеженной дороге, и создаёт праздничное настроение.\n\n«Бубенцы, бубенцы, весело звенят, / Мчатся сани, мчатся сани, мчатся во весь опят. / Эх, вы, кони, вы, кони, что же вы стоите? / Или снег глубокий, или вы устали?»'
        },
        { 
          id: 'p1_2', 
          title: 'В лесу родилась ёлочка', 
          artist: 'Детская новогодняя песня', 
          audioUrl: R1C1B2minus, 
          audioUrlFull: R1C1B2full,
          notes: 'Самая известная новогодняя детская песня, которую знают все поколения. Слова Раисы Кудашевой (1903), музыка Леонида Бекмана. Каждый год звучит на всех ёлках страны.\n\n«В лесу родилась ёлочка, в лесу она росла, / Зимой и летом стройная, зелёная была. / Метель ей пела песенку: "Спи, ёлочка, бай-бай!", / Мороз снежком укутывал: "Смотри, не замерзай!"»'
        },
        { 
          id: 'p1_3', 
          title: 'Ёлочка, ёлка, лесной аромат', 
          artist: 'Детская новогодняя песня', 
          audioUrl: R1C1B3minus, 
          audioUrlFull: R1C1B3full,
          notes: 'Популярная детская песня о новогодней ёлке и праздничном настроении. Воспевает запах хвои и ожидание чуда.\n\n«Ёлочка, ёлка, лесной аромат, / Очень ей нужен красивый наряд. / Пусть эта ёлочка в праздничный час / Каждой иголочкой радует нас, радует нас.»'
        },
        { 
          id: 'p1_4', 
          title: 'Новогодние игрушки', 
          artist: 'Детская новогодняя песня', 
          audioUrl: R1C1B4minus, 
          audioUrlFull: R1C1B4full,
          notes: 'Весёлая песня о ёлочных игрушках, свечах и хлопушках. Создаёт атмосферу волшебства и подготовки к празднику.\n\n«Новогодние игрушки, свечи и хлопушки, / Весело сверкают огоньки. / В этот праздник новогодний ждали мы сегодня / Чуда, словно из доброй сказки.»'
        },
      ]
    },
    {
      id: 'cinema',
      name: { en: 'Cinema', ru: 'Кино' },
      songs: [
        { 
          id: 'r1_1', 
          title: 'Песня мушкетёров', 
          artist: 'Из к/ф «Д\'Артаньян и три мушкетёра»', 
          audioUrl: R1C2B1minus, 
          audioUrlFull: R1C2B1full,
          notes: 'Знаменитая песня мушкетёров из культового фильма 1978 года. Музыка Максима Дунаевского, стихи Юрия Ряшенцева. Стала гимном дружбы и приключений.\n\n«Пора-пора-порадуемся на своём веку, / Красавице и кубку, счастливому клинку! / Пока-пока-покачивая перьями на шляпе, / Судьбе не раз шепнём: "Мерси боку!"»'
        },
        { 
          id: 'r1_2', 
          title: 'Звенит январская вьюга', 
          artist: 'Из к/ф «Иван Васильевич меняет профессию»', 
          audioUrl: R1C2B2minus, 
          audioUrlFull: R1C2B2full,
          notes: 'Песня из комедии Леонида Гайдая «Иван Васильевич меняет профессию» (1973). Исполняет Нина Маслова в роли царицы. Музыка Александра Зацепина, стихи Леонида Дербенёва.\n\n«Звенит январская вьюга, / И ливни хлещут упруго, / И звёзды мчатся по кругу, / И тонет в музыке снегопад. / А я всё жду, когда стихия утихнет, / И ты ко мне, мой мальчик, выйдешь, / И нас никто не остановит, / Ни дождь, ни снег, ни этот звёздопад!»'
        },
        { 
          id: 'r1_3', 
          title: 'Песенка о медведях', 
          artist: 'Из к/ф «Кавказская пленница»', 
          audioUrl: R1C2B3minus, 
          audioUrlFull: R1C2B3full,
          notes: 'Шуточная песня из комедии Леонида Гайдая «Кавказская пленница» (1967). Исполняет Аида Ведищева, музыка Александра Зацепина, стихи Леонида Дербенёва.\n\n«Где-то на белом свете, там, где всегда мороз, / Трутся спиной медведи о земную ось. / Мимо плывут столетья, спят подо льдом моря, / Трутся спиной медведи — вертится Земля.»'
        },
        { 
          id: 'r1_4', 
          title: 'Песня о воспитателях', 
          artist: 'Из к/ф «Джентльмены удачи»', 
          audioUrl: R1C2B4minus, 
          audioUrlFull: R1C2B4full,
          notes: 'Песня из фильма «Джентльмены удачи» (1971) о детском саде и воспитателях. Создаёт тёплую, немного ностальгическую атмосферу.\n\n«Детский сад, детский сад — / Почему так говорят? / Потому что дружно в нём / Мы одной семьёй растём.»'
        },
      ]
    },
    {
      id: 'school',
      name: { en: 'School', ru: 'Школа' },
      songs: [
        { 
          id: 'c1_1', 
          title: 'Дважды два — четыре', 
          artist: 'Владимир Шаинский', 
          audioUrl: R1C3B1minus, 
          audioUrlFull: R1C3B1full,
          notes: 'Весёлая обучающая песня Владимира Шаинского на стихи Михаила Пляцковского о таблице умножения. Стала гимном всех школьников.\n\n«Дважды два — четыре, дважды два — четыре, / Это всем известно в целом мире, / Дважды два — четыре, дважды два — четыре, / Это всем известно в целом мире!»'
        },
        { 
          id: 'c1_2', 
          title: 'Чему учат в школе', 
          artist: 'Владимир Шаинский', 
          audioUrl: R1C3B2minus, 
          audioUrlFull: R1C3B2full,
          notes: 'Песня о школьных предметах и знаниях, которые получают дети. Написана Владимиром Шаинским на стихи Михаила Пляцковского.\n\n«Буквы разные писать тонким пёрышком в тетрадь / Учат в школе, учат в школе, учат в школе. / Вычитать и умножать, малышей не обижать / Учат в школе, учат в школе, учат в школе.»'
        },
        { 
          id: 'c1_3', 
          title: 'Песенка первоклассника', 
          artist: 'Из м/ф «В стране невыученных уроков»', 
          audioUrl: R1C3B3minus, 
          audioUrlFull: R1C3B3full,
          notes: 'Песня о первом классе, школьных принадлежностях и начале учёбы. Весёлая и задорная, поднимает настроение.\n\n«Нагружать всё больше нас стали почему-то, / Нынче в школе первый класс — вроде института. / Я ложусь в двенадцать спать, силы нет раздеться, / Вот бы сразу взрослым стать — отдохнуть от детства!»'
        },
        { 
          id: 'c1_4', 
          title: 'Мой добрый учитель', 
          artist: 'Детская песня', 
          audioUrl: R1C3B4minus, 
          audioUrlFull: R1C3B4full,
          notes: 'Трогательная песня о первом учителе и школьных годах. Исполняется на выпускных и Дне учителя.\n\n«Мой добрый учитель, ну что ж вы молчите? / А в глазах у вас искорки светят. / Мы много узнали, спасибо вам, дети, / За то, что вы лучшие дети на свете.»'
        },
      ]
    },
    {
      id: 'animals',
      name: { en: 'Our smaller brothers', ru: 'Братья наши меньшие' },
      songs: [
        { 
          id: 'rt1_1', 
          title: 'В траве сидел кузнечик', 
          artist: 'Из м/ф «Приключения Незнайки»', 
          audioUrl: R1C4B1minus, 
          audioUrlFull: R1C4B1full,
          notes: 'Весёлая детская песня из мультфильма «Приключения Незнайки». Музыка Владимира Шаинского, стихи Николая Носова. История о кузнечике, который «сидел в траве».\n\n«В траве сидел кузнечик, в траве сидел кузнечик, / Совсем как огуречик, зелёненький он был. / Представьте себе, представьте себе, / Совсем как огуречик, представьте себе, / Зелёненький он был.»'
        },
        { 
          id: 'rt1_2', 
          title: 'Два весёлых гуся', 
          artist: 'Русская народная песня', 
          audioUrl: R1C4B2minus, 
          audioUrlFull: R1C4B2full,
          notes: 'Игровая песня-потешка о двух гусях, популярная в детских садах. Простая и запоминающаяся мелодия.\n\n«Жили у бабуси два весёлых гуся: / Один серый, другой белый — два весёлых гуся. / Мыли гуси лапки в луже у канавки, / Один серый, другой белый — спрятались в канавке.»'
        },
        { 
          id: 'rt1_3', 
          title: 'Чёрный кот', 
          artist: 'Юрий Савичев / группа «Браво»', 
          audioUrl: R1C4B3minus, 
          audioUrlFull: R1C4B3full,
          notes: 'Энергичная песня о чёрном коте как символе неудачи, ставшая хитом 80-х. Музыка Юрия Савичева, стихи Михаила Танича.\n\n«Жил да был чёрный кот за углом, / И кота ненавидел весь дом. / Только песня совсем не о том, / Как не ладили люди с котом.» / «Говорят, не повезёт, если чёрный кот дорогу перейдёт, / А пока наоборот — только чёрному коту и не везёт.»'
        },
        { 
          id: 'rt1_4', 
          title: '33 коровы', 
          artist: 'Из м/ф «Мэри Поппинс, до свидания!»', 
          audioUrl: R1C4B4minus, 
          audioUrlFull: R1C4B4full,
          notes: 'Забавная песня из фильма-мюзикла «Мэри Поппинс, до свидания!» (1983). Музыка Максима Дунаевского, стихи Наума Олева. Поёт Павел Смеян.\n\n«В центре города большого, где травинки не растёт, / Жил поэт, искал любовь он, но который уж там год. / Всё искал, искал, искал, искал, искал, / И в итоге написал: "Тридцать три коровы, тридцать три коровы, / Тридцать три коровы — свежая строка!"»'
        },
      ]
    }
  ]
};