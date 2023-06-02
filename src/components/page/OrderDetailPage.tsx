import type { OrderDetailType } from '../../types';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import ErrorPage from './ErrorPage';
import SubHeader from '../common/SubHeader';
import Order from '../order/Order';

import { serverNameState, tokenState } from '../../recoil/state';
import { getOrder } from '../../api';
import OrderBill from '../order/OrderBill';

export default function OrderDetailPage() {
  const { orderId } = useParams();
  if (orderId == undefined) return <ErrorPage />;

  const serverName = useRecoilValue(serverNameState);
  const token = useRecoilValue(tokenState);

  const [order, setOrder] = useState<OrderDetailType | null>(null);
  const [loadFinish, setLoadFinish] = useState(false);

  useEffect(() => {
    if (token === null) return;

    getOrder(serverName, token, Number(orderId))
      .then(setOrder)
      .catch(() => {
        setOrder(null);
      })
      .finally(() => {
        setLoadFinish(true);
      });
  }, [serverName, token]);

  if (loadFinish === false) return <></>;
  if (order === null) return <ErrorPage />;

  const { coupon, totalPrice, couponDiscountPrice, deliveryPrice } = order;
  return (
    <Wrapper>
      <SubHeader>주문 목록 상세</SubHeader>
      <Main>
        <OrderBox>
          <Order {...order} buttonHidden />
        </OrderBox>
        <OrderBill
          coupon={coupon}
          totalPrice={totalPrice}
          couponDiscountPrice={couponDiscountPrice}
          deliveryPrice={deliveryPrice}
        />
      </Main>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  margin-top: 32px;

  @media (max-width: 1184px) {
    flex-direction: column;
    align-items: center;
  }
`;

const OrderBox = styled.div`
  width: 60%;
`;
