import { OrderType } from '@type/orderType';
import OrderItem from './OrderItem';
import * as S from './OrderItemList.style';

interface OrderItemListProps {
  orders: OrderType[];
}

function OrderItemList({ orders }: OrderItemListProps) {
  return (
    <S.Container>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} isDetail={true} />
      ))}
    </S.Container>
  );
}

export default OrderItemList;
