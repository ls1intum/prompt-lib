import { Student } from '../student/student'
import { PassStatus } from './passStatus'

export interface CoursePhaseParticipationWithStudent {
  id: string
  passStatus: PassStatus
  courseParticipationID: string
  restrictedData: { [key: string]: any }
  studentReadableData: { [key: string]: any }
  prevData: { [key: string]: any }
  student: Student
}
