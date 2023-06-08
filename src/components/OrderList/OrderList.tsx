import {
  OrderListDivider,
  OrderListTitle,
  OrderListWrapper,
} from "./OrderList.style.ts";
import OrderItem from "../OrderItem/OrderItem.tsx";
import { useEffect, useState } from "react";
import { OrderedGroup } from "../../types/types.ts";
import { fetchOrderedList } from "../../app/api/api.ts";
import { useRecoilValue } from "recoil";
import { serverState } from "../../app/recoil/serverAtom.ts";

function OrderList() {
  const server = useRecoilValue(serverState);
  const [orderList, setOrderList] = useState<OrderedGroup[]>([]);
  const [isError, setError] = useState(false);

  const loadOrderedList = async () => {
    try {
      const data = await fetchOrderedList(server);
      setOrderList(data.orderResponses);
    } catch (error) {
      setError(true);
      throw new Error();
    }
  };

  useEffect(() => {
    loadOrderedList();
  }, []);

  if (isError) {
    throw new Error();
  }

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
