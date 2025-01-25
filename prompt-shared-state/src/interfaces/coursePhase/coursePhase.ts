export interface CoursePhaseWithMetaData {
  id: string
  courseID: string
  name: string
  metaData: { [key: string]: any }
  isInitialPhase: boolean
  coursePhaseTypeID: string
}
