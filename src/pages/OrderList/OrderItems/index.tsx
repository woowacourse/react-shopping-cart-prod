import { useRecoilValue } from 'recoil';

import orderItemsState from '@Atoms/orderItemsState';

import * as S from './style';
import OrderItem from '../OrderItem';

function OrderItems() {
  const orderItems = useRecoilValue(orderItemsState);

  return (
    <S.Container>
      {orderItems.map((orderItem, index) => (
        <OrderItem key={orderItem.id} {...orderItem} order={index + 1} />
      ))}
    </S.Container>
  );
}

export default OrderItems;
