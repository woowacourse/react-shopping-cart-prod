import { Outlet, useLocation } from 'react-router-dom';
import { css } from 'styled-components';
import { ROUTE_PATH } from '../constants';
import { useGoToAnotherPage } from '../hooks/useGoToAnotherPage';
import Button from './common/Button';
import Header from './common/Header';
import ServerSelector from './ServerSelector';

const Layout = () => {
  const goToPage = useGoToAnotherPage();

  const location = useLocation().pathname;

  return (
    <>
      <Header title='STORE' />
      <Outlet />
      <ServerSelector />
      <Button css={buttonStyle(location)} onClick={() => goToPage(ROUTE_PATH.ORDER_LIST_PAGE)}>
        주문 목록
      </Button>
    </>
  );
};

const buttonStyle = (location: keyof typeof ROUTE_PATH) => css`
  position: fixed;
  top: 108px;
  right: 0;
  z-index: 99;
  padding: 12px 16px;
  font-size: 14px;
  color: ${location === ROUTE_PATH.ORDER_LIST_PAGE ? '#fff' : 'var(--text-color)'};
  background: ${location === ROUTE_PATH.ORDER_LIST_PAGE ? 'var(--text-color)' : '#fff'};
  border: 1px solid var(--gray-color-200);
  border-radius: 8px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  cursor: pointer;
`;

export default Layout;
