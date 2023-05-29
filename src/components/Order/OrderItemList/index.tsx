import * as S from './OrderItemList.styles';
import OrderItem from '../OrderItem';
import { Order } from 'types';

const OrderItemList = ({ order }: { order: Order }) => {
  return (
    <S.OrderListWrapper>
      <S.OrderListHeader>
        <p>주문번호 : {order.orderId}</p>
        <button>상세보기 {'>'} </button>
      </S.OrderListHeader>
      {order.products.map((item) => (
        <OrderItem item={item} />
      ))}
    </S.OrderListWrapper>
  );
};

export default OrderItemList;
