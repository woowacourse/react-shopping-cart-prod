import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import Title from '../components/common/Title';
import OrderDetail from '../components/orderDetail/OrderDetail';
import OrderItemList from '../components/orderList/OrderItemList';
import MainLayout from '../components/PageMainLayout';
import { ORDER_URL } from '../constants/url';
import { useFetchData } from '../hooks/useFetchData';
import { serverState } from '../recoil';
import { OrderItemDetail } from '../types';

const OrderDetailPage = () => {
  const server = useRecoilValue(serverState);
  const { api } = useFetchData();
  const orderId = useParams().id;

  const [orderItemDetail, setOrderItemDetail] = useState<OrderItemDetail>();

  useEffect(() => {
    api
      .get(`${server}${ORDER_URL}/${orderId}`, {
        Authorization: 'Basic YUBhLmNvbToxMjM0',
        'Content-Type': 'application/json',
      })
      .then((data) => {
        setOrderItemDetail(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [server]);

  if (!orderItemDetail) return <></>;

  const orderList = { orderId: orderItemDetail.orderId, products: orderItemDetail.products };

  return (
    <MainLayout>
      <Title title='주문 내역 상세' />
      <S.Wrapper>
        <OrderItemList {...orderList} />
        <OrderDetail
          totalPrice={orderItemDetail.totalPrice}
          deliveryFee={orderItemDetail.deliveryFee}
        />
      </S.Wrapper>
    </MainLayout>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
  `,
};

export default OrderDetailPage;
