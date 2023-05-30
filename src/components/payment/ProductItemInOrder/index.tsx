import React from 'react';
import { ProductInOrder } from 'types';
import * as S from './ProductItemInOrder.styles';

const ProductItemInOrder = ({
  product,
}: {
  product: ProductInOrder & { quantity: number };
}) => {
  const { product_name, product_price, quantity, product_imageUrl } = product;

  return (
    <S.Container>
      <S.Thumbnail src={product_imageUrl} alt={product_name} />
      <S.Detail>
        <S.Name>{product_name}</S.Name>
        <S.PriceAndQuantity>
          {product_price * quantity}원 / 수량 : {quantity}개
        </S.PriceAndQuantity>
      </S.Detail>{' '}
    </S.Container>
  );
};

export default ProductItemInOrder;
