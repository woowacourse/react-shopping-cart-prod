import credentialState from '@recoil/server/credentialState';
import serverUrlState from '@recoil/server/serverUrlState';
import {
  atom,
  selector,
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';
import fetchCoupons from '../remote/fetchCoupons';
import { COUPON_PATH } from '@constants/urlConstants';
import { CouponRemote, CouponType } from 'types/CouponType';
import { cartTotalPrice } from '@views/Cart/recoil/cartState';

export const couponListState = atom<CouponType[]>({
  key: 'couponListState',
  default: selector({
    key: 'couponListState/default',
    get: async ({ get }) => {
      const serverUrl = get(serverUrlState);
      const credential = get(credentialState);
      const response = await fetchCoupons({ resource: `${serverUrl}/${COUPON_PATH}`, credential });
      const couponList: CouponRemote[] = await response.json();

      return couponList.map((coupon) => {
        return {
          ...coupon,
          checked: false,
        };
      });
    },
    cachePolicy_UNSTABLE: {
      eviction: 'lru',
      maxSize: 0,
    },
  }),
});

export const couponSelected = selector({
  key: 'couponSelected',
  get: ({ get }) => {
    const coupon = get(couponListState).find((coupon) => coupon.checked === true);
    const totalPrice = get(cartTotalPrice);

    if (!coupon) return null;

    if (coupon.minimumPrice > totalPrice) return null;

    return coupon;
  },
  cachePolicy_UNSTABLE: {
    eviction: 'lru',
    maxSize: 0,
  },
});

export const useCouponSelected = () => useRecoilValue(couponSelected);

export const useRefreshCouponList = () => {
  const resetCoupon = useResetRecoilState(couponListState);
  const refreshCoupon = useRecoilRefresher_UNSTABLE(couponListState);

  return () => {
    resetCoupon();
    refreshCoupon();
  };
};
