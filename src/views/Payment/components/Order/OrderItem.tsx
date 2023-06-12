import { useNavigate } from "react-router-dom";
import { OrderItemList } from "../OrderItemList";
import ROUTER_PATH from "@router/constants/routerPath";

import { OrderType } from "types/OrderType";

import * as S from "./OrderItem.style";
import { VscChevronRight } from "react-icons/vsc";

interface OrderItemParams {
  order: OrderType;
  hasDetail?: boolean;
}

function OrderItem({ order, hasDetail }: OrderItemParams) {
  const navigate = useNavigate();

  const handleNavigate = (orderId: number) => () => {
    navigate(`${ROUTER_PATH.order}/${orderId}`);
  };

  return (
    <S.OrderContainer>
      <S.WrapperTitle>
        <S.OrderNumber>주문번호: {order.id}</S.OrderNumber>
        {hasDetail && (
          <S.DetailItemButton>
            <VscChevronRight />
            <S.DetailItemSpan onClick={handleNavigate(order.id)}>
              상세보기
            </S.DetailItemSpan>
          </S.DetailItemButton>
        )}
      </S.WrapperTitle>
      <OrderItemList orderItems={order.orderItems} />
    </S.OrderContainer>
  );
}

export default OrderItem;
