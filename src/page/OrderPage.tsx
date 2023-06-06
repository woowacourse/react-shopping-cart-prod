import { useEffect } from 'react';
import * as S from './styles/OrderPage.styles';
import { useRecoilValue } from 'recoil';
import { serverNameState } from '../atom/serverName';
import { loginState } from '../atom/login';
import OrderItemList from '../components/OrderList/OrderItemList';
import { useGetOrderList } from '../components/hooks/useGetOrderList';

export default function OrderPage() {
  const serverName = useRecoilValue(serverNameState);
  const loginCredential = useRecoilValue(loginState);
  const { orders, getOrdersThroughApi } = useGetOrderList();

  useEffect(() => {
    getOrdersThroughApi(serverName, loginCredential);
  }, []);

  if (!orders) return <></>;

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
