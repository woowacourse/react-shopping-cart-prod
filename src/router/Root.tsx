import { Outlet } from 'react-router-dom';
import ErrorBoundary from 'components/@common/ErrorBoundary';
import ErrorComponent from 'components/@common/ErrorComponent';
import Header from 'components/@common/Header';
import { useToast } from 'components/@common/Toast/hooks/useToast';
import { useReset } from 'hooks/useReset';

const Root = () => {
  const { renderToast } = useToast();
  const { onReset } = useReset();

  return (
    <ErrorBoundary fallback={ErrorComponent} onReset={onReset}>
      <Header />
      <Outlet />
      {renderToast}
    </ErrorBoundary>
  );
};

export default Root;
