import { atom } from 'recoil';
import { servers } from './apiURL';
<<<<<<< HEAD
import { CouponType, ServerURLType } from '../types/types';
import { PERCENTAGE } from '../abstract/constants';
=======
import { ServerURLType } from '../types/types';
>>>>>>> upstream/hafnium1923

type ModalType = {
  title?: string;
  isOpen: boolean;
  callBack?: () => void;
};

export const checkCartListState = atom<number[]>({
  key: 'checkCartLists',
  default: [],
});

<<<<<<< HEAD
export const couponState = atom<CouponType>({
  key: 'coupon',
  default: {
    id: 0,
    name: '',
    discountType: PERCENTAGE,
    discountRate: 0.0,
    discountAmount: 0,
    minimumPrice: 0,
  },
});

export const confirmModalState = atom<ModalType>({
  key: 'confirmModal',
  default: {
    isOpen: false,
  },
});

export const couponModalState = atom<ModalType>({
  key: 'couponModal',
=======
export const deleteModalState = atom<ModalType>({
  key: 'deleteModal',
>>>>>>> upstream/hafnium1923
  default: {
    isOpen: false,
  },
});

export const serverState = atom<ServerURLType>({
  key: 'serverUrl',
  default: servers.달리,
});
