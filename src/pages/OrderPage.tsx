import styled from 'styled-components';
import Header from '../components/common/Header/Header';
import ErrorBoundary from '../errorHandler/ErrorBoundary';
import { Suspense } from 'react';
import LoadingView from '../components/common/LoadingView/LoadingView';
import OrderList from '../components/order/OrderList/OrderList';

const OrderPage = () => {
  return (
    <>
      <Header />
      <Layout>
        <Title>주문 목록</Title>
        <ErrorBoundary>
          <Suspense fallback={<LoadingView />}>
            <Contents>
              <OrderList />
            </Contents>
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </>
  );
};

const Layout = styled.main`
  width: 1320px;

  margin: 0 auto;
  padding: 80px 0;

  @media screen and (max-width: 1320px) {
    width: 90%;
  }
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 32px;

  padding: 30px 0;
  border-bottom: 4px solid #333333;

  text-align: center;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  gap: 50px;

  margin-top: 34px;
`;

export default OrderPage;
