import { useNavigate } from 'react-router-dom';
import * as S from './OrderList.style';
import type { OrderItem as OrderItemType } from '../../../types/types';
import { OrderItem } from '../OrderItem';

type OrderListProps = {
  orderId: number;
  orderItems: OrderItemType[];
  detail?: boolean;
};

function OrderList({ orderId, orderItems, detail = true }: OrderListProps) {
  const navigate = useNavigate();

  return (
    <S.OrderItemList>
      <S.OrderInfo>
        <span>주문번호: {orderId}</span>
        {detail && <S.DetailButton onClick={() => navigate(`/order/${orderId}`)}>상세보기 &gt;</S.DetailButton>}
      </S.OrderInfo>
      {orderItems.map((item) => (
        <OrderItem item={item} />
      ))}
    </S.OrderItemList>
  );
}

export default OrderList;
