import { getData, mutateData } from './utils';
import type { Order, OrderDetail, OrderInfo } from '../types/order';

const orderApis = () => {
  const url = '/orders';

  const headers = {
    'Content-Type': 'application/json',
  };

  const getOrders = () => {
    return getData<Order[]>({ url });
  };

  const getOrderDetail = (orderId: number) => {
    return getData<OrderDetail>({ url, param: orderId });
  };

  const postOrder = (orderInfo: OrderInfo) => {
    return mutateData({ url, method: 'POST', headers, body: orderInfo });
  };

  return { getOrders, getOrderDetail, postOrder };
};

export default orderApis;
