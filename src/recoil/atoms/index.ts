import { atom } from 'recoil';
import { ToastProps } from '../../components/common/Toast/Toast';
import type { CartItem, PointsInfo } from '../../types/product';

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
});

export const checkedItemIdsState = atom<Set<number>>({
  key: 'checkedItemIdsState',
  default: new Set(),
});

export const pointsState = atom<PointsInfo>({
  key: 'pointsState',
  default: {
    selectedPoints: 0,
    maxPoints: 5000,
  },
});

export const toastState = atom<ToastProps[]>({
  key: 'toastState',
  default: [],
});

export const serverOriginState = atom<string>({
  key: 'serverOriginState',
  default: 'http://somsom.techcourse.store',
});
