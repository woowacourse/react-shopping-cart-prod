import { useRecoilValue } from 'recoil';
import { orderListState } from '@recoil/order/orderListState';
import OrderItem from './OrderItem';
import * as S from './OrderItemList.style';

function OrderItemList() {
  const orders = useRecoilValue(orderListState);

  return (
    <S.Container>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} isVisibleDetail={true} />
      ))}
    </S.Container>
  );
}

export default OrderItemList;
