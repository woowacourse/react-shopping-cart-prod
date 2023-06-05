import { useParams } from 'react-router-dom';

import { useFetchOrderDetail } from '@recoils/ordersAtoms';

import { OrderBox } from '@components/OrderBox/OrderBox';

import type { OrderDetail, OrderInfo } from '../../../types';

export const OrderDetailPage = () => {
  const { id } = useParams();

  const { orderId, orderDate, orderDetails, ...els }: OrderDetail = useFetchOrderDetail(Number(id));
  const orderInfo: OrderInfo = { orderId, orderDate, orderDetails };

  return (
    <>
      <OrderBox orderInfo={orderInfo} />
      {/* <Receipt /> */}
      <div></div>
    </>
  );
};
