import { mutateData } from './utils';
import type { OrderInfo } from '../types/order';

const orderApis = () => {
  const url = '/orders';

  const headers = {
    'Content-Type': 'application/json',
  };

  const postOrder = (orderInfo: OrderInfo) => {
    return mutateData({ url, method: 'POST', headers, body: orderInfo });
  };

  return { postOrder };
};

export default orderApis;
