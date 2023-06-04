import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
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
  const { showBoundary } = useErrorBoundary();
  const host = useRecoilValue(selectedHostState);
  const ORDERS_URL = `${host}${ORDERS_BASE_URL}`;
  const [orderList, setOrderList] = useState<OrderItemInfo[]>([]);
  const [orderDetail, setOrderDetail] = useState<OrderDetailItemInfo | undefined>(undefined);

  useEffect(() => {
    const setFetchedOrderList = async () => {
      const newOrderList = await getOrderList();
      if (newOrderList) setOrderList(newOrderList);
    };
    const setFetchedOrderDetail = async () => setOrderDetail(await getOrderDetailItem());

    setFetchedOrderList();
    if (orderId) setFetchedOrderDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [host]);

  const getOrderList = async () => {
    try {
      const responseResult = await APIHandler.get<OrderItemInfo[]>(ORDERS_URL);

      if (responseResult.statusCode !== 200) throw new Error(responseResult.errorMessage);

      return responseResult.result;
    } catch (error) {
      showBoundary(error);
    }
  };

  const getOrderDetailItem = async () => {
    try {
      const responseResult = await APIHandler.get<OrderDetailItemInfo>(`${ORDERS_URL}/${orderId}`);

      if (responseResult.statusCode !== 200) throw new Error(responseResult.errorMessage);

      return responseResult.result;
    } catch (error) {
      showBoundary(error);
    }
  };

  const addOrderItem = async ({
    cartItemIds,
    couponId,
    deliveryFee,
    totalOrderPrice,
  }: PostPayLoad) => {
    try {
      const orderItem = {
        cartItemIds: cartItemIds,
        couponId: couponId,
        deliveryFee: deliveryFee,
        totalOrderPrice: totalOrderPrice,
      };

      const responseResult = await APIHandler.post(ORDERS_URL, orderItem);
      if (responseResult.statusCode !== 201) throw new Error(responseResult.errorMessage);

      return responseResult.location;
    } catch (error) {
      showBoundary(error);
    }
  };

  return { orderList, orderDetail, addOrderItem };
};
