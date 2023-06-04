import { useEffect, useState } from "react";
import {
  CouponBoxContainer,
  CouponBoxWrapper,
  CouponSelectHeader,
  CouponSelectOpenButton,
  CouponSelectTitle,
} from "./CouponSelector.style";
import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  couponState,
  orderRepository,
  selectedCouponState,
  selectedCouponIdSelector,
} from "../../app/recoil/orderAtom";
import CouponBox from "../CouponBox";

function CouponSelector() {
  const [isCouponSelectorOpen, setCouponSelectorOpen] = useState(false);
  const coupons = useRecoilValue(couponState);
  const selectedCoupon = useRecoilValue(selectedCouponState);
  const selectedCouponIds = useRecoilValue(selectedCouponIdSelector);
  const resetSelectedCouponIdsState = useResetRecoilState(selectedCouponState);
  const { loadCoupons } = useRecoilValue(orderRepository);

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
            : `쿠폰 ${coupons.length}장 보유중`}
        </CouponSelectTitle>
        <CouponSelectOpenButton>
          {isCouponSelectorOpen ? "⏶ 닫기" : "⏷ 보유쿠폰 확인하기"}
        </CouponSelectOpenButton>
      </CouponSelectHeader>
      {isCouponSelectorOpen && (
        <CouponBoxContainer>
          {coupons.length > 0 ? (
            coupons.map((coupon) => (
              <CouponBox key={coupon.id} coupon={coupon} />
            ))
          ) : (
            <div>쿠폰이 없습니다.</div>
          )}
        </CouponBoxContainer>
      )}
      {selectedCouponIds.length > 0 && <div>[{selectedCoupon[0].couponName}] 선택됨</div>}
    </CouponBoxWrapper>
  );
}

export default CouponSelector;
