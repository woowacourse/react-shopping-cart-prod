import { Suspense } from 'react';

import { ProductListSkeleton } from '@components/ProductList/ProductListSkeleton/ProductListSkeleton';
import { ProductList } from '@components/ProductList/ProductList';

export const Home = () => {
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductList />
    </Suspense>
  );
};
