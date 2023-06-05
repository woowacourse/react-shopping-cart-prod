import { useEffect, useState } from 'react';
import * as S from './styles/OrderDetailPage.styles';
import * as api from '../api';
import { useRecoilValue } from 'recoil';
import { serverNameState } from '../atom/serverName';
import { loginState } from '../atom/login';
import { OrderDetailInfo } from '../types';
import OrderItemDetailList from '../components/OrderList/OrderItemDetailList';
import { useParams } from 'react-router-dom';
import OrderBill from '../components/OrderList/OrderBill';

export default function OrderDetailPage() {
  const serverName = useRecoilValue(serverNameState);
  const loginCredential = useRecoilValue(loginState);
  const [orderItem, setOrderItem] = useState<OrderDetailInfo | null>(null);
  const { id: urlOrderId } = useParams();

  useEffect(() => {
    if (!urlOrderId) return;
    api
      .getOrderDetail<OrderDetailInfo>(serverName, loginCredential, urlOrderId)
      .then((orderDetail) => setOrderItem(orderDetail));
  }, []);

  if (!orderItem) return <></>;

  return (
    <S.Wrapper>
      <S.OrderDetailHeader>주문 내역 상세</S.OrderDetailHeader>
      <div>
        <OrderItemDetailList {...orderItem} />
        <OrderBill {...orderItem} />
      </div>
    </S.Wrapper>
  );
}
