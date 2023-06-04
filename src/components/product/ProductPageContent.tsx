import { useProduct } from '../../hooks/useProduct';
import ProductList from './ProductList';

export default function ProductPageContent() {
  const { productList } = useProduct();

  return <ProductList products={productList} />;
}
