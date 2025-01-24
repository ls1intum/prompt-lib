import { Student } from '../student/student'
import { PassStatus } from './passStatus'

export interface CoursePhaseParticipationWithStudent {
  id: string
  passStatus: PassStatus
  courseParticipationID: string
  metaData: { [key: string]: any }
  prevMetaData: { [key: string]: any }
  student: Student
}
