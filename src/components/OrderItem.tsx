import React from "react";
import styled from "styled-components";
import { Order } from "types/domain";

const OrderItem = (item: Order) => {
  return (
    <Wrapper>
      <ImageBox>
        <img
          src={item.product.imageUrl}
          alt={`${item.product.name} 상품 이미지`}
        />
      </ImageBox>
      <InfoBox>
        <NameBox>{item.product.name}</NameBox>
        <PriceAndQuantityBox>
          {item.product.price.toLocaleString()}원 / 수량: {item.quantity}개
        </PriceAndQuantityBox>
      </InfoBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;

  @media (max-width: 767px) {
  }
`;

const ImageBox = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;

  & > img {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  @media (max-width: 575px) {
    display: none;
  }
`;

const InfoBox = styled.div`
  display: grid;
  grid-template-rows: 1fr 3fr;

  padding: 3px 3%;
`;

const NameBox = styled.div`
  font-size: 17px;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;

  @media (max-width: 767px) {
    font-size: 17px;
  }
`;
const PriceAndQuantityBox = styled.p`
  font-size: 16px;

  color: gray;
`;

export default React.memo(OrderItem);
