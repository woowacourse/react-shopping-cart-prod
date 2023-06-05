import {
  OrderListDivider,
  OrderListTitle,
  OrderListWrapper,
} from "./OrderList.style.ts";
import OrderItem from "../OrderItem/OrderItem.tsx";
import type { ResponseOrdered } from "../../types/types.ts";
import { useEffect, useState } from "react";
import { OrderedGroup } from "../../types/types.ts";

function OrderList() {

  const [orderList, setOrderList] = useState<OrderedGroup[]>([]);

  const loadOrderedList = async () => {
    const response = await fetch('/orders');
    const data: ResponseOrdered = await response.json();
    setOrderList(data.orderResponses);
  };

  useEffect(() => {
    loadOrderedList();
  }, []);

  return (
    <OrderListWrapper>
      <OrderListTitle>주문 목록</OrderListTitle>
      <OrderListDivider />
      {[...orderList.sort((a, b) => b.orderId - a.orderId)].map((orderItem, i) => (
        <OrderItem key={i} orderItem={orderItem} goDetail />
      ))}
    </OrderListWrapper>
  );
}

export default OrderList;
