import styled from 'styled-components';

import SelectBox from '../Common/SelectBox';
import Button from '../Common/Button';

import { useMultipleChecked } from '../../hooks/checked';
import { useCartPrice } from '../../hooks/cart';
import { useOrder } from '../../hooks/order';
import { useCoupons } from '../../hooks/coupon';

const ExpectedPaymentBox = () => {
  const { isAllUnchecked } = useMultipleChecked();
  const { couponOptions, currentCouponId, changeTargetCoupon } = useCoupons();
  const { totalProductPrice, deliveryFee, couponPrice, totalPrice } =
    useCartPrice(currentCouponId);
  const { orderCartProducts } = useOrder(currentCouponId, totalPrice);

  return (
    <ExpectedPaymentContainer>
      <ExpectedPaymentTitle>결제예상금액</ExpectedPaymentTitle>
      <ExpectedPaymentInfo>
        <PaymentInfoItem>
          <dt>총 상품가격</dt>
          <dd>{totalProductPrice.toLocaleString('ko-KR')}원</dd>
        </PaymentInfoItem>
        <PaymentInfoItem>
          <dt>총 배송비</dt>
          <dd>{deliveryFee.toLocaleString('ko-KR')}원</dd>
        </PaymentInfoItem>
        <PaymentInfoItem>
          <dt>총 할인금액</dt>
          <dd>
            {couponPrice > 0 && '-'}
            {couponPrice.toLocaleString('ko-KR')}원
          </dd>
        </PaymentInfoItem>
        <SelectBoxWrapper>
          <SelectBox
            options={couponOptions}
            title='적용할 쿠폰을 선택해 주세요.'
            onChange={changeTargetCoupon}
            autoSize
          />
        </SelectBoxWrapper>
        <PaymentInfoItem>
          <dt>총 주문금액</dt>
          <dd>{totalPrice.toLocaleString('ko-KR')}원</dd>
        </PaymentInfoItem>
      </ExpectedPaymentInfo>
      <OrderButtonWrapper>
        <Button
          type='button'
          autoSize
          disabled={isAllUnchecked}
          onClick={orderCartProducts}
        >
          주문하기
        </Button>
      </OrderButtonWrapper>
    </ExpectedPaymentContainer>
  );
};

const ExpectedPaymentContainer = styled.div`
  min-width: 320px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};

  @media (min-width: ${({ theme }) => theme.breakPoints.large}) {
    width: 450px;
  }
`;

const ExpectedPaymentTitle = styled.h2`
  height: 80px;
  padding: 0 20px;
  line-height: 80px;
  font-size: 20px;
  font-weight: 400;
  border-bottom: 3px solid ${({ theme }) => theme.colors.gray100};

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    padding: 0 30px;
    font-size: 24px;
  }
`;

const ExpectedPaymentInfo = styled.div`
  padding: 20px 20px 0;

  & > dl + dl {
    margin: 16px 0 0 0;
  }

  & > dl:last-of-type {
    margin: 36px 0 0 0;
  }

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    padding: 30px 30px 0;
  }
`;

const PaymentInfoItem = styled.dl`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > dt,
  dd {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;
  }

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    & > dt,
    dd {
      font-size: 20px;
      font-weight: 600;
    }
  }
`;

const SelectBoxWrapper = styled.div`
  margin: 16px 0 0 0;
`;

const OrderButtonWrapper = styled.div`
  padding: 0 20px 20px;
  margin: 40px 0 0 0;

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    padding: 0 30px 30px;
  }
`;

export default ExpectedPaymentBox;
