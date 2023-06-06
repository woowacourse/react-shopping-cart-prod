import React from "react";
import styled from "styled-components";
import { OrderResult } from "types/domain";
import OrderItem from "./OrderItem";

interface OrderStatementProps {
  orderId: number;
  orders: OrderResult[];
  openModal?: () => void;
}

const OrderStatement = ({
  orders,
  orderId,
  openModal,
}: OrderStatementProps) => {
  const orderLastIndex = orders.length - 1;

  return (
    <Wrapper>
      <Header>
        <span>주문번호: {orderId}</span>
        <NextButton onClick={openModal}>상세보기 ►</NextButton>
      </Header>
      <Body>
        {orders.map((item, index) => {
          return (
            <div key={`order-box-${item.product.id}`}>
              <OrderItem key={`order-item-${item.product.id}`} item={item} />
              {index !== orderLastIndex && <Contour />}
            </div>
          );
        })}
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--primary-beige-color);
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
  background-color: var(--light-color);
  border-radius: 5px;
`;

const NextButton = styled.button`
  cursor: pointer;
`;

const Contour = styled.hr`
  width: 95%;
  border: 1px solid var(--primary-beige-color);
`;

export default OrderStatement;
