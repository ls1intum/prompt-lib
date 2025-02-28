import { Student } from '../student/student'
import { PassStatus } from './passStatus'

export interface CoursePhaseParticipationWithStudent {
  coursePhaseID: string
  courseParticipationID: string
  passStatus: PassStatus
  restrictedData: { [key: string]: any }
  studentReadableData: { [key: string]: any }
  prevData: { [key: string]: any }
  student: Student
}
