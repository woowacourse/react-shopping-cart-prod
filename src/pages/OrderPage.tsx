import { useRecoilState, useRecoilValue } from 'recoil';
import { OrderListWrapper } from '../style/ContentLayout';
import { orderState } from '../store/OrderState';
import useGet from '../hooks/useGet';
import { serverState } from '../store/ServerState';
import { ORDER_BASE_URL } from '../constants/url';
import React, { Suspense, useEffect } from 'react';
import { OrderItem } from '../types';
import { LoadingSpinner } from '../components/@common/LoadingSpinner/LoadingSpinner';
import emptyImage from '../assets/empty-image.svg';

const AsyncOrderList = React.lazy(() => import('../components/order/OrderList'));

const OrderPage = () => {
  const [orders, setOrders] = useRecoilState(orderState);
  const serverUrl = useRecoilValue(serverState);
  const { data } = useGet<OrderItem[]>(`${serverUrl}${ORDER_BASE_URL}`);

  useEffect(() => {
    if (data) setOrders(data);
  }, [orders, data, setOrders]);

  return (
    <OrderListWrapper>
      <Suspense fallback={<LoadingSpinner />}>
        {orders.length > 0 ? (
          <AsyncOrderList orders={orders} />
        ) : (
          <img src={emptyImage} alt="empty-order" />
        )}
      </Suspense>
    </OrderListWrapper>
  );
};

export default OrderPage;
