import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';

import OrderList from '../components/Order/OrderList';
import Message from '../components/Common/Message';
import ErrorMessage from '../components/Common/ErrorMessage';

const OrderListPage = () => {
  return (
    <Main>
      <PageTitle>주문 목록</PageTitle>
      <ErrorBoundary fallback={<ErrorMessage type='order' />}>
        <Suspense fallback={<Message type='loading' />}>
          <OrderList />
        </Suspense>
      </ErrorBoundary>
    </Main>
  );
};

const Main = styled.main`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px 100px;
`;

const PageTitle = styled.h2`
  height: 120px;
  padding: 48px 0 0 0;
  margin: 0 auto 28px;
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  border-bottom: 4px solid ${({ theme }) => theme.colors.black};
`;

export default OrderListPage;
