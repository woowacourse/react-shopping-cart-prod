import OrderListItem from './OrderListItem';
import { styled } from 'styled-components';
import { OrderItem } from '../../types';
import { Title } from '../../style/commonStyle';

type Props = {
  orders: OrderItem[];
};

const OrderList = ({ orders }: Props) => {
  const orderList = orders.map((order) => <OrderListItem order={order} />);

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
  `,
};

export default OrderList;
