import { create } from 'zustand'
import { Course } from '../interfaces/course/course'

interface CourseStoreState {
  courses: Course[]
  ownCourseIDs: string[]
}

interface CourseStoreAction {
  setSelectedCourseID: (selectedCourseID: string) => void
  getSelectedCourseID: () => string | null
  removeSelectedCourseID: () => void
  setCourses: (courses: Course[]) => void
  setOwnCourseIDs: (ownCourseIDs: string[]) => void
  isStudentOfCourse: (courseID: string) => boolean
  updateCourse: (courseID: string, patch: Partial<Course>) => void
}

export const useCourseStore = create<CourseStoreState & CourseStoreAction>((set) => ({
  courses: [],
  ownCourseIDs: [],
  getSelectedCourseID: () => {
    return localStorage.getItem('selected-course')
  },
  setSelectedCourseID: (selectedCourseID: string) => {
    localStorage.setItem('selected-course', selectedCourseID)
  },
  removeSelectedCourseID: () => {
    localStorage.removeItem('selected-course')
  },
  setCourses: (courses: Course[]) => set({ courses }),
  setOwnCourseIDs: (ownCourseIDs: string[]) => set({ ownCourseIDs }),
  isStudentOfCourse: (courseID: string): boolean => {
    return useCourseStore.getState().ownCourseIDs.includes(courseID)
  },
  updateCourse: (courseID: string, patch: Partial<Course>) =>
    set((state) => ({
      courses: state.courses.map((course: Course) =>
        course.id === courseID ? { ...course, ...patch } : course,
      ),
    })),
}))
