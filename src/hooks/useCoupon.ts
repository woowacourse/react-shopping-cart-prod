import { useRecoilState } from "recoil";
import { couponListState } from "recoil/coupon";

export const useCoupon = (productId: number) => {
  const [couponList, setCouponList] = useRecoilState(couponListState);

  const changeCoupon = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCouponList = couponList.map((coupon) =>
      coupon.productId === productId ? { ...coupon, productId: null } : coupon
    );

    setCouponList(
      newCouponList.map((coupon) =>
        coupon.couponId === Number(e.target.value) ? { ...coupon, productId: productId } : coupon
      )
    );
  };

  return { couponList, changeCoupon };
};
