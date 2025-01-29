export interface CoursePhaseWithMetaData {
  id: string
  courseID: string
  name: string
  restrictedData: { [key: string]: any }
  studentReadableData: { [key: string]: any }
  isInitialPhase: boolean
  coursePhaseTypeID: string
}
