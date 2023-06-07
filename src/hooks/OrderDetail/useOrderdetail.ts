import { useEffect, useState } from 'react';
import { fetchOrderList } from '../../api';
import { OrderDetail } from '../../types/domain';

export const useOrderDetail = (orderId: number) => {
  const [orderDetailList, setOrderDetailList] = useState<OrderDetail>({
    id: 0,
    products: [],
    discountPrice: 0,
    shippingFee: 0,
    totalProductPrice: 0,
  });

  const [error, setError] = useState<Error | null>(null);

  const getOrderDetailList = async () => {
    try {
      const orderDetailListData = await fetchOrderList(orderId);
      setOrderDetailList(orderDetailListData);
    } catch (error) {
      if (error instanceof Error) return setError(error);
    }
  };

  if (error) throw error;

  useEffect(() => {
    getOrderDetailList();
  }, []);

  return { orderDetailList };
};
