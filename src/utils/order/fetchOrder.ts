import { fetchGet, fetchPost } from '@utils/fetchUtils';
import { ServerName, getOrderPath } from '@constants/serverUrlConstants';
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
  cartItemIds: number[];
  couponId?: number;
}

export const submitOrderApi = async ({
  serverName,
  cartItemIds,
  couponId,
}: SubmitOrderApiParams) => {
  await fetchPost(getOrderPath(serverName), createOrderRequestBody({ cartItemIds, couponId }));
};
