import Button from '@components/common/Button';
import * as S from './ExpectedPayment.style';

interface OrderPaymentAmountProps {
  totalItemsPrice: number;
  deliveryFee: number;
  discountPrice: number;
  onOrderClick: () => void;
}

function ExpectedPayment({
  totalItemsPrice,
  deliveryFee,
  discountPrice,
  onOrderClick,
}: OrderPaymentAmountProps) {
  const totalPaymentAmount = totalItemsPrice + deliveryFee - discountPrice;
  return (
    <S.PayingContainer>
      <S.Title>결제예상금액</S.Title>
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
        <S.LastAmountWrapper>
          <span>총 주문금액</span>
          <span>{totalPaymentAmount}원</span>
        </S.LastAmountWrapper>
        <Button text="주문하기" disabled={totalItemsPrice === 0} onClick={onOrderClick} />
      </S.InformationWrapper>
    </S.PayingContainer>
  );
}

export default ExpectedPayment;
