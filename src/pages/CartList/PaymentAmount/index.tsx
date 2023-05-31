import { useModal } from 'noah-modal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Button from '@Components/Button';
import HelperMessage from '@Components/HelperMessage';
import SecondaryButton from '@Components/SecondaryButton';

import useOrderItems from '@Hooks/useOrderItems';

import convert from '@Utils/convert';

import selectedCouponIdState from '@Atoms/selectedCouponIdState';

import cartItemsAmountState from '@Selector/cartItemsAmountState';
import orderAmountState from '@Selector/orderAmountState';

import * as S from './style';
import IssuedCoupon from '../IssuedCoupon';

function PaymentAmount() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { orderAmount, deliveryFee, totalOrderPrice, discountAmount, couponDiscountAmount } =
    useRecoilValue(orderAmountState);
  const cartAmount = useRecoilValue(cartItemsAmountState);
  const setSelectedCouponId = useSetRecoilState(selectedCouponIdState);

  const { openModal } = useModal();

  const navigate = useNavigate();

  const { orderCartItems } = useOrderItems();

  const openMyCouponModal = () => {
    if (convert.toNumberFromLocalPrice(orderAmount) < 50000) return alert('쿠폰은 50,000원 이상일 때 적용가능합니다.');

    openModal('myCoupon');
  };

  const handleOrderCartItems = () => {
    orderCartItems(totalOrderPrice);
    navigate('/order-list');
  };

  const updateScrollYPosition = () => {
    const scrollPosition = window.scrollY;
    setScrollPosition(scrollPosition);
  };

  useEffect(() => {
    updateScrollYPosition();
    window.addEventListener('scroll', updateScrollYPosition);
    return () => {
      window.removeEventListener('scroll', updateScrollYPosition);
    };
  }, []);

  useEffect(() => {
    if (convert.toNumberFromLocalPrice(orderAmount) < 50000) setSelectedCouponId(null);
  }, [orderAmount]);

  if (cartAmount === '0') return <></>;

  return (
    <S.Wrapper scrollPosition={scrollPosition}>
      <IssuedCoupon />
      <S.Container>
        <S.Title aria-label="결제 예상 금액">결제 예상 금액</S.Title>
        <S.ExpectedAmountLayout>
          <S.AmountWrapper aria-label="총 상품가격">
            <S.AmountCategory>총 상품가격</S.AmountCategory>
            <S.Amount>{orderAmount}</S.Amount>
          </S.AmountWrapper>
          <S.AmountWrapper aria-label="할인가격">
            <S.AmountCategory>
              <HelperMessage
                text="할인가격"
                message="10만원 이상 구매시 1%, 30만원 이상 구매시 3%, 50만원 이상 구매시 5%의 할인이 적용됩니다."
              />
            </S.AmountCategory>
            <S.Amount>{discountAmount}</S.Amount>
          </S.AmountWrapper>
          <S.AmountWrapper aria-label="쿠폰적용">
            <S.AmountCategory>
              <HelperMessage
                text="쿠폰적용"
                message="5만원 이상 구매시 쿠폰을 적용할 수 있습니다. 오른쪽 쿠폰 적용하기에서 적용가능한 쿠폰을 확인하세요."
              />
            </S.AmountCategory>
            <S.Amount>
              {couponDiscountAmount ? (
                <>
                  {couponDiscountAmount}
                  <S.ResetButton onClick={() => setSelectedCouponId(null)}>⟳</S.ResetButton>
                </>
              ) : (
                <SecondaryButton text="쿠폰 선택" onClick={openMyCouponModal} />
              )}
            </S.Amount>
          </S.AmountWrapper>
          <S.AmountWrapper aria-label="총 배송비">
            <S.AmountCategory>총 배송비</S.AmountCategory>
            <S.Amount>{deliveryFee}</S.Amount>
          </S.AmountWrapper>
          <S.AmountWrapper aria-label="총 주문가격">
            <S.AmountCategory>총 주문가격</S.AmountCategory>
            <S.Amount>{totalOrderPrice}</S.Amount>
          </S.AmountWrapper>
          <Button
            backgroundColor="#22a6a2"
            text="주문하기"
            onClick={handleOrderCartItems}
            disable={orderAmount === '0 원'}
          />
        </S.ExpectedAmountLayout>
      </S.Container>
    </S.Wrapper>
  );
}

export default PaymentAmount;
