import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 3 (DUEL) - SET 2 (Q6–Q10) ====================

const R66 = audioUrl('dva_kusocheka_kolbaski-minus_cut_ufsdnx', '/music/round3/dva_kusocheka_kolbaski-minus_cut_ufsdnx.mp3');
const R66f = audioUrl('dva_kusocheka_kolbaski_murtq8', '/music/round3/dva_kusocheka_kolbaski_murtq8.mp3');

const R67 = audioUrl('dolche_gabanna-minus_cut_g8ncuk', '/music/round3/dolche_gabanna-minus_cut_g8ncuk.mp3');
const R67f = audioUrl('dolche_gabanna_pj56fm', '/music/round3/dolche_gabanna_pj56fm.mp3');

const R68 = audioUrl('katjusha-minus_cut_y2erml', '/music/round3/katjusha-minus_cut_y2erml.mp3');
const R68f = audioUrl('katjusha_bvwmml', '/music/round3/katjusha_bvwmml.mp3');

const R69 = audioUrl('nadezhda-kadysheva-techet-ruchey-minus_cut_gqo3pd', '/music/round3/nadezhda-kadysheva-techet-ruchey-minus_cut_gqo3pd.mp3');
const R69f = audioUrl('nadezhda-kadysheva-techet-ruchey_fawp80', '/music/round3/nadezhda-kadysheva-techet-ruchey_fawp80.mp3');

const R610 = audioUrl('topolinii_puh_minus_k2p4ks', '/music/round3/topolinii_puh_minus_k2p4ks.mp3');
const R610f = audioUrl('topolinii_puh_u8pn0f', '/music/round3/topolinii_puh_u8pn0f.mp3');

export const round3v2Set: RoundSet = {
  id: 'round3_v2',
  name: { en: 'Duel – Set 2', ru: 'Дуэль – Набор 2' },
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
          title: 'Song 6 Title',
          artist: 'Artist 6',
          audioUrl: R66,
          audioUrlFull: R66f,
          hint: {
            en: 'The song talks about things that symbolize important moments in life when two people begin a new stage.',
            ru: 'В песне говорится о вещах, которые символизируют важные моменты жизни, когда два человека начинают новый этап.'
          }
        },
        {
          id: 'q7',
          title: 'Song 7 Title',
          artist: 'Artist 7',
          audioUrl: R67,
          audioUrlFull: R67f,
          hint: {
            en: 'A song about how coming of age can be a moment of excitement and anxiety, with deep doubts hidden behind an outward appearance of freedom.',
            ru: 'Песня о том, как наступление совершеннолетия может стать моментом волнения и тревоги, когда за внешней свободой скрываются глубокие сомнения.'
          }
        },
        {
          id: 'q8',
          title: 'Song 8 Title',
          artist: 'Artist 8',
          audioUrl: R68,
          audioUrlFull: R68f,
          hint: {
            en: 'A song about the strongest girl. Love for her has become a symbol of invincible power. The girl has a nickname: BM-13.',
            ru: 'Песня про самую сильную девушку. Любовь к ней превратилась в символ непобедимой мощи. У девушки есть nickname: БМ-13'
          }
        },
        {
          id: 'q9',
          title: 'Song 9 Title',
          artist: 'Artist 9',
          audioUrl: R69,
          audioUrlFull: R69f,
          hint: {
            en: 'A melody often sung around a campfire. It speaks of how lifes paths can run parallel, very close, yet never merge into one, leaving a feeling of bright but inevitable loss.',
            ru: 'Мелодия, что жизненные пути могут идти параллельно, очень близко, но так и не слиться в один, оставив чувство светлой, но неизбежной утраты.'
          }
        },
        {
          id: 'q10',
          title: 'Song 10 Title',
          artist: 'Artist 10',
          audioUrl: R610,
          audioUrlFull: R610f,
          hint: {
            en: 'This song is the soundtrack to summer heat and light sadness. Her main character is summer snow.',
            ru: 'Эта песня — саундтрек к летней жаре и легкой грусти. Её главный герой — летний снег.'
          }
        }
      ]
    }
  ]
};

