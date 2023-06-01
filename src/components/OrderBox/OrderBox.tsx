import * as styled from './OrderBox.styled';

import { OrderItem } from '@components/OrderItem/OrderItem';
import { OrderBoxHeader } from '@components/OrderBoxHeader/OrderBoxHeader';

interface OrderBoxProps {
  orderDetailData?: any;
}

export const OrderBox = ({ orderDetailData }: OrderBoxProps) => {
  const { orderId, orderDate, orderDetails } = orderDetailData;

  return (
    <styled.OrderBox>
      <OrderBoxHeader orderId={orderId} orderData={orderDate} />
      {orderDetails.map((detail: any) => (
        <OrderItem key={detail.id} detailData={detail} />
      ))}
    </styled.OrderBox>
  );
};
