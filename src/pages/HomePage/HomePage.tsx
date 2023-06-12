import ProductList from "@views/Product/components/ProductItemList/ProductItemList";
import { SkeletonProduct } from "@views/Product/components/SkeletonProduct";

import { Suspense } from "react";
import ErrorBoundary from "@common/ErrorBoundary/ErrorBoundary";

function HomePage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<SkeletonProduct />}>
        <ProductList />
      </Suspense>
    </ErrorBoundary>
  );
}

export default HomePage;
