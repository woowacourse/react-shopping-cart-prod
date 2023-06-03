import * as styled from './OrderBox.styled';

import { OrderItem } from '@components/OrderItem/OrderItem';
import { OrderBoxHeader } from '@components/OrderBoxHeader/OrderBoxHeader';

import type { OrderInfo, OrderSummary } from '../../types';

interface OrderBoxProps {
  orderInfo: OrderInfo;
}

export const OrderBox = ({ orderInfo }: OrderBoxProps) => {
  const { orderId, orderDate, orderDetails } = orderInfo;

  return (
    <styled.OrderBox>
      <OrderBoxHeader orderId={orderId} orderData={orderDate} />
      {orderDetails.map((detail: OrderSummary) => (
        <OrderItem key={detail.product.id} detailData={detail} />
      ))}
    </styled.OrderBox>
  );
};
