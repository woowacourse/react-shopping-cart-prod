import ErrorComponent from 'components/@common/ErrorComponent';
import Header from 'components/@common/Header';
import { useToast } from 'components/@common/Toast/hooks/useToast';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

const Root = () => {
  const { renderToast } = useToast();

  return (
    <ErrorBoundary fallback={<ErrorComponent />}>
      <Header />
      <Outlet />
      {renderToast}
    </ErrorBoundary>
  );
};

export default Root;
