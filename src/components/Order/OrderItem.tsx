import { Link } from 'react-router-dom';
import styled from 'styled-components';

import OrderedProductList from './OrderedProductList';

import type { Order } from '../../types/order';

interface OrderItemProps {
  order: Order;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const { orderId, orderItems } = order;

  return (
    <div>
      <OrderTitle>
        <p>주문 번호: {orderId}</p>
        <Link to={`${orderId}`}>상세보기 &gt;</Link>
      </OrderTitle>
      <OrderedProductList orderItems={orderItems} />
    </div>
  );
};

const OrderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  padding: 0 40px;
  background: ${({ theme }) => theme.colors.gray50};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
`;

export default OrderItem;
