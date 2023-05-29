import React from "react";
import styled from "styled-components";
import { Order } from "types/domain";
import OrderItem from "./OrderItem";

interface OrderStatementProps {
  orderId: number;
  orders: Order[];
}

const OrderStatement = ({ orders, orderId }: OrderStatementProps) => {
  const orderLastIndex = orders.length - 1;

  return (
    <Wrapper>
      <Header>
        <span>주문번호: XXXXXXX</span>
        <NextButton>상세보기 ►</NextButton>
      </Header>
      <Body>
        {orders.map((item, index) => {
          return (
            <>
              <OrderItem key={`order-item-${item.product.id}`} item={item} />
              {index !== orderLastIndex && <Contour />}
            </>
          );
        })}
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: rgba(170, 170, 170, 0.2);
  border-radius: 5px;

  width: 100%;
  margin: 2% 0;
  padding: 3%;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  height: 30px;
`;

const Body = styled.div`
  background-color: white;
  border-radius: 5px;
`;

const NextButton = styled.button`
  cursor: pointer;
`;

const Contour = styled.hr`
  width: 95%;
  border: 1px solid rgba(170, 170, 170, 0.2);
`;

export default OrderStatement;
