import Button from '@Components/Button';

import * as S from './style';

export function SkeletonPaymentAmount() {
  return (
    <S.Container>
      <S.Title aria-label="결제 예상 금액">결제 예상 금액</S.Title>
      <S.ExpectedAmountLayout>
        <S.AmountWrapper aria-label="총 상품가격"></S.AmountWrapper>
        <S.ButtonContainer>
          <Button backgroundColor="#22a6a2" text="주문하기" />
        </S.ButtonContainer>
      </S.ExpectedAmountLayout>
    </S.Container>
  );
}

export default SkeletonPaymentAmount;
