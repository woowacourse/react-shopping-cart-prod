import { useParams } from "react-router-dom";
import {
  OrderListDivider,
  OrderListTitle,
  OrderListWrapper,
} from "../../components/OrderList/OrderList.style.ts";
import OrderItem from "../../components/OrderItem/OrderItem.tsx";
import { Order } from "../../types/types.ts";

function OrderDetail() {
  const params = useParams();
  console.log(`${params.orderId}에서 데이터 찾아서 넘겨주기`);

  const orderItem: Order = {
    orderId: params.orderId ? parseInt(params.orderId) : 0,
    orderItems: [
      {
        id: 1,
        productName: "비버",
        productPrice: 99999990,
        paymentPrice: 1000,
        createdAt: "YYYY.MM.DD HH-MM-SS",
        productQuantity: 10000,
        image:
          "http://image.elandgift.com/images/web/Product/20220404/JW20220404130056685001.jpg",
      },
    ],
  };

  return (
    <OrderListWrapper>
      <OrderListTitle>주문 내역 상세</OrderListTitle>
      <OrderListDivider />
      <OrderItem orderItem={orderItem} />
    </OrderListWrapper>
  );
}

export default OrderDetail;
