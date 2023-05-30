import { Suspense } from 'react';

import Header from '../components/Header/Header';
import ProductList from '../components/Product/ProductList/ProductList';
import LoadingSpinner from '../components/utils/LoadingSpinner/LoadingSpinner';

const ProductListPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
        <main>
          <ProductList />
        </main>
      </Suspense>
    </>
  );
};

export default ProductListPage;
