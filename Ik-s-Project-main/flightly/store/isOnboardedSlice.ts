export type onboardState = {
  alreadyOnboarded: boolean;
  setAlreadyOnboarded: () => void;
  alreadyViewedInvest: boolean;
  setAlreadyViewedInvest: () => void;
};

import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {zustandStorage} from './localstorage';

export const useOnboardingStore = create<onboardState>()(
  persist(
    set => ({
      alreadyOnboarded: false,
      alreadyViewedInvest: false,
      setAlreadyOnboarded: () => set(() => ({alreadyOnboarded: true})),
      setAlreadyViewedInvest: () => set(() => ({alreadyViewedInvest: true})),
    }),
    {
      name: 'is-onboarded', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => zustandStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
