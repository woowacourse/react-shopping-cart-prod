import { styled } from "styled-components";
import { Header, Page } from "../components";
import { OrderHistoryList } from "../components/OrderHistoryList";

const OrderHistory = () => {
  return (
    <>
      <Header />
      <Page>
        <TitleBox>주문 목록</TitleBox>
        <OrderHistoryList />
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
