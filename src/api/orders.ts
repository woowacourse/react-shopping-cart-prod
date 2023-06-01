import { api } from 'api';
import { Order, OrderDetail } from 'types/api/orders';

export const getOrders = async (server: string): Promise<Order[]> => {
  const data = await api.get(`${server}/orders`);
  return data;
};

export const getOrderDetail =
  (id: string) =>
  async (server: string): Promise<OrderDetail> => {
    const data = await api.get(`${server}/orders/${id}`);
    return data;
  };
