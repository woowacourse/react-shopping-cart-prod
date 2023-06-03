import { styled } from 'styled-components';
import type { Order } from '../types/Order';
import PriceFormat from './common/PriceFormat';

const OrderPaymentDetailsContainer = styled.div`
  border: 1px solid #aaaaaa;
`;

const Header = styled.div`
  padding: 24px;

  background: #f6f6f6;
  border-bottom: 1px solid #aaaaaa;
  font-size: 28px;
  font-weight: 700;
  color: #333333;
`;

const Content = styled.div`
  padding: 24px;
`;

type PaymentDetailProps = {
  $accent?: boolean;
};

const PaymentDetail = styled.div<PaymentDetailProps>`
  display: flex;
  justify-content: space-between;

  ${(props) => (props.$accent ? 'margin-top: 24px;' : '')}

  font-size: 24px;
  font-weight: ${(props) => (props.$accent ? 700 : 400)};
`;

const PaymentDetailName = styled.p``;

const PaymentDetailContent = styled.p``;

type OrderPaymentDetailsProps = {
  savingRate: Order['savingRate'];
  points: Order['usedPoints'];
  price: number;
};

const OrderPaymentDetails = (props: OrderPaymentDetailsProps) => {
  const { savingRate, points, price } = props;

  return (
    <OrderPaymentDetailsContainer>
      <Header>결제금액 정보</Header>
      <Content>
        <PaymentDetail>
          <PaymentDetailName>적립 포인트</PaymentDetailName>
          <PaymentDetailContent>
            <PriceFormat price={points} unit="P" />
          </PaymentDetailContent>
        </PaymentDetail>
        <PaymentDetail>
          <PaymentDetailName>할인율</PaymentDetailName>
          <PaymentDetailContent>{savingRate}%</PaymentDetailContent>
        </PaymentDetail>
        <PaymentDetail $accent>
          <PaymentDetailName>총 결제금액</PaymentDetailName>
          <PaymentDetailContent>
            <PriceFormat price={price} />
          </PaymentDetailContent>
        </PaymentDetail>
      </Content>
    </OrderPaymentDetailsContainer>
  );
};

export default OrderPaymentDetails;
