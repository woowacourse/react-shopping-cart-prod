import { fetchData } from './utils';
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

  const getOrders = async () => {
    const response = await fetchData({ url, method: 'GET', headers });
    const orders: Order[] = await response.json();
    return orders;
  };

  const getOrderDetail = async (orderId: number) => {
    const response = await fetchData({
      url,
      method: 'GET',
      param: orderId,
      headers,
    });
    const orderDetail: OrderDetail = await response.json();
    return orderDetail;
  };

  const postOrder = (orderInfo: OrderInfo) =>
    fetchData({ url, method: 'POST', headers, body: orderInfo });

  return { getOrders, getOrderDetail, postOrder };
};

export default orderApis;
