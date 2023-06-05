import styled from 'styled-components';
import Header from '../components/common/Header/Header';
import ErrorBoundary from '../errorHandler/ErrorBoundary';
import { Suspense } from 'react';
import LoadingView from '../components/common/LoadingView/LoadingView';

const OrderPage = () => {
  return (
    <>
      <Header />
      <Layout>
        <Title>주문 목록</Title>
        <ErrorBoundary>
          <Suspense fallback={<LoadingView />}>
            <Contents></Contents>
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
  justify-content: space-between;

  margin-top: 34px;

  @media screen and (max-width: 1320px) {
    flex-direction: column;
    justify-content: baseline;
    gap: 100px;
  }
`;

export default OrderPage;
