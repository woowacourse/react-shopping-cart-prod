import { useRecoilValue } from 'recoil';
import { orderSelector } from '../../states/order';
import OrderItem from './OrderItem';
import styled from 'styled-components';
import Message from '../Common/Message';

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
  & > * {
    margin: 24px 0 0 0;
  }

  & > * + * {
    margin: 48px 0 0 0;
  }
`;

export default OrderList;
