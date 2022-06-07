import { Outlet } from 'react-router-dom';
import Header from 'components/Common/Header/Header';
import { useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';

const Layout = () => {
  const { getUserApi } = useAuth();

  useEffect(() => {
    // TODO 새로고침 시, 인증인가 로직 수정 할 것
    getUserApi();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
