import OrderItem from '../OrderItem/OrderItem';
import { Order as OrderInfo } from '../../../types/order';
import * as S from './Order.styles';
import { Link } from 'react-router-dom';

interface OrderProps extends OrderInfo {
  detail?: boolean;
}

const Order: React.FC<OrderProps> = (props) => {
  const { detail, orderId, orderItems } = props;

  return (
    <S.Root>
      <S.Order justify="space-between" align="center">
        <span>주문 번호: {orderId}</span>
        {detail && (
          <Link to={`./detail?id=${orderId}`}>
            <S.DetailButton>상세 보기 {'>'}</S.DetailButton>
          </Link>
        )}
      </S.Order>
      <S.ItemList>
        {orderItems.map((orderItem) => (
          <OrderItem key={orderItem.orderItemId} {...orderItem} />
        ))}
      </S.ItemList>
    </S.Root>
  );
};

export default Order;
