import styled from 'styled-components';
import { OrderItem } from './OrderItem';
import { OrderProductInfo } from '../../recoil/atoms/orderAtom';

interface OrderGroupProps {
  orders: OrderProductInfo[];
  orderId: number;
}

export const OrderGroup = ({ orders, orderId }: OrderGroupProps) => {
  return (
    <Style.Container>
      <Style.Header>
        <Style.OrderNumber>주문 번호: {orderId}</Style.OrderNumber>
        <Style.ViewDetailButton>상세보기</Style.ViewDetailButton>
      </Style.Header>
      {orders.map((order) => (
        <OrderItem key={order.productId * orderId} {...order} />
      ))}
    </Style.Container>
  );
};

const Style = {
  Container: styled.div`
    width: 1320px;
    height: max-content;

    display: flex;
    flex-direction: column;

    @media screen and (max-width: 480px) {
      width: 90vw;
    }
  `,
  Header: styled.div`
    width: 1320px;
    height: 92px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 30px;
    background-color: rgba(246, 246, 246, 1);
    border: 1px solid rgba(170, 170, 170, 1);

    @media screen and (max-width: 480px) {
      width: 90vw;
      height: 70px;

      padding: 10px;
    }
  `,
  OrderNumber: styled.span`
    font-size: 20px;
    color: #b8b8b8;

    @media screen and (max-width: 480px) {
      width: 45vw;
      text-overflow: ellipsis;
    }
  `,
  ViewDetailButton: styled.button`
    font-size: 20px;
    font-family: var(--font-baemin);
    color: rgba(0, 0, 0, 1);

    flex-shrink: 0;
  `,
};
