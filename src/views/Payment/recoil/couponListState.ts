import credentialState from '@recoil/server/credentialState';
import serverUrlState from '@recoil/server/serverUrlState';
import { atom, selector, useRecoilState } from 'recoil';
import fetchCoupons from '../components/utils/fetchCoupons';
import { COUPON_PATH } from '@constants/urlConstants';
import { CouponRemote, CouponType } from 'types/CouponType';
import { couponList } from '@mocks/mockData';

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
  }),
});

const useCouponList = () => {
  const [couponList, setCouponList] = useRecoilState(couponListState);

  const checkCoupon = (couponId: number) => {
    if (!couponList.some((coupon) => coupon.id === couponId)) {
      throw new Error('coupon id와 일치하는 coupon이 없어서 coupon을 찾을 수 없습니다.');
    }

    setCouponList((prevCouponList) => {
      return prevCouponList.map((coupon) => {
        if (coupon.id === couponId) {
          coupon.checked = true;
          return coupon;
        }
        coupon.checked = false;
        return coupon;
      });
    });
  };

  const getCheckedCoupon = () => couponList.find((coupon) => coupon.checked === true) ?? null;

  return {
    couponList,
    checkCoupon,
    getCheckedCoupon,
  };
};

export default useCouponList;
