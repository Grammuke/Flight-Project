export type loginState = {
  loggedIn: boolean;
  access_token: string;
  refresh_token: string;
};

import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {zustandStorage} from './localstorage';

export const useLoggedInStore = create<loginState>()(
  persist(
    set => ({
      access_token: '',
      loggedIn: false,
      refresh_token: '',
      setLoggedInState: (val: Partial<loginState>) =>
        set(state => ({
          ...state,
          ...val,
        })),
    }),
    {
      name: 'login-state', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => zustandStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
