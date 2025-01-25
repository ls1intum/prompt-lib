import { PassStatus } from './passStatus'

export interface UpdateCoursePhaseParticipationStatus {
  passStatus: PassStatus
  coursePhaseParticipationIDs: string[]
}
