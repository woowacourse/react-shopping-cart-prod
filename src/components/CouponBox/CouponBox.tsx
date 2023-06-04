import { useRecoilValue } from "recoil";
import {
  isCouponSelectedSelector,
  orderRepository,
} from "../../app/recoil/orderAtom.ts";
import type { Coupon } from "../../types/types.ts";
import {
  CouponDescription,
  CouponInfo,
  CouponTitle,
  CouponWrapper,
} from "./CouponBox.style.ts";

function CouponBox({ coupon }: { coupon: Coupon }) {
  const isCouponSelected = useRecoilValue(isCouponSelectedSelector(coupon.id));
  const { updateSelectedCoupon } = useRecoilValue(orderRepository);
  const handleClickCoupon = (coupon: Coupon) => {
    updateSelectedCoupon(coupon);
  };

  return (
    <CouponWrapper onClick={() => handleClickCoupon(coupon)}>
      <input type="checkbox" checked={isCouponSelected} readOnly />
      <CouponInfo>
        <CouponTitle>{coupon.couponName}</CouponTitle>
        <CouponDescription>
          {coupon.discountAmount === 0
            ? `${coupon.discountPercent}% 할인`
            : `${coupon.discountAmount.toLocaleString()}원 할인`}
        </CouponDescription>
        <CouponDescription>
          {coupon.minAmount.toLocaleString()}원 이상 결제 시 사용 가능
        </CouponDescription>
      </CouponInfo>
    </CouponWrapper>
  );
}

export default CouponBox;
