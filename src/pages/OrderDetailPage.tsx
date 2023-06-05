import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import ErrorFallback from '../components/ErrorFallback/ErrorFallback';
import Header from '../components/Header/Header';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import OrderDetailPageSection from '../components/OrderDetailPageSection/OrderDetailPageSection';

const OrderDetailPage = () => {
  const navigate = useNavigate();

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        navigate('/');
      }}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
        <main>
          <OrderDetailPageSection />
        </main>
      </Suspense>
    </ErrorBoundary>
  );
};

export default OrderDetailPage;
