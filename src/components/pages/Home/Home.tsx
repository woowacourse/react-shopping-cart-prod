import { Suspense, useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

import { ProductListSkeleton } from '@components/ProductList/ProductListSkeleton/ProductListSkeleton';
import { ProductList } from '@components/ProductList/ProductList';

import { productsSelector } from '@recoils/productsAtoms';

export const Home = () => {
  const refreshProducts = useRecoilCallback(({ refresh }) => () => {
    refresh(productsSelector);
  });

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductList />
    </Suspense>
  );
};
