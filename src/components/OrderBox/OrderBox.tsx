import * as styled from './OrderBox.styled';

import { OrderItem } from '@components/OrderItem/OrderItem';
import { OrderBoxHeader } from '@components/OrderBoxHeader/OrderBoxHeader';

interface OrderBoxProps {
  orderDetailData?: any;
}

export const OrderBox = ({ orderDetailData }: OrderBoxProps) => {
  if (!orderDetailData) return <div>Loading...</div>;
  const { orderId, orderDate, orderDetails } = orderDetailData;

  return (
    <styled.OrderBox>
      <OrderBoxHeader orderId={orderId} orderData={orderDate} />
      {orderDetails.map((detail: any) => (
        <OrderItem detailData={detail} />
      ))}
    </styled.OrderBox>
  );
};
