import { styled } from 'styled-components';
import OrderListItems from './OrderListItems';
import { useRecoilValue } from 'recoil';
import { serverState } from '../../store/ServerState';
import { useFetchData } from '../../hooks/useFetchData';
import { useEffect, useState } from 'react';
import { ORDER_BASE_URL } from '../../constants/url';
import { OrderItem } from '../../types';

const OrderList = () => {
  const [orderList, setOrderList] = useState<OrderItem[]>([]);
  const serverUrl = useRecoilValue(serverState);

  const { api } = useFetchData<OrderItem[]>(setOrderList);

  useEffect(() => {
    api.get(`${serverUrl}${ORDER_BASE_URL}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverUrl]);

  return (
    <>
      <S.Title>주문 목록</S.Title>
      {orderList.map((items) => (
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
