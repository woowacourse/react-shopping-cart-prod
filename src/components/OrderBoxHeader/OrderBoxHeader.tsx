import { Link, useLocation } from 'react-router-dom';
import * as styled from './OrderBoxHeader.styled';

interface OrderBoxHeader {
  orderId: any;
  orderData: any;
}

export const OrderBoxHeader = ({ orderId, orderData }: OrderBoxHeader) => {
  const { pathname } = useLocation();

  return (
    <styled.OrderBoxHeader>
      <div>주문번호 : 1</div>
      {pathname === '/orders' && <Link to={`/orders/${orderId}`}>상세보기{' >'}</Link>}
    </styled.OrderBoxHeader>
  );
};
