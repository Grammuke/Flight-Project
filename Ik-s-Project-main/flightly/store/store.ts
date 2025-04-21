import {create} from 'zustand';

export interface ToastState {
  status: 0 | 1 | 2 | 3 | 4;
  message: string;
  isBottom?: boolean;
  desc?: string;
}

const initialState: ToastState = {
  status: 0,
  message: '',
  isBottom: true,
  desc: '',
};
export interface ToastActions {
  showToast: (toastState: ToastState) => void;
  hideToast: () => void;
}

export const useStore = create<ToastState & ToastActions>()((set, get) => ({
  ...initialState,
  showToast: (toastState: ToastState) => {
    const toastMsg = get().message;
    if (toastMsg) return;
    return set({...toastState});
  },
  hideToast() {
    set({
      ...initialState,
    });
  },
}));
