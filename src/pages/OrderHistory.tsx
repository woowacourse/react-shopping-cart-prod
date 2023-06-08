import { useLayoutEffect, useState } from "react";
import { styled } from "styled-components";
import { api } from "../api";
import {
  ErrorBoundary,
  GuideBox,
  Header,
  OrderHistoryList,
  Page,
} from "../components";
import { OrderType } from "../types/domain";

const OrderHistory = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  useLayoutEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.get("/orders");
        setOrders(data.orders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ErrorBoundary>
      <Header />
      <Page>
        <TitleBox>주문 목록</TitleBox>
        {orders.length !== 0 ? (
          <OrderHistoryList orders={orders} />
        ) : (
          <GuideBox
            icon="🛒"
            message="주문 목록이 없어요"
            guideMessage="상품 주문하러 가기"
          />
        )}
      </Page>
    </ErrorBoundary>
  );
};

const TitleBox = styled.div`
  align-self: center;
  width: 85%;
  height: 40px;

  font-weight: 700;
  font-size: 25px;
  text-align: center;
  border-bottom: 4px solid var(--dark-gray);
`;

export default OrderHistory;
