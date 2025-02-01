import { create } from 'zustand'
import { Course } from '../interfaces/course/course'

interface CourseStoreState {
  selectedCourse?: Course
  courses: Course[]
  ownCourseIDs: string[]
}

interface CourseStoreAction {
  setSelectedCourse: (selectedCourse?: Course) => void
  setCourses: (courses: Course[]) => void
  setOwnCourseIDs: (ownCourseIDs: string[]) => void
  isStudentOfCourse: (courseID: string) => boolean
}

export const useCourseStore = create<CourseStoreState & CourseStoreAction>((set) => ({
  courses: [],
  ownCourseIDs: [],
  setSelectedCourse: (selectedCourse?: Course) => {
    if (selectedCourse) {
      localStorage.setItem('selected-course', selectedCourse.id)
    } else {
      localStorage.removeItem('selected-course')
    }

    set({ selectedCourse })
  },
  setCourses: (courses: Course[]) => set({ courses }),
  setOwnCourseIDs: (ownCourseIDs: string[]) => set({ ownCourseIDs }),
  isStudentOfCourse: (courseID: string): boolean => {
    return useCourseStore.getState().ownCourseIDs.includes(courseID)
  },
}))
