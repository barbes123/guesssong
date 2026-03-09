import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 1 AUDIO FILES ====================
// Category 1: New Year Songs
const R1C1B1minus = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');
const R1C1B1full = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');

const R1C1B2minus = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');
const R1C1B2full = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');

const R1C1B3minus = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');
const R1C1B3full = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');

const R1C1B4minus = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');
const R1C1B4full = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');

// Category 2: Cinema Songs
const R1C2B1minus = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');
const R1C2B1full = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');

const R1C2B2minus = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');
const R1C2B2full = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');

const R1C2B3minus = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');
const R1C2B3full = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');

const R1C2B4minus = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');
const R1C2B4full = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');

// Category 3: School Songs
const R1C3B1minus = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');
const R1C3B1full = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');

const R1C3B2minus = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');
const R1C3B2full = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');

const R1C3B3minus = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');
const R1C3B3full = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');

const R1C3B4minus = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');
const R1C3B4full = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');

// Category 4: Animals Songs
const R1C4B1minus = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');
const R1C4B1full = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');

const R1C4B2minus = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');
const R1C4B2full = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');

const R1C4B3minus = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');
const R1C4B3full = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');

const R1C4B4minus = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');
const R1C4B4full = audioUrl('splin-nastroyka_zvuka_f2jv0m', '/music/round0/splin-nastroyka_zvuka.mp3');

export const defaultSet: RoundSet = {
  id: 'default',
  name: {
    en: 'Round0',
    ru: 'Роунд0'
  },
  description: {
    en: '',
    ru: ''
  },
  author: 'DT',
  version: '1.0',
  data: [
    {
      id: 'settings1',
      name: { en: 'Settings 1', ru: 'Настройка 1 ' },
      songs: [
        { 
          id: 'p1_1', 
          title: 'Настройка звука', 
          artist: 'Sound Settings', 
          audioUrl: R1C1B1minus, 
          audioUrlFull: R1C1B1full,
          notes: ' десятый студийный альбом российской рок-группы «Сплин», вышедший 22 сентября 2009 года после более чем двухлетнего перерыва]. «Сигнал из космоса» состоит из 18 композиций и является рекордсменом среди всех альбомов группы по количеству песен. Музыкально пластинка мало похожа на предыдущие работы группы. Альбом посвящён сыну Александра Васильева, рождение которого оказало сильное влияние на создание пластинки. Презентация альбома перед широкой публикой состоялась 3 октября 2009 года в СК «Олимпийский».'
        },
        { 
          id: 'p1_2', 
          title: 'Настройка звука', 
          artist: 'Sound Settings', 
          audioUrl: R1C1B2minus, 
          audioUrlFull: R1C1B2full,
          notes: ' десятый студийный альбом российской рок-группы «Сплин», вышедший 22 сентября 2009 года после более чем двухлетнего перерыва]. «Сигнал из космоса» состоит из 18 композиций и является рекордсменом среди всех альбомов группы по количеству песен. Музыкально пластинка мало похожа на предыдущие работы группы. Альбом посвящён сыну Александра Васильева, рождение которого оказало сильное влияние на создание пластинки. Презентация альбома перед широкой публикой состоялась 3 октября 2009 года в СК «Олимпийский».'
        },
        { 
          id: 'p1_3', 
          title: 'Настройка звука', 
          artist: 'Sound Settings', 
          audioUrl: R1C1B3minus, 
          audioUrlFull: R1C1B3full,
          notes: ' десятый студийный альбом российской рок-группы «Сплин», вышедший 22 сентября 2009 года после более чем двухлетнего перерыва]. «Сигнал из космоса» состоит из 18 композиций и является рекордсменом среди всех альбомов группы по количеству песен. Музыкально пластинка мало похожа на предыдущие работы группы. Альбом посвящён сыну Александра Васильева, рождение которого оказало сильное влияние на создание пластинки. Презентация альбома перед широкой публикой состоялась 3 октября 2009 года в СК «Олимпийский».'
        },
        { 
          id: 'p1_4', 
          title: 'Настройка звука', 
          artist: 'Sound Settings', 
          audioUrl: R1C1B4minus, 
          audioUrlFull: R1C1B4full,
          notes: ' десятый студийный альбом российской рок-группы «Сплин», вышедший 22 сентября 2009 года после более чем двухлетнего перерыва]. «Сигнал из космоса» состоит из 18 композиций и является рекордсменом среди всех альбомов группы по количеству песен. Музыкально пластинка мало похожа на предыдущие работы группы. Альбом посвящён сыну Александра Васильева, рождение которого оказало сильное влияние на создание пластинки. Презентация альбома перед широкой публикой состоялась 3 октября 2009 года в СК «Олимпийский».'
        },
      ]
    },
    {
      id: 'settings2',
      name: { en: 'Settings 2', ru: 'Настройка 2' },
      songs: [
        { 
          id: 'r1_1', 
          title: 'Настройка звука', 
          artist: 'Sound Settings', 
          audioUrl: R1C2B1minus, 
          audioUrlFull: R1C2B1full,
          notes: ' десятый студийный альбом российской рок-группы «Сплин», вышедший 22 сентября 2009 года после более чем двухлетнего перерыва]. «Сигнал из космоса» состоит из 18 композиций и является рекордсменом среди всех альбомов группы по количеству песен. Музыкально пластинка мало похожа на предыдущие работы группы. Альбом посвящён сыну Александра Васильева, рождение которого оказало сильное влияние на создание пластинки. Презентация альбома перед широкой публикой состоялась 3 октября 2009 года в СК «Олимпийский».'
        },
        { 
          id: 'r1_2', 
          title: 'Настройка звука', 
          artist: 'Sound Settings', 
          audioUrl: R1C2B2minus, 
          audioUrlFull: R1C2B2full,
          notes: ' десятый студийный альбом российской рок-группы «Сплин», вышедший 22 сентября 2009 года после более чем двухлетнего перерыва]. «Сигнал из космоса» состоит из 18 композиций и является рекордсменом среди всех альбомов группы по количеству песен. Музыкально пластинка мало похожа на предыдущие работы группы. Альбом посвящён сыну Александра Васильева, рождение которого оказало сильное влияние на создание пластинки. Презентация альбома перед широкой публикой состоялась 3 октября 2009 года в СК «Олимпийский».'
        },
        { 
          id: 'r1_3', 
          title: 'Настройка звука', 
          artist: 'Sound Settings', 
          audioUrl: R1C2B3minus, 
          audioUrlFull: R1C2B3full,
          notes: ' десятый студийный альбом российской рок-группы «Сплин», вышедший 22 сентября 2009 года после более чем двухлетнего перерыва]. «Сигнал из космоса» состоит из 18 композиций и является рекордсменом среди всех альбомов группы по количеству песен. Музыкально пластинка мало похожа на предыдущие работы группы. Альбом посвящён сыну Александра Васильева, рождение которого оказало сильное влияние на создание пластинки. Презентация альбома перед широкой публикой состоялась 3 октября 2009 года в СК «Олимпийский».'
        },
        { 
          id: 'r1_4', 
          title: 'Настройка звука', 
          artist: 'Sound Settings', 
          audioUrl: R1C2B4minus, 
          audioUrlFull: R1C2B4full,
          notes: ' десятый студийный альбом российской рок-группы «Сплин», вышедший 22 сентября 2009 года после более чем двухлетнего перерыва]. «Сигнал из космоса» состоит из 18 композиций и является рекордсменом среди всех альбомов группы по количеству песен. Музыкально пластинка мало похожа на предыдущие работы группы. Альбом посвящён сыну Александра Васильева, рождение которого оказало сильное влияние на создание пластинки. Презентация альбома перед широкой публикой состоялась 3 октября 2009 года в СК «Олимпийский».'
        },
      ]
    },
    {
      id: 'settings3',
      name: { en: 'Settings 3', ru: 'Настройка 3' },
      songs: [
        { 
          id: 'c1_1', 
          title: 'Настройка звука', 
          artist: 'Sound Settings', 
          audioUrl: R1C3B1minus, 
          audioUrlFull: R1C3B1full,
          notes: ' десятый студийный альбом российской рок-группы «Сплин», вышедший 22 сентября 2009 года после более чем двухлетнего перерыва]. «Сигнал из космоса» состоит из 18 композиций и является рекордсменом среди всех альбомов группы по количеству песен. Музыкально пластинка мало похожа на предыдущие работы группы. Альбом посвящён сыну Александра Васильева, рождение которого оказало сильное влияние на создание пластинки. Презентация альбома перед широкой публикой состоялась 3 октября 2009 года в СК «Олимпийский».'
        },
        { 
          id: 'c1_2', 
          title: 'Настройка звука', 
          artist: 'Sound Settings', 
          audioUrl: R1C3B2minus, 
          audioUrlFull: R1C3B2full,
          notes: ' десятый студийный альбом российской рок-группы «Сплин», вышедший 22 сентября 2009 года после более чем двухлетнего перерыва]. «Сигнал из космоса» состоит из 18 композиций и является рекордсменом среди всех альбомов группы по количеству песен. Музыкально пластинка мало похожа на предыдущие работы группы. Альбом посвящён сыну Александра Васильева, рождение которого оказало сильное влияние на создание пластинки. Презентация альбома перед широкой публикой состоялась 3 октября 2009 года в СК «Олимпийский».'
        },
        { 
          id: 'c1_3', 
          title: 'Настройка звука', 
          artist: 'Sound Settings', 
          audioUrl: R1C3B3minus, 
          audioUrlFull: R1C3B3full,
          notes: ' десятый студийный альбом российской рок-группы «Сплин», вышедший 22 сентября 2009 года после более чем двухлетнего перерыва]. «Сигнал из космоса» состоит из 18 композиций и является рекордсменом среди всех альбомов группы по количеству песен. Музыкально пластинка мало похожа на предыдущие работы группы. Альбом посвящён сыну Александра Васильева, рождение которого оказало сильное влияние на создание пластинки. Презентация альбома перед широкой публикой состоялась 3 октября 2009 года в СК «Олимпийский».'
        },
        { 
          id: 'c1_4', 
          title: 'Настройка звука', 
          artist: 'Sound Settings', 
          audioUrl: R1C3B4minus, 
          audioUrlFull: R1C3B4full,
          notes: ' десятый студийный альбом российской рок-группы «Сплин», вышедший 22 сентября 2009 года после более чем двухлетнего перерыва]. «Сигнал из космоса» состоит из 18 композиций и является рекордсменом среди всех альбомов группы по количеству песен. Музыкально пластинка мало похожа на предыдущие работы группы. Альбом посвящён сыну Александра Васильева, рождение которого оказало сильное влияние на создание пластинки. Презентация альбома перед широкой публикой состоялась 3 октября 2009 года в СК «Олимпийский».'
        },
      ]
    },
    {
      id: 'settings4',
      name: { en: 'Settings 4', ru: 'Настройка 4' },
      songs: [
        { 
          id: 'rt1_1', 
          title: 'Настройка звука', 
          artist: 'Sound Settings', 
          audioUrl: R1C4B1minus, 
          audioUrlFull: R1C4B1full,
          notes: ' десятый студийный альбом российской рок-группы «Сплин», вышедший 22 сентября 2009 года после более чем двухлетнего перерыва]. «Сигнал из космоса» состоит из 18 композиций и является рекордсменом среди всех альбомов группы по количеству песен. Музыкально пластинка мало похожа на предыдущие работы группы. Альбом посвящён сыну Александра Васильева, рождение которого оказало сильное влияние на создание пластинки. Презентация альбома перед широкой публикой состоялась 3 октября 2009 года в СК «Олимпийский».'
        },
        { 
          id: 'rt1_2', 
          title: 'Настройка звука', 
          artist: 'Sound Settings', 
          audioUrl: R1C4B2minus, 
          audioUrlFull: R1C4B2full,
          notes: ' десятый студийный альбом российской рок-группы «Сплин», вышедший 22 сентября 2009 года после более чем двухлетнего перерыва]. «Сигнал из космоса» состоит из 18 композиций и является рекордсменом среди всех альбомов группы по количеству песен. Музыкально пластинка мало похожа на предыдущие работы группы. Альбом посвящён сыну Александра Васильева, рождение которого оказало сильное влияние на создание пластинки. Презентация альбома перед широкой публикой состоялась 3 октября 2009 года в СК «Олимпийский».'
        },
        { 
          id: 'rt1_3', 
          title: 'Настройка звука', 
          artist: 'Sound Settings', 
          audioUrl: R1C4B3minus, 
          audioUrlFull: R1C4B3full,
          notes: ' десятый студийный альбом российской рок-группы «Сплин», вышедший 22 сентября 2009 года после более чем двухлетнего перерыва]. «Сигнал из космоса» состоит из 18 композиций и является рекордсменом среди всех альбомов группы по количеству песен. Музыкально пластинка мало похожа на предыдущие работы группы. Альбом посвящён сыну Александра Васильева, рождение которого оказало сильное влияние на создание пластинки. Презентация альбома перед широкой публикой состоялась 3 октября 2009 года в СК «Олимпийский».'
        },
        { 
          id: 'rt1_4', 
          title: 'Настройка звука', 
          artist: 'Sound Settings', 
          audioUrl: R1C4B4minus, 
          audioUrlFull: R1C4B4full,
          notes: ' десятый студийный альбом российской рок-группы «Сплин», вышедший 22 сентября 2009 года после более чем двухлетнего перерыва]. «Сигнал из космоса» состоит из 18 композиций и является рекордсменом среди всех альбомов группы по количеству песен. Музыкально пластинка мало похожа на предыдущие работы группы. Альбом посвящён сыну Александра Васильева, рождение которого оказало сильное влияние на создание пластинки. Презентация альбома перед широкой публикой состоялась 3 октября 2009 года в СК «Олимпийский».'
        },
      ]
    }
  ]
};