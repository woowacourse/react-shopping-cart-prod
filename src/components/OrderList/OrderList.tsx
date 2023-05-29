import {
  OrderListDivider,
  OrderListTitle,
  OrderListWrapper,
} from "./OrderList.style.ts";
import OrderItem from "../OrderItem/OrderItem.tsx";

function OrderList() {
  const orderList = [
    {
      orderId: 1,
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
        {
          id: 2,
          productName: "레오",
          productPrice: 9999,
          paymentPrice: 1000,
          createdAt: "2021.10.10",
          productQuantity: 10000,
          image:
            "http://image.elandgift.com/images/web/Product/20220404/JW20220404130056685001.jpg",
        },
      ],
    },
    {
      orderId: 2,
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
        {
          id: 2,
          productName: "레오",
          productPrice: 9999,
          paymentPrice: 1000,
          createdAt: "2021.10.10",
          productQuantity: 10000,
          image:
            "http://image.elandgift.com/images/web/Product/20220404/JW20220404130056685001.jpg",
        },
      ],
    },
  ];
  return (
    <OrderListWrapper>
      <OrderListTitle>주문 목록</OrderListTitle>
      <OrderListDivider />
      {orderList.map((orderItem) => (
        <OrderItem />
      ))}
    </OrderListWrapper>
  );
}

export default OrderList;
