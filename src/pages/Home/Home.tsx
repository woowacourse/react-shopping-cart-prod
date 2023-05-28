import { Suspense } from 'react';
import ProductList from 'components/home/ProductItemList/ProductItemList';
import { SkeletonProduct } from '@components/home/SkeletonProduct';

function Home() {
  return (
    <Suspense fallback={<SkeletonProduct />}>
      <ProductList />
    </Suspense>
  );
}

export default Home;
