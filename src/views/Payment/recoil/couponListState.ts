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
import fetchCoupons from '../utils/fetchCoupons';
import { COUPON_PATH } from '@constants/urlConstants';
import { CouponRemote, CouponType } from 'types/CouponType';
import { cartTotalPrice } from '@views/Cart/recoil/cartState';

const couponListState = atom<CouponType[]>({
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

const couponSelected = selector({
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

const useCouponList = () => {
  const [couponList, setCouponList] = useRecoilState(couponListState);

  const checkCoupon = (couponId: number) => {
    if (!couponList.some((coupon) => coupon.id === couponId)) {
      throw new Error('coupon id와 일치하는 coupon이 없어서 coupon을 찾을 수 없습니다.');
    }

    setCouponList((prevCouponList) => {
      const couponList: CouponType[] = prevCouponList.map((coupon) => {
        if (coupon.id === couponId) {
          return {
            ...coupon,
            checked: true,
          };
        }

        return {
          ...coupon,
          checked: false,
        };
      });

      return couponList;
    });
  };

  const resetCouponCheck = () => {
    setCouponList((prev) => {
      return prev.map((coupon) => {
        return {
          ...coupon,
          checked: false,
        };
      });
    });
  };

  return {
    couponList,
    checkCoupon,
    resetCouponCheck,
  };
};

export default useCouponList;
