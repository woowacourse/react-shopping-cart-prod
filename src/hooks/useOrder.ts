import { useEffect, useState } from "react";
import { fetchAddOrderList, fetchOrderList } from "../api";
import { LocalProductType, OrderItemList } from "../types/domain";

export const useOrder = () => {
  const [orderList, setOrderList] = useState<OrderItemList[]>([]);

  const addOrderList = async (
    orderList: LocalProductType[],
    couponId: number | null
  ) => {
    try {
      const response = await fetchAddOrderList(orderList, couponId);

      if (!response.ok) throw new Error(response.status.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const getOrderList = async () => {
    try {
      const response = await fetchOrderList();

      if (!response.ok) throw new Error(response.status.toString());

      const orderListData = await response.json();

      setOrderList(orderListData.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  return { addOrderList, orderList };
};
