import { PassStatus } from './passStatus'

export interface UpdateCoursePhaseParticipation {
  id: string
  coursePhaseID: string
  courseParticipationID: string
  passStatus?: PassStatus
  metaData: { [key: string]: any }
}
