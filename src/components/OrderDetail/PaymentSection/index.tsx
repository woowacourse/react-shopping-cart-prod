import React from 'react';
import * as S from './PaymentSection.styles';
import { OrderDetail } from 'types/api/orders';

const PaymentSection = ({ orderDetail }: { orderDetail: OrderDetail }) => {
  const { orderedItems, deliveryPrice, discountFromTotalPrice } = orderDetail;

  const totalPrice = orderedItems.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );
  const totalDiscountPrice =
    orderedItems.reduce((acc, item) => acc + item.totalDiscountPrice, 0) +
    discountFromTotalPrice;

  const finalPrice = totalPrice - totalDiscountPrice + deliveryPrice;

  return (
    <S.Container>
      <S.Title>결제 금액</S.Title>
      <S.Divider />
      <S.Wrapper>
        <S.Text>총 상품 금액</S.Text>
        <S.Text>{totalPrice.toLocaleString('KR')}원</S.Text>
      </S.Wrapper>
      <S.Wrapper>
        <S.Text>총 할인 금액</S.Text>
        <S.Text>-{totalDiscountPrice.toLocaleString('KR')}원</S.Text>
      </S.Wrapper>
      <S.Wrapper>
        <S.Text>배송비</S.Text>
        <S.Text>+{deliveryPrice.toLocaleString('KR')}원</S.Text>
      </S.Wrapper>
      <S.Divider />
      <S.Wrapper>
        <S.Text>총 결제 금액</S.Text>
        <S.Text>{finalPrice.toLocaleString('KR')}원</S.Text>
      </S.Wrapper>
    </S.Container>
  );
};

export default PaymentSection;
