import { USER_AUTH_TOKEN } from '../constant';
import type { OrderInfo } from '../types/order';
import type { CartProduct } from '../types/product';
import type { ServerName } from '../types/server';
import ServerUtil from '../utils/ServerUrl';

const getAllList = async (serverName: ServerName): Promise<OrderInfo[]> => {
  const url = ServerUtil.getOrderUrl(serverName);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${USER_AUTH_TOKEN}`,
    },
  });

  if (response.status !== 200) throw new Error('주문목록 불러오기를 실패했어요.');

  const { orders }: { orders: OrderInfo[] } = await response.json();

  return orders;
};

const purchase = async (
  serverName: ServerName,
  body: { cartItems: CartProduct[]; couponIds: number[]; deliveryFee: number }
): Promise<number> => {
  const url = ServerUtil.getOrderUrl(serverName);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${USER_AUTH_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  if (response.status !== 201) throw new Error('주문에 실패했어요.');

  const { orderId }: { orderId: number } = await response.json();

  return orderId;
};

const OrderApi = { getAllList, purchase };

export default OrderApi;
