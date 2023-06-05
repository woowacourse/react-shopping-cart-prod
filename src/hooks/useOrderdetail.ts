import { useEffect, useState } from "react";
import { fetchOrderList } from "../api";
import { OrderDetail } from "../types/domain";

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
    } catch (error: any) {
      setError(error);
    }
  };

  if (error) throw error;

  useEffect(() => {
    getOrderDetailList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { orderDetailList };
};
