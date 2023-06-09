import ContentLayout from 'components/@common/ContentLayout';
import ProductItemList from 'components/Product/ProductItemList';
import { useToast } from 'components/@common/Toast/hooks/useToast';
import { Suspense } from 'react';
import LoadingSkeleton from 'components/Product/ProductItem/LoadingSkeleton';

const ProductListPage = () => {
  const { renderToast } = useToast();

  return (
    <ContentLayout title="상품 목록">
      <Suspense fallback={<LoadingSkeleton />}>
        <ProductItemList />
      </Suspense>
      {renderToast}
    </ContentLayout>
  );
};

export default ProductListPage;
