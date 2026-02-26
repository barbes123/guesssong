import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 3 (DUEL) - DEFAULT SET (Q1–Q5) ====================
// Uses Round 6 audio assets (legacy) but is presented as Round 3 in the app.

const R61 = audioUrl('pesenka-krokodila-geny-minus_ebmqsh', '/music/round3/pesenka-krokodila-geny-minus_ebmqsh.mp3');
const R61f = audioUrl('pesenka-krokodila-geny_ggehic', '/music/round3/pesenka-krokodila-geny_ggehic.mp3');

const R62 = audioUrl('kukushka-minus_cut_ncxht2', '/music/round3/kukushka-minus_cut_ncxht2.mp3');
const R62f = audioUrl('kukushka_ff7ce8', '/music/round3/kukushka_ff7ce8.mp3');

const R63 = audioUrl('veter_peremen_minus_cut_powyye', '/music/round3/veter_peremen_minus_cut_powyye.mp3');
const R63f = audioUrl('veter_peremen_qgqsck', '/music/round3/veter_peremen_qgqsck.mp3');

const R64 = audioUrl('vyydu-noch-yu-v-pole-s-konem-minus_cut_mdphjn', '/music/round3/vyydu-noch-yu-v-pole-s-konem-minus_cut_mdphjn.mp3');
const R64f = audioUrl('vyydu-noch-yu-v-pole-s-konem_x004md', '/music/round3/vyydu-noch-yu-v-pole-s-konem_x004md.mp3');

const R65 = audioUrl('antoshka_minus_ttcnms', '/music/round3/antoshka_minus_ttcnms.mp3');
const R65f = audioUrl('antoshka_fpdxti', '/music/round3/antoshka_fpdxti.mp3');

export const defaultSet: RoundSet = {
  id: 'default',
  name: { en: 'Duel – Set 1', ru: 'Дуэль – Набор 1' },
  description: { en: '5 questions (Q1–Q5)', ru: '5 вопросов (1–5)' },
  author: 'DT',
  version: '1.0',
  data: [
    {
      id: 'r3_final',
      name: { en: 'Duel', ru: 'Дуэль' },
      songs: [
        {
          id: 'q1',
          title: 'Smooth Criminal',
          artist: 'Michael Jackson',
          audioUrl: R61,
          audioUrlFull: R61f,
          hint: {
            en: 'This song sounds in the moment of loneliness. In the song there are noisy running heroes. In the song there is a contrast between the grayness of the surrounding world and the joyful occasion.',
            ru: 'Эта песня звучит в момент одиночества. В песне есть шумные бегущие герои, подчеркивается контраст между серостью окружающего мира и радостным поводом.'
          }
        },
        {
          id: 'q2',
          title: 'Billie Jean',
          artist: 'Michael Jackson',
          audioUrl: R62,
          audioUrlFull: R62f,
          hint: {
            en: 'A song about someone who can tell you the allotted time of life.',
            ru: 'Песня про того, кто может сообщить отмеренное время жизни.'
          }
        },
        {
          id: 'q3',
          title: 'Bohemian Rhapsody',
          artist: 'Queen',
          audioUrl: R63,
          audioUrlFull: R63f,
          hint: {
            en: 'A song about a natural phenomenon that brings change.',
            ru: 'Песня про явление природы которое приносит изменения.'
          }
        },
        {
          id: 'q4',
          title: 'Take On Me',
          artist: 'a-ha',
          audioUrl: R64,
          audioUrlFull: R64f,
          hint: {
            en: 'In this song, forward movement occurs in silence, under the gaze of countless witnesses who will never speak. It features two companions, one alive, the other seemingly eternal. Together, they move through space and time.',
            ru: 'В этой песне движение вперёд происходит в тишине, под взглядом бесчисленных свидетелей, которые никогда не скажут ни слова. В ней есть два спутника, один из которых живой, а другой кажется вечным. Вместе они идут сквозь пространство и время.'
          }
        },
        {
          id: 'q5',
          title: 'Rolling in the Deep',
          artist: 'Adele',
          audioUrl: R65,
          audioUrlFull: R65f,
          hint: {
            en: 'When the hero of this song encounters something completely new and unexpected, his reaction is: "Did this really happen in the textbook?"',
            ru: 'Когда герой этой песни сталкивается с чем-то совершенно новым и неожиданным, его реакция — это: "А это точно было в учебнике?"'
          }
        }
      ]
    }
  ]
};

