import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import Button from '@Components/Button';

import { CartItemType, MemberCouponType, OrderItemType } from '@Types/index';

import { fetchData } from '@Utils/api';

import cartItemsState from '@Atoms/cartItemsState';
import memberCouponState from '@Atoms/memberCouponState';
import orderListState from '@Atoms/orderListState';
import serverState from '@Atoms/serverState';
import usingCouponState from '@Atoms/usingCouponState';

import cartItemsAmountState from '@Selector/cartItemsAmountState';
import orderAmountState from '@Selector/orderAmountState';

import { DELIVERY_FEE } from '@Constants/index';
import { FETCH_METHOD, FETCH_URL } from '@Constants/servers';

import * as S from './style';

function PaymentAmount() {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const setMemberCoupon = useSetRecoilState(memberCouponState);
  const setOrderList = useSetRecoilState(orderListState);
  const price = useRecoilValue(orderAmountState);
  const cartAmount = useRecoilValue(cartItemsAmountState);
  const usingCoupon = useRecoilValue(usingCouponState);

  const priceDisCount = price >= 100000 ? 5000 : 0;
  const allPrice = price - priceDisCount;
  const deliveryFee = !allPrice ? 0 : DELIVERY_FEE;
  const selectedCartItemIds = cartItems.filter((item) => item.isSelected).map((item) => item.id);

  const priceText = `${price.toLocaleString()} 원`;
  const priceDiscountText = `${priceDisCount.toLocaleString()} 원`;
  const couponDiscointText = `${usingCoupon.discountAmount.toLocaleString()} 원`;
  const deliveryFeeText = `${deliveryFee.toLocaleString()} 원`;
  const totalOrderPriceText = `${Math.max(allPrice - usingCoupon.discountAmount + deliveryFee, 0).toLocaleString()} 원`;

  const navigate = useNavigate();

  const server = useRecoilValue(serverState);
  const resetUsingCoupon = useResetRecoilState(usingCouponState);
  useEffect(() => {
    resetUsingCoupon();
  }, [server]);

  const orderProducts = async () => {
    if (selectedCartItemIds.length === 0) return alert('상품을 1개 이상 선택해주세요.');

    const body = JSON.stringify({
      cartItemIds: selectedCartItemIds,
      couponId: usingCoupon.id,
      price: Math.max(allPrice - usingCoupon.discountAmount + deliveryFee, 0),
    });
    await fetchData({ url: FETCH_URL.orderList, method: FETCH_METHOD.POST, body, server });

    const memberCoupons = await fetchData<MemberCouponType[]>({
      url: FETCH_URL.memberCoupon,
      method: FETCH_METHOD.GET,
      server,
    });
    setMemberCoupon(memberCoupons);

    const fetchCartItems = await fetchData<CartItemType[]>({
      url: FETCH_URL.cartItems,
      method: FETCH_METHOD.GET,
      server,
    });

    const fetchOrderList = await fetchData<OrderItemType[]>({
      url: FETCH_URL.orderList,
      method: FETCH_METHOD.GET,
      server,
    });
    setOrderList(fetchOrderList);

    navigate('/order-list');

    const newCartItems = fetchCartItems.map((cartItem) => {
      return {
        ...cartItem,
        isSelected: false,
      };
    });
    setCartItems(newCartItems);
  };

  if (cartAmount === '0') return <></>;

  return (
    <S.Container>
      <S.TitleWrapper>
        <S.Title aria-label="결제 예상 금액">결제 예상 금액</S.Title>
        <S.DetailPriceButton>
          상세 {'>'}
          <S.DetailPrice>
            <S.Price>100,000</S.Price>원 이상 주문 시, <S.Price>5,000</S.Price>원 할인!
          </S.DetailPrice>
        </S.DetailPriceButton>
      </S.TitleWrapper>
      <S.ExpectedAmountLayout>
        <S.AmountContainer>
          <S.AmountWrapper aria-label="총 상품가격">
            <S.AmountCategory>총 상품가격</S.AmountCategory>
            <S.Amount>{priceText}</S.Amount>
          </S.AmountWrapper>
          {priceDisCount !== 0 && (
            <S.DiscountWrapper aria-label="상품 할인">
              <S.DiscountCategory>상품 할인</S.DiscountCategory>
              <S.Discount>{`-${priceDiscountText}`}</S.Discount>
            </S.DiscountWrapper>
          )}
          {usingCoupon.discountAmount !== 0 && (
            <S.DiscountWrapper aria-label="쿠폰 할인">
              <S.DiscountCategory>쿠폰 할인</S.DiscountCategory>
              <S.Discount>{`-${couponDiscointText}`}</S.Discount>
            </S.DiscountWrapper>
          )}
        </S.AmountContainer>
        <S.AmountContainer>
          <S.AmountWrapper aria-label="총 배송비">
            <S.AmountCategory>총 배송비</S.AmountCategory>
            <S.Amount>{deliveryFeeText}</S.Amount>
          </S.AmountWrapper>
        </S.AmountContainer>
        <S.AmountContainer>
          <S.AmountWrapper aria-label="총 주문가격">
            <S.AmountCategory>총 주문가격</S.AmountCategory>
            <S.Amount>{totalOrderPriceText}</S.Amount>
          </S.AmountWrapper>
        </S.AmountContainer>
        <S.ButtonContainer>
          <Button onClick={orderProducts} backgroundColor="rgb(71 201 180)" text="주문하기" />
        </S.ButtonContainer>
      </S.ExpectedAmountLayout>
    </S.Container>
  );
}

export default PaymentAmount;
