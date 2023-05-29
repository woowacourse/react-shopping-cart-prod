import { OrderData } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import * as S from './OrderedItem.styles';

type OrderedItemProps = OrderData;

export const OrderedItem = ({ ...information }: OrderedItemProps) => {
  const { id, orderedItems } = information;

  return (
    <S.OrderContainer>
      <S.OrderId>주문번호: {id}</S.OrderId>
      {orderedItems.map((orderedItem) => (
        <S.OrderedItemContainer>
          <S.OrderedItemImageWrapper>
            <S.OrderedItemImage src={orderedItem.product.imageUrl} />
          </S.OrderedItemImageWrapper>
          <S.OrderedItemInformationContainer>
            <S.OrderedItemName>{orderedItem.product.name}</S.OrderedItemName>
            <S.OrderedItemPrice>
              {priceFormatter(orderedItem.product.discountedPrice)}원
            </S.OrderedItemPrice>
            <S.OrderedItemQuantity>{orderedItem.quantity}개 구매</S.OrderedItemQuantity>
          </S.OrderedItemInformationContainer>
          <S.AddItemToCartButton>장바구니 담기</S.AddItemToCartButton>
        </S.OrderedItemContainer>
      ))}
    </S.OrderContainer>
  );
};
