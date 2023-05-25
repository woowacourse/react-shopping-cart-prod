import { Outlet } from 'react-router-dom';
import Header from './common/Header';

const Layout = () => {
  return (
    <>
      <Header title='STORE' />
      <Outlet />
    </>
  );
};
export default Layout;
