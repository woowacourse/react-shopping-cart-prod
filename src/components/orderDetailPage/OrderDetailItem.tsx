import React from 'react';
import styled from 'styled-components';
import { Product } from '../../types/Product';
import { getCommaAddedNumber } from '../../utils/number';

export const OrderDetailItem = ({
  orderInfoItem,
}: {
  orderInfoItem: Product;
}) => {
  return (
    <Style.Container>
      <Style.ProductImage src={orderInfoItem.imageUrl} />
      <Style.ProductInfo>
        <p>{orderInfoItem.name}</p>
        <p>
          가격: {getCommaAddedNumber(orderInfoItem.price)}원 / 수량:{' '}
          {orderInfoItem.quantity}개
        </p>
      </Style.ProductInfo>
    </Style.Container>
  );
};

const Style = {
  Container: styled.li`
    width: 100%;

    display: flex;
    padding: 0 10px 30px 10px;

    border-bottom: 1px solid #333333;
  `,
  Content: styled.div`
    width: 100%;
    display: flex;
    padding: 0 10px;

    @media (max-width: 480px) {
      gap: 10px;
    }
  `,
  ProductImage: styled.img`
    width: 144px;
    height: 147px;
    border-radius: 8px;

    @media (max-width: 480px) {
      width: 68px;
      height: 69px;
    }
  `,
  ProductInfo: styled.div`
    display: block;
    padding: 20px 30px;

    & > :nth-child(1) {
      font-size: 20px;
      margin-bottom: 20px;
    }
  `,
};
