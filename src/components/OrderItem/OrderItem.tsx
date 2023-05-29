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

function OrderItem() {
  return (
    <OrderItemWrapper>
      <OrderItemHeader>
        <OrderItemHeaderName>주문번호 : 1</OrderItemHeaderName>
        <OrderItemHeaderName>상세보기 {">"}</OrderItemHeaderName>
      </OrderItemHeader>
      <OrderItemBox>
        <OrderItemImage />
        <OrderItemInfo>
          <OrderItemName>아이템 이름</OrderItemName>
          <OrderItemPrice>10,000원 / 수량 : 3개</OrderItemPrice>
        </OrderItemInfo>
      </OrderItemBox>
    </OrderItemWrapper>
  );
}

export default OrderItem;
