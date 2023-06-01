import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { productListState } from '@recoil/product/productListState';
import serverState from '@recoil/server/serverState';
import ProductList from '@components/home/ProductItemList';
import SkeletonProduct from '@components/home/SkeletonProduct';
import Layout from '@components/layout/Layout';
import { getProductList } from '@utils/productList/fetchProductList';

function Home() {
  const serverName = useRecoilValue(serverState);
  const setProductList = useSetRecoilState(productListState);

  useEffect(() => {
    const fetchProductData = async () => {
      const productList = await getProductList(serverName);
      setProductList(productList);
    };

    fetchProductData();
  }, [serverName, setProductList]);

  return (
    <Layout>
      <ErrorBoundary fallback={<p>에러입니다</p>}>
        <Suspense fallback={<SkeletonProduct />}>
          <ProductList />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}

export default Home;
