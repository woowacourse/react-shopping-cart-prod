import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from 'src/components/ErrorBoundary';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ToastList from '../components/Common/Toast/ToastList';
import Header from '../components/Header';

function Root() {
  return (
    <ErrorBoundary fallback={<div>error occuer</div>}>
      <Suspense fallback={<LoadingSpinner size="large" />}>
        <Header />
        <Outlet />
      </Suspense>
      <ToastList />
    </ErrorBoundary>
  );
}

export default Root;
