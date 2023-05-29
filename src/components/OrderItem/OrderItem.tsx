import {
  OrderItemBox,
  OrderItemHeader,
  OrderItemHeaderName,
  OrderItemImage,
  OrderItemInfo,
  OrderItemName,
  OrderItemPrice,
  OrderItemWrapper,
} from "./OrderItem.style.ts";
import type { Order } from "../../types/types.ts";

interface OrderItemProps {
  orderItem: Order;
}

function OrderItem({ orderItem }: OrderItemProps) {
  const { orderItems } = orderItem;
  return (
    <OrderItemWrapper>
      <OrderItemHeader>
        <OrderItemHeaderName>
          주문번호 : {orderItem.orderId}
        </OrderItemHeaderName>
        <OrderItemHeaderName>상세보기 {">"}</OrderItemHeaderName>
      </OrderItemHeader>
      {orderItems.map((orderItem) => (
        <OrderItemBox>
          <OrderItemImage src={orderItem.image} />
          <OrderItemInfo>
            <OrderItemName>{orderItem.productName}</OrderItemName>
            <OrderItemPrice>
              {orderItem.productPrice}원 / 수량 : {orderItem.productQuantity}개
            </OrderItemPrice>
          </OrderItemInfo>
        </OrderItemBox>
      ))}
    </OrderItemWrapper>
  );
}

export default OrderItem;
