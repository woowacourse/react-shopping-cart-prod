import { FlexWrapper } from '@pages/CartPage/CartPage.style';
import * as S from './ExpectedPayment.style';

import { useCart, useTotalPrice } from '@views/Cart/recoil/cartState';
import { DELIVERY_FEE_BASIC } from '@views/Payment/constants/orderConstants';

import { useState } from 'react';
import { CouponModal } from '../CouponModal';
import { useCouponSelected } from '@views/Payment/recoil/couponListState';
import { CouponType } from 'types/CouponType';
import { RiCoupon2Line } from 'react-icons/ri';
import { Button } from '@common/Button';
import { CouponMessage } from '../CouponMessage';
import useFetchOrders from '@views/Payment/hooks/useFetchOrders';
import { useNavigate } from 'react-router-dom';
import ROUTER_PATH from '@router/constants/routerPath';

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
  const totalPrice = useTotalPrice();
  const couponSelected = useCouponSelected();
  const fetchOrders = useFetchOrders();
  const navigate = useNavigate();
  const { getCheckedItemIds } = useCart();

  const discountPrice = getDiscount(couponSelected, totalPrice);

  const [isCouponOpen, setIsCouponOpen] = useState(false);

  const deliveryFee = totalPrice ? DELIVERY_FEE_BASIC : 0;
  const totalPayingPrice = totalPrice + deliveryFee;

  const handleSeeCoupons = () => {
    setIsCouponOpen(true);
  };

  const handlePay = async () => {
    if (couponSelected) {
      const response = await fetchOrders.postOrder({
        orderItemIds: getCheckedItemIds(),
        couponId: couponSelected.id,
      });

      const location = response.headers.get('Location');
      const orderId = location?.split('/').pop();
      navigate(`${ROUTER_PATH.order}/${orderId}`);
    } else {
      const response = await fetchOrders.postOrder({
        orderItemIds: getCheckedItemIds(),
      });
      const location = response.headers.get('Location');
      const orderId = location?.split('/').pop();
      navigate(`${ROUTER_PATH.order}/${orderId}`);
    }
  };

  return (
    <S.PayingContainer>
      <S.PayingBox>
        <S.CouponContainer>
          <S.CouponTitleWrapper>
            <RiCoupon2Line />
            <S.CouponTitle>쿠폰</S.CouponTitle>
          </S.CouponTitleWrapper>
          <CouponMessage />
          <S.CouponButton size="m" onClick={handleSeeCoupons} disabled={totalPrice === 0}>
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
            <S.CouponText info={discountPrice > 0}>쿠폰 할인</S.CouponText>
            <S.CouponText info={discountPrice > 0}>
              - {discountPrice.toLocaleString('ko-KR')}원
            </S.CouponText>
          </FlexWrapper>
          <S.TotalPriceContainer>
            <S.TotalText>총 주문금액</S.TotalText>
            <S.TotalText>
              {(totalPayingPrice - discountPrice).toLocaleString('ko-KR')}원
            </S.TotalText>
          </S.TotalPriceContainer>
        </S.PayingBackground>
        <Button
          size="l"
          primary
          onClick={() => {
            handlePay();
          }}
          disabled={totalPrice === 0}
        >
          결제하기
        </Button>
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
