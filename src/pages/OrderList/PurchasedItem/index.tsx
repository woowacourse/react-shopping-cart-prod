import { Product } from '@Types/index';

import * as S from './style';

interface OrderItemProps {
  quantity: number;
  product: Product;
}

function OrderItem({ quantity, product }: OrderItemProps) {
  const { price, imageUrl, name } = product;
  const textPrice = `${price.toLocaleString()} 원`;
  const textQuantity = ` / 수량 : ${quantity}개`;

  return (
    <S.Container>
      <S.ShoppingItemImage src={imageUrl} alt={name} aria-label="장바구니 상품 이미지" />
      <div>
        <S.ShoppingItemName>{name}</S.ShoppingItemName>
        <S.PriceAndQuantity>
          {textPrice}
          {textQuantity}
        </S.PriceAndQuantity>
      </div>
    </S.Container>
  );
}

export default OrderItem;
