export interface UpdateCourseData {
  startDate?: Date
  endDate?: Date
  courseType?: string
  ects?: number
  restrictedData?: { [key: string]: any }
  studentReadableData?: { [key: string]: any }
}
