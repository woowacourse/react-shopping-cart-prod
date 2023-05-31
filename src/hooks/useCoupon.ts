import { useRecoilState } from "recoil";
import { couponListState } from "recoil/coupon";

export const useCoupon = (cartItemId: number) => {
  const [couponList, setCouponList] = useRecoilState(couponListState);

  const changeCoupon = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCouponList = couponList.map((coupon) =>
      coupon.cartItemId === cartItemId ? { ...coupon, cartItemId: null } : coupon
    );

    setCouponList(
      newCouponList.map((coupon) =>
        coupon.couponId === Number(e.target.value) ? { ...coupon, cartItemId: cartItemId } : coupon
      )
    );
  };

  return { couponList, changeCoupon };
};
