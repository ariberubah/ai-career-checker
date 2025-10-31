import { create } from 'zustand'

type StatsCategory = 'core' | 'professional' | 'mental' | 'skills'

type Stats = Record<string, number>

type GameState = {
  step: number
  stats: Record<StatsCategory, Stats>
  setStat: (category: StatsCategory, key: string, value: number) => void
  nextStep: () => void
  reset: () => void
}

export const useGameStore = create<GameState>((set) => ({
  step: 0,
  stats: { core: {}, professional: {}, mental: {}, skills: {} },

  setStat: (category, key, value) =>
    set((state) => ({
      stats: {
        ...state.stats,
        [category]: { ...state.stats[category], [key]: value },
      },
    })),

  nextStep: () => set((state) => ({ step: state.step + 1 })),
  reset: () =>
    set({ step: 0, stats: { core: {}, professional: {}, mental: {}, skills: {} } }),
}))
