import { FlexWrapper } from '@pages/CartPage/CartPage.style';
import * as S from './ExpectedPayment.style';

import { useCart } from '@views/Cart/recoil/cartState';
import { DELIVERY_FEE_BASIC } from '@views/Payment/constants/orderConstants';

function ExpectedPayment() {
  const { totalPrice } = useCart();

  const deliveryFee = totalPrice ? DELIVERY_FEE_BASIC : 0;
  const totalPayingPrice = totalPrice + deliveryFee;
  return (
    <S.PayingContainer>
      <S.PayingBox>
        <S.PayingBackground>
          <S.PayingTitle>결제 예상 금액</S.PayingTitle>
        </S.PayingBackground>
        <S.PayingBackground>
          <FlexWrapper>
            <S.ContentText>총 상품 가격</S.ContentText>
            <S.ContentText> {totalPrice.toLocaleString('ko-KR')}원</S.ContentText>
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
        <S.PayingButton disabled={totalPrice === 0}>결제하기</S.PayingButton>
      </S.PayingBox>
    </S.PayingContainer>
  );
}

export default ExpectedPayment;
