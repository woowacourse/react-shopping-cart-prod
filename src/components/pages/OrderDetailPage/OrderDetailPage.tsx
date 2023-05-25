import { styled } from 'styled-components';
import OrderList from '../../order/OrderList/OrderList';

const OrderDetailPage = () => {
  return (
    <Container>
      <TitleWrapper>
        <Title>주문 내역 상세</Title>
      </TitleWrapper>
      <OrderList />
      <OrderTotal>
        <OrderTotalHeader>결제금액 정보</OrderTotalHeader>
        <OrderTotalPrice>
          <span>총 결제금액</span>
          <span>325,600원</span>
        </OrderTotalPrice>
      </OrderTotal>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 28px;
`;

const TitleWrapper = styled.div`
  height: 67px;
  border-bottom: 4px solid #333;
`;

const Title = styled.h2`
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  letter-spacing: 0.5px;
  color: #333;
`;

const OrderTotal = styled.div`
  width: 560px;
  height: 207px;
  margin-left: auto;
  border: 1px solid #aaa;
`;

const OrderTotalHeader = styled.div`
  display: flex;
  align-items: center;
  height: 92px;
  padding: 0 30px;
  background: #f6f6f6;
  border-bottom: 1px solid #aaa;
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 28px;
  line-height: 28px;
  letter-spacing: 0.5px;
  color: #333;
`;

const OrderTotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 115px;
  padding: 0 30px;
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #333;
`;

export default OrderDetailPage;
