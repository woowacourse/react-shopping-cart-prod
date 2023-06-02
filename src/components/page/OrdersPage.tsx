import type { OrderType } from '../../types';

import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import SubHeader from '../common/SubHeader';
import Order from '../order/Order';

import { serverNameState, tokenState } from '../../recoil/state';
import { getOrders } from '../../api';
import useToast from '../../hooks/useToast';
import SubPageTemplate from '../common/SubPageTemplate';

export default function OrdersPage() {
  const serverName = useRecoilValue(serverNameState);
  const token = useRecoilValue(tokenState);

  const [orders, setOrders] = useState<OrderType[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    if (token === null) return;

    getOrders(serverName, token)
      .then(setOrders)
      .catch(() => {
        showToast('error', '주문목록 불러오기 실패');
      });
  }, [serverName, token]);

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

const Wrapper = styled.div`
  width: 80%;
`;

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
