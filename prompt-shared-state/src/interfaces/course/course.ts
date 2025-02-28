import { CoursePhaseWithType } from '../coursePhase/coursePhaseWithType'

export interface Course {
  id: string
  name: string
  startDate: Date
  endDate: Date
  courseType: string
  ects: number
  semesterTag: string
  restrictedData: { [key: string]: any }
  studentReadableData: { [key: string]: any }
  coursePhases: Array<CoursePhaseWithType>
}
