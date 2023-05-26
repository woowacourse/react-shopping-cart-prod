import ProductList from '@views/Product/components/ProductItemList/ProductItemList';
import { SkeletonProduct } from '@views/Product/components/SkeletonProduct';

import { Suspense } from 'react';

function HomePage() {
  return (
    <Suspense fallback={<SkeletonProduct />}>
      <ProductList />
    </Suspense>
  );
}

export default HomePage;
