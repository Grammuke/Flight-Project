import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./localstorage";

type SavedUserLogin = {
  name: string;
  email: string;
};

type partial = Partial<SavedUserLogin>;
export type AuthState = {
  loggedIn: boolean;
  savedUser: partial | null;
  setIsLoggedIn: (val: boolean) => void;
  saveUserLogin: (user: partial) => void;
  clearSavedUser: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      loggedIn: false,
      savedUser: null,
      setIsLoggedIn: (loggedIn) => set(() => ({ loggedIn })),
      saveUserLogin: (user) =>
        set((state) => ({
          savedUser:
            state.savedUser === null ? user : { ...state.savedUser, ...user },
        })),
      clearSavedUser: () => set({ savedUser: null }),
    }),
    {
      name: "savedUserLogin",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
