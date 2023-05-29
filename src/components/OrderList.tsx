import { styled } from "styled-components";
import { OrderItem } from "./OrderItem";

export const OrderList = () => {
  return (
    <Wrapper>
      <OrderListHeader>
        <p>주문번호 : 1</p>
        <p>상세보기 &gt;</p>
      </OrderListHeader>
      <OrderItem />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-self: center;
  width: 85%;
  margin-top: 40px;
`;

const OrderListHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 92px;
  padding: 20px;
  background-color: #f6f6f6;
  border: 1px solid #aaaaaa;
`;
