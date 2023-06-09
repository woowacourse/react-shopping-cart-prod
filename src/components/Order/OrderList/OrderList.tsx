import { useNavigate } from 'react-router-dom';
import * as S from './OrderList.style';
import type { OrderItem as OrderItemData } from '../../../types/types';
import { OrderItem } from '../OrderItem';
import { GMTToLocalTime } from '../../../utils/time';

type OrderListProps = {
  orderId: number;
  orderItems: OrderItemData[];
  createdAt: string;
  detail?: boolean;
};

function OrderList({ orderId, orderItems, createdAt, detail = true }: OrderListProps) {
  const navigate = useNavigate();

  return (
    <S.OrderItemList>
      <S.OrderInfo>
        <span>주문번호: {orderId}</span>
        <span>{GMTToLocalTime(createdAt)}</span>
        {detail && <S.DetailButton onClick={() => navigate(`/order/${orderId}`)}>상세보기 &gt;</S.DetailButton>}
      </S.OrderInfo>
      {orderItems.map((item) => (
        <OrderItem key={item.id} item={item} />
      ))}
    </S.OrderItemList>
  );
}

export default OrderList;
