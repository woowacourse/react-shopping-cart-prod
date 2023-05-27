import { FlexWrapper } from '@pages/CartPage/CartPage.style';
import * as S from './ExpectedPayment.style';
import { useCartTotalPriceReadOnly } from '@views/Cart/recoil/withTotalPrice';

function ExpectedPayment() {
  const { totalPriceReadOnly } = useCartTotalPriceReadOnly();
  const deliveryFee = totalPriceReadOnly ? 3000 : 0;
  const totalPayingPrice = totalPriceReadOnly + deliveryFee;
  return (
    <S.PayingContainer>
      <S.PayingBox>
        <S.PayingBackground>
          <S.PayingTitle>결제 예상 금액</S.PayingTitle>
        </S.PayingBackground>
        <S.PayingBackground>
          <FlexWrapper>
            <S.ContentText>총 상품 가격</S.ContentText>
            <S.ContentText> {totalPriceReadOnly.toLocaleString('ko-KR')}원</S.ContentText>
          </FlexWrapper>
          <FlexWrapper>
            <S.ContentText>총 배송비</S.ContentText>
            <S.ContentText>{deliveryFee.toLocaleString('ko-KR')}원</S.ContentText>
          </FlexWrapper>
          <S.TotalPriceContainer>
            <S.TotalText>총 주문금액</S.TotalText>
            <S.TotalText>{totalPayingPrice.toLocaleString('ko-KR')}원</S.TotalText>
          </S.TotalPriceContainer>
        </S.PayingBackground>
        <S.PayingButton disabled={totalPriceReadOnly === 0}>결제하기</S.PayingButton>
      </S.PayingBox>
    </S.PayingContainer>
  );
}

export default ExpectedPayment;
