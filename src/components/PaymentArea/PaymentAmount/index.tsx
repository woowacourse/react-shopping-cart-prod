import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Button from '@Components/Button';

import useOrderItems from '@Hooks/useOrderItems';

import selectedCouponIdState from '@Atoms/selectedCouponIdState';

import cartItemsAmountState from '@Selector/cartItemsAmountState';
import orderAmountState from '@Selector/orderAmountState';

import * as S from './style';
import IssuedCoupon from '../IssuedCoupon';

function PaymentAmount() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const { orderAmount, deliveryFee, cartListPrice, finalOrderPrice } = useRecoilValue(orderAmountState);
  const cartAmount = useRecoilValue(cartItemsAmountState);
  const setSelectedCouponId = useSetRecoilState(selectedCouponIdState);

  const displayButtonText = pathname === '/cart-list' ? '주문하기' : '결제하기';
  const displayTotalOrderPrice = pathname === '/cart-list' ? cartListPrice : finalOrderPrice;
  const isFixScrollPosition = pathname === '/cart-list' ? scrollPosition > 160 : scrollPosition > 120;

  const { orderCartItems } = useOrderItems();

  const handleOrderCartItems = () => {
    if (pathname === '/cart-list') {
      setSelectedCouponId(null);
      navigate('/order-sheet');
    } else {
      orderCartItems(finalOrderPrice);
      navigate('/order-list');
    }
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

  if (cartAmount === '0') return <></>;

  return (
    <S.Wrapper isFixScrollPosition={isFixScrollPosition}>
      {pathname === '/order-sheet' && <IssuedCoupon />}
      <S.Container>
        <S.Title aria-label="결제 예상 금액">결제 예상 금액</S.Title>
        <S.ExpectedAmountLayout>
          <S.AmountWrapper aria-label="총 상품가격">
            <S.AmountCategory>총 상품가격</S.AmountCategory>
            <S.Amount>{orderAmount}</S.Amount>
          </S.AmountWrapper>
          <S.AmountWrapper aria-label="총 배송비">
            <S.AmountCategory>총 배송비</S.AmountCategory>
            <S.Amount>{deliveryFee}</S.Amount>
          </S.AmountWrapper>
          <S.AmountWrapper aria-label="총 주문가격">
            <S.AmountCategory>총 주문가격</S.AmountCategory>
            <S.Amount>{displayTotalOrderPrice}</S.Amount>
          </S.AmountWrapper>
          <Button
            backgroundColor="#22a6a2"
            text={displayButtonText}
            onClick={handleOrderCartItems}
            disable={orderAmount === '0 원'}
          />
        </S.ExpectedAmountLayout>
      </S.Container>
    </S.Wrapper>
  );
}

export default PaymentAmount;
