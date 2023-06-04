import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { USER_TOKEN } from '../constants';
import { OrderItemInformationState, orderListState } from '../store/order';
import { originState } from '../store/origin';
import { BeforeBuyItemType } from '../types';
import useDiscount from './useDiscount';

interface BuyInformation {
  products: BeforeBuyItemType[];
  totalProductAmount: number;
  deliveryAmount: number;
  address: string;
  couponId: number;
}

const useOrders = () => {
  const origin = useRecoilValue(originState);
  const { discountPrice, resultPrice, setDiscountPrice, setResultPrice } = useDiscount();
  const [, setOrderList] = useRecoilState(orderListState);
  const [, setOrderInformation] = useRecoilState(OrderItemInformationState);

  const fetchOrderList = useCallback(async () => {
    const response = await fetch(`${origin}/orders`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${USER_TOKEN}`,
      },
    });
    const result = await response.json();
    setOrderList(result);
    return result;
  }, [origin, setOrderList]);

  const fetchOrderOneItem = useCallback(
    async (id: number) => {
      const response = await fetch(`${origin}/orders/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${USER_TOKEN}`,
        },
      });
      const result = await response.json();
      console.log(result);
      setOrderInformation(result);
      return result;
    },
    [origin, setOrderInformation]
  );

  const getDiscountPrice = useCallback(
    async (total: number, couponId: number) => {
      const response = await fetch(`${origin}/coupons/${couponId}/discount/?total=${total}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${USER_TOKEN}`,
        },
      });

      const result = await response.json();
      setDiscountPrice(result.discountAmount);
      setResultPrice(result.discountedProductAmount);
    },
    [origin, setDiscountPrice, setResultPrice]
  );

  const fetchBuyItems = useCallback(
    async (itemDatas: BuyInformation) => {
      const requestData =
        itemDatas.couponId === 0
          ? {
              products: itemDatas.products,
              totalProductAmount: itemDatas.totalProductAmount,
              deliveryAmount: itemDatas.deliveryAmount,
              address: itemDatas.address,
              couponId: null,
            }
          : {
              products: itemDatas.products,
              totalProductAmount: itemDatas.totalProductAmount,
              deliveryAmount: itemDatas.deliveryAmount,
              address: itemDatas.address,
              couponId: itemDatas.couponId,
            };

      const response = await fetch(`${origin}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${USER_TOKEN}`,
        },
        body: JSON.stringify(requestData),
      });
      const result = await response.json();

      return {
        ok: response.ok,
        body: result.id,
      };
    },
    [origin]
  );

  return {
    resultPrice,
    discountPrice,
    fetchOrderList,
    fetchOrderOneItem,
    getDiscountPrice,
    fetchBuyItems,
  };
};

export default useOrders;
