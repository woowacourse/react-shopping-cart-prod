import styled from 'styled-components';
import { OrderItem } from './OrderItem';
import { OrderProductInfo } from '../../recoil/atoms/orderAtom';
import { useNavigate } from 'react-router-dom';

interface OrderGroupProps {
  orders: OrderProductInfo[];
  orderId: number;
  isDetailPage?: boolean;
}

export const OrderGroup = ({
  orders,
  orderId,
  isDetailPage,
}: OrderGroupProps) => {
  const navigate = useNavigate();

  return (
    <Style.Container>
      <Style.Header>
        <Style.OrderNumber $isDetailPage={isDetailPage ?? false}>
          주문 번호: {orderId}
        </Style.OrderNumber>
        <Style.ViewDetailButton
          onClick={() => {
            navigate('/orderDetail', { state: { orderId } });
          }}
          $isDetailPage={isDetailPage ?? false}
        >
          상세보기
        </Style.ViewDetailButton>
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
  OrderNumber: styled.span<{ $isDetailPage: boolean }>`
    font-size: 20px;
    color: #b8b8b8;

    @media screen and (max-width: 480px) {
      width: ${(props) => (props.$isDetailPage ? '85vw' : '45vw')};
      font-size: 16px;
    }
  `,
  ViewDetailButton: styled.button<{ $isDetailPage: boolean }>`
    font-size: 20px;
    font-family: var(--font-baemin);
    color: rgba(0, 0, 0, 1);

    flex-shrink: 0;
    display: ${(props) => (props.$isDetailPage ? 'none' : 'block')};

    @media screen and (max-width: 480px) {
      font-size: 16px;
    }
  `,
};
