import { SHIPPING_FEE } from "constants/cartProduct";
import { useRecoilValue } from "recoil";
import { cartTotalDiscount, cartTotalPrice } from "recoil/cart";
import styled, { keyframes } from "styled-components";

const PurchaseOrder = () => {
  const totalPrice = useRecoilValue(cartTotalPrice);
  const totalDiscount = useRecoilValue(cartTotalDiscount);

  return (
    <Wrapper>
      <TitleBox>결제 예상 금액</TitleBox>
      <TotalContainer>
        <AmountBox>
          <p>총 상품 금액</p>
          <p>{totalPrice.toLocaleString()}원</p>
        </AmountBox>
        <AmountBox>
          <p>배송비</p>
          <p>{(totalPrice ? SHIPPING_FEE : 0).toLocaleString()}원</p>
        </AmountBox>
        <AmountBox>
          <p>할인 금액</p>
          <p>- {totalDiscount.toLocaleString()}원</p>
        </AmountBox>
        <AmountBox>
          <p>총 주문 금액</p>
          <p>
            {(totalPrice
              ? totalPrice + SHIPPING_FEE - totalDiscount
              : 0
            ).toLocaleString()}
            원
          </p>
        </AmountBox>
      </TotalContainer>
      <OrderButton>주문하기</OrderButton>
    </Wrapper>
  );
};

const OpenAnimation = keyframes`
  0% {
    transform: translate(10% ,0%);
  }
  100% {
    transform: translate(0%, 0%);
  }
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;

  position: sticky;
  top: 12%;
  margin-left: auto;

  width: 30%;
  height: 350px;

  border: 1px solid rgba(221, 221, 221, 1);
  padding: 2%;

  @media (max-width: 767px) {
    width: 20px;
    height: 80px;

    border-radius: 5px 0 0 5px;
    background-color: #333333;
    padding: 0;

    position: fixed;
    top: 200px;
    right: 0;

    & * {
      display: none;
    }

    &: hover {
      width: 70%;
      height: 45%;
      padding: 5%;

      display: flex;
      flex-direction: column;
      justify-content: space-around;

      animation: ${OpenAnimation} 0.5s;

      & * {
        display: grid;
      }
    }
  }
`;

const TitleBox = styled.h2`
  border-bottom: 1px solid rgba(221, 221, 221, 1);

  padding-bottom: 5%;

  font-size: 21px;
  font-weight: 400;
  text-align: center;

  @media (max-width: 767px) {
    color: rgba(255, 255, 255, 1);
  }
`;

const TotalContainer = styled.div`
  display: grid;
  grid-template-rows: 23% 23% 24% 30%;

  height: 60%;
  padding: 3%;
  align-items: center;

  & :first-child {
    text-align: left;
  }

  & :last-child {
    text-align: right;
  }

  @media (max-width: 767px) {
    color: rgba(255, 255, 255, 1);
    font-size: 16px;
  }
`;

const AmountBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  text-align: center;
  font-size: 16px;
  font-weight: 600;
`;

const OrderButton = styled.button`
  width: 100%;

  padding: 7% 10%;

  font-size: 19px;
  color: rgba(255, 255, 255, 1);
  background: #333333;

  cursor: pointer;

  @media (max-width: 767px) {
    background-color: rgba(255, 255, 255, 1);
    color: #333333;
    font-size: 16px;
  }
`;

export default PurchaseOrder;
