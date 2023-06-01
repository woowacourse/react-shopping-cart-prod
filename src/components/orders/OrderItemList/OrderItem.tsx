import { Link } from 'react-router-dom';
import { OrderType } from '@type/orderType';
import * as S from './OrderItem.style';
import OrderItemInfo from './OrderItemInfo';

interface OrderItemProps {
  order: OrderType;
}

function OrderItem({ order }: OrderItemProps) {
  return (
    <div>
      <S.Wrapper>
        <span>주문번호: {order.id}</span>
        <Link to={`${order.id}`}>상세보기 {'>'}</Link>
      </S.Wrapper>
      {order.orderItems.map((orderItem) => (
        <OrderItemInfo {...orderItem} />
      ))}
    </div>
  );
}

export default OrderItem;
