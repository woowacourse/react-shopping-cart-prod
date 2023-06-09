import { atom } from 'recoil';
import { ToastItem } from '../types';

const ToastState = atom<ToastItem[]>({
  key: 'toastState',
  default: [],
});

export default ToastState;
