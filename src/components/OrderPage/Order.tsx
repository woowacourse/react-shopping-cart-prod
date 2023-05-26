import { OrderItem } from '../../types/orders';
import * as S from './Order.styles';
import OrderProductItem from './OrderProductItem';

interface OrderProps {
  orderId: number;
  orderItems: OrderItem[];
}

const Order = ({ orderId, orderItems }: OrderProps) => {
  return (
    <S.OrderContainer>
      <S.Header>
        <span>주문번호: {orderId}</span>
        <span>상세보기 {'>'}</span>
      </S.Header>
      <S.List>
        {orderItems.map((orderItem) => (
          <OrderProductItem key={orderItem.orderItemId} {...orderItem} />
        ))}
      </S.List>
    </S.OrderContainer>
  );
};

export default Order;
