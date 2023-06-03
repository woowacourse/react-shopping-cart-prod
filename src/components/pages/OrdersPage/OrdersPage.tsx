import { OrderBox } from '@components/OrderBox/OrderBox';

import { useFetchOrders } from '@recoils/ordersAtoms';

export const OrdersPage = () => {
  const orders = useFetchOrders();

  return (
    <ul>
      {orders.map((order) => (
        <OrderBox key={order.orderId} orderInfo={order} />
      ))}
    </ul>
  );
};
