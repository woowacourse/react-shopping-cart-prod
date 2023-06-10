import {useEffect, useState} from "react";
import {
  CouponBoxContainer,
  CouponBoxWrapper,
  CouponSelectHeader,
  CouponSelectOpenButton,
  CouponSelectTitle,
  SelectedCouponText,
} from "./CouponSelector.style";
import {useRecoilValue, useResetRecoilState} from "recoil";
import {
  couponState,
  selectedCouponState,
} from "../../app/recoil/order/orderAtom.ts";
import CouponBox from "../CouponBox";
import {orderRepository} from "../../app/recoil/order/orderRepository.ts";
import {selectedCouponIdSelector} from "../../app/recoil/order/orderSelector.ts";

function CouponSelector() {
  const [isCouponSelectorOpen, setCouponSelectorOpen] = useState(false);
  const coupons = useRecoilValue(couponState);
  const selectedCoupon = useRecoilValue(selectedCouponState);
  const selectedCouponIds = useRecoilValue(selectedCouponIdSelector);
  const resetSelectedCouponIdsState = useResetRecoilState(selectedCouponState);
  const {loadCoupons} = useRecoilValue(orderRepository);

  useEffect(() => {
    resetSelectedCouponIdsState();
    loadCoupons();
  }, []);

  return (
    <CouponBoxWrapper>
      <CouponSelectHeader
        onClick={() => setCouponSelectorOpen(!isCouponSelectorOpen)}
      >
        <CouponSelectTitle>
          {selectedCouponIds.length
            ? "쿠폰 (선택됨)"
            : `쿠폰 (${coupons.length}장 보유중)`}
        </CouponSelectTitle>
        <CouponSelectOpenButton>
          {isCouponSelectorOpen ? "⏶ 닫기" : "⏷ 보유쿠폰 확인하기"}
        </CouponSelectOpenButton>
      </CouponSelectHeader>
      {isCouponSelectorOpen && (
        <CouponBoxContainer>
          {coupons.length > 0 ? (
            coupons.map((coupon) => (
              <CouponBox key={coupon.id} coupon={coupon}/>
            ))
          ) : (
            <div>쿠폰이 없습니다.</div>
          )}
        </CouponBoxContainer>
      )}
      {selectedCouponIds.length > 0 && (
        <SelectedCouponText>
          ✅ 선택하신 [{selectedCoupon[0].couponName}] 쿠폰을 적용했습니다.
        </SelectedCouponText>
      )}
    </CouponBoxWrapper>
  );
}

export default CouponSelector;
