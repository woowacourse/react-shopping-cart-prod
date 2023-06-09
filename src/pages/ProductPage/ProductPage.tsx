import AsyncBoundary from '../../components/AsyncBoundary/AsyncBoundary';
import Loading from '../../components/common/Loading/Loading';
import ProductList from '../../components/ProductPage/ProductList/ProductList';
import ProductListErrorPage from './ProductListErrorPage';

const ProductPage = () => {
  return (
    <AsyncBoundary
      loadingFallback={<Loading />}
      errorFallback={<ProductListErrorPage />}
    >
      <ProductList />
    </AsyncBoundary>
  );
};

export default ProductPage;
