import * as styled from './OrderBox.styled';

import { OrderItem } from '@components/OrderItem/OrderItem';
import { OrderBoxHeader } from '@components/OrderBoxHeader/OrderBoxHeader';

import type { OrderInfo, OrderSummary } from 'src/types';

interface OrderBoxProps {
  orderInfo: OrderInfo;
}

export const OrderBox = ({ orderInfo }: OrderBoxProps) => {
  const { orderId, orderDate, orderDetails } = orderInfo;

  const [orderDateValue] = orderDate.split('.');

  return (
    <styled.OrderBox>
      <OrderBoxHeader orderId={orderId} orderDate={orderDateValue} />
      {orderDetails.map((detail: OrderSummary) => (
        <OrderItem key={detail.product.id} detailData={detail} />
      ))}
    </styled.OrderBox>
  );
};
