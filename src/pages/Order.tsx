import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
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
import { selectedProductsState } from "../recoil/atom";
import { ROUTER_PATH } from "../router";
import { CouponType, LocalProductType } from "../types/domain";

const Order = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const [discountPrice, setDiscountPrice] = useState<number | null>(null);
  const [selectedCouponIndex, setSelectedCouponIndex] = useState<number>(-1);
  const [selectedProducts, setSelectedProducts] = useRecoilState(
    selectedProductsState
  );

  useLayoutEffect(() => {
    const fetchCoupons = async () => {
      try {
        const requestedCartItemIds = selectedProducts.map(
          (product) => product.cartItemId
        );
        const response = await getCouponsApi(requestedCartItemIds);
        if (!response.ok) throw new Error(response.status.toString());
        const data = await response.json();
        console.log(data.coupons);
        setCoupons(data.coupons);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchCoupons();
  }, []);

  const handleCouponSelected = (index: number) => {
    setSelectedCouponIndex(index);
    if (index === -1) {
      setDiscountPrice(null);
      return;
    }
    setDiscountPrice(coupons[index].discountPrice);
  };

  const handlePaymentClicked = async () => {
    try {
      const payloads: Omit<LocalProductType, "id">[] = selectedProducts.map(
        (product) => {
          const newProduct = structuredClone(product);
          delete newProduct.id;
          return newProduct;
        }
      );
      await postOrderApi(payloads, coupons[selectedCouponIndex].id);
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
