import ProductList from '@views/ProductItemList/Components/ProductItemList/ProductItemList';
import { SkeletonProduct } from '@views/ProductItemList/Components/SkeletonProduct';
import { Suspense } from 'react';

function Home() {
  return (
    <Suspense fallback={<SkeletonProduct></SkeletonProduct>}>
      <ProductList />
    </Suspense>
  );
}

export default Home;
