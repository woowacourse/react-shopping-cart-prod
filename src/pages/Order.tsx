import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { api } from "../api";
import {
  CouponSelectBox,
  Header,
  OrderProductList,
  Page,
  TotalPriceTable,
} from "../components";
import { useLocalProducts } from "../hooks/useLocalProducts";
import { useToast } from "../hooks/useToast";
import { selectedProductsState } from "../recoil/atom";
import { ROUTER_PATH } from "../router";
import { MyCouponType, LocalProductType } from "../types/domain";

const Order = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { updateLocalProducts } = useLocalProducts();
  const [coupons, setCoupons] = useState<MyCouponType[]>([]);
  const [discountPrice, setDiscountPrice] = useState<number | null>(null);
  const [selectedCouponIndex, setSelectedCouponIndex] = useState<number>(-1);
  const selectedProducts = useRecoilValue(selectedProductsState);

  useLayoutEffect(() => {
    const fetchMyCoupons = async () => {
      try {
        const cartItemIdsQuery = selectedProducts
          .map((product) => "cartItemId=" + product.cartItemId.toString())
          .join("&");

        const response = await api.get(
          `/orders/coupons?${cartItemIdsQuery}`,
          true
        );
        if (!response.ok) throw new Error(response.status.toString());
        const data = await response.json();
        setCoupons(data.coupons);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchMyCoupons();
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
      const orderedProducts: Omit<LocalProductType, "id">[] =
        selectedProducts.map((product) => {
          const newProduct = structuredClone(product);
          delete newProduct.id;
          return newProduct;
        });
      const couponId =
        selectedCouponIndex === -1 ? null : coupons[selectedCouponIndex].id;
      await api.post("orders", {
        products: orderedProducts,
        couponId: couponId,
      });
      navigate(ROUTER_PATH.Main);
      showToast("success", "결제가 완료되었습니다 👍🏻");
      updateLocalProducts();
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
              type="apply"
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
  padding-top: 35px;
`;

export default Order;
