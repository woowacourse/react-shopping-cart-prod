import {useRecoilValue} from "recoil";
import type {Coupon} from "../../types/types.ts";
import {
  CouponDescription,
  CouponInfo,
  CouponTitle,
  CouponWrapper,
} from "./CouponBox.style.ts";
import {totalPriceSelector} from "../../app/recoil/cart/cartSelectors.ts";
import {orderRepository} from "../../app/recoil/order/orderRepository.ts";
import {isCouponSelectedSelector} from "../../app/recoil/order/orderSelector.ts";

function CouponBox({coupon}: { coupon: Coupon }) {
  const isCouponSelected = useRecoilValue(isCouponSelectedSelector(coupon.id));
  const {updateSelectedCoupon} = useRecoilValue(orderRepository);
  const totalPrice = useRecoilValue(totalPriceSelector);

  const isValid = totalPrice >= coupon.minAmount;

  const handleClickCoupon = (coupon: Coupon) => {
    if (isValid) {
      updateSelectedCoupon(coupon);
    } else {
      alert("쿠폰을 사용하기 위한 결제 금액이 부족합니다.");
    }
  };

  return (
    <CouponWrapper onClick={() => handleClickCoupon(coupon)} disabled={!isValid}>
      <input type="checkbox" checked={isCouponSelected} readOnly/>
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
