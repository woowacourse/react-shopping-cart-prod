import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';

import PageTitle from '../components/Common/PageTitle';
import OrderList from '../components/Order/OrderList';
import Message from '../components/Common/Message';
import ErrorMessage from '../components/Common/ErrorMessage';

const OrderListPage = () => {
  return (
    <OrderListPageContainer>
      <PageTitle>주문 목록</PageTitle>
      <ErrorBoundary fallback={<ErrorMessage type='order' />}>
        <Suspense fallback={<Message type='loading' />}>
          <OrderList />
        </Suspense>
      </ErrorBoundary>
    </OrderListPageContainer>
  );
};

const OrderListPageContainer = styled.section`
  padding: 0 0 60px;
`;

export default OrderListPage;
