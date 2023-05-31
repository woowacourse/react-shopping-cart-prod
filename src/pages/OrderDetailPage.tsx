import api from 'apis';
import { getOrder } from 'apis/orders';
import FlexBox from 'components/@common/FlexBox';
import Spinner from 'components/@common/Loader';
import OrderItem from 'components/OrderItem/OrderItem';
import useFetch from 'hooks/useFetch';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { atom, selectorFamily, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import { Order } from 'types/order';

// Define an async selector to fetch the order based on the ID
const orderSelector = selectorFamily({
  key: 'orderSelector',
  get:
    (orderId: number) =>
    async ({ get }) => {
      const fetchedData = await getOrder(orderId);
      console.log(fetchedData);
      const order = fetchedData;
      console.log(order);
      return order;
    },
});

const OrderDetailPage = () => {
  const orderId = Number(useLocation().pathname.split('/')[2]);
  console.log(orderId);
  const { state, contents: order } = useRecoilValueLoadable(orderSelector(orderId));

  // Handle different states: 'loading', 'hasError', 'hasValue'
  if (state === 'loading') {
    return <Spinner />;
  }

  if (state === 'hasError') {
    throw Error;
  }

  return (
    <OrderDetailPageContainer flexDirection="column">
      <PageTitle>주문 상세</PageTitle>
      <SectionContainer gap="80px" align="flex-start" role="region">
        {order && <OrderItem order={order} type="detail" />}
        <PriceSection flexDirection="column" gap="10px">
          <Container justify="space-between">
            <SubTitle>총 상품가격</SubTitle>
            {order && <ProductTotalPrice>{order.totalPrice}</ProductTotalPrice>}
          </Container>
        </PriceSection>
      </SectionContainer>
    </OrderDetailPageContainer>
  );
};

export default OrderDetailPage;

const OrderDetailPageContainer = styled(FlexBox)`
  width: 100%;
`;

const PageTitle = styled.h2`
  width: 100%;
  height: 80px;
  border-bottom: 3px solid #333333;
  font-size: 32px;
  text-align: center;
`;

const SectionContainer = styled(FlexBox)`
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const PriceSection = styled(FlexBox)`
  position: sticky;
  top: 140px;
  width: 40%;
  margin-top: 60px;
  padding: 20px 26px;
  border: 1px solid #dddddd;
  background-color: #f2f2f2;

  @media (max-width: 1280px) {
    span {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    position: sticky;
    bottom: 0;
    width: 100%;
    height: 250px;
    margin: 0;
  }

  @media (max-width: 430px) {
    height: 100%;

    div {
      display: none;
    }
  }
`;

const Container = styled(FlexBox)`
  width: 100%;
  height: 50px;
  border-bottom: solid 1px #dddddd;
`;

const ProductTotalPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const SubTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
`;
