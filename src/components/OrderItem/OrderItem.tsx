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
          <S.InfoText>
            {(productPrice * productQuantity).toLocaleString()}원
          </S.InfoText>
          <S.InfoText> / </S.InfoText>
          <S.InfoText>수량: {productQuantity}개</S.InfoText>
        </S.ItemSubInfo>
      </S.ItemInfo>
    </S.Wrapper>
  );
}

export default OrderItem;
