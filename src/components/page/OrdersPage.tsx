import type { OrderType } from '../../types';

import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import SubPageTemplate from '../common/SubPageTemplate';
import Order from '../order/Order';

import useToast from '../../hooks/useToast';
import { serverNameState, tokenState } from '../../recoil/state';
import api from '../../api';
import { NO_TOKEN_REDIRECT_MESSAGE } from '../../constants';

export default function OrdersPage() {
  const token = useRecoilValue(tokenState);
  const { showToast } = useToast();
  if (token === null) {
    showToast('warning', NO_TOKEN_REDIRECT_MESSAGE);
    return <Navigate to="/" />;
  }

  const serverName = useRecoilValue(serverNameState);

  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    api
      .getOrders(serverName, token)
      .then(setOrders)
      .catch(() => {
        showToast('error', '주문목록 불러오기 실패');
      });
  }, [serverName]);

  return (
    <SubPageTemplate title="주문 목록">
      <Main>
        <List>
          {orders.map((order) => (
            <Order {...order} />
          ))}
        </List>
      </Main>
    </SubPageTemplate>
  );
}

const Main = styled.div`
  display: flex;
  justify-content: space-around;

  width: 100%;
  margin-top: 32px;

  @media (max-width: 1184px) {
    flex-direction: column;
    align-items: center;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;
