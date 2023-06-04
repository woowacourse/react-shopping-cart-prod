import { useNavigate } from 'react-router-dom';
import * as S from './OrderList.style';
import type { OrderItem as OrderItemType } from '../../../types/types';
import { OrderItem } from '../OrderItem';

type OrderListProps = {
  orderId: number;
  orderItems: OrderItemType[];
  createAt: string;
  detail?: boolean;
};

function OrderList({ orderId, orderItems, createAt, detail = true }: OrderListProps) {
  const navigate = useNavigate();

  const [datePart, timePart] = createAt.split(' ');
  const [year, month, day] = datePart.split('-');
  const [hour, minute, second] = timePart.split(':');
  const fixedSecond = second.split('.')[0];
  const isoString = `${year}-${month}-${day}T${hour}:${minute}:${fixedSecond}.000Z`;
  const date = new Date(isoString);
  date.setHours(date.getHours() + 9);
  const updatedDateString = date.toISOString().replace('T', ' ').slice(0, -5);
  console.log(createAt, updatedDateString);

  return (
    <S.OrderItemList>
      <S.OrderInfo>
        <span>주문번호: {orderId}</span>
        <span>{updatedDateString}</span>
        {detail && <S.DetailButton onClick={() => navigate(`/order/${orderId}`)}>상세보기 &gt;</S.DetailButton>}
      </S.OrderInfo>
      {orderItems.map((item) => (
        <OrderItem key={item.id} item={item} />
      ))}
    </S.OrderItemList>
  );
}

export default OrderList;
