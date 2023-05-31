import { ChangeEventHandler, useState } from 'react';

import styled from 'styled-components';

import Button from '../Common/Button';
import SelectBox from '../Common/SelectBox';

import useMultipleChecked from '../../hooks/useMultipleChecked';
import useExpectedPayment from '../../hooks/useCartPrice';
import { useGetCoupons } from '../../hooks/useGetCoupons';
import { useOrderProducts } from '../../hooks/useOrderProducts';
import { useGetSelectedCoupon } from '../../hooks/useGetSelectedCoupon';
import { removeChar } from '../../utils/stringUtils';
import { Coupon } from '../../types/coupon';
import { DEFAULT_COUPON_NAME, NO_DISCOUNT } from '../../constants/coupon';

const couponNamesMocks = [
  DEFAULT_COUPON_NAME,
  '3000원 할인 쿠폰',
  '1000원 할인 쿠폰',
  '첫 주문 5000원 할인 쿠폰',
];

const ExpectedPaymentBox = () => {
  const { isAllUnchecked } = useMultipleChecked();
  const { totalProductPrice, deliveryFee, calculateTotalPrice } =
    useExpectedPayment();
  const [coupons] = useState(useGetCoupons());
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>();
  const [discountPrice, setDiscountPrice] = useState(0);
  const orderProducts = useOrderProducts();
  const getSelectedCoupon = useGetSelectedCoupon();
  // const couponNames = coupons.map(coupon => coupon.name);

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = event => {
    setSelectedCoupon(getSelectedCoupon(event, coupons));

    setDiscountPrice(selectedCoupon ? selectedCoupon.discountPrice : 0);
  };

  const handleOrderClick = () => {
    const orderPrice = Number(
      removeChar(calculateTotalPrice(discountPrice), ',')
    );

    orderProducts(orderPrice, selectedCoupon ? selectedCoupon.id : NO_DISCOUNT);
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
        <SelectBox options={couponNamesMocks} onChange={handleSelectChange} />
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
