import { styled } from 'styled-components';
import { formatPrice } from '../../../utils/formatPrice';
import usePaymentAmount from './usePaymentAmount';
import CouponInfo from '../../../types/coupon';

interface PaymentAmountProps {
  coupon?: CouponInfo | null;
}

const PaymentAmount = (props: PaymentAmountProps) => {
  const { coupon } = props;
  const { paymentAmount, deliveryFee } = usePaymentAmount();

  const discountedPrice = (() => {
    if (!coupon) return 0;
    if (coupon.type === 'percent') return Math.ceil(paymentAmount * (coupon.amount / 100));
    return coupon.amount;
  })();

  const finalPrice = Math.max(Math.floor(paymentAmount - discountedPrice) + deliveryFee, 0);

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
        <OrderButton>주문하기</OrderButton>
      </Contents>
    </PaymentAmountContainer>
  );
};

const PaymentAmountContainer = styled.div`
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

export default PaymentAmount;
