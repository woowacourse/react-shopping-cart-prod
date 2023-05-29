import React from "react";
import styled from "styled-components";
import { Order } from "types/domain";
import OrderItem from "./OrderItem";

interface OrderStatementProps {
  orderId: number;
  orders: Order[];
}

const OrderStatement = ({ orders, orderId }: OrderStatementProps) => {
  return (
    <Wrapper>
      <Header>
        <span>주문번호: XXXXXXX</span>
        <NextButton>상세보기 ►</NextButton>
      </Header>
      <Body>
        {orders.map((item) => (
          <OrderItem
            key={`order-item-${item.product.id}`}
            item={item}
          ></OrderItem>
        ))}
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: rgba(170, 170, 170, 0.2);
  border-radius: 5px;

  width: 100%;
  margin: 1% 5%;
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

export default OrderStatement;
