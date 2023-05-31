import { styled } from "styled-components";
import { GuideBox, Header, Page } from "../components";
import { OrderHistoryList } from "../components/OrderHistoryList";

const OrderHistory = () => {
  return (
    <>
      <Header />
      <Page>
        <TitleBox>주문 목록</TitleBox>
        <OrderHistoryList />
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
