import { CartItemType } from '@Types/index';

import * as S from './style';

function OrderProduct({ quantity, product }: CartItemType) {
  const displayProductAmount = () => {
    const price = `${product.price.toLocaleString()}원`;
    const amount = `수량: ${quantity}개`;

    return `${price} / ${amount}`;
  };

  return (
    <S.Container>
      <S.ProductImage src={product.imageUrl} alt={product.name} />
      <S.OrderInfo>
        <S.ProductName>{product.name}</S.ProductName>
        <S.ProductAmount>{displayProductAmount()}</S.ProductAmount>
      </S.OrderInfo>
    </S.Container>
  );
}

export default OrderProduct;
