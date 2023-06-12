import api from 'apis';
import { Order } from 'types/order';

const URL = '/orders';

export const getOrderList = async () => {
  const { data: orderList } = await api.get<Order[]>(URL);

  return orderList;
};

export const getOrder = async (orderId: number) => {
  const { data: order } = await api.get<Order>(`${URL}/${orderId}`);

  return order;
};

export const postOrder = async (cartProductIds: number[], pointCost: number) => {
  const { headers } = await api.post(URL, { cartItemIds: cartProductIds, point: pointCost });
  const location = headers.get('Location');
  if (!location) throw new Error(`상품 주문 요청 성공시 반환되는 location이 없습니다.`);

  const orderId = location.replace('/orders/', '');

  return Number(orderId);
};
