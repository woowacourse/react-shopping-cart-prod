import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingView from '../components/Common/LoadingView';
import ToastList from '../components/Common/Toast/ToastList';
import Header from '../components/Header';

function Root() {
  return (
    <>
      <Suspense fallback={<LoadingView />}>
        <Header />
        <Outlet />
      </Suspense>
      <ToastList />
    </>
  );
}

export default Root;
