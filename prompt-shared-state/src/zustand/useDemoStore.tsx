import { create } from 'zustand'

type DemoStore = {
  count: number
  increment: () => void
}

export const useDemoStore = create<DemoStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
