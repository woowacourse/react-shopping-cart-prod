import { styled } from "styled-components";
import { Header, Page, OrderList } from "../components";

export const Order = () => {
  return (
    <>
      <Header />
      <Page>
        <TitleBox>주문 목록</TitleBox>
        <OrderList />
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

export default Order;
