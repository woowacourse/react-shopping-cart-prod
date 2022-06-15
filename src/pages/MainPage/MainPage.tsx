import useProductList from 'pages/MainPage/useProductList';

import ProductCardGrid from 'components/ProductCardGrid/ProductCardGrid';
import Spinner from 'components/Spinner/Spinner';

function MainPage() {
  const { isLoading, productList, error } = useProductList();

  if (error) {
    alert(error);
  }

  if (isLoading) return <Spinner />;

  return <ProductCardGrid productList={productList} />;
}

export default MainPage;
