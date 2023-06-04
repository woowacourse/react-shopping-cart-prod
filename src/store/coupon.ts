import { atom, selector } from 'recoil';

import { CouponItemType } from './../types/index';

export const couponListState = atom<CouponItemType[]>({
  key: 'couponList',
  default: [],
});

export const checkedCouponIdState = selector({
  key: 'couponChecked',
  get: ({ get }) => {
    const couponList = get(couponListState);

    return couponList.find((coupon) => coupon.isChecked)?.couponId;
  },
});

export const couponDiscountState = atom({
  key: 'counponDiscount',
  default: 0,
});
