import { styled } from "styled-components";
import {
  Header,
  Page,
  OrderSheetList,
  TotalPriceWithCouponTable,
  CouponSelectBox,
} from "../components";
import { useState } from "react";
import { Coupon } from "../types/domain";
import { useCoupon } from "../hooks/useCoupon";

export const OrderSheet = () => {
  const { coupons } = useCoupon();
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon>({
    id: 0,
    name: "",
    minOrderPrice: 0,
    maxDiscountPrice: 0,
    isAvailable: false,
    discountPrice: 0,
    expiredAt: "",
  });

  return (
    <>
      <Header />
      <Page>
        <TitleBox>주문서</TitleBox>
        <ContentWrapper>
          <OrderSheetList />
          <CouponPriceWrapper>
            <CouponSelectBox
              coupons={coupons}
              setSelectedCoupon={setSelectedCoupon}
            ></CouponSelectBox>
            <TotalPriceWithCouponTable
              discountPrice={selectedCoupon.discountPrice}
            ></TotalPriceWithCouponTable>
          </CouponPriceWrapper>
        </ContentWrapper>
      </Page>
    </>
  );
};

const TitleBox = styled.div`
  align-self: center;
  width: 85%;
  height: 40px;

  font-weight: 700;
  font-size: 25px;
  text-align: center;
  border-bottom: 4px solid var(--dark-gray);
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 40px 8%;

  @media screen and (max-width: 850px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CouponPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
