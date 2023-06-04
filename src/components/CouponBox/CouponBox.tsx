import { useRecoilValue } from "recoil";
import {
  isCouponSelectedSelector,
  orderRepository,
} from "../../app/recoil/orderAtom.ts";
import type { Coupon } from "../../types/types.ts";
import { CouponWrapper } from "./CouponBox.style.ts";

function CouponBox({ coupon }: { coupon: Coupon }) {
  const isCouponSelected = useRecoilValue(isCouponSelectedSelector(coupon.id));
  const { updateSelectedCoupon } = useRecoilValue(orderRepository);
  const handleClickCoupon = (coupon: Coupon) => {
    updateSelectedCoupon(coupon);
  };

  return (
    <CouponWrapper onClick={() => handleClickCoupon(coupon)}>
      <input type="checkbox" checked={isCouponSelected} readOnly />
      {coupon.couponName}
    </CouponWrapper>
  );
}

export default CouponBox;
