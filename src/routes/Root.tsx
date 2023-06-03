import { Outlet } from 'react-router-dom';
import ErrorBoundary from 'src/components/ErrorBoundary';
import FetchFail from 'src/components/FetchFail';
import ToastList from '../components/Common/Toast/ToastList';
import Header from '../components/Header';

function Root() {
  return (
    <ErrorBoundary fallback={<FetchFail />}>
      <Header />
      <Outlet />
      <ToastList />
    </ErrorBoundary>
  );
}

export default Root;
