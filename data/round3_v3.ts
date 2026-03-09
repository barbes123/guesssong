import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 3 (DUEL) - NEW SET (5 songs) ====================

const R71 = audioUrl('hutoryanka-minus-all_cut', '/music/round3/hutoryanka-minus-all_cut.mp3');
const R71f = audioUrl('hutoryanka', '/music/round3/hutoryanka.mp3');

const R72 = audioUrl('valenki-da-valenki', '/music/round3/valenki-da-valenki.mp3');
const R72f = audioUrl('valenki-da-valenki-full', '/music/round3/valenki-da-valenki.mp3');

const R73 = audioUrl('lyuli-lyuli--vo-pole-bereza-stoyala_cut', '/music/round3/lyuli-lyuli--vo-pole-bereza-stoyala_cut.mp3');
const R73f = audioUrl('lyuli-lyuli--vo-pole-bereza-stoyala', '/music/round3/lyuli-lyuli--vo-pole-bereza-stoyala.mp3');

const R74 = audioUrl('yablochko-bystroe--yablochko-bystroe', '/music/round3/yablochko-bystroe--yablochko-bystroe.mp3');
const R74f = audioUrl('yablochko-bystroe--yablochko-bystroe-full', '/music/round3/yablochko-bystroe--yablochko-bystroe.mp3');

const R75 = audioUrl('mumi_trol_utekai_minus_cut', '/music/round3/mumi_trol_utekai_minus_cut.mp3');
const R75f = audioUrl('mumi_trol_utekai', '/music/round3/mumi_trol_utekai_minus.mp3');

export const round3v3Set: RoundSet = {
  id: 'round3_v3',
  name: { en: 'Duel – Set 3', ru: 'Дуэль – Набор 3' },
  description: { en: '5 folk and pop songs', ru: '5 народных и эстрадных песен' },
  author: 'DT',
  version: '1.0',
  data: [
    {
      id: 'r3_final',
      name: { en: 'Duel', ru: 'Дуэль' },
      songs: [
        {
          id: 'q21',
          title: 'Хуторянка',
          artist: 'София Ротару',
          audioUrl: R71,
          audioUrlFull: R71f,
          notes: 'Песня вошла в репертуар Софии Ротару в 1990-х годах и стала одной из визитных карточек певицы. Композиция сочетает эстрадное звучание с украинскими народными мотивами.\n\nА на хуторе, на хуторе,\nНа хуторе нашем,\nНет девчонки краше.\nХуторянка, хуторянка,\nЧернобровая цыганка.',
          hint: {
            en: 'In this song, the proud inhabitant of a small southern farmstead is glorified.',
            ru: 'В этой песне воспевается гордая жительница небольшого южного хутора.'
          }
        },
        {
          id: 'q22',
          title: 'Валенки',
          artist: 'Лидия Русланова',
          audioUrl: R72,
          audioUrlFull: R72f,
          notes: 'Песня стала особенно популярной во время Великой Отечественной войны благодаря Лидии Руслановой, которая исполняла её на фронте. Изначально это была плясовая цыганская песня, но Русланова сделала её поистине народной.\n\nВаленки, валенки,\nНе подшиты, стареньки.\nНельзя валенки носить,\nНе в чем к милому ходить.\nВаленки, валенки,\nЭх, не подшиты, стареньки.',
          hint: {
            en: 'This song is an anthem to the most practical winter footwear worn by our grandparents.',
            ru: 'Эта песня — гимн самой практичной зимней обуви, которую носили наши бабушки и дедушки.'
          }
        },
        {
          id: 'q23',
          title: 'Во поле берёза стояла',
          artist: 'Русская народная',
          audioUrl: R73,
          audioUrlFull: R73f,
          notes: 'Первая публикация песни датируется 1790 годом. Она вдохновляла многих композиторов, включая Чайковского, который использовал её мелодию в финале Четвертой симфонии. Традиционно девушки водили вокруг берёзы хороводы на Троицу.\n\nВо поле берёза стояла,\nВо поле кудрявая стояла.\nЛюли, люли, стояла,\nЛюли, люли, стояла.\nНекому берёзу заломати,\nНекому кудряву заломати.',
          hint: {
            en: 'This song is the most famous Russian round dance. They don\'t just dance to it, they literally "weave" around.',
            ru: 'Эта песня — самый популярный русский хоровод. Под неё не танцуют, а буквально «вьются».'
          }
        },
        {
          id: 'q24',
          title: 'Эх, яблочко',
          artist: 'Русская народная (частушка)',
          audioUrl: R74,
          audioUrlFull: R74f,
          notes: 'Появилась в начале XX века как матросская плясовая. Существует более сотни вариантов текста — от сатирических до политических. Во время Гражданской войны песню исполняли и красные, и белые, переделывая слова на свой лад.\n\nЭх, яблочко,\nДа куда котишься?\nКо мне в рот попадешь —\nДа не воротишься.\nЭх, яблочко,\nДа на тарелочке.',
          hint: {
            en: 'The title of this song matches the name of a juicy round fruit.',
            ru: 'Название этой песни совпадает с названием сочного круглого фрукта.'
          }
        },
        {
          id: 'q25',
          title: 'Утекай',
          artist: 'Мумий Тролль',
          audioUrl: R75,
          audioUrlFull: R75f,
          notes: 'Песня с легендарного альбома «Морская», который в 1997 году произвел революцию в русском роке и открыл эпоху «новых волн». Характерный вокал Ильи Лагутенко и необычные тексты сделали группу культовой.\n\nУтекай, пока не поздно,\nУтекай, туман развёлся.\nУтекай, вода по трубам,\nУтекай к чужим подругам.\nА у нас своя волна,\nА у нас своя волна.',
          hint: {
            en: 'The performer advises someone to urgently hide due to an impending danger.',
            ru: 'Исполнитель советует кому-то срочно скрыться, ввиду надвигающейся опасности.'
          }
        }
      ]
    }
  ]
};