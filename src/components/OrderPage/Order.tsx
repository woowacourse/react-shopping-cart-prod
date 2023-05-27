import { useNavigate } from 'react-router-dom';
import { OrderItem } from '../../types/orders';
import * as S from './Order.styles';
import OrderProductItem from './OrderProductItem';

interface OrderProps {
  orderId: number;
  orderItems: OrderItem[];
}

const Order = ({ orderId, orderItems }: OrderProps) => {
  const navigate = useNavigate();

  const onDetailClick = () => {
    navigate(`/order/${orderId}`);
  };
  return (
    <S.OrderContainer>
      <S.Header>
        <span>주문번호: {orderId}</span>
        <span onClick={onDetailClick}>상세보기 {'>'}</span>
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
