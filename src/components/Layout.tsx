import { Outlet } from 'react-router-dom';
import Header from './common/Header';
import ServerSelector from './ServerSelector';

const Layout = () => {
  return (
    <>
      <Header title='STORE' />
      <Outlet />
      <ServerSelector />
    </>
  );
};

export default Layout;
