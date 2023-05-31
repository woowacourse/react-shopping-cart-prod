import { Suspense } from 'react';
import styled from 'styled-components';

import OrderDetail from '../components/Order/OrderDetail';
import Message from '../components/Common/Message';

const OrderDetailPage = () => {
  return (
    <Main>
      <PageTitle>주문 내역 상세</PageTitle>
      <Suspense fallback={<Message type='loading' />}>
        <OrderDetail />
      </Suspense>
    </Main>
  );
};

const Main = styled.main`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 30px 100px;
`;

const PageTitle = styled.h2`
  height: 120px;
  padding: 48px 0 0 0;
  margin: 0 auto;
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  border-bottom: 4px solid ${({ theme }) => theme.colors.black};
`;

export default OrderDetailPage;
