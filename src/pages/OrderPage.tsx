import { Outlet, useLocation } from 'react-router-dom';

import { styled } from 'styled-components';
import PageTitle from '../components/Common/PageTitle';

import { PAGE_URLS } from '../constants/urls';

const OrderPage = () => {
  const pathname = useLocation().pathname;

  return (
    <Main pathname={pathname}>
      <PageTitle>
        {pathname === PAGE_URLS.orders ? '주문 목록' : '주문 상세 정보'}
      </PageTitle>
      <Outlet />
    </Main>
  );
};

const Main = styled.main<Record<'pathname', string>>`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  padding: 30px 120px;

  & > * {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    padding: 30px 30px 90px 30px;
  }
`;

export default OrderPage;
