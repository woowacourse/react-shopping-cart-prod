import { Suspense } from 'react';

import ProductItemSkeleton from './ProductItem/ProductItemSkeleton';
import ProductList from './ProductList';
import * as S from './style';

function Home() {
  return (
    <S.ProductListContainer>
      <Suspense
        fallback={Array.from({ length: 12 }).map((_, index) => (
          <ProductItemSkeleton key={index} />
        ))}
      >
        <ProductList />
      </Suspense>
    </S.ProductListContainer>
  );
}

export default Home;
