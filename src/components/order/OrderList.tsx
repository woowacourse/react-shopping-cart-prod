import OrderListItem from './OrderListItem';
import { styled } from 'styled-components';
import { OrderItem } from '../../types';

type Props = {
  orders: OrderItem[];
};

const OrderList = ({ orders }: Props) => {
  const orderList = orders.map((order) => <OrderListItem order={order} />);

  return (
    <>
      <S.Title>주문 목록</S.Title>
      <S.Wrapper>{orderList}</S.Wrapper>
    </>
  );
};

const S = {
  Title: styled.h1`
    width: 80vw;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    padding: 30px;
    border-bottom: 4px solid #333;
    @media all and (max-width: 479px) {
      display: none;
    }
  `,

  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    gap: 100px;
  `,
};

export default OrderList;
