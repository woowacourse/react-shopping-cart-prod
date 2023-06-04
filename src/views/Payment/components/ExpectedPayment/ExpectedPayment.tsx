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
import useExpectedPriceContent from '@views/Payment/hooks/useExpectedPrice';

function ExpectedPayment() {
  const [isCouponOpen, setIsCouponOpen] = useState(false);

  const fetchOrders = useFetchOrders();
  const couponSelected = useCouponSelected();
  const { getCheckedItemIds } = useCart();

  const { deliveryFee, discountPrice, expectedPrice, totalPrice } =
    useExpectedPriceContent(couponSelected);

  const navigate = useNavigate();

  const handleSeeCoupons = () => {
    setIsCouponOpen(true);
  };

  const handlePay = async () => {
    const requestBody = couponSelected
      ? { orderItemIds: getCheckedItemIds(), couponId: couponSelected.id }
      : {
          orderItemIds: getCheckedItemIds(),
        };

    const response = await fetchOrders.postOrder(requestBody);
    const orderId = response.headers.get('Location')?.split('/').pop();

    if (!orderId) throw new Error('주문 후 orderId를 조회할 수 없습니다.');

    navigate(`${ROUTER_PATH.order}/${Number(orderId)}`);
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
            <S.TotalText>{expectedPrice.toLocaleString('ko-KR')}원</S.TotalText>
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
