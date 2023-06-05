import { styled } from "styled-components";
import { OrderList } from "./OrderList";
import { OrderTotalPriceBox } from "./OrderTotalPriceBox";
import { useLocation } from "react-router-dom";
import { useOrderDetail } from "../hooks/useOrderdetail";

export const OrderDetailContent = () => {
  const location = useLocation();

  const orderId = location.state.orderId;

  const { orderDetailList } = useOrderDetail(orderId);

  return (
    <>
      <TitleBox>주문 상세 내역</TitleBox>
      <ContentWrapper>
        <OrderList
          id={orderDetailList.id}
          orderListItems={orderDetailList.products}
        />
        <OrderTotalPriceBox
          totalProductPrice={orderDetailList.totalProductPrice}
        ></OrderTotalPriceBox>
      </ContentWrapper>
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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 85%;
`;
