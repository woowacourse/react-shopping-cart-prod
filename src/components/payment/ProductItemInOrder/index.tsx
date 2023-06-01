import React from 'react';
import * as S from './ProductItemInOrder.styles';
import { OrderedItem } from 'types/api/orders';

const ProductItemInOrder = ({ orderedItem }: { orderedItem: OrderedItem }) => {
  const { name, imageUrl, quantity, totalPrice, totalDiscountPrice } =
    orderedItem;

  return (
    <S.Container>
      <S.Thumbnail src={imageUrl} alt={name} />
      <S.Detail>
        <S.Name>{name}</S.Name>
        <S.PriceAndQuantity>
          {totalPrice - totalDiscountPrice}원 / 수량 : {quantity}개
        </S.PriceAndQuantity>
      </S.Detail>{' '}
    </S.Container>
  );
};

export default ProductItemInOrder;
