import { OrderBox } from '@components/OrderBox/OrderBox';

import { useFetchOrderList } from '@recoils/ordersAtoms';

import type { OrderInfo } from '../../../../types';

export const OrderList = () => {
  const orderList = useFetchOrderList();

  return (
    <ul>
      {orderList.map((order: OrderInfo) => (
        <OrderBox key={order.orderId} orderInfo={order} />
      ))}
    </ul>
  );
};
