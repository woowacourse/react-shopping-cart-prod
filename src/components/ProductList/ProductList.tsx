import { useGetProductList } from '../../hooks/useFetchUrl';
import ProductItem from '../ProductItem/ProductItem';
import styles from './styles.module.css';

const ProductList = () => {
  const productList = useGetProductList();

  return (
    <div className={styles.container}>
      {productList?.map((productItem) => {
        return <ProductItem key={productItem.id} product={productItem} />;
      })}
    </div>
  );
};

export default ProductList;
