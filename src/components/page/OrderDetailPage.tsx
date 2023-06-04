import type { OrderDetailType } from '../../types';

import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import ErrorPage from './ErrorPage';
import SubPageTemplate from '../common/SubPageTemplate';
import Order from '../order/Order';
import OrderBill from '../order/OrderBill';

import useToast from '../../hooks/useToast';
import { serverNameState, tokenState } from '../../recoil/state';
import api from '../../api';
import { NO_TOKEN_REDIRECT_MESSAGE } from '../../constants';

export default function OrderDetailPage() {
  const token = useRecoilValue(tokenState);
  const { showToast } = useToast();
  if (token === null) {
    showToast('warning', NO_TOKEN_REDIRECT_MESSAGE);
    return <Navigate to="/" />;
  }

  const { orderId } = useParams();
  if (orderId == undefined) return <ErrorPage />;

  const serverName = useRecoilValue(serverNameState);

  const [order, setOrder] = useState<OrderDetailType | null>(null);
  const [loadFinish, setLoadFinish] = useState(false);

  useEffect(() => {
    if (token === null) return;

    api
      .getOrder(serverName, token, Number(orderId))
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
    <SubPageTemplate title="주문 목록 상세">
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
    </SubPageTemplate>
  );
}

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
