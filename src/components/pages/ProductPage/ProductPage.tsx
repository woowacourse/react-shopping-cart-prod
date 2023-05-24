import { Suspense } from 'react';
import ProductList from '../../product/ProductList/ProductList';
import ProductListFallback from '../../product/ProductList/ProductListFallback';
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary';
import ErrorFallback from '../ErrorFallback/ErrorFallback';

const ProductPage = () => {
  return (
    <ErrorBoundary
      errorFallback={({ error, reset }) => (
        <ErrorFallback error={error} onReset={reset} />
      )}
    >
      <Suspense fallback={<ProductListFallback />}>
        <ProductList />
      </Suspense>
    </ErrorBoundary>
  );
};
export default ProductPage;
