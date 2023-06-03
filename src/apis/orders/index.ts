import api from 'apis';
import { Order } from 'types/order';

const URL = '/orders';

export const getOrderList = async () => {
  const fetchedData = await api.get<Order[]>(URL);
  const orderList = fetchedData.data;

  return orderList;
};

export const getOrder = async (orderId: number) => {
  const fetchedData = await api.get<Order>(`${URL}/${orderId}`);
  const order = fetchedData.data;

  return order;
};

export const postOrder = async (cartProductIds: number[], pointCost: number) => {
  const fetchedData = await api.post(URL, { cartItemIds: cartProductIds, point: pointCost });
  const location = fetchedData.headers.get('Location');
  if (!location) throw new Error(`상품 주문 요청 성공시 반환되는 location이 없습니다.`);

  const orderId = location.replace('/orders/', '');

  return Number(orderId);
};
