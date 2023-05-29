import React from "react";
import styled from "styled-components";
import { OrderResult } from "types/domain";

const OrderItem = ({ item }: { item: OrderResult }) => {
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
        <PriceBox>{item.total.toLocaleString()}원</PriceBox>
      </InfoBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  padding: 3%;
  min-height: 80px;

  @media (max-width: 350px) {
    grid-template-columns: 1fr;
  }
`;

const ImageBox = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;

  & > img {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  @media (max-width: 350px) {
    display: none;
  }
`;

const InfoBox = styled.div`
  display: grid;
  grid-template-rows: 23px 23px auto;

  padding: 3px 3%;
  gap: 5px;
`;

const NameBox = styled.p`
  font-size: 17px;

  width: 100%;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media (max-width: 767px) {
    font-size: 17px;
  }
`;
const PriceBox = styled.p`
  font-size: 16px;

  color: gray;
`;

export default React.memo(OrderItem);
