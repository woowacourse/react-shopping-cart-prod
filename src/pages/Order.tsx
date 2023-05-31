import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { getCouponsApi, postOrderApi } from "../api";
import {
  CouponSelectBox,
  Header,
  OrderProductList,
  Page,
  TotalPriceTable,
} from "../components";
import { useToast } from "../hooks/useToast";
import { selectedCartItemIdsSelector } from "../recoil/selector";
import { ROUTER_PATH } from "../router";
import { CouponType } from "../types/domain";

const Order = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [selectedCouponIndex, setSelectedCouponIndex] = useState<number>(-1);
  const cartItemIds = useRecoilValue<number[]>(selectedCartItemIdsSelector);

  useLayoutEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await getCouponsApi(cartItemIds);
        if (!response.ok) throw new Error(response.status.toString());
        const data = await response.json();

        setCoupons(data);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchCoupons();
  }, []);

  const handleCouponSelected = (index: number) => {
    setSelectedCouponIndex(index);
    setDiscountPrice(coupons[index].discountPrice);
  };

  const handlePaymentClicked = async () => {
    try {
      await postOrderApi(cartItemIds, selectedCouponIndex);
      navigate(ROUTER_PATH.Main);
      showToast("success", "결제가 완료되었습니다 👍🏻");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Page>
        <TitleBox>주문서</TitleBox>
        <Container>
          <OrderProductList />
          <PriceContainer>
            <CouponSelectBox
              coupons={coupons}
              onSelectHandler={handleCouponSelected}
            />
            <TotalPriceTable
              status="order"
              discountPrice={discountPrice}
              handlePaymentClicked={handlePaymentClicked}
            />
          </PriceContainer>
        </Container>
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

const Container = styled.section`
  display: flex;
  padding: 40px 8%;
  justify-content: space-between;

  @media screen and (max-width: 850px) {
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
  }
`;

const PriceContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

export default Order;
