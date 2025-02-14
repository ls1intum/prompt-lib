import { Role } from './role'

// Function to get the permission string
export const getPermissionString = (
  role: Role,
  courseName?: string,
  courseSemesterTag?: string,
): string => {
  if (role === Role.PROMPT_ADMIN || role === Role.PROMPT_LECTURER) {
    return role
  }

  return `${courseSemesterTag}-${courseName}-${role}`
}
