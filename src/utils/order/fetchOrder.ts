import { fetchGet, fetchPost } from '@utils/fetchUtils';
import { ServerName, getOrderPath } from '@constants/serverUrlConstants';
import { OrderType, ServerOrderType } from '@type/orderType';
import { createOrderRequestBody, orderDetailApiWrapper, orderListApiWrapper } from './order';

export const getOrderListApi = async (serverName: ServerName) => {
  const serverOrderList = await fetchGet<OrderType[]>(getOrderPath(serverName));
  const clientOrderList = orderListApiWrapper(serverOrderList);

  return clientOrderList;
};

interface GetOrderDetailApiParams {
  serverName: ServerName;
  orderId: number;
}

export const getOrderDetailApi = async ({ serverName, orderId }: GetOrderDetailApiParams) => {
  const serverOrderDetail = await fetchGet<ServerOrderType>(
    `${getOrderPath(serverName)}/${orderId}`
  );
  const clientOrderDetail = orderDetailApiWrapper(serverOrderDetail);

  return clientOrderDetail;
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
