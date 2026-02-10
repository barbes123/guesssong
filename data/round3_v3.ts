import { RoundSet } from '../types';
import { audioUrl } from './audioUtils';

// ==================== ROUND 3 (DUEL) - SET 3 (Q11–Q15) ====================
// ВНИМАНИЕ: этот набор использует те же аудиофайлы, что и Set 1
// Нужно добавить новые аудиофайлы для уникальных песен

const R61 = audioUrl('pesenka-krokodila-geny-minus_ebmqsh', '/music/round6/pesenka-krokodila-geny-minus.mp3');
const R61f = audioUrl('pesenka-krokodila-geny_ggehic', '/music/round6/pesenka-krokodila-geny.mp3');

const R62 = audioUrl('kukushka-minus_cut_ncxht2', '/music/round6/kukushka-minus_cut.mp3');
const R62f = audioUrl('kukushka_ff7ce8', '/music/round6/kukushka.mp3');

const R63 = audioUrl('veter_peremen_minus_cut_powyye', '/music/round6/veter_peremen_minus_cut.mp3');
const R63f = audioUrl('veter_peremen_qgqsck', '/music/round6/veter_peremen.mp3');

const R64 = audioUrl('vyydu-noch-yu-v-pole-s-konem-minus_cut_mdphjn', '/music/round6/vyydu-noch-yu-v-pole-s-konem-minus_cut.mp3');
const R64f = audioUrl('vyydu-noch-yu-v-pole-s-konem_x004md', '/music/round6/vyydu-noch-yu-v-pole-s-konem-minus.mp3');

const R65 = audioUrl('antoshka_minus_ttcnms', '/music/round6/antoshka_minus.mp3');
const R65f = audioUrl('antoshka_fpdxti', '/music/round6/antoshka.mp3');

export const round3v3Set: RoundSet = {
  id: 'round3_v3',
  name: { en: 'Duel – Set 3', ru: 'Дуэль – Набор 3' },
  description: { en: '5 questions (Q11–Q15)', ru: '5 вопросов (11–15)' },
  author: 'DT',
  version: '1.0',
  data: [
    {
      id: 'r3_final',
      name: { en: 'Duel', ru: 'Дуэль' },
      songs: [
        {
          id: 'q11',
          title: 'Песенка крокодила Гены',
          artist: 'Из м/ф "Чебурашка"',
          audioUrl: R61,
          audioUrlFull: R61f,
          hint: {
            en: 'This song sounds in the moment of loneliness. In the song there are noisy running heroes. In the song there is a contrast between the grayness of the surrounding world and the joyful occasion.',
            ru: 'Эта песня звучит в момент одиночества. В песне есть шумные бегущие герои, подчеркивается контраст между серостью окружающего мира и радостным поводом.'
          }
        },
        {
          id: 'q12',
          title: 'Кукушка',
          artist: 'Виктор Цой',
          audioUrl: R62,
          audioUrlFull: R62f,
          hint: {
            en: 'A song about someone who can tell you the allotted time of life.',
            ru: 'Песня про того, кто может сообщить отмеренное время жизни.'
          }
        },
        {
          id: 'q13',
          title: 'Ветер перемен',
          artist: 'Из м/ф "Бременские музыканты"',
          audioUrl: R63,
          audioUrlFull: R63f,
          hint: {
            en: 'A song about a natural phenomenon that brings change.',
            ru: 'Песня про явление природы которое приносит изменения.'
          }
        },
        {
          id: 'q14',
          title: 'Выйду ночью в поле с конём',
          artist: 'Русская народная песня',
          audioUrl: R64,
          audioUrlFull: R64f,
          hint: {
            en: 'In this song, forward movement occurs in silence, under the gaze of countless witnesses who will never speak. It features two companions, one alive, the other seemingly eternal. Together, they move through space and time.',
            ru: 'В этой песне движение вперёд происходит в тишине, под взглядом бесчисленных свидетелей, которые никогда не скажут ни слова. В ней есть два спутника, один из которых живой, а другой кажется вечным. Вместе они идут сквозь пространство и время.'
          }
        },
        {
          id: 'q15',
          title: 'Антошка',
          artist: 'Детская песня',
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
