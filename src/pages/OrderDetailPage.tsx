import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';

import { styled } from 'styled-components';
import OrderBoxItem from '../components/Order/OrderBoxItem';
import OrderList from '../components/Order/OrderList';
import Message from '../components/Common/Message';

import { useOrderDetail } from '../hooks/useOrderDetail';
import { serverNameState } from '../states/serverName';

const OrderDetailPage = () => {
  const serverName = useRecoilValue(serverNameState);
  const orderDetail = useOrderDetail();

  if (!orderDetail) return null;

  const { order, totalPrice } = orderDetail;

  return (
    <ErrorBoundary key={serverName} fallback={<Message type="error" />}>
      <Suspense fallback={<Message type="loading" />}>
        <StyledOrderDetailPage>
          <OrderBoxItem id={order.orderId} type="orderList">
            <OrderList orderItems={order.orderItems} />
          </OrderBoxItem>
          <OrderBoxItem type="payment">
            <p>총 결제금액</p>
            <p>{totalPrice}</p>
          </OrderBoxItem>
        </StyledOrderDetailPage>
      </Suspense>
    </ErrorBoundary>
  );
};

const StyledOrderDetailPage = styled.section`
  align-items: end;

  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    align-items: center;

    & > li {
      width: 100%;
    }
  }
`;

export default OrderDetailPage;
