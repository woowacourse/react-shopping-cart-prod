import { useRecoilState } from 'recoil';
import { couponListState } from '../recoil/couponListState';
import { CouponType } from 'types/CouponType';

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
