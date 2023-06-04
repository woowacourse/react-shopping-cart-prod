import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ProductList from '@components/home/ProductItemList';
import SkeletonProduct from '@components/home/SkeletonProduct';
import Layout from '@components/layout/Layout';

function Home() {
  return (
    <Layout>
      <ErrorBoundary fallback={<p>에러입니다</p>}>
        <Suspense fallback={<SkeletonProduct />}>
          <ProductList />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}

export default Home;
