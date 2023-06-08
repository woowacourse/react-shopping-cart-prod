import { Link, useLocation } from 'react-router-dom';
import * as styled from './OrderBoxHeader.styled';

interface OrderBoxHeaderProps {
  orderId: number;
  orderDate: string;
}

export const OrderBoxHeader = ({ orderId, orderDate }: OrderBoxHeaderProps) => {
  const { pathname } = useLocation();

  return (
    <styled.OrderBoxHeader>
      <div>
        <span>주문번호 : {orderId}</span>
        <styled.OrderDate>주문날짜 : {orderDate}</styled.OrderDate>
      </div>
      {pathname === '/orders' && <Link to={`/orders/${orderId}`}>상세보기{' >'}</Link>}
    </styled.OrderBoxHeader>
  );
};
