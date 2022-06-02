import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

function HeaderLayout() {
  return (
    <>
      <Header />
      <Outlet />;
    </>
  );
}

export default HeaderLayout;
