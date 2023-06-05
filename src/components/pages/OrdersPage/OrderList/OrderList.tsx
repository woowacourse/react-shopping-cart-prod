import { OrderBox } from '@components/OrderBox/OrderBox';

import { useFetchOrderList } from '@recoils/ordersAtoms';

export const OrderList = () => {
  const orderList = useFetchOrderList();

  return (
    <ul>
      {orderList.map((order: any) => (
        <OrderBox key={order.orderId} orderInfo={order} />
      ))}
    </ul>
  );
};
