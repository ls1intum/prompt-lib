import { PassStatus } from './passStatus'

export interface UpdateCoursePhaseParticipationStatus {
  passStatus: PassStatus
  courseParticipationIDs: string[]
}
