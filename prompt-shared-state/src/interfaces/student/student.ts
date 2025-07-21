import { Person } from '../person/person'
import { Gender } from './gender'
import { StudyDegree } from './studyDegree'

export interface Student extends Person {
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
