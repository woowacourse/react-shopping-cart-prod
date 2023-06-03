import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { USER_TOKEN } from '../constants';
import { OrderItemInformationState, orderListState } from '../store/order';
import useDiscount from './useDiscount';

interface BuyInformation {
  memberId: number;
  productIds: number[];
  totalAmount: number;
  deliveryAmount: number;
  address: string;
  couponId: number;
}

const useOrders = () => {
  const { discountPrice, resultPrice, setDiscountPrice, setResultPrice } = useDiscount();
  const [, setOrderList] = useRecoilState(orderListState);
  const [, setOrderInformation] = useRecoilState(OrderItemInformationState);
  const fetchOrderList = useCallback(async () => {
    const response = await fetch('/orders', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${USER_TOKEN}`,
      },
    });
    const result = await response.json();
    setOrderList(result);
    return result;
  }, [setOrderList]);

  const fetchOrderOneItem = useCallback(
    async (id: number) => {
      const response = await fetch(`/orders/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${USER_TOKEN}`,
        },
      });
      const result = await response.json();
      setOrderInformation(result);
      return result;
    },
    [setOrderInformation]
  );

  const getDiscountPrice = useCallback(async () => {
    const response = await fetch('/coupons/discount/1234?total=30000', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${USER_TOKEN}`,
      },
    });

    const result = await response.json();
    setDiscountPrice(result.discountAmount);
    setResultPrice(result.discountedProductAmount);
  }, [setResultPrice, setDiscountPrice]);

  const fetchBuyItems = useCallback(async (itemDatas: BuyInformation) => {
    await fetch('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${USER_TOKEN}`,
      },
      body: JSON.stringify({
        memberId: itemDatas.memberId,
        productIds: itemDatas.productIds,
        totalAmount: itemDatas.totalAmount,
        deliveryAmount: itemDatas.deliveryAmount,
        address: itemDatas.address,
        couponId: itemDatas.couponId,
      }),
    });
  }, []);

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
