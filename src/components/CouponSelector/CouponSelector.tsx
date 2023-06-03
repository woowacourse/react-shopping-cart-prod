import { useEffect, useState } from "react";
import { CouponBox, CouponBoxContainer, CouponBoxWrapper, CouponSelectHeader, CouponSelectOpenButton, CouponSelectTitle } from "./CouponSelector.style";
import { Coupon } from "../../types/types";

function CouponSelector() {
  const [isCouponSelectorOpen, setCouponSelectorOpen] = useState(false);

  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const loadCoupons = async () => {

    const response = await fetch('/coupons');
    const data = await response.json();
    setCoupons(data);
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  return (
    <CouponBoxWrapper>
      <CouponSelectHeader
        onClick={() => setCouponSelectorOpen(!isCouponSelectorOpen)}
      >
        <CouponSelectTitle>쿠폰 {coupons.length}장 보유중</CouponSelectTitle>
        <CouponSelectOpenButton>
          {isCouponSelectorOpen ? "⏶ 닫기" : "⏷ 보유쿠폰 확인하기"}
        </CouponSelectOpenButton>
      </CouponSelectHeader>
      {isCouponSelectorOpen &&
        <CouponBoxContainer>
          {
            coupons.length > 0
              ? coupons.map((coupon) => (
                <CouponBox key={coupon.id}>
                  {coupon.couponName}
                </CouponBox>
              ))
              : <div>쿠폰이 없습니다.</div>
          }
        </CouponBoxContainer>
      }
    </CouponBoxWrapper>
  );
}

export default CouponSelector;
