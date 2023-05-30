import { styled } from 'styled-components';
import { OrderItemInfo } from '../../types';
import OrderItem from './OrderItem';

interface Props {
  orders: OrderItemInfo[];
}

export default function OrderList({ orders }: Props) {
  return (
    <ul>
      {orders.map((order) => (
        <Style.OrderItemWrapper key={order.orderNumber}>
          <OrderItem orderItemInfo={order} />
        </Style.OrderItemWrapper>
      ))}
    </ul>
  );
}

const Style = {
  OrderItemWrapper: styled.li`
    width: 932px;

    border: 1px solid var(--grey-300);
    border-bottom: none;
    margin-bottom: 20px;

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      width: 708px;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      width: 315px;
    }
  `,
};
