import { Order } from "api/orders";
import React from "react";
import { styled } from "styled-components";

interface OrderProductPros {
  order: Order;
  children?: React.ReactNode;
}

const OrderProduct = ({ order, children }: OrderProductPros) => {
  return (
    <Wrapper>
      <ImgBox src={order.product.imageUrl} alt={`${order.product.name} 상품 이미지`} />
      <NameBox>{order.product.name}</NameBox>
      <PriceContainer>{order.total.toLocaleString()}원</PriceContainer>
      <ChildrenBox>{children}</ChildrenBox>
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  display: flex;
  flex-flow: wrap column;
  align-content: flex-start;
  row-gap: 12px;

  height: 160px;

  border-top: 1.5px solid rgba(204, 204, 204, 1);
  padding: 10px;
`;

const ImgBox = styled.img`
  height: 100%;
  width: 180px;
  border-radius: 5px;

  margin-right: 2%;
`;

const NameBox = styled.div`
  width: 30%;
  height: 20%;

  padding-top: 1%;

  font-size: 16px;
  white-space: nowrap;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;

  @media screen and (max-width: 800px) {
    font-size: 13px;
  }
`;

const PriceContainer = styled.div`
  width: 30%;
  height: 60%;

  color: rgba(136, 136, 136, 1);
  font-size: 16px;
  font-weight: 400;
`;

const ChildrenBox = styled.div`
  padding-top: 1%;
`;

export default OrderProduct;
