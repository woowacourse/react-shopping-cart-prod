import { api } from 'api';
import { Server } from 'types';
import { Order, OrderDetail } from 'types/api/orders';

export const getOrders = async (server: Server): Promise<Order[]> => {
  const data = await api.get(`${server}/orders`);
  return data;
};

export const getOrderDetail =
  (id: string) =>
  async (server: Server): Promise<OrderDetail> => {
    const data = await api.get(`${server}/orders/${id}`);
    return data;
  };
