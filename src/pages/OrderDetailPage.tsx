import { useLocation } from 'react-router-dom';
import OrderListItem from '../components/order/OrderListItem';
import { useRecoilState, useRecoilValue } from 'recoil';
import { serverState } from '../store/ServerState';
import { orderState } from '../store/OrderState';
import useGet from '../hooks/useGet';
import { OrderItem } from '../types';
import { ORDER_BASE_URL } from '../constants/url';
import { useEffect } from 'react';
import { OrderListWrapper, OrderWrapper } from '../style/ContentLayout';
import { Title } from '../style/commonStyle';

const OrderDetailPage = () => {
  const serverUrl = useRecoilValue(serverState);
  const [order, setOrder] = useRecoilState(orderState);
  const { data } = useGet<OrderItem[]>(`${serverUrl}${ORDER_BASE_URL}`);

  useEffect(() => {
    if (data) setOrder(data);
  }, [data, setOrder]);

  const location = useLocation();
  const id = location.state.id;

  const orderDetail = order.find((item) => item.orderId === id);

  return (
    <OrderListWrapper>
      <Title>주문 목록</Title>
      <OrderWrapper>
        {orderDetail ? <OrderListItem order={orderDetail} buttonHide={true} /> : null}
      </OrderWrapper>
    </OrderListWrapper>
  );
};

export default OrderDetailPage;
