import { Outlet, useLocation } from 'react-router-dom';

import { styled } from 'styled-components';

import PageTitle from '../components/Common/PageTitle';
import OrderBoxList from './OrderBoxListPage';

const OrderPage = () => {
  const pathname = useLocation().pathname;

  return (
    <Main pathname={pathname}>
      <PageTitle>
        {pathname === '/order/list' ? '주문 목록' : '주문 상세 정보'}
      </PageTitle>
      <Outlet />
    </Main>
  );
};

const Main = styled.main<Record<'pathname', string>>`
  max-width: 1300px;
  height: calc(100vh - 80px);
  margin: 0 auto;
  padding: 0 30px;

  ${({ pathname }) => {
    if (pathname === '/order/list') return;

    return `display: flex;
  		flex-direction: column;
  		align-items: end;
  		gap: 20px;`;
  }}
`;

export default OrderPage;
