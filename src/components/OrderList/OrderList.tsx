import OrderItem from "../OrderItem/OrderItem.tsx";
import { useEffect, useState } from "react";
import { OrderedGroup } from "../../types/types.ts";
import { fetchOrderedList } from "../../app/api/api.ts";
import { useRecoilValue } from "recoil";
import { serverState } from "../../app/recoil/serverAtom.ts";
import { NoneOrderHistory } from "./OrderList.style.ts";
import BigAlert from "../BigAlert/BigAlert.tsx";

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
    <>
      {
        orderList.length > 0
          ?
          [...orderList.sort((a, b) => b.orderId - a.orderId)].map(
            (orderItem, i) => (
              <OrderItem key={i} orderItem={orderItem} goDetail />
            )
          )
          :
          <BigAlert title="텅" message="주문 이력이 없습니다." goHome />
      }
    </>
  );
}

export default OrderList;
