import ContentLayout from 'components/@common/ContentLayout';
import LoadingSkeleton from 'components/Product/ProductItem/LoadingSkeleton';
import ProductItemList from 'components/Product/ProductItemList';
import { ProductListWrapper } from 'components/Product/ProductItemList/ProductItemList.styles';
import { Suspense } from 'react';

const ProductList = () => {
  const Loading = Array.from({ length: 16 }).map((_, idx) => (
    <LoadingSkeleton key={idx} />
  ));

  return (
    <ContentLayout>
      <Suspense fallback={<ProductListWrapper>{Loading}</ProductListWrapper>}>
        <ProductItemList />
      </Suspense>
    </ContentLayout>
  );
};

export default ProductList;
