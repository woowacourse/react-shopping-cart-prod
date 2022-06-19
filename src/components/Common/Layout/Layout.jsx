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
    getUserApi();
    getUserCartsApi();
  }, []);

  return (
    <div>
      {showHeader && <Header />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
