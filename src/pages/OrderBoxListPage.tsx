import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';

import { styled } from 'styled-components';
import Message from '../components/Common/Message';
import OrderBoxItem from '../components/Order/OrderBoxItem';
import OrderList from '../components/Order/OrderList';

import { useOrders } from '../hooks/useOrders';
import { serverNameState } from '../states/serverName';

const OrderBoxListPage = () => {
  const serverName = useRecoilValue(serverNameState);
  const orders = [...useOrders()].reverse();

  return (
    <ErrorBoundary key={serverName} fallback={<Message type="error" />}>
      <Suspense fallback={<Message type="loading" />}>
        <StyledOrderBoxListPage>
          {orders.map(order => {
            return (
              <OrderBoxItem
                key={order.orderId}
                id={order.orderId}
                type="orderList"
              >
                <OrderBoxContents>
                  <OrderList
                    key={order.orderId}
                    orderItems={order.orderItems}
                  />
                </OrderBoxContents>
              </OrderBoxItem>
            );
          })}
        </StyledOrderBoxListPage>
      </Suspense>
    </ErrorBoundary>
  );
};

const StyledOrderBoxListPage = styled.ul`
  align-items: center;

  & > li:not(:first-child) img {
    filter: grayscale(100%);
  }
`;

const OrderBoxContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  & > p {
    font-weight: 700;
    font-size: 24px;
    letter-spacing: 0.5px;
    line-height: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakPoints.medium}) {
    & > p {
      font-size: 20px;
    }
  }
`;

export default OrderBoxListPage;
