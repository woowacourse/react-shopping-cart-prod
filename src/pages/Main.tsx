import { ProductCardGrid } from '../components/mainPage/productCardGrid/ProductCardGrid';
import { Layout } from '../layout';
import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { useProductFetch } from '../hooks/fetch/useProductFetch';
import { useRecoilValue } from 'recoil';
import { APIAtom } from '../recoil/atoms/serverAtom';
import { PageTitle } from '../layout/pageTitle/PageTitle';

function Main() {
  const [products, setProducts] = useState<Product[]>();
  const { getProductList } = useProductFetch();
  const apiEndPoint = useRecoilValue(APIAtom);

  useEffect(() => {
    getProductList().then((data) => {
      setProducts(data);
    });
  }, [apiEndPoint]);

  return (
    <Layout>
      <PageTitle>상품 리스트</PageTitle>
      {products ? <ProductCardGrid products={products} /> : <>loading...</>}
    </Layout>
  );
}

export default Main;
