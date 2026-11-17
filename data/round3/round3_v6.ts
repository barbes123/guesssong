import { RoundSet } from '../../types';
import { audioUrl } from '../audioUtils';

// ==================== ROUND 3 (DUEL) - SET 2 (Q6–Q10) ====================

export const round3v6Set: RoundSet = {
  id: 'round3_v6',
  name: { en: 'Duel – Set 6', ru: 'Дуэль – Набор 6' },
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
          title: 'Музыка нас связала',
          artist: 'Мираж',
          audioUrl: audioUrl('muzyka_nas_svyazala_cut.mp3', '/music/round3/muzyka_nas_svyazala_cut.mp3'),
          audioUrlFull: audioUrl('MuzykaNasSviazala_c04h1c.mp3', '/music/round3/MuzykaNasSviazala_c04h1c.mp3'),
          notes: '«Музыка нас связала» вышла в 1988 году и стала визитной карточкой группы «Мираж». Вокал на записи принадлежит Наталии Гулькиной, хотя на обложках и в клипах группа выступала с другой солисткой — из-за этого вокруг «Миража» постоянно ходили слухи о «подмене» вокала. Песня до сих пор считается одним из главных гимнов советской дискотеки конца 80-х.',
          hint: {
            en: 'Two people met not in a cafe and not at work, but where it is loud, dark and everyone is equal — on the dance floor. Since then they are held together not by a shared hobby or friends, but by something invisible that makes hearts beat in time.',
            ru: 'Двое познакомились не в кафе и не на работе, а там, где громко, темно и все равны — на танцполе. С тех пор их держит вместе не общее хобби и не друзья, а что-то невидимое, что заставляет сердца биться в такт.'
          }
        },
        {
          id: 'q7',
          title: 'Лесник',
          artist: 'Король и Шут',
          audioUrl: audioUrl('lesnik_minus', '/music/round3/lesnik.mp3'),
          audioUrlFull: audioUrl('lesnik', '/music/round3/lesnik.mp3'),
          notes: '«Лесник» вошла в культовый альбом «Короля и Шута» «Камнем по голове» (1996). Песня построена на реальной страшилке о леснике, который защищает лес от людей. Горшок (Михаил Горшенёв) называл её одной из самых любимых в репертуаре группы, а фанаты до сих пор считают её визитной карточкой «КиШа» наряду с «Куклой колдуна».',
          hint: {
            en: 'In a deep forest, where the sun is not visible even during the day, lives a man who knows every path and every beast. Locals talk about him in whispers: some consider him a protector, others a threat. This song is an eerie fairy tale about how nature does not divide people into good and evil, but simply does not like it when someone intrudes without asking. And nature has a guardian whom it is better not to meet at night.',
            ru: 'В глухом лесу, где днём не видно солнца, живёт человек, который знает каждую тропу и каждого зверя. Местные рассказывают о нём шёпотом: кто-то считает его защитником, кто-то — угрозой. Эта песня — жутковатая сказка о том, что природа не делит людей на добрых и злых, а просто не любит, когда в неё лезут без спроса. И у природы есть страж, которого лучше не встречать ночью.'
          }
        },
        {
          id: 'q8',
          title: 'Ты меня не ищи',
          artist: 'Вирус',
          audioUrl: audioUrl('ty_menya_ne_ishi_cut', '/music/round3/ty_menya_ne_ishi_cut.mp3'),
          audioUrlFull: audioUrl('ty_menya_ne_ishi', '/music/round3/ty_menya_ne_ishi.mp3'),
          notes: '«Ты меня не ищи» — один из главных хитов группы «Вирус», выпущенный в 1999 году. Коллектив запомнился ярким смешением евродэнса и поп-музыки, а клипы крутились на всех музыкальных каналах. Песня стала настолько популярной, что её до сих пор перепевают современные исполнители, а сам трек считается классикой российской поп-сцены конца 90-х.',
          hint: {
            en: 'She leaves without slamming the door, and leaves behind only a request that makes you cold: do not call, do not come, do not try to find me. This is not a quarrel and not a game — it is a quiet decision made long ago. A song about how a person erases themselves from someone else\'s life and asks not to be looked for even in memory, because it will be easier for both.',
            ru: 'Она уходит, не хлопая дверью, и оставляет после себя только просьбу, от которой становится холодно: не звони, не приезжай, не пытайся найти. Это не ссора и не игра — это тихое решение, принятое давно. Песня о том, как человек стирает себя из чужой жизни и просит не искать его даже в памяти, потому что так будет проще обоим.'
          }
        },
        {
          id: 'q9',
          title: 'Беги от меня',
          artist: 'Гости из будущего',
          audioUrl: audioUrl('begi_ot_menya_cut.mp3', '/music/round3/begi_ot_menya_cut.mp3'),
          audioUrlFull: audioUrl('begi_ot_menya', '/music/round3/begi_ot_menya.mp3'),
          notes: '«Беги от меня» вышла в 1999 году и стала одним из самых узнаваемых треков «Гостей из будущего». Группа, основанная Евой Польной и Юрием Усачёвым, славилась необычным сочетанием электроники и живой поп-музыки. Песня запомнилась запоминающимся припевом и до сих пор звучит на ностальгических вечеринках 90-х.',
          hint: {
            en: 'He warns her like a sign at the edge of a cliff: do not come closer, save yourself while you can. Not because he does not love her, but because he knows — next to him she will be hurt. This is a rare case when a person honestly says: I am dangerous for you, run before it is too late. And in this warning there is more tenderness than in any declarations of love.',
            ru: 'Он предупреждает её, как табличка на краю обрыва: не подходи, спасайся, пока можешь. Не потому что не любит, а потому что знает — рядом с ним ей будет больно. Это редкий случай, когда человек честно говорит: я опасен для тебя, беги, пока не поздно. И в этом предупреждении больше нежности, чем в любых признаниях.'
          }
        },
        {
          id: 'q10',
          title: 'Районы-кварталы',
          artist: 'Звери',
          audioUrl: audioUrl('rayony_kvartaly_cut.mp3', '/music/round3/rayony_kvartaly_cut.mp3'),
          audioUrlFull: audioUrl('rayony_kvartaly', '/music/round3/rayony_kvartaly.mp3'),
          notes: '«Районы-кварталы» вышла в 2004 году и стала одним из главных хитов группы «Звери». Роман Билык (Рома Зверь) написал её о своём детстве в московских спальных районах. Песня мгновенно стала народной — её пели и в машинах, и на кухнях, а клип снимали в реальных дворах, что добавило треку документальности и искренности.',
          hint: {
            en: 'Panel buildings, streetlights, garages and yards where whole generations grew up. For some it is a place they want to escape from, for others — the only home they did not choose but love. This song is about urban jungles where everything is familiar and everything is yours, and about the feeling that these yards and streets have remained inside you forever, wherever you end up.',
            ru: 'Панельные дома, фонари, гаражи и дворы, где выросли целые поколения. Для кого-то это место, откуда хочется сбежать, а для кого-то — единственный дом, который не выбирают, но любят. Эта песня — про городские джунгли, где всё своё и всё знакомо, и про чувство, что эти дворы и улицы навсегда остались внутри, куда бы тебя ни занесло.'
          }
        }
      ]
    }
  ]
};