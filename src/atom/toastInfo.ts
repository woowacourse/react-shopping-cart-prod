import { atom } from 'recoil';
import { ToastInfoType } from '../types';

export const toastInfoState = atom<ToastInfoType>({
  key: 'toastInfoState',
  default: {
    show: false,
    message: '',
    type: 'info',
  },
});
