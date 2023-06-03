import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedHostState } from '../recoil/atoms';
import { OrderDetailItemInfo, OrderItemInfo } from '../types';
import { ORDERS_BASE_URL } from '../constants';
import APIHandler from '../api/APIHandler';

interface PostPayLoad {
  cartItemIds: number[];
  couponId: number;
  deliveryFee: number;
  totalOrderPrice: number;
}

export const useOrder = (orderId?: number) => {
  const host = useRecoilValue(selectedHostState);
  const ORDERS_URL = `${host}${ORDERS_BASE_URL}`;
  const [orderList, setOrderList] = useState<OrderItemInfo[]>([]);
  const [orderDetail, setOrderDetail] = useState<OrderDetailItemInfo | undefined>(undefined);

  useEffect(() => {
    const setFetchedOrderList = async () => setOrderList(await getOrderList());
    const setFetchedOrderDetail = async () => setOrderDetail(await getOrderDetailItem());

    setFetchedOrderList();
    if (orderId) setFetchedOrderDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [host]);

  const getOrderList = async () => {
    const responseResult = await APIHandler.get<OrderItemInfo[]>(ORDERS_URL);

    if (responseResult.statusCode !== 200) console.log(responseResult.errorMessage);
    if (responseResult.result === undefined) return [];

    return responseResult.result;
  };

  const getOrderDetailItem = async () => {
    const responseResult = await APIHandler.get<OrderDetailItemInfo>(`${ORDERS_URL}/${orderId}`);

    if (responseResult.statusCode !== 200) console.log(responseResult.errorMessage);

    return responseResult.result;
  };

  const addOrderItem = async ({
    cartItemIds,
    couponId,
    deliveryFee,
    totalOrderPrice,
  }: PostPayLoad) => {
    const orderItem = {
      cartItemIds: cartItemIds,
      couponId: couponId,
      deliveryFee: deliveryFee,
      totalOrderPrice: totalOrderPrice,
    };

    const responseResult = await APIHandler.post(ORDERS_URL, orderItem);

    if (responseResult.statusCode === 200) console.log('주문 아이템 추가 완료');
    if (responseResult.statusCode !== 200) console.log(responseResult.errorMessage);
  };

  return { orderList, orderDetail, addOrderItem };
};
