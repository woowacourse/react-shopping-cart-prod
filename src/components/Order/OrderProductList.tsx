import { Link } from 'react-router-dom';

import styled from 'styled-components';

import OrderProductItem from './OrderProductItem';
import { Order } from '../../types/product';
import { formatDateTime } from '../../utils/timeFormat';

interface OrderProductListProps {
  order: Order;
}

const OrderProductList = ({ order }: OrderProductListProps) => {
  const { orderId, orderDateTime, orderItems } = order;

  return (
    <OrderContent key={orderId}>
      <OrderInfo>
        <p>
          주문번호: {orderId} / 주문일: {formatDateTime(orderDateTime)}
        </p>
        <Link to={`/order/${orderId}`}>
          <DetailButton>상세보기 &#62;</DetailButton>
        </Link>
      </OrderInfo>
      <div>
        {orderItems.map((item) => (
          <OrderProductItem orderProduct={item} />
        ))}
      </div>
    </OrderContent>
  );
};

const OrderInfo = styled.div`
  width: 100%;
  height: 92px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #f6f6f6;

  padding: 40px;

  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  /* or 120% */

  letter-spacing: 0.5px;
`;

const OrderContent = styled.div`
  margin-bottom: 70px;
  border: 1px solid #aaaaaa;
`;

const DetailButton = styled.button`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  /* or 120% */

  letter-spacing: 0.5px;
  cursor: pointer;
`;

export default OrderProductList;
