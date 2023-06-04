import { useEffect, useState } from "react";
import { fetchOrderList } from "../api";
import { OrderItemList } from "../types/domain";

export const useOrderList = () => {
  const [orderList, setOrderList] = useState<OrderItemList[]>([]);

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

  return { orderList };
};
