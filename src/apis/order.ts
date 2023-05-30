import { getData, mutateData } from './utils';
import type { OrderInfo } from '../types/order';

const orderApis = () => {
  const url = '/orders';

  const headers = {
    'Content-Type': 'application/json',
  };

  const getOrders = () => {
    return getData({ url });
  };

  const postOrder = (orderInfo: OrderInfo) => {
    return mutateData({ url, method: 'POST', headers, body: orderInfo });
  };

  return { getOrders, postOrder };
};

export default orderApis;
