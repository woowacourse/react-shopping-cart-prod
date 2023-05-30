import { styled } from "styled-components";
import { Header, OrderList, OrderTotalPriceBox, Page } from "../components";

export const OrderDetail = () => {
  return (
    <>
      <Header />
      <Page>
        <TitleBox>주문 상세 내역</TitleBox>
        <ContentWrapper>
          <OrderList />
          <OrderTotalPriceBox></OrderTotalPriceBox>
        </ContentWrapper>
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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 85%;
`;
