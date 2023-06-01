import { useLayoutEffect, useState } from "react";
import { styled } from "styled-components";
import { getOrdersApi } from "../api";
import { GuideBox, Header, OrderHistoryList, Page } from "../components";
import { OrderType } from "../types/domain";

const OrderHistory = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  useLayoutEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrdersApi();
        if (!response.ok) throw new Error(response.status.toString());
        const data = await response.json();

        setOrders(data);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Header />
      <Page>
        <TitleBox>주문 목록</TitleBox>
        <OrderHistoryList orders={orders} />
        <GuideBox
          icon="🛒"
          message="주문 목록이 없어요"
          guideMessage="상품 주문하러 가기"
        />
      </Page>
    </>
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
