import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import ToastList from 'src/components/Common/Toast/ToastList';
import ErrorBoundary from 'src/components/ErrorBoundary';
import FetchFail from 'src/components/FetchFail';
import Header from 'src/components/Header';

function Root() {
  return (
    <ErrorBoundary fallback={<FetchFail />}>
      <Suspense>
        <Header />
        <Outlet />
        <ToastList />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Root;
