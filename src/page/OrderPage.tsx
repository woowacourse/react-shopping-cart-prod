import { useEffect, useState } from 'react';
import * as S from './styles/OrderPage.styles';
import * as api from '../api';
import { OrderInfo } from '../types';
import { useRecoilValue } from 'recoil';
import { serverNameState } from '../atom/serverName';
import { loginState } from '../atom/login';
import OrderItemList from '../components/OrderList/OrderItemList';

export default function OrderPage() {
  const serverName = useRecoilValue(serverNameState);
  const loginCredential = useRecoilValue(loginState);
  const [orders, setOrders] = useState<OrderInfo[]>([]);

  useEffect(() => {
    api.getOrder<OrderInfo[]>(serverName, loginCredential).then((orders) => {
      setOrders(orders);
    });
  }, []);

  return (
    <>
      <S.OrderHeader>
        <h2>주문목록</h2>
      </S.OrderHeader>
      <S.OrderItemListWrapper>
        {orders.map(({ orderId, items, orderedAt }) => (
          <OrderItemList key={orderId} orderId={orderId} items={items} orderedAt={orderedAt} />
        ))}
      </S.OrderItemListWrapper>
    </>
  );
}
