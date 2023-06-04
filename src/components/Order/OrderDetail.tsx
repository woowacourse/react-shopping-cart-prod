import styled from 'styled-components';

import OrderItem from './OrderItem';
import TotalPriceBox from './TotalPriceBox';

import { useOrderDetail } from '../../hooks/order';

const OrderDetail = () => {
  const { order, totalPrice } = useOrderDetail();

  return (
    <OrderDetailContainer>
      <OrderItem order={order} />
      <TotalPriceContainer>
        <TotalPriceBox totalPrice={totalPrice} />
      </TotalPriceContainer>
    </OrderDetailContainer>
  );
};

const OrderDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px 0 0 0;

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    margin: 36px 0 0 0;
  }
`;

const TotalPriceContainer = styled.section`
  align-self: flex-end;
  width: 100%;
  max-width: 560px;
  margin: 24px 0 0 0;
`;

export default OrderDetail;
