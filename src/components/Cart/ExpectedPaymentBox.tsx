import { ChangeEventHandler, useState } from 'react';

import styled from 'styled-components';

import Button from '../Common/Button';

import useMultipleChecked from '../../hooks/useMultipleChecked';
import useExpectedPayment from '../../hooks/useCartPrice';
import { useGetCoupons } from '../../hooks/useGetCoupons';
import { useOrderProducts } from '../../hooks/useOrderProducts';
import { removeChar } from '../../utils/stringUtils';
import { useNavigate } from 'react-router-dom';
import SelectBox from '../Common/SelectBox';
import { useSetRecoilState } from 'recoil';
import { TOAST_STATE } from '../../constants/toast';
import { toastState } from '../../states/toast/atom';

const ExpectedPaymentBox = () => {
  const { isAllUnchecked } = useMultipleChecked();
  const { totalProductPrice, deliveryFee, calculateTotalPrice } =
    useExpectedPayment();
  const [coupons] = useState(useGetCoupons());
  const [discountPrice, setDiscountPrice] = useState(0);
  const setToastState = useSetRecoilState(toastState);
  const orderProducts = useOrderProducts();
  const navigate = useNavigate();
  // const couponNames = coupons.map(coupon => coupon.name);
  const couponNames = [
    '3000원 할인 쿠폰',
    '1000원 할인 쿠폰',
    '첫 주문 5000원 할인 쿠폰',
  ];

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = event => {
    const selectedCouponName = event.currentTarget.value;
    const selectedCouponsDiscountPrice = coupons.find(
      coupon => coupon.name === selectedCouponName
    )?.discountPrice;

    if (!selectedCouponsDiscountPrice) {
      setToastState(TOAST_STATE.failedSelectCoupon);
      return;
    }

    setDiscountPrice(prev => prev + selectedCouponsDiscountPrice);
    setToastState(TOAST_STATE.successSelectCoupon);
  };

  const handleOrderClick = () => {
    const orderPrice = Number(
      removeChar(calculateTotalPrice(discountPrice), ',')
    );
    orderProducts(orderPrice, 1);
    navigate('/order');
  };

  return (
    <ExpectedPaymentContainer>
      <ExpectedPaymentTitle>결제예상금액</ExpectedPaymentTitle>
      <ExpectedPaymentInfo>
        <PaymentInfoItem>
          <dt>총 상품가격</dt>
          <dd>{totalProductPrice}원</dd>
        </PaymentInfoItem>
        <PaymentInfoItem>
          <dt>총 배송비</dt>
          <dd>{deliveryFee}원</dd>
        </PaymentInfoItem>
        <PaymentInfoItem>
          <dt>총 주문금액</dt>
          <dd>{calculateTotalPrice(discountPrice)}원</dd>
        </PaymentInfoItem>
      </ExpectedPaymentInfo>
      <OrderButtonWrapper>
        <SelectBox options={couponNames} onChange={handleSelectChange} />
        <Button
          type="button"
          autoSize
          disabled={isAllUnchecked}
          onClick={handleOrderClick}
        >
          주문하기
        </Button>
      </OrderButtonWrapper>
    </ExpectedPaymentContainer>
  );
};

const ExpectedPaymentContainer = styled.div`
  min-width: 400px;
  height: 460px;
  margin-top: 90px;

  border: 1px solid ${({ theme }) => theme.colors.gray100};

  @media (max-width: ${({ theme }) => theme.breakPoints.medium}) {
    width: 100%;
    margin-top: 0px;
  }
`;

const ExpectedPaymentTitle = styled.h2`
  height: 80px;
  padding: 0 30px;
  line-height: 80px;
  font-size: 20px;
  font-weight: 400;
  border-bottom: 3px solid ${({ theme }) => theme.colors.gray100};

  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    font-size: 24px;
  }
`;

const ExpectedPaymentInfo = styled.div`
  padding: 30px 30px 0;

  & > dl + dl {
    margin: 16px 0 0 0;
  }

  & > dl:last-of-type {
    margin: 40px 0 0 0;
  }
`;

const PaymentInfoItem = styled.dl`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > dt,
  dd {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.5;
  }
`;

const OrderButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 30px 30px;
  margin: 40px 0 0 0;

  & > select {
    width: 100%;
    height: 40px;

    padding: 0 8px;

    font-weight: bold;
  }
`;

export default ExpectedPaymentBox;
