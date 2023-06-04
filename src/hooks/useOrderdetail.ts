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

  const getOrderDetailList = async () => {
    const orderDetailListData = await fetchOrderList(orderId);
    setOrderDetailList(orderDetailListData);
  };

  useEffect(() => {
    getOrderDetailList();
  }, []);

  return { orderDetailList };
};
