import { styled } from "styled-components";
import {
  Header,
  Page,
  OrderSheetList,
  TotalPriceWithCouponTable,
  CouponSelectBox,
  Button,
} from "../components";
import { useState } from "react";
import { Coupon } from "../types/domain";
import { useCoupon } from "../hooks/useCoupon";
import { selectedProductsState } from "../recoil/atom";
import { useRecoilValue } from "recoil";
import { useRouter } from "../hooks/useRouter";
import { ROUTER_PATH } from "../router";

export const OrderSheet = () => {
  const { coupons } = useCoupon();
  const { goPage } = useRouter();
  const checkedCartList = useRecoilValue(selectedProductsState);
  const [isOrderComplete, setIsOrderComplete] = useState<boolean>(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon>({
    id: null,
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
        {checkedCartList.length === 0 ? (
          <CompleteOrErrorContainer>
            <p>주문서가 만료되었어요😭</p>
            <p>장바구니에서 다시 주문해주세요.</p>
            <Button onClick={goPage(ROUTER_PATH.Cart)}>장바구니로</Button>
          </CompleteOrErrorContainer>
        ) : isOrderComplete ? (
          <CompleteOrErrorContainer>
            <p>주문이 완료되었습니다😄</p>
            <Button onClick={goPage(ROUTER_PATH.Order)}>주문 목록으로</Button>
          </CompleteOrErrorContainer>
        ) : (
          <>
            <TitleBox>주문서</TitleBox>
            <ContentWrapper>
              <OrderSheetList orderList={checkedCartList} />
              <CouponPriceWrapper>
                <CouponSelectBox
                  coupons={coupons}
                  setSelectedCoupon={setSelectedCoupon}
                />
                <TotalPriceWithCouponTable
                  couponId={selectedCoupon.id}
                  discountPrice={selectedCoupon.discountPrice}
                  setIsOrderComplete={setIsOrderComplete}
                  orderList={checkedCartList}
                />
              </CouponPriceWrapper>
            </ContentWrapper>
          </>
        )}
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

const CompleteOrErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 30%;
  height: 100%;
  padding: 200px 0;

  align-items: center;
  text-align: center;
  line-height: 24px;

  & > h2 {
    font-size: 50px;
    font-weight: 700;
    margin-bottom: 30px;
  }
`;
