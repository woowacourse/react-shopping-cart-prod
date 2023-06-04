import { useRecoilValue } from "recoil";
import {
  isCouponSelectedSelector,
  orderRepository,
} from "../../app/recoil/orderAtom.ts";
import type { Coupon } from "../../types/types.ts";
import { CouponWrapper } from "./CouponBox.style.ts";

function CouponBox({ coupon }: { coupon: Coupon }) {
  const isCouponSelected = useRecoilValue(isCouponSelectedSelector(coupon.id));
  const { updateSelectedCouponId } = useRecoilValue(orderRepository);
  const handleClickCoupon = (couponId: number) => {
    updateSelectedCouponId(couponId);
  };

  return (
    <CouponWrapper onClick={() => handleClickCoupon(coupon.id)}>
      <input type="checkbox" checked={isCouponSelected} onChange={() => {}} />
      {coupon.couponName}
    </CouponWrapper>
  );
}

export default CouponBox;
