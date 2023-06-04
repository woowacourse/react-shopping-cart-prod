import { useRecoilState, useRecoilValue } from 'recoil';
import OrderList from '../components/order/OrderList';
import { OrderListWrapper } from '../style/ContentLayout';
import { orderState } from '../store/OrderState';
import useGet from '../hooks/useGet';
import { serverState } from '../store/ServerState';
import { ORDER_BASE_URL } from '../constants/url';
import { useEffect } from 'react';
import { OrderItem } from '../types';
import { LoadingSpinner } from '../components/@common/LoadingSpinner/LoadingSpinner';

const OrderPage = () => {
  const [orders, setOrders] = useRecoilState(orderState);
  const serverUrl = useRecoilValue(serverState);
  const { data, isLoading } = useGet<OrderItem[]>(`${serverUrl}${ORDER_BASE_URL}`);

  useEffect(() => {
    if (data) setOrders(data);
  }, [orders, data, setOrders]);

  return (
    <OrderListWrapper>
      {isLoading ? <LoadingSpinner /> : <OrderList orders={orders} />}
    </OrderListWrapper>
  );
};

export default OrderPage;
