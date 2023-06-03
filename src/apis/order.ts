import { getData, mutateData } from './utils';
import type { Order, OrderDetail, OrderInfo } from '../types/order';
import { SERVER, ServerKey } from '../constants/server';

const orderApis = (serverName: ServerKey) => {
  const url = `${SERVER[serverName].url}/orders`;

  const base64 = btoa(
    SERVER[serverName].id + ':' + SERVER[serverName].password
  );

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${base64}`,
  };

  const getOrders = () => {
    return getData<Order[]>({ url, headers });
  };

  const getOrderDetail = (orderId: number) => {
    return getData<OrderDetail>({ url, param: orderId, headers });
  };

  const postOrder = (orderInfo: OrderInfo) => {
    return mutateData({ url, method: 'POST', headers, body: orderInfo });
  };

  return { getOrders, getOrderDetail, postOrder };
};

export default orderApis;
