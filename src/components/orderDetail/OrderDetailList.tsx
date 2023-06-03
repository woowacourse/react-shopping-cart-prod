import { styled } from 'styled-components';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { serverState } from '../../store/ServerState';
import { OrderItemDetails } from '../../types';
import { useFetchData } from '../../hooks/useFetchData';
import { useParams } from 'react-router-dom';
import { ORDER_DETAIL_BASE_URL } from '../../constants/url';
import OrderDetailItem from './OrderDetailItem';
import { orderDetailState } from '../../store/OrderDetailState';

const OrderDetailList = () => {
  const { orderId } = useParams();
  const [orderDetailList, setOrderDetailList] = useRecoilState(orderDetailState);
  const serverUrl = useRecoilValue(serverState);

  const { api } = useFetchData<OrderItemDetails | undefined>(setOrderDetailList);

  useEffect(() => {
    api.get(`${serverUrl}${ORDER_DETAIL_BASE_URL.replace(':orderId', String(orderId))}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverUrl]);

  return (
    <>
      <S.Title>주문 내역 상세</S.Title>
      <S.Wrapper>
        <S.OrderInfoWrapper>
          <S.OrderNumber>주문번호: {orderDetailList?.orderId}</S.OrderNumber>
        </S.OrderInfoWrapper>
        {orderDetailList?.orderProducts.map((item) => (
          <OrderDetailItem key={item.productId} item={item} />
        ))}
      </S.Wrapper>
    </>
  );
};

const S = {
  Wrapper: styled.div`
    border: solid 1px var(--gray-color);
    border-bottom: none;
    width: 80%;
  `,

  OrderInfoWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 25px 20px;
    background-color: var(--gray-color-300);
    border-bottom: solid var(--black-color) 0.5px;
  `,

  OrderNumber: styled.h4``,

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

export default OrderDetailList;
