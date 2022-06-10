import PageContainer from 'components/@shared/PageContainer/PageContainer.component';

import Header from 'components/Header/Header.component';
import ProductListBox from 'components/ProductListBox/ProductListBox.component';
import ProductListContainer from 'components/ProductListContainer/ProductListContainer.component';
import SkeletonItem from 'components/SkeletonItem/SkeletonItem.component';

import useLoadProducts from 'hooks/api/products/useLoadProducts';

function LoadingSection() {
  return (
    <ProductListBox>
      {new Array(8).fill('').map((_, idx) => (
        <SkeletonItem key={idx} />
      ))}
    </ProductListBox>
  );
}

function ProductList() {
  const { products, isLoading, loadProducts } = useLoadProducts();

  return (
    <>
      <Header />
      <PageContainer>
        {isLoading ? (
          <LoadingSection />
        ) : (
          <ProductListContainer products={products} loadProducts={loadProducts} />
        )}
      </PageContainer>
    </>
  );
}

export default ProductList;
