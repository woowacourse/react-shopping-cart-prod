import * as S from './OrderPaymentAmount.style';

interface OrderPaymentAmountProps {
  totalItemsPrice: number;
  deliveryFee: number;
  discountPrice: number;
}

function OrderPaymentAmount({
  totalItemsPrice,
  deliveryFee,
  discountPrice,
}: OrderPaymentAmountProps) {
  const totalPaymentAmount = totalItemsPrice + deliveryFee - discountPrice;
  return (
    <div>
      <S.Title>결제금액 정보</S.Title>
      <S.InformationWrapper>
        <S.AmountWrapper>
          <span>상품가격</span>
          <span>{totalItemsPrice}원</span>
        </S.AmountWrapper>
        <S.AmountWrapper>
          <span>배송비</span>
          <span>{deliveryFee}원</span>
        </S.AmountWrapper>
        <S.AmountWrapper>
          <span>할인 금액</span>
          <span>-{discountPrice}원</span>
        </S.AmountWrapper>
        <S.AmountWrapper>
          <span>총 결제금액</span>
          <span>{totalPaymentAmount}원</span>
        </S.AmountWrapper>
      </S.InformationWrapper>
    </div>
  );
}

export default OrderPaymentAmount;
