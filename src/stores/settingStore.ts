import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MyState {
  settings: Settings
  change: (setting: Partial<Settings>) => void
}

export const useSettingStore = create<MyState>()(
  persist(
    (set, _get) => ({
      settings: {
        icon: "",
        proxy: "dynamic",
        title: "",
        cloaking: "none",
        search: "https://www.google.com/search?q="
      },
      change: (setting) =>
      set((state) => ({
        settings: {
          ...state.settings,
          ...setting,
        },
      })),
    }),
    {
      name: 'settings'
    }
  )
)

export default useSettingStore

type Settings = {
    search: string;
    proxy: "uv" | "dynamic";
    cloaking: "about" | "none";
    title: string
    icon: string
}