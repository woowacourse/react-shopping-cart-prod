import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import EmptyProduct from '@Components/EmptyProduct';
import PageTitle from '@Components/PageTitle';

import NotFound from '@Pages/NotFound';

import orderItemsState from '@Atoms/orderItemsState';

import * as S from './style';
import OrderItem from '../OrderItem';

function OrderItems() {
  const { orderId } = useParams() as { orderId?: string };

  const orderItems = useRecoilValue(orderItemsState);

  const pageTitle = orderId ? '주문 내역 상세' : '주문 목록';

  if (orderId) {
    const orderItem = orderItems.find((orderItem) => orderItem.id === Number(orderId));

    return orderItem ? (
      <S.Container>
        <OrderItem key={orderItem.id} {...orderItem} page="detail" />
      </S.Container>
    ) : (
      <NotFound />
    );
  }

  if (orderItems.length === 0) return <EmptyProduct text="주문 목록이 없습니다." />;

  return (
    <>
      <PageTitle title={pageTitle} />
      <S.Container>
        {orderItems.map((orderItem) => (
          <OrderItem key={orderItem.id} {...orderItem} />
        ))}
      </S.Container>
    </>
  );
}

export default OrderItems;
