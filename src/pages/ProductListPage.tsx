import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import ErrorFallback from '../components/ErrorFallback/ErrorFallback';
import Header from '../components/Header/Header';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ProductList from '../components/ProductList/ProductList';

const ProductListPage = () => {
  // 서버 동기화 시키기

  return (
    <>
      <Header />
      <main>
        <ProductList />
      </main>
    </>
  );
};

const ProductListPageContainer = () => {
  const navigate = useNavigate();

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        navigate('/');
      }}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <ProductListPage />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ProductListPageContainer;
