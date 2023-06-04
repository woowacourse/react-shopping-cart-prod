import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';

import PageTitle from '../components/Common/PageTitle';
import OrderDetail from '../components/Order/OrderDetail';
import Message from '../components/Common/Message';
import ErrorMessage from '../components/Common/ErrorMessage';

const OrderDetailPage = () => {
  return (
    <OrderDetailPageContainer>
      <PageTitle>주문 내역 상세</PageTitle>
      <ErrorBoundary fallback={<ErrorMessage type='orderDetail' />}>
        <Suspense fallback={<Message type='loading' />}>
          <OrderDetail />
        </Suspense>
      </ErrorBoundary>
    </OrderDetailPageContainer>
  );
};

const OrderDetailPageContainer = styled.div`
  padding: 0 0 60px;
`;

export default OrderDetailPage;
