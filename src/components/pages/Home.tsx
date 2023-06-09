import { Suspense, lazy } from 'react';
import { Layout } from '../common/Layout';
import ProductLoading from '../product/ProductLoading';

const ProductList = lazy(() => import('../product/ProductList'));

const Home = () => {
  return (
    <Layout>
      <Suspense fallback={<ProductLoading />}>
        <ProductList />
      </Suspense>
    </Layout>
  );
};

export default Home;
