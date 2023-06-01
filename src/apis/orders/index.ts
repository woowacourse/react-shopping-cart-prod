import api from 'apis';
import { Order } from 'types/order';

const URL = '/orders';

export const getOrderList = async () => {
  const fetchedData = await api.get<Order[]>(URL);
  const orderList = fetchedData.data;

  return orderList;
};
