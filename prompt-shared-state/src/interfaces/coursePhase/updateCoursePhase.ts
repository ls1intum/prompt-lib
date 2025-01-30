export interface UpdateCoursePhase {
  id: string
  name?: string
  restrictedData?: { [key: string]: any }
  studentReadableData?: { [key: string]: any }
}
