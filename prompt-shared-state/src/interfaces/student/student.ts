import { Gender } from './gender'
import { StudyDegree } from './studyDegree'

export interface Student {
  id?: string
  firstName: string
  lastName: string
  email: string
  matriculationNumber?: string
  universityLogin?: string
  hasUniversityAccount: boolean
  gender?: Gender
  nationality?: string
  studyDegree?: StudyDegree
  currentSemester?: number
  studyProgram?: string
}
