import { styled } from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatPrice';
import usePaymentAmount from './usePaymentAmount';
import CouponInfo from '../../../types/coupon';
import cartState from '../../../globalState/atoms/cartState';
import serverNameState from '../../../globalState/atoms/serverName';
import ServerUtil from '../../../utils/ServerUrl';
import { USER_AUTH_TOKEN } from '../../../constant';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';

interface PaymentAmountProps {
  coupon?: CouponInfo | null;
}

const PaymentAmount = (props: PaymentAmountProps) => {
  const { coupon } = props;
  const { paymentAmount, deliveryFee, orderingItems } = usePaymentAmount();
  const serverName = useRecoilValue(serverNameState);
  const setCartState = useSetRecoilState(cartState);
  const [isOrdering, setIsOrdering] = useState(false);

  const navigate = useNavigate();

  const discountedPrice = (() => {
    if (!coupon) return 0;
    if (coupon.type === 'percent') return Math.ceil(paymentAmount * (coupon.amount / 100));
    return coupon.amount;
  })();

  const finalPrice = Math.max(Math.floor(paymentAmount - discountedPrice) + deliveryFee, 0);

  const order = async () => {
    if (!orderingItems.length) {
      alert('주문할 상품이 없습니다!');
      return;
    }

    if (!window.confirm('정말로 주문하시겠습니까?')) return;

    setIsOrdering(true);

    const url = ServerUtil.getOrderUrl(serverName);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${USER_AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        cartItems: orderingItems,
        couponIds: coupon ? [coupon.id] : [],
        deliveryFee,
      }),
    });

    setIsOrdering(false);

    if (response.status !== 201) {
      alert('추문에 실패하였습니다. 잠시 후 다시 시도해 주세요!');
      return;
    }

    const { orderId } = await response.json();

    setCartState((prevCart) => {
      const orderedCartItemIds = orderingItems.map(({ id }) => id);
      return prevCart.filter(({ id }) => !orderedCartItemIds.includes(id));
    });

    navigate('/order-complete', { replace: true, state: { orderId } });
  };

  return (
    <PaymentAmountContainer>
      <Title>결제예상금액</Title>
      <Contents>
        <AmountTextContainer marginbottom="20px">
          <AmountText>총 가격</AmountText>
          <AmountText>{formatPrice(paymentAmount)}</AmountText>
        </AmountTextContainer>
        {discountedPrice ? (
          <AmountTextContainer marginbottom="40px">
            <AmountText>
              <span aria-hidden="true">┖ </span>쿠폰 적용
            </AmountText>
            <AmountText>-{formatPrice(discountedPrice)}</AmountText>
          </AmountTextContainer>
        ) : null}
        <AmountTextContainer marginbottom="40px">
          <AmountText>배송비</AmountText>
          <AmountText>{formatPrice(deliveryFee)}</AmountText>
        </AmountTextContainer>
        <AmountTextContainer marginbottom="45px">
          <AmountText> 최종 금액</AmountText>
          <AmountText>{formatPrice(finalPrice)}</AmountText>
        </AmountTextContainer>
        <OrderButton onClick={() => order()}>주문하기</OrderButton>
      </Contents>
      {isOrdering
        ? createPortal(
            <OrderingDiv>
              <OrderBackdropDiv />
              <LoadingSpinner color="#04c09e" />
            </OrderingDiv>,
            document.body
          )
        : null}
    </PaymentAmountContainer>
  );
};

const PaymentAmountContainer = styled.div`
  margin-top: 30px;
  width: 448px;

  border: 1px solid #dddddd;

  @media screen and (max-width: 1320px) {
    width: 100%;
  }
`;

const Title = styled.h4`
  padding: 20px 30px;

  font-weight: 400;
  font-size: 24px;
  color: #333333;

  border-bottom: 3px solid #dddddd;
`;

const Contents = styled.div`
  width: 100%;

  padding: 35px;
`;

const AmountTextContainer = styled.div<{ marginbottom?: string }>`
  display: flex;

  justify-content: space-between;

  margin-bottom: ${({ marginbottom }) => marginbottom || '0'};
`;

const AmountText = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: #333333;
`;

const OrderButton = styled.button`
  width: 100%;
  height: 73px;

  border: none;
  background-color: #333333;

  font-weight: 400;
  font-size: 24px;
  color: #ffffff;

  cursor: pointer;
`;

const OrderingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > * {
    z-index: 2;
  }
`;

const OrderBackdropDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  background-color: #33333366;
`;

export default PaymentAmount;
