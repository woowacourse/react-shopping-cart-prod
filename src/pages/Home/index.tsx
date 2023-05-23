import { Suspense } from 'react';

import SkeletonProductItem from './ProductItem/SkeletonProductItem';
import ProductList from './ProductList';
import * as S from './style';

function Home() {
  return (
    <S.ProductListContainer>
      <Suspense
        fallback={Array.from({ length: 12 }).map((_, index) => (
          <SkeletonProductItem key={index} />
        ))}
      >
        <ProductList />
      </Suspense>
    </S.ProductListContainer>
  );
}

export default Home;
