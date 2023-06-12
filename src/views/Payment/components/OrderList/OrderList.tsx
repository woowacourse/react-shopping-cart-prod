import { useOrderList } from "@views/Payment/recoil/orderListState";
import { OrderItem } from "../Order";
import * as S from "./OrderList.style";

function OrderList() {
  const orderList = useOrderList();

  return (
    <S.WrapperPage>
      {[...orderList].reverse().map((order) => (
        <OrderItem key={order.id} order={order} hasDetail />
      ))}
    </S.WrapperPage>
  );
}

export default OrderList;
