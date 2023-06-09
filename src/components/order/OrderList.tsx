import OrderListItem from './OrderListItem';
import { styled } from 'styled-components';
import { OrderItem } from '../../types';
import { Title } from '../../style/commonStyle';

type Props = {
  orders: OrderItem[];
};

const OrderList = ({ orders }: Props) => {
  const orderList = orders.map((order) => <OrderListItem key={order.orderId} order={order} />);

  return (
    <>
      <Title>주문 목록</Title>
      <S.Wrapper>{orderList}</S.Wrapper>
    </>
  );
};

const S = {
  Wrapper: styled.ul`
    display: flex;
    flex-direction: column;
    width: 80vw;
    gap: 100px;
    transition: transform 0.3s ease;

    li:hover {
      transform: translate(-1px, -1px);
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
    }
  `,
};

export default OrderList;
