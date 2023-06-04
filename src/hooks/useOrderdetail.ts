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
    try {
      const response = await fetchOrderList(orderId);

      if (!response.ok) throw new Error(response.status.toString());

      const orderDetailListData = await response.json();

      setOrderDetailList(orderDetailListData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderDetailList();
  }, []);

  return { orderDetailList };
};
