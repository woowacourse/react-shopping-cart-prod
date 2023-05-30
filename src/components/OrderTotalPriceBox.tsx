import { styled } from "styled-components";

export const OrderTotalPriceBox = () => {
  return (
    <Wrapper>
      <OrderTotalPriceHeader>결제금액 정보</OrderTotalPriceHeader>
      <OrderTotalPriceContent>
        <p>총 결제금액</p>
        <p>325,600원</p>
      </OrderTotalPriceContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-self: flex-end;
  width: 40%;
  margin-top: 40px;
`;

const OrderTotalPriceHeader = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 92px;
  padding: 20px;
  background-color: #f6f6f6;
  border: 1px solid #aaaaaa;

  font-weight: 700;
  font-size: 22px;
  color: #333333;
`;

const OrderTotalPriceContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 115px;
  padding: 0 30px;
  border: 1px solid #aaaaaa;

  font-weight: 700;
  font-size: 20px;
  color: #333333;
`;
