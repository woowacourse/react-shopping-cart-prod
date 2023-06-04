import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import OrderItem from './OrderItem';
import EmptyMessage from '../Common/EmptyMessage';

import { orderState } from '../../states/order';

const OrderList = () => {
  const orders = useRecoilValue(orderState);

  if (orders.length === 0) {
    return <EmptyMessage type='order' />;
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
