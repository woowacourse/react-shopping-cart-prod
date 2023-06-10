import styled from 'styled-components';
import { formatPrice } from '../../../../utils/formatPrice';

interface OrderSheetPaymentProps {
  productAmount: number;
  discountAmount: number;
  deliveryFee: number;
}

const OrderSheetPayment = ({
  productAmount,
  discountAmount,
  deliveryFee,
}: OrderSheetPaymentProps) => {
  const totalPaymentAmount = productAmount + deliveryFee - discountAmount;
  return (
    <OrderPaymentContainer>
      <PaymentTextWrapper>
        <PaymentText>총 상품 금액</PaymentText>
        <PaymentAmount>{formatPrice(productAmount)}</PaymentAmount>
      </PaymentTextWrapper>
      <PaymentTextWrapper>
        <PaymentText>할인 금액</PaymentText>
        <PaymentAmount>-{formatPrice(discountAmount)}</PaymentAmount>
      </PaymentTextWrapper>
      <PaymentTextWrapper>
        <PaymentText>배송비</PaymentText>
        <PaymentAmount>{formatPrice(deliveryFee)}</PaymentAmount>
      </PaymentTextWrapper>
      <Seperator />
      <PaymentTextWrapper>
        <TotalPaymentAmount>최종 결제 금액</TotalPaymentAmount>
        <TotalPaymentAmount>
          {formatPrice(totalPaymentAmount)}
        </TotalPaymentAmount>
      </PaymentTextWrapper>
    </OrderPaymentContainer>
  );
};

const OrderPaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PaymentTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PaymentText = styled.p`
  font-size: 15px;
  line-height: 22px;
  color: rgb(130, 140, 148);
`;
const PaymentAmount = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: rgb(47, 52, 56);
`;
const TotalPaymentAmount = styled.p`
  font-size: 18px;
  font-weight: 700;
`;
const Seperator = styled.div`
  border-bottom: 1.5px solid #cccccc;
`;

export default OrderSheetPayment;
