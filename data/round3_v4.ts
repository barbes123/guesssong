import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 3 (DUEL) - SET 4 (Q16–Q20) ====================

const R61 = audioUrl('tuchi-minus_cut_???', '/music/round3/luchshie-medlyaki-ivanushki-int--tuchi_minus_cut.mp3');
const R61f = audioUrl('', '/music/round3/luchshie-medlyaki-ivanushki-int--tuchi.mp3');

const R62 = audioUrl('zayka-moya-minus_cut_???', '/music/round3/Filipp_Krikoryan_Alla_Pugacheva_-_Zajka_moya_minus_cut.mp3');
const R62f = audioUrl('zayka-moya_???', '/music/round3/Filipp_Krikoryan_Alla_Pugacheva_-_Zajka_moya.mp3');

const R63 = audioUrl('kroshka-moya-minus_???', '/music/round3/ruki_vverh_kroshka_moia.mp3');
const R63f = audioUrl('kroshka-moya_???', '/music/round3/ruki_vverh_kroshka_moia.mp3');

const R64 = audioUrl('ah-kakaya-zhenshchina-minus_cut_???', '/music/round3/Fristajl_-_Ah_kakaya_zhencshina_cut.mp3');
const R64f = audioUrl('ah-kakaya-zhenshchina_???', '/music/round3/Fristajl_-_Ah_kakaya_zhencshina.mp3');

const R65 = audioUrl('ya-svoboden-minus_cut_???', '/music/round3/Kipelov_-_YA_svoboden_minus_cut.mp3');
const R65f = audioUrl('ya-svoboden_???', '/music/round3/Kipelov_-_YA_svoboden.mp3');

export const round3v4Set: RoundSet = {
  id: 'round3_v4',
  name: { en: 'Duel – Set 4', ru: 'Дуэль – Набор 4' },
  description: { en: '5 questions (Q16–Q20)', ru: '5 вопросов (16–20)' },
  author: 'DT',
  version: '1.0',
  data: [
    {
      id: 'r3_final',
      name: { en: 'Duel', ru: 'Дуэль' },
      songs: [
        {
          id: 'q16',
          title: 'Тучи',
          artist: 'Иванушки International',
          audioUrl: R61,
          audioUrlFull: R61f,
          notes: 'Песня Игоря Матвиенко на стихи Александра Шаганова вышла в 1998 году и мгновенно стала визитной карточкой группы. Композиция вошла в альбом «Об этом я буду кричать всю ночь».\n\nТучи по небу бегут,\nВдаль торопятся, бегут,\nА под ними я лечу и улыбаюсь.\nОблака белокрылые,\nЧто же вы меня забыли?\nВы меня с собою в небо не взяли.',
          hint: {
            en: 'An anthem of all 90s discos about a meteorological phenomenon that blocks the sun.',
            ru: 'Гимн всех дискотек 90-х о метеорологическом явлении, которое мешает солнцу.'
          }
        },
        {
          id: 'q17',
          title: 'Зайка моя',
          artist: 'Филипп Киркоров и Алла Пугачёва',
          audioUrl: R62,
          audioUrlFull: R62f,
          notes: 'Дуэтная песня, выпущенная в 1994 году, стала одним из самых ярких совместных проектов Примадонны и её супруга. Композиция наполнена юмористическими сравнениями влюблённых друг с другом.\n\nЗайка моя, я твой зайчик,\nМальчик мой, я твой зайчик.\nСолнышко моё, я твой лучик,\nДевочка моя, я твой мальчик.',
          hint: {
            en: 'The most famous duet of two main pop stars, built on endless comparisons of each other with various objects and animals.',
            ru: 'Самый известный дуэт двух главных звезд эстрады, построенный на бесконечном сравнении друг друга с разными предметами и животными.'
          }
        },
        {
          id: 'q18',
          title: 'Крошка моя',
          artist: 'Руки Вверх!',
          audioUrl: R63,
          audioUrlFull: R63f,
          notes: 'Суперхит 1998 года, написанный Сергеем Жуковым. Песня вошла в альбом «Без тормозов» и стала лауреатом премии «Золотой граммофон». Многие считают эту композицию неофициальным гимном российских солдат.\n\nКрошка моя, я по тебе скучаю,\nКрошка моя, я без тебя скучаю.\nКрошка моя, ты где? Я отвечаю:\nДембель без тебя мне в жилу,\nА с тобой — в жилу.',
          hint: {
            en: 'A song about the difficult fate of a soldier who misses his girlfriend while serving in the army, and she doesn\'t write to him.',
            ru: 'Песня о тяжелой судьбе солдата, который очень скучает по своей девушке, пока служит в армии, а она ему не пишет.'
          }
        },
        {
          id: 'q19',
          title: 'Ах, какая женщина',
          artist: 'Фристайл',
          audioUrl: R64,
          audioUrlFull: R64f,
          notes: 'Песня вышла в 1996 году на альбоме «Белая акация». Автором музыки и слов стал солист группы Анатолий Розанов. Композиция до сих пор остаётся одним из главных хитов на всех свадьбах и корпоративах.\n\nАх, какая женщина! Мне б такую,\nЧтоб всю жизнь любить, всю жизнь ревновать.\nАх, какая женщина! Мне б такую,\nЧтоб её одну всю жизнь целовать.',
          hint: {
            en: 'The main slow song of all restaurants and weddings, praising incredible female beauty.',
            ru: 'Главный медляк всех ресторанов и свадеб, воспевающий невероятную женскую красоту.'
          }
        },
        {
          id: 'q20',
          title: 'Я свободен',
          artist: 'Валерий Кипелов (Ария)',
          audioUrl: R65,
          audioUrlFull: R65f,
          notes: 'Легендарная рок-баллада, написанная Валерием Кипеловым и Сергеем Мавриным в 1997 году после ухода из группы «Ария». Песня стала символом русского рока и исполняется на всех крупных рок-фестивалях страны.\n\nЯ свободен, словно птица в небесах,\nЯ свободен, я забыл, что значит страх.\nЯ свободен с диким ветром наравне,\nЯ свободен наяву, а не во сне.',
          hint: {
            en: 'The main rock anthem of the country about the feeling of relief after a final breakup and inner freedom.',
            ru: 'Главный рок-гимн страны о чувстве облегчения после окончательного разрыва и внутренней свободы.'
          }
        }
      ]
    }
  ]
};