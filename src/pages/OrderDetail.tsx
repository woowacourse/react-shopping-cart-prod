import { styled } from "styled-components";
import { Header, OrderHistory, Page } from "../components";

const OrderDetail = () => {
  return (
    <>
      <Header />
      <Page>
        <TitleBox>주문 내역 상세</TitleBox>
        {/* <OrderHistory /> */}
        <PaymentTitleBox>
          <p>결제금액 정보</p>
        </PaymentTitleBox>
        <PaymentInfoBox>
          <p>총 결제금액</p>
          <p>324000원</p>
        </PaymentInfoBox>
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

const PaymentTitleBox = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
  width: 30%;
  max-width: 560px;
  height: 80px;

  padding: 0 20px;
  background: #f6f6f6;
  border: 1px solid #aaaaaa;

  font-size: 20px;
  font-weight: 600;
`;

const PaymentInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: flex-end;
  width: 30%;
  max-width: 560px;
  height: 100px;

  padding: 0 20px;
  border: 1px solid #aaaaaa;
  border-top: none;
  font-weight: 600;
`;

export default OrderDetail;
