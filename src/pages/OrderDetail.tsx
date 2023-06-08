import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { api } from "../api";
import { Header, OrderHistory, Page } from "../components";
import { OrderDetailType } from "../types/domain";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [orderDetail, setOrderDetail] = useState<OrderDetailType>({
    id: 0,
    products: [],
    totalProductPrice: 0,
  });

  useLayoutEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const orderDetail = await api.get(`/orders/${orderId}`);
        setOrderDetail(orderDetail);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrderDetail();
  }, []);

  return (
    <>
      <Header />
      <Page>
        <TitleBox>주문 내역 상세</TitleBox>
        <OrderHistory {...orderDetail} />
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

export default OrderDetail;
