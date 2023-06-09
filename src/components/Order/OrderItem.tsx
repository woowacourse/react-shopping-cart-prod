import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import OrderedProductList from './OrderedProductList';

import type { Order } from '../../types/order';

interface OrderItemProps {
  order: Order;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const { orderId, orderItems } = order;
  const params = useParams();

  return (
    <section>
      <OrderTitle>
        <p>주문 번호: {orderId}</p>
        {params.orderId === undefined && (
          <Link to={`${orderId}`}>상세보기 &gt;</Link>
        )}
      </OrderTitle>
      <OrderedProductList orderItems={orderItems} />
    </section>
  );
};

const OrderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 75px;
  padding: 0 12px;
  background: ${({ theme }) => theme.colors.gray100};
  border: 1px solid ${({ theme }) => theme.colors.gray300};

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    padding: 0 24px;
  }
`;

export default OrderItem;
