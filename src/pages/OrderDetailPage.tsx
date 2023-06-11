import { Suspense } from 'react';
import { styled } from 'styled-components';
import Colors from '../constant/Colors';
import OrderDetailLoader from '../components/order/OrderDetail/OrderDetailLoader';
import LinkButton from '../components/common/LinkButton/LinkButton';

const OrderDetailPage = () => {
  return (
    <Layout>
      <Title>주문 상세 내역</Title>
      <Suspense
        fallback={
          <EmptyDetailsLayoutDiv>
            주문 목록에서 상세보기를 눌러 주세요!
            <LinkButton to="/orders">주문 목록으로 가기</LinkButton>
          </EmptyDetailsLayoutDiv>
        }
      >
        <OrderDetailLoader />
      </Suspense>
    </Layout>
  );
};

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 140px 0 60px 0;

  & > *:last-child {
    padding: 30px;
  }
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 32px;

  padding: 30px 0;
  margin-bottom: 60px;

  border-bottom: 4px solid ${Colors.grey1};
  text-align: center;
`;

const EmptyDetailsLayoutDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  margin-top: 200px;

  font-weight: 500;
  font-size: 30px;
`;

export default OrderDetailPage;
