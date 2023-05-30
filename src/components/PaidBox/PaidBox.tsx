import type { Order } from "../../types/types.ts";
import {
  PaidBoxHeader,
  PaidBoxLayout,
  PaidInfo,
  PaidProperty,
  PaidText,
} from "./PaidBox.style.ts";

interface PaidBoxProps {
  orderItem: Order;
}

function PaidBox({ orderItem }: PaidBoxProps) {
  const paid = orderItem.orderItems.reduce(
    (acc, orderItem) =>
      acc + orderItem.productQuantity * orderItem.productPrice,
    0
  );
  return (
    <PaidBoxLayout>
      <PaidBoxHeader>결제금액정보</PaidBoxHeader>
      <PaidInfo>
        <PaidProperty>
          <PaidText>총 결제금액</PaidText>
          <PaidText>{paid}원</PaidText>
        </PaidProperty>
      </PaidInfo>
    </PaidBoxLayout>
  );
}

export default PaidBox;
