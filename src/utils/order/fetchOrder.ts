import { fetchGet, fetchPost } from '@utils/fetchUtils';
import { ServerName, getOrderPath } from '@constants/serverUrlConstants';
import { UserInformationType } from '@constants/userConstant';
import { OrderType, ServerOrderType } from '@type/orderType';
import { createOrderRequestBody, orderDetailApiWrapper, orderListApiWrapper } from './order';

interface GetOrderListApiProps {
  serverName: ServerName;
  userInfo: UserInformationType;
}

export const getOrderListApi = async ({ serverName, userInfo }: GetOrderListApiProps) => {
  const serverOrderList = await fetchGet<OrderType[]>(getOrderPath(serverName), {
    email: userInfo.email,
    password: userInfo.password,
  });
  const clientOrderList = orderListApiWrapper(serverOrderList);

  return clientOrderList;
};

interface GetOrderDetailApiParams {
  serverName: ServerName;
  orderId: number;
  userInfo: UserInformationType;
}

export const getOrderDetailApi = async ({
  serverName,
  orderId,
  userInfo,
}: GetOrderDetailApiParams) => {
  const serverOrderDetail = await fetchGet<ServerOrderType>(
    `${getOrderPath(serverName)}/${orderId}`,
    {
      email: userInfo.email,
      password: userInfo.password,
    }
  );
  const clientOrderDetail = orderDetailApiWrapper(serverOrderDetail);

  return clientOrderDetail;
};

interface SubmitOrderApiParams {
  serverName: ServerName;
  cartItemIds: number[];
  couponId?: number;
  userInfo: UserInformationType;
}

export const submitOrderApi = async ({
  serverName,
  cartItemIds,
  couponId,
  userInfo,
}: SubmitOrderApiParams) => {
  await fetchPost(getOrderPath(serverName), createOrderRequestBody({ cartItemIds, couponId }), {
    email: userInfo.email,
    password: userInfo.password,
  });
};
