import type { OrderData } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import * as S from './OrderedItemDetailInformation.styles';

type OrderedItemDetailInformationProps = OrderData;

export const OrderedItemDetailInformation = (orderedItem: OrderedItemDetailInformationProps) => {
  const {
    id,
    orderedItems,
    orderedAt,
    totalItemDiscountAmount,
    totalMemberDiscountAmount,
    totalItemPrice,
    discountedTotalItemPrice,
    shippingFee,
    totalPrice,
  } = orderedItem;

  return (
    <S.Container>
      <S.TitleWrapper>
        <S.Title>결제 정보</S.Title>
      </S.TitleWrapper>
      <S.ItemKeyValueContainer>
        <S.RowWrapper>
          <S.ItemKey>상품금액</S.ItemKey>
          <S.ItemValue>{priceFormatter(totalItemPrice)}</S.ItemValue>
        </S.RowWrapper>
        <S.RowWrapper>
          <S.ItemKey>상품할인금액</S.ItemKey>
          <S.ItemValue>{priceFormatter(totalItemDiscountAmount, true)}</S.ItemValue>
        </S.RowWrapper>
        <S.RowWrapper>
          <S.ItemKey>등급할인금액</S.ItemKey>
          <S.ItemValue>{priceFormatter(totalMemberDiscountAmount, true)}</S.ItemValue>
        </S.RowWrapper>
        <S.RowWrapper>
          <S.ItemKey>배송비</S.ItemKey>
          <S.ItemValue>{priceFormatter(shippingFee)}</S.ItemValue>
        </S.RowWrapper>
        <S.RowWrapper>
          <S.ItemKey>결제금액</S.ItemKey>
          <S.ItemValue>{priceFormatter(totalPrice)}</S.ItemValue>
        </S.RowWrapper>
      </S.ItemKeyValueContainer>
    </S.Container>
  );
};
