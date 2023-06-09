import styled from 'styled-components';
import { Product } from '../../types/Product';
import { OrderItem } from './OrderItem';
import { useNavigate } from 'react-router-dom';

interface OrderItemListProps {
  orderId: number;
  orderInfos: Product[];
}

export const OrderItemList = ({ orderId, orderInfos }: OrderItemListProps) => {
  const moveToOrderDetail = useNavigate();

  const handleDetailButton = () => {
    moveToOrderDetail(`/orders/${orderId}`, {
      state: orderId,
    });
  };

  return (
    <Style.Container>
      <Style.Content>
        <Style.OrderHeader>
          <div>주문번호: {orderId}</div>
          <button onClick={handleDetailButton}>상세보기</button>
        </Style.OrderHeader>
        {orderInfos.map((item, index) => {
          return <OrderItem key={orderId * index} product={item} />;
        })}
      </Style.Content>
    </Style.Container>
  );
};

const Style = {
  Container: styled.ul`
    width: 100%;

    min-height: max-content;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    font-size: 16px;

    margin: 30px 0;
  `,
  Content: styled.div`
    width: 100%;
    min-height: max-content;

    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 0 10px;

    @media (max-width: 480px) {
      gap: 10px;
    }
  `,
  OrderHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f6f6f6;

    border-radius: 8px;
    font-size: 24px;

    height: 92px;
    padding: 0 30px;

    & > button {
      font-size: 20px;
    }
  `,
};
