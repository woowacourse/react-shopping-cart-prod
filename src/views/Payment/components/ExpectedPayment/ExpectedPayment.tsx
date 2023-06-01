import { FlexWrapper } from '@pages/CartPage/CartPage.style';
import * as S from './ExpectedPayment.style';

import { useCart } from '@views/Cart/recoil/cartState';
import { DELIVERY_FEE_BASIC } from '@views/Payment/constants/orderConstants';

import { useState } from 'react';
import { CouponModal } from '../CouponModal';
import useCouponList from '@views/Payment/recoil/couponListState';
import { CouponType } from 'types/CouponType';
import { PaymentModal } from '../PaymentModal';

const getDiscount = (coupon: CouponType | null, totalPrice: number) => {
  if (!coupon || !totalPrice) {
    return 0;
  }

  switch (coupon.type) {
    case 'price': {
      return coupon.value;
    }

    case 'percent': {
      return (coupon.value / 100) * totalPrice;
    }

    case 'delivery': {
      return coupon.value;
    }
  }
};

function ExpectedPayment() {
  const { totalPrice } = useCart();
  const { getCheckedCoupon } = useCouponList();

  const discountPrice = getDiscount(getCheckedCoupon(), totalPrice);

  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const deliveryFee = totalPrice ? DELIVERY_FEE_BASIC : 0;
  const totalPayingPrice = totalPrice + deliveryFee;

  const handleSeeCoupons = () => {
    setIsCouponOpen(true);
  };

  const handlePay = () => {
    setIsPaymentOpen(true);
  };

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
          <FlexWrapper>
            <S.ContentText>쿠폰 할인</S.ContentText>
            <S.ContentText>-{discountPrice.toLocaleString('ko-KR')}원</S.ContentText>
          </FlexWrapper>
          <S.TotalPriceContainer>
            <S.TotalText>총 주문금액</S.TotalText>
            <S.TotalText>
              {(totalPayingPrice - discountPrice).toLocaleString('ko-KR')}원
            </S.TotalText>
          </S.TotalPriceContainer>
        </S.PayingBackground>
        <div style={{ display: 'flex', columnGap: '2rem' }}>
          <S.CouponButton onClick={handleSeeCoupons} disabled={totalPrice === 0}>
            쿠폰선택
          </S.CouponButton>
          <S.PayingButton
            onClick={() => {
              handlePay();
            }}
            disabled={totalPrice === 0}
          >
            결제하기
          </S.PayingButton>
        </div>
      </S.PayingBox>
      <CouponModal
        isOpen={isCouponOpen}
        closeModal={() => {
          setIsCouponOpen(false);
        }}
      />
    </S.PayingContainer>
  );
}

export default ExpectedPayment;
