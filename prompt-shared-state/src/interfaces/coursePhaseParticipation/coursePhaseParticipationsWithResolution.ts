import { CoursePhaseParticipationWithStudent } from './coursePhaseParticipationWithStudent'
import { DataResolution } from './resolution'

export interface CoursePhaseParticipationsWithResolution {
  participations: CoursePhaseParticipationWithStudent[]
  resolutions: DataResolution[]
}
