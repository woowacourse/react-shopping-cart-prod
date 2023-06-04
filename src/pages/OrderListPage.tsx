import { styled } from 'styled-components';
import { Suspense } from 'react';
import ErrorBoundary from '../errorHandler/ErrorBoundary';
import LoadingSpinner from '../components/common/LoadingSpinner/LoadingSpinner';
import OrderList from '../components/order/OrderList/OrderList';

const OrderListPage = () => {
  return (
    <Layout>
      <Title>주문 목록</Title>
      <ErrorBoundary>
        <Suspense
          fallback={
            <Fallback>
              <LoadingSpinner color="#04c09e" />
            </Fallback>
          }
        >
          <OrderList />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
};

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 140px 0 60px 0;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 32px;

  padding: 30px 0;
  margin-bottom: 60px;

  border-bottom: 4px solid #333333;
  text-align: center;
`;

const Fallback = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default OrderListPage;
