import { useSelector } from 'react-redux';

import PageContainer from 'components/@shared/PageContainer/PageContainer.component';

import Header from 'components/Header/Header.component';
import ProductListBox from 'components/ProductListBox/ProductListBox.component';
import ProductListContainer from 'components/ProductListContainer/ProductListContainer.component';
import SkeletonItem from 'components/SkeletonItem/SkeletonItem.component';

import useFetch from 'hooks/useFetch';

import { API_URL_PATH } from 'constants/api';

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
  const { accessToken } = useSelector(state => state.auth);
  const headers = accessToken && { Authorization: `Bearer ${accessToken}` };
  const {
    data,
    isLoading,
    fetchData: loadProducts,
  } = useFetch({
    url: API_URL_PATH.PRODUCTS,
    headers,
  });

  return (
    <>
      <Header />
      <PageContainer>
        {isLoading ? (
          <LoadingSection />
        ) : (
          <ProductListContainer data={data.products} loadProducts={loadProducts} />
        )}
      </PageContainer>
    </>
  );
}

export default ProductList;
