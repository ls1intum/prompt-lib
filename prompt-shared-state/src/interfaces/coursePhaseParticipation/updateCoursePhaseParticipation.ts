import { PassStatus } from './passStatus'

export interface UpdateCoursePhaseParticipation {
  id: string
  coursePhaseID: string
  courseParticipationID: string
  passStatus?: PassStatus
  restrictedData: { [key: string]: any }
  studentReadableData: { [key: string]: any }
}
