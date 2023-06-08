import Button from '@Components/Button';

import * as S from './style';

export function SkeletonPaymentAmount() {
  return (
    <>
      <S.Container>
        <S.Title>결제 예상 금액</S.Title>
        <S.ExpectedAmountLayout>
          <S.AmountWrapper>
            <S.AmountCategory>총 상품가격</S.AmountCategory>
            <S.Amount>0 원</S.Amount>
          </S.AmountWrapper>
          <S.AmountWrapper>
            <S.AmountCategory>총 배송비</S.AmountCategory>
            <S.Amount>0 원</S.Amount>
          </S.AmountWrapper>
          <S.AmountWrapper>
            <S.AmountCategory>총 주문가격</S.AmountCategory>
            <S.Amount>0 원</S.Amount>
          </S.AmountWrapper>
          <Button backgroundColor="#22a6a2" text="주문하기" disable />
        </S.ExpectedAmountLayout>
      </S.Container>
    </>
  );
}

export default SkeletonPaymentAmount;
