import { FlexWrapper } from '@pages/CartPage/CartPage.style';
import * as S from './ExpectedPayment.style';

import { useCart } from '@views/Cart/recoil/cartState';
import { DELIVERY_FEE_BASIC } from '@views/Payment/constants/orderConstants';

import { useState } from 'react';
import { CouponModal } from '../CouponModal';
import useCouponList from '@views/Payment/recoil/couponListState';
import { CouponType } from 'types/CouponType';
import { RiCoupon2Line } from 'react-icons/ri';

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
  const { couponList, getCheckedCoupon } = useCouponList();

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
        <S.CouponContainer>
          <S.CouponTitleWrapper>
            <RiCoupon2Line />
            <S.CouponTitle>쿠폰</S.CouponTitle>
          </S.CouponTitleWrapper>
          <S.CouponTitle>사용 가능한 쿠폰이 {couponList.length}개 있어요.</S.CouponTitle>
          <S.CouponButton onClick={handleSeeCoupons} disabled={totalPrice === 0}>
            쿠폰선택
          </S.CouponButton>
        </S.CouponContainer>

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
        <S.PayingButton
          onClick={() => {
            handlePay();
          }}
          disabled={totalPrice === 0}
        >
          결제하기
        </S.PayingButton>
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
