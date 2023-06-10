import { postOrder } from "api/orders";
import { SHIPPING_FEE } from "constants/cartProduct";
import { useReloadFromServer } from "hooks/useReloadFromServer";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartListState, cartTotalPrice } from "recoil/cart";
import { couponListState, totalCouponDiscount } from "recoil/coupon";
import { serverSelectState } from "recoil/server";
import { ROUTER_PATH } from "router";
import styled from "styled-components";

const PurchaseOrder = () => {
  const navigate = useNavigate();
  const totalPrice = useRecoilValue(cartTotalPrice);
  const couponDiscount = useRecoilValue(totalCouponDiscount);
  const selectedServer = useRecoilValue(serverSelectState);
  const cartList = useRecoilValue(cartListState);
  const couponList = useRecoilValue(couponListState);
  const { reloadOrderList } = useReloadFromServer();

  const requestOrder = async () => {
    const result = await postOrder(selectedServer, {
      deliveryFee: SHIPPING_FEE,
      orderItems: cartList.map((item) => {
        const coupon = couponList.find((coupon) => coupon.productId === item.product.id);

        return { ...item, coupons: coupon ? [coupon] : [] };
      }),
    });

    if (!result) {
      alert("주문에 실패했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    reloadOrderList();
    navigate(ROUTER_PATH.OrderList);
  };

  return (
    <Wrapper>
      <TitleBox>결제 예상 금액</TitleBox>
      <TotalContainer>
        <AmountBox>
          <p>상품 금액</p>
          <p>{totalPrice.toLocaleString()}원</p>
        </AmountBox>
        <AmountBox>
          <p>배송비</p>
          <p>{(totalPrice ? SHIPPING_FEE : 0).toLocaleString()}원</p>
        </AmountBox>
        <AmountBox>
          <p>쿠폰 할인</p>
          <p>- {couponDiscount.toLocaleString()}원</p>
        </AmountBox>
        <AmountBox>
          <p>최종 결제 금액</p>
          <p>{(totalPrice ? totalPrice + SHIPPING_FEE - couponDiscount : 0).toLocaleString()}원</p>
        </AmountBox>
      </TotalContainer>
      <OrderButton disabled={!cartList.some((item) => item.isChecked)} onClick={requestOrder}>
        주문하기
      </OrderButton>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;

  position: sticky;
  top: 12%;
  margin-left: auto;

  width: 30%;
  height: 40%;

  border: 1px solid rgba(221, 221, 221, 1);
  padding: 2%;

  @media screen and (max-width: 800px) {
    position: fixed;
    gap: 0;

    top: auto;
    right: 0;
    bottom: 0;

    width: 100%;
    height: fit-content;

    border-top: 1px solid black;

    background-color: white;
  }
`;

const TitleBox = styled.h2`
  border-bottom: 1px solid rgba(221, 221, 221, 1);

  padding-bottom: 5%;

  font-size: 21px;
  font-weight: 400;

  @media screen and (max-width: 800px) {
    padding-bottom: 2%;
    text-align: center;
    font-size: 18px;
  }
`;

const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  height: 60%;
  padding: 3%;

  div:last-child {
    margin-top: 4%;
    margin-bottom: 1%;

    color: #04c09e;
    font-weight: 700;
    font-size: 18px;
  }

  @media screen and (max-width: 800px) {
    height: fit-content;
    gap: 6px;
    font-size: 16px;
  }
`;

const AmountBox = styled.div`
  display: flex;
  justify-content: space-between;

  text-align: center;
  font-size: 17px;
  font-weight: 600;

  @media screen and (max-width: 800px) {
    font-size: 15px;
  }
`;

const OrderButton = styled.button`
  width: 100%;

  padding: 7% 10%;

  font-size: 19px;
  color: rgba(255, 255, 255, 1);
  background: #333333;

  cursor: pointer;

  &:disabled {
    background: darkgray;
    cursor: default;
  }

  @media screen and (max-width: 800px) {
    margin-top: auto;
    padding: 4% 8%;
  }
`;

export default PurchaseOrder;
