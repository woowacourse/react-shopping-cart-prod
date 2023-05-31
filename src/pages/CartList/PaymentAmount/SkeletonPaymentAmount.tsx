import Button from '@Components/Button';

import * as S from './style';
import IssuedCoupon from '../IssuedCoupon';

export function SkeletonPaymentAmount() {
  return (
    <>
      <IssuedCoupon />
      <S.Container>
        <S.Title aria-label="결제 예상 금액">결제 예상 금액</S.Title>
        <S.ExpectedAmountLayout>
          <S.AmountWrapper aria-label="총 상품가격">
            <S.AmountCategory>총 상품가격</S.AmountCategory>
            <S.Amount>0 원</S.Amount>
          </S.AmountWrapper>
          <S.AmountWrapper aria-label="총 배송비">
            <S.AmountCategory>총 배송비</S.AmountCategory>
            <S.Amount>0 원</S.Amount>
          </S.AmountWrapper>
          <S.AmountWrapper aria-label="총 주문가격">
            <S.AmountCategory>총 주문가격</S.AmountCategory>
            <S.Amount>0 원</S.Amount>
          </S.AmountWrapper>
          <Button backgroundColor="#22a6a2" text="주문하기" />
        </S.ExpectedAmountLayout>
      </S.Container>
    </>
  );
}

export default SkeletonPaymentAmount;
