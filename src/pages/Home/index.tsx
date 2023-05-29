import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ProductList from '@components/home/ProductItemList';
import SkeletonProduct from '@components/home/SkeletonProduct';

function Home() {
  return (
    <ErrorBoundary fallback={<p>에러입니다</p>}>
      <Suspense fallback={<SkeletonProduct />}>
        <ProductList />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Home;
