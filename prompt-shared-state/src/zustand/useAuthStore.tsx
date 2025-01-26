import { create } from 'zustand'
import { User } from '../interfaces/user/user'

interface AuthStoreState {
  user?: User
  permissions: string[]
  setUser: (user: User) => void
  clearUser: () => void
  setPermissions: (permissions: string[]) => void
  clearPermissions: () => void
  logout: (redirectUri?: string) => void
  setLogoutFunction: (logoutFunction: (redirectUri?: string) => void) => void
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: undefined,
  permissions: [],
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: undefined }),
  setPermissions: (permissions) => set({ permissions }),
  clearPermissions: () => set({ permissions: [] }),
  logout: (redirectUri) => {
    console.warn('Logout function not initialized') // Default fallback -> once the setLogout is set, this will be overwritten
    if (redirectUri) {
      window.location.href = redirectUri // Default fallback for redirection
    }
  },
  setLogoutFunction: (logoutFunction) => set({ logout: logoutFunction }),
}))
