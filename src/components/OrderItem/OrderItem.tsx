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
import { useNavigate } from "react-router-dom";

interface OrderItemProps {
  orderItem: Order;
  goDetail?: boolean;
}

function OrderItem({ orderItem, goDetail }: OrderItemProps) {
  const navigate = useNavigate();
  const { orderItems } = orderItem;

  return (
    <OrderItemWrapper>
      <OrderItemHeader>
        <OrderItemHeaderName>
          주문번호 : {orderItem.orderId}
        </OrderItemHeaderName>
        {goDetail && (
          <OrderItemHeaderName onClick={() => navigate(`${orderItem.orderId}`)}>
            상세보기 {">"}
          </OrderItemHeaderName>
        )}
      </OrderItemHeader>
      {orderItems.map((orderItem, i) => (
        <OrderItemBox key={i}>
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
