import * as styled from './OrderBox.styled';

import { OrderItem } from '@components/OrderItem/OrderItem';
import { OrderBoxHeader } from '@components/OrderBoxHeader/OrderBoxHeader';

export const OrderBox = () => {
  const orderId = 1;

  return (
    <styled.OrderBox>
      <OrderBoxHeader orderId={orderId} />
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
    </styled.OrderBox>
  );
};
