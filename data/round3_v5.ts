import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 3 (DUEL) - SET 2 (Q6–Q10) ====================

export const round3v5Set: RoundSet = {
  id: 'round3_v5',
  name: { en: 'Duel – Set 5', ru: 'Дуэль – Набор 5' },
  description: { en: '5 questions (Q6–Q10)', ru: '5 вопросов (6–10)' },
  author: 'DT',
  version: '1.0',
  data: [
    {
      id: 'r3_v5',
      name: { en: 'Duel', ru: 'Дуэль' },
      songs: [
        {
          id: 'q6',
          title: 'Всё идёт по плану',
          artist: 'Гражданская Оборона',
          audioUrl: audioUrl('vse_idet_po_planu_minus_cut', '/music/round3/vse_idet_po_planu_minus_cut.mp3'),
          audioUrlFull: audioUrl('vse_idet_po_planu', '/music/round3/vse_idet_po_planu.mp3'),
          notes: 'Представь, что тебе выдали расписание на всю жизнь — и забыли спросить, хочешь ли ты по нему идти. Эта песня — не про бунт с кулаками, а про усталую ухмылку человека, который давно понял: система всё разложила по полочкам, а он всё равно стоит и смотрит. За словами прячется холодная ярость — как будто кто-то очень спокойно сообщает тебе, что выхода нет.',
          hint: {
            en: 'A tired smirk of a man who realized the system has arranged everything — and there is nothing left to do but watch.',
            ru: 'Усталая ухмылка человека, который понял: система всё расставила по местам, и остаётся только наблюдать.'
          }
        },
        {
          id: 'q7',
          title: 'Крошка моя',
          artist: 'Руки Вверх!',
          audioUrl: audioUrl('kroshka_moya_minus_cut', '/music/round3/kroshka_moya_minus_cut.mp3'),
          audioUrlFull: audioUrl('kroshka_moya', '/music/round3/kroshka_moya.mp3'),
          notes: 'Парень стоит у окна, смотрит на дождь и мысленно набирает номер, который давно занят... Песня — целая эпоха кассетных магнитофонов, школьных дискотек и первой горькой любви, когда кажется, что весь мир рухнул из-за одной ушедшей девушки. Ласковое словечко, которым он её называет, знает наизусть каждый, кто хоть раз танцевал медляк в спортивном зале. Танцевальный ритм — а под ним сплошная тоска.',
          hint: {
            en: 'A guy staring at the rain, mentally dialing a number that belongs to someone else now. A whole era of cassette players and first heartbreak.',
            ru: 'Парень у окна мысленно набирает номер, который уже занят другим. Целая эпоха кассетников и первой горькой любви.'
          }
        },
        {
          id: 'q8',
          title: 'Нас не догонят',
          artist: 't.A.T.u.',
          audioUrl: audioUrl('nas_ne_dogonyat_minus_cut', '/music/round3/nas_ne_dogonyat_minus_cut.mp3'),
          audioUrlFull: audioUrl('nas_ne_dogonyat', '/music/round3/nas_ne_dogonyat.mp3'),
          notes: 'Две фигуры в школьной форме бегут по мосту, а весь мир пытается их остановить — и не может. Эта песня — про чувство, когда ты молод, зол и уверен, что вдвоём вы неуязвимы, а все взрослые с их правилами просто не успевают за вами. Здесь нет смирения — только ветер в лицо и вызов, брошенный всему вокруг. Знаменитый треков, который знают даже те, кто не понимает ни слова по-русски.',
          hint: {
            en: 'Two figures in school uniforms running across a bridge while the whole world tries to stop them — and fails.',
            ru: 'Две фигуры в школьной форме бегут по мосту, а весь мир пытается их остановить — и не может.'
          }
        },
        {
          id: 'q9',
          title: 'WWW',
          artist: 'Ленинград',
          audioUrl: audioUrl('www_minus_cut', '/music/round3/www_minus_cut.mp3'),
          audioUrlFull: audioUrl('www', '/music/round3/www.mp3'),
          notes: 'Эта песня про три латинские буквы, которые каждый день набирает любой, у кого есть экран и клавиатура. Хриплый мужской, злая сатира на мир, где знакомятся не глаза в глаза, а через аватарки, где реальность подменили лентой и лайками. Петербургские хулиганы словно на самом деле поставили зеркало всему поколению, живущему в сети.',
          hint: {
            en: 'Three Latin letters every screen user types daily — and suddenly it is the title of a song. A mirror held up to a generation living online.',
            ru: 'Три латинские буквы, которые ежедневно набирает каждый, у кого есть экран, — и вдруг это название. Зеркало поколению, живущему в сети.'
          }
        },
        {
          id: 'q10',
          title: 'Солнышко',
          artist: 'Демо',
          audioUrl: audioUrl('solnyshko_minus_cut', '/music/round3/solnyshko_minus_cut.mp3'),
          audioUrlFull: audioUrl('solnyshko', '/music/round3/solnyshko.mp3'),
          notes: 'Слова, которые мы говорим не людям, а чему-то большему которое и делает наш каждый день чуть теплее. Мы даём этому ласковое имя, будто оно большой ребёнок или маленький домашний питомец, но это что-то старше всех нас вместе взятых.',
          hint: {
            en: 'A female voice tenderly addresses what rises above the horizon and warms all living things — but with a dancefloor beat, not a lullaby.',
            ru: 'Женский голос ласково обращается к тому, что встаёт над горизонтом и согревает всё живое, — но под танцевальный ритм, а не колыбельную.'
          }
        }
      ]
    }
  ]
};