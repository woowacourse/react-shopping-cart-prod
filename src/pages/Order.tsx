import { Layout } from '../layout';
import { OrderContent } from '../components/orderPage';
import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from '../components/error/Fallback';
import { errorMessage } from '../constants/errorMessage';

export const Order = () => {
  return (
    <Layout>
      <ErrorBoundary
        FallbackComponent={() => (
          <Fallback error={new Error(errorMessage.ORDER_ITEMS_FETCH_ERROR)} />
        )}
      >
        <OrderContent />
      </ErrorBoundary>
    </Layout>
  );
};
