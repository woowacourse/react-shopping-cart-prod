import { fetchGet, fetchPost } from '@utils/fetchUtils';
import { ServerName, getOrderPath } from '@constants/serverUrlConstants';
import { CartItemType } from '@type/cartType';
import { createOrderRequestBody } from './order';

export const getOrderListApi = async (serverName: ServerName) => {
  return await fetchGet(getOrderPath(serverName));
};

interface GetOrderDetailApiParams {
  serverName: ServerName;
  orderId: number;
}

export const getOrderDetailApi = async ({ serverName, orderId }: GetOrderDetailApiParams) => {
  return await fetchGet(`${getOrderPath(serverName)}/${orderId}`);
};

interface SubmitOrderApiParams {
  serverName: ServerName;
  cartItems: CartItemType[];
  couponId?: number;
}

export const submitOrderApi = async ({ serverName, cartItems, couponId }: SubmitOrderApiParams) => {
  await fetchPost(getOrderPath(serverName), createOrderRequestBody({ cartItems, couponId }));
};
