import { useRecoilState } from "recoil";
import { couponListState } from "recoil/coupon";

export const useCoupon = () => {
  const [couponList, setCouponList] = useRecoilState(couponListState);

  const updateSelectCoupon = (previousCouponId?: number) => {
    return (currentCouponId: number) => {
      const newCouponList = couponList.map((coupon) => {
        if (
          coupon.couponId !== currentCouponId &&
          coupon.couponId !== previousCouponId
        )
          return coupon;

        return {
          ...coupon,
          isSelected: coupon.couponId === currentCouponId,
        };
      });

      return setCouponList(newCouponList);
    };
  };

  return { updateSelectCoupon };
};
