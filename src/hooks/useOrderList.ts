import { useEffect, useState } from "react";
import { fetchOrderList } from "../api";
import { OrderItemList } from "../types/domain";

export const useOrderList = () => {
  const [orderList, setOrderList] = useState<OrderItemList[]>([]);

  const getOrderList = async () => {
    const orderListData = await fetchOrderList();
    setOrderList(orderListData.orders);
  };

  useEffect(() => {
    getOrderList();
  }, []);

  return { orderList };
};
