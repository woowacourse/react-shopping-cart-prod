import { Outlet, useLocation } from 'react-router-dom';
import Header from 'components/Common/Header/Header';
import { useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';
import useCart from 'hooks/useCart';
import { PATH_NAME } from 'constants';

const Layout = () => {
  const { pathname } = useLocation();
  const showHeader = PATH_NAME.HOME !== pathname;

  const { getUserApi } = useAuth();
  const { getUserCartsApi } = useCart();
  useEffect(() => {
    // TODO 새로고침 시, 인증인가 로직 수정 할 것
    getUserApi();
    getUserCartsApi();
  }, []);

  return (
    <div>
      {showHeader ? <Header /> : <h1>서버를 골라주세요.</h1>}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
