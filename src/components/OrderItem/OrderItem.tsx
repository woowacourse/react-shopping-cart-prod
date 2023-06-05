import {
  OrderItemBox,
  OrderItemHeader,
  OrderItemHeaderButton,
  OrderItemHeaderName,
  OrderItemHeaderTime,
  OrderItemImage,
  OrderItemInfo,
  OrderItemName,
  OrderItemPrice,
  OrderItemWrapper,
} from "./OrderItem.style.ts";
import type { OrderedGroup } from "../../types/types.ts";
import { useNavigate } from "react-router-dom";

interface OrderItemProps {
  orderItem: OrderedGroup;
  goDetail?: boolean;
}

function OrderItem({ orderItem, goDetail }: OrderItemProps) {
  const navigate = useNavigate();
  const { orderItems } = orderItem;

  return (
    <OrderItemWrapper>
      <OrderItemHeader>
        <div>
          <OrderItemHeaderName>
            주문번호 : {orderItem.orderId}
          </OrderItemHeaderName>
          <OrderItemHeaderTime>
            주문 일시 : {orderItem.createAt}
          </OrderItemHeaderTime>
        </div>
        {goDetail && (
          <OrderItemHeaderButton onClick={() => navigate(`${orderItem.orderId}`)}>
            상세보기 {">"}
          </OrderItemHeaderButton>
        )}
      </OrderItemHeader>
      {orderItems.map((orderItem, i) => (
        <OrderItemBox key={i}>
          <OrderItemImage src={orderItem.imageUrl} />
          <OrderItemInfo>
            <OrderItemName>{orderItem.productName}</OrderItemName>
            <OrderItemPrice>
              {orderItem.productPrice.toLocaleString()}원 / 수량 : {orderItem.productQuantity}개
            </OrderItemPrice>
          </OrderItemInfo>
        </OrderItemBox>
      ))}
    </OrderItemWrapper>
  );
}

export default OrderItem;
