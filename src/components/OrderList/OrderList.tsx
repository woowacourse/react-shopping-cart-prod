import OrderItem from "../OrderItem/OrderItem.tsx";
import { useRecoilValue } from "recoil";
import { serverState } from "../../app/recoil/serverAtom.ts";
import BigAlert from "../BigAlert/BigAlert.tsx";

import { url } from "../../app/api/url.ts";
import useFetch from "../../hooks/useFetch.ts";
import type { ResponseOrdered } from "../../types/types.ts";

function OrderList() {
  const server = useRecoilValue(serverState);
  const { data: response, isLoading, error } = useFetch<ResponseOrdered>('GET', `${url[server]}/orders`);


  if (isLoading) {
    return <BigAlert title="⌛" message="로딩중..." />;
  }

  if (error) {
    throw new Error(error?.message);
  }

  if (response === null) {
    return null;
  }

  return (
    <div>
      {
        response.orderResponses.length > 0
          ?
          [...response.orderResponses.sort((a, b) => b.orderId - a.orderId)].map(
            (orderItem, i) => (
              <OrderItem key={i} orderItem={orderItem} goDetail />
            )
          )
          :
          <BigAlert title="텅" message="주문 이력이 없습니다." goHome />
      }
    </div>
  );
}

export default OrderList;


