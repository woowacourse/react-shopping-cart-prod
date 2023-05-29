import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import NotFound from '@Pages/NotFound';

import orderItemsState from '@Atoms/orderItemsState';

import * as S from './style';
import OrderItem from '../OrderItem';

function OrderItems() {
  const { orderId } = useParams() as { orderId?: string };

  const orderItems = useRecoilValue(orderItemsState);

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

  return (
    <S.Container>
      {orderItems.map((orderItem) => (
        <OrderItem key={orderItem.id} {...orderItem} />
      ))}
    </S.Container>
  );
}

export default OrderItems;
