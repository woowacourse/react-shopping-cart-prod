import {
  OrderListDivider,
  OrderListTitle,
  OrderListWrapper,
} from "./OrderList.style.ts";
import OrderItem from "../OrderItem/OrderItem.tsx";
import type { ResponseOrdered } from "../../types/types.ts";
import { useEffect, useState } from "react";
import { OrderedGroup } from "../../types/types.ts";
import { fetchOrderedItem, fetchOrderedList } from "../../app/api/api.ts";
import { useRecoilValue } from "recoil";
import { serverState } from "../../app/recoil/serverAtom.ts";

function OrderList() {
  const server = useRecoilValue(serverState);
  const [orderList, setOrderList] = useState<OrderedGroup[]>([]);

  const loadOrderedList = async () => {
    const data = await fetchOrderedList(server);
    setOrderList(data.orderResponses);
  };

  useEffect(() => {
    loadOrderedList();
  }, []);

  return (
    <OrderListWrapper>
      <OrderListTitle>주문 목록</OrderListTitle>
      <OrderListDivider />
      {[...orderList.sort((a, b) => b.orderId - a.orderId)].map(
        (orderItem, i) => (
          <OrderItem key={i} orderItem={orderItem} goDetail />
        )
      )}
    </OrderListWrapper>
  );
}

export default OrderList;
