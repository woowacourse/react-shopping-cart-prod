import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Button from '@Components/Button';

import useCartItems from '@Hooks/useCartItems';
import useOrderItems from '@Hooks/useOrderItems';

import selectedCouponIdState from '@Atoms/selectedCouponIdState';

import orderAmountState from '@Selector/orderAmountState';

import ROUTES from '@Constants/routes';

import * as S from './style';
import IssuedCoupon from '../IssuedCoupon';

function PaymentAmount() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [scrollPosition, setScrollPosition] = useState(0);

  const { cartItemsAmount } = useCartItems();

  const { orderAmount, deliveryFee, cartListPrice, finalOrderPrice } = useRecoilValue(orderAmountState);
  const setSelectedCouponId = useSetRecoilState(selectedCouponIdState);

  const { orderCartItems } = useOrderItems();
  const { selectedCartItemsAmount } = useCartItems();

  const handleOrderCartItems = () => {
    if (!selectedCartItemsAmount) return alert('선택된 상품이 없습니다.');

    if (pathname === ROUTES.cartList) {
      setSelectedCouponId(null);
      navigate(ROUTES.orderSheet);
    } else {
      orderCartItems(finalOrderPrice);
      navigate(ROUTES.orderList);
    }
  };

  const displayButtonText = pathname === ROUTES.cartList ? '주문하기' : '결제하기';
  const displayTotalOrderPrice = pathname === ROUTES.cartList ? cartListPrice : finalOrderPrice;
  const isFixScrollPosition = pathname === ROUTES.cartList ? scrollPosition > 160 : scrollPosition > 120;

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

  if (cartItemsAmount === '0') return <></>;

  return (
    <S.Wrapper isFixScrollPosition={isFixScrollPosition}>
      {pathname === ROUTES.orderSheet && <IssuedCoupon />}
      <S.Container>
        <S.Title>결제 예상 금액</S.Title>
        <S.ExpectedAmountLayout>
          <S.AmountWrapper>
            <S.AmountCategory>총 상품가격</S.AmountCategory>
            <S.Amount>{orderAmount}</S.Amount>
          </S.AmountWrapper>
          <S.AmountWrapper>
            <S.AmountCategory>총 배송비</S.AmountCategory>
            <S.Amount>{deliveryFee}</S.Amount>
          </S.AmountWrapper>
          <S.AmountWrapper>
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
