import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ToastList from '../components/Common/Toast/ToastList';
import Header from '../components/Header';

function Root() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner size="large" />}>
        <Header />
        <Outlet />
      </Suspense>
      <ToastList />
    </>
  );
}

export default Root;
