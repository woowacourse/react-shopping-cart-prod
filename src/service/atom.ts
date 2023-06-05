import { atom } from 'recoil';
import { servers } from './apiURL';
import { CouponType, ServerURLType } from '../types/types';

export type ModalType = {
  title?: string;
  isOpen: boolean;
  callBack?: () => void;
};

export const checkCartListState = atom<number[]>({
  key: 'checkCartLists',
  default: [],
});

export const deleteModalState = atom<ModalType>({
  key: 'deleteModal',
  default: {
    isOpen: false,
  },
});

export const couponListModalState = atom<ModalType>({
  key: 'couponListModal',
  default: {
    isOpen: false,
  },
});

export const serverState = atom<ServerURLType>({
  key: 'serverUrl',
  default: servers.달리,
});

export const appliedCouponState = atom<CouponType | null>({
  key: 'appliedCoupon',
  default: null,
});
