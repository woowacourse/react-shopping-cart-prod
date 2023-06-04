import { Suspense } from 'react';
import styled from 'styled-components';

import OrderDetail from '../components/Order/OrderDetail';
import Message from '../components/Common/Message';
import { ErrorBoundary } from 'react-error-boundary';
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

const PageTitle = styled.h2`
  height: 60px;
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  border-bottom: 4px solid ${({ theme }) => theme.colors.black};
`;

export default OrderDetailPage;
