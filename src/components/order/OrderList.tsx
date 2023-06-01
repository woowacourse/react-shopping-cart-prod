import { styled } from 'styled-components';
import { orders } from '../../data/mockData';
import OrderListItems from './OrderListItems';

const OrderList = () => {
  return (
    <>
      <S.Title>주문 목록</S.Title>
      {orders.map((items) => (
        <OrderListItems key={items.orderId} items={items} />
      ))}
    </>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    margin-bottom: 50%;

    @media all and (max-width: 479px) {
      & > :first-child {
        font-size: 20px;
        margin-top: 30px;
        input {
          width: 24px;
        }

        button {
          width: fit-content;
        }
      }
    }
  `,

  Title: styled.h1`
    width: 80%;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    padding: 30px;
    border-bottom: 4px solid #333;
    @media all and (max-width: 479px) {
      display: none;
    }
  `,
};

export default OrderList;
