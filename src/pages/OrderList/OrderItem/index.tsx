import { useNavigate } from 'react-router-dom';

import * as S from './style';

interface OrderItemProps {
  quantity: number;
  price: number;
  name: string;
  imageUrl: string;
}

function OrderItem({ quantity, price, name, imageUrl }: OrderItemProps) {
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
