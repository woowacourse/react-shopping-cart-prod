import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import OrderItem from './OrderItem';
import Message from '../Common/Message';

import { orderSelector } from '../../states/order';

const OrderList = () => {
  const orders = useRecoilValue(orderSelector);

  if (orders.length === 0) {
    return <Message type='empty' />;
  }

  return (
    <OrderListContainer>
      {orders.map((order) => (
        <OrderItem key={order.orderId} order={order} />
      ))}
    </OrderListContainer>
  );
};

const OrderListContainer = styled.div`
  & > * + * {
    margin: 48px 0 0 0;
  }
`;

export default OrderList;
