import type { OrderItem } from '../../types/types';
import * as S from './OrderItem.style';

type OrderItemProps = {
  item: OrderItem;
};

function OrderItem({ item }: OrderItemProps) {
  const { imageUrl, productName, productPrice, productQuantity } = item;

  return (
    <S.Wrapper>
      <S.ItemImage src={imageUrl} />
      <S.ItemInfo>
        <S.Name>{productName}</S.Name>
        <S.ItemSubInfo>
          <span>{(productPrice * productQuantity).toLocaleString()}원</span>
          <span> / </span>
          <span>수량: {productQuantity}개</span>
        </S.ItemSubInfo>
      </S.ItemInfo>
    </S.Wrapper>
  );
}

export default OrderItem;
