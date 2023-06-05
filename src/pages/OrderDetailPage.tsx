import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';

import { styled } from 'styled-components';
import * as List from '../components/Order/OrderBoxItem';
import OrderList from '../components/Order/OrderList';
import Message from '../components/Common/Message';

import { useOrderDetail } from '../hooks/useOrderDetail';
import { serverNameState } from '../states/serverName';
import { DELIVERY_FEE } from '../hooks/useCartPrice';

const OrderDetailPage = () => {
  const serverName = useRecoilValue(serverNameState);
  const { orderDetail, totalProductsPrice, discountPrice } = useOrderDetail();

  if (!orderDetail) return null;

  const { order, totalPrice } = orderDetail;

  return (
    <ErrorBoundary key={serverName} fallback={<Message type="error" />}>
      <Suspense fallback={<Message type="loading" />}>
        <StyledOrderDetailPage>
          <List.OrderBoxItem id={order.orderId} type="orderList">
            <OrderList orderItems={order.orderItems} />
          </List.OrderBoxItem>
          <List.OrderBoxItem type="payment">
            <OrderBoxContents>
              <PaymentInfo>
                <dt>상품 가격</dt>
                <dd>{totalProductsPrice}</dd>
              </PaymentInfo>
              <PaymentInfo>
                <dt>배송료</dt>
                <dd>{DELIVERY_FEE}</dd>
              </PaymentInfo>
              <PaymentInfo>
                <dt>할인 금액</dt>
                <dd>{discountPrice}</dd>
              </PaymentInfo>
              <PaymentInfo>
                <dt>총 결제 금액</dt>
                <dd>{totalPrice}</dd>
              </PaymentInfo>
            </OrderBoxContents>
          </List.OrderBoxItem>
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

const OrderBoxContents = styled.div`
  padding: 30px 30px;

  & > dl + dl {
    margin: 8px 0 0 0;
  }

  & > dl:last-of-type {
    margin: 40px 0 0 0;

    & > dt,
    dd {
      font-size: 24px;
      font-weight: 700;
    }
  }
`;

const PaymentInfo = styled.dl`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > dt,
  dd {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.5;

    @media (max-width: ${({ theme }) => theme.breakPoints.medium}) {
      font-size: 20px;
    }
  }
`;

export default OrderDetailPage;
