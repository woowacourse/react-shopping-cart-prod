import { Outlet, useLocation } from 'react-router-dom';
import { css } from 'styled-components';
import { ROUTE_PATH } from '../constants';
import { useGoToAnotherPage } from '../hooks/useGoToAnotherPage';
import Button from './common/Button';
import Header from './common/Header';
import ServerSelector from './ServerSelector';

const Layout = () => {
  const goToPage = useGoToAnotherPage();

  const { pathname } = useLocation();

  return (
    <>
      <Header title='STORE' />
      <Outlet />
      <ServerSelector />
      <Button css={buttonStyle(pathname)} onClick={() => goToPage(ROUTE_PATH.ORDER_LIST_PAGE)}>
        주문 목록
      </Button>
    </>
  );
};

const buttonStyle = (pathname: keyof typeof ROUTE_PATH) => css`
  position: fixed;
  top: 108px;
  right: 0;
  z-index: 99;
  padding: 12px 16px 12px 20px;
  font-size: 14px;
  color: ${pathname === ROUTE_PATH.ORDER_LIST_PAGE ? 'var(--white-color)' : 'var(--text-color)'};
  background: ${pathname === ROUTE_PATH.ORDER_LIST_PAGE
    ? 'var(--text-color)'
    : 'var(--white-color)'};
  border: 1px solid var(--gray-color-200);
  border-radius: 8px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  cursor: pointer;
`;

export default Layout;
