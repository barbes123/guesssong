import { RoundSet } from '../../types';
import { audioUrl } from '.././audioUtils';

// ==================== ROUND 3 (DUEL) - SET 2 (Q6–Q10) ====================

export const round3v5Set: RoundSet = {
  id: 'round3_v5',
  name: { en: 'Duel – Set 5', ru: 'Дуэль – Набор 5' },
  description: { en: '5 questions (Q6–Q10)', ru: '5 вопросов (6–10)' },
  author: 'DT',
  version: '1.0',
  data: [
    {
      id: 'r3_final',
      name: { en: 'Duel', ru: 'Дуэль' },
      songs: [
        {
          id: 'q6',
          title: 'Всё идёт по плану',
          artist: 'Гражданская Оборона',
          audioUrl: audioUrl('vse_idet_po_planu_minus_cut', '/music/round3/vse_idet_po_planu_minus_cut.mp3'),
          audioUrlFull: audioUrl('vse_idet_po_planu.mp3', '/music/round3/vse_idet_po_planu.mp3'),
          notes: 'Записана в 1987 году в домашних условиях — Егор Летов использовал самодельное оборудование и записывал вокал в ванной для лучшей акустики. Песня стала неофициальным гимном советского андеграунда и до сих пор звучит на протестных акциях. Сам Летов называл её «песней о том, что каждый человек — винтик, но винтик, который это осознаёт».',
          hint: {
            en: 'Imagine you were given a schedule for your whole life — and forgot to ask whether you want to follow it. This song is not about rebellion with fists, but about the tired smirk of a man who long ago understood: the system has laid everything out on shelves, and he still just stands and watches. Behind the words hides a cold fury — as if someone very calmly informs you that there is no way out.',
            ru: 'Представь, что тебе выдали расписание на всю жизнь — и забыли спросить, хочешь ли ты по нему идти. Эта песня — не про бунт с кулаками, а про усталую ухмылку человека, который давно понял: система всё разложила по полочкам, а он всё равно стоит и смотрит. За словами прячется холодная ярость — как будто кто-то очень спокойно сообщает тебе, что выхода нет.'
          }
        },
        {
          id: 'q7',
          title: 'Такси, такси',
          artist: 'Игорь Николаев',
          audioUrl: audioUrl('green_taxi-minus_cut', '/music/round3/green_taxi-minus_cut.mp3'),
          audioUrlFull: audioUrl('green_taxi.mp3', '/music/round3/green_taxi.mp3'),
          notes: 'Ночью после закрытия ресторана двое решают оставить машину и остановить попутку. В машине только они, водитель молчит, огни города проносятся мимо окна. Это песня о побеге — не от кого-то, а от суеты, о желании просто обнять кого-то и вместе встретить рассвет. Иногда самый романтичный момент случается не в роскошном автомобиле, а на заднем сиденье обычного такси.',
          hint: {
            en: 'Late at night after the restaurant closes, two people decide to leave the car behind and hail a ride. Just the two of them, a silent driver, and city lights passing by.',
            ru: 'Ночью после закрытия ресторана двое решают оставить машину и поймать попутку. Только они, молчаливый водитель и огни города за окном.'
          }
        },
        {
          id: 'q8',
          title: 'Нас не догонят',
          artist: 't.A.T.u.',
          audioUrl: audioUrl('tatu-nas-ne-dogonyat--staraya_minus_cut.mp3', '/music/round3/tatu-nas-ne-dogonyat--staraya_minus_cut.mp3'),
          audioUrlFull: audioUrl('tatu-nas-ne-dogonyat--staraya', '/music/round3/tatu-nas-ne-dogonyat--staraya.mp3'),
          notes: 'Клип на эту песню стал первым русскоязычным видео, попавшим в ротацию MTV Europe. Песня звучала на открытии Олимпиады в Сочи в 2014 году (в другой аранжировке). В 2001 году t.A.T.u. с этим треком выступили на «Евровидении» — правда, с английской версией «Not Gonna Get Us».',
          hint: {
            en: 'Two figures in school uniforms run across a bridge, and the whole world tries to stop them — and cannot. This song is about the feeling when you are young, bold and sure that together you are invincible, and all the adults with their rules simply cannot keep up with you. There is no resignation here — only wind in your face and a challenge thrown to everything around. The famous track that even those who do not understand a word of Russian know.',
            ru: 'Две фигуры в школьной форме бегут по мосту, а весь мир пытается их остановить — и не может. Эта песня — про чувство, когда ты молод, зол и уверен, что вдвоём вы неуязвимы, а все взрослые с их правилами просто не успевают за вами. Здесь нет смирения — только ветер в лицо и вызов, брошенный всему вокруг. Знаменитый треков, который знают даже те, кто не понимает ни слова по-русски.'
          }
        },
        {
          id: 'q9',
          title: 'WWW',
          artist: 'Ленинград',
          audioUrl: audioUrl('www_cut', '/music/round3/www_cut.mp3'),
          audioUrlFull: audioUrl('www', '/music/round3/www_good.mp3'),
          notes: 'Сергей Шнуров написал эту песню в 2002 году, задолго до эпохи смартфонов и соцсетей — и она оказалась пророческой. В клипе снимались обычные петербуржцы, а сам трек стал одним из первых в России, где интернет-культура стала объектом сатиры. Шнуров не раз говорил, что считает её одной из самых недооценённых песен группы.',
          hint: {
            en: 'This song is about three Latin letters that anyone with a screen and a keyboard types every day. A hoarse male voice, an angry satire on a world where people meet not eye to eye but through avatars, where reality has been replaced by a feed and likes. The Petersburg hooligans seem to have actually held up a mirror to an entire generation living online.',
            ru: 'Эта песня про три латинские буквы, которые каждый день набирает любой, у кого есть экран и клавиатура. Хриплый мужской, злая сатира на мир, где знакомятся не глаза в глаза, а через аватарки, где реальность подменили лентой и лайками. Петербургские хулиганы словно на самом деле поставили зеркало всему поколению, живущему в сети.'
          }
        },
        {
          id: 'q10',
          title: 'Солнышко',
          artist: 'Демо',
          audioUrl: audioUrl('solnyshko_cut', '/music/round3/solnyshko_cut.mp3'),
          audioUrlFull: audioUrl('solnyshko', '/music/round3/solnyshko.mp3'),
          notes: 'Группа «Демо» была одним из самых ярких представителей российского евродэнса конца 90-х. «Солнышко» вышла в 1999 году и мгновенно стала хитом — её крутили на всех радиостанциях и в клубах. Солистка Саша Зверева позже признавалась, что текст песни казался ей «слишком детским», но именно это и сделало её народной.',
          hint: {
            en: 'Words that we say not to people but to something greater that makes each of our days a little warmer. We give it an affectionate name, as if it were a big child or a small pet, but this something is older than all of us put together.',
            ru: 'Слова, которые мы говорим не людям, а чему-то большему которое и делает наш каждый день чуть теплее. Мы даём этому ласковое имя, будто оно большой ребёнок или маленький домашний питомец, но это что-то старше всех нас вместе взятых.'
          }
        }
      ]
    }
  ]
};