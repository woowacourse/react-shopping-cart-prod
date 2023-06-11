import { Suspense, useEffect } from 'react';
import { useRecoilCallback } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';

import { ProductListSkeleton } from '@components/pages/Home/ProductList/ProductListSkeleton/ProductListSkeleton';
import { ProductList } from '@components/pages/Home//ProductList/ProductList';
import { FallbackRender } from '@components/FallbackRender/FallbackRender.styled';

import { productsSelector } from '@recoils/productsAtoms';

export const Home = () => {
  const refreshProducts = useRecoilCallback(({ refresh }) => () => {
    refresh(productsSelector);
  });

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  return (
    <ErrorBoundary fallbackRender={FallbackRender}>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList />
      </Suspense>
    </ErrorBoundary>
  );
};
