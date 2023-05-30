import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import ToastContainer from '../components/@common/Toast/ToastContainer';

const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default Root;
