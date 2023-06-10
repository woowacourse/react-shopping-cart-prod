import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import useProducts from '../../../hooks/useProducts';
import productListState from '../../../store/product';
import { ProductItemType } from '../../../types';
import LoadingSpinner from '../../utils/LoadingSpinner/LoadingSpinner';
import ProductItem from '../ProductItem/ProductItem';
import styles from './styles.module.css';

const ProductList = () => {
  const productItems = useRecoilValue(productListState);
  const { fetchProductList } = useProducts();
  const { isLoading } = useQuery<ProductItemType[]>('productItemData', fetchProductList);

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className={styles.container}>
      {productItems?.map((productItem) => (
        <ProductItem key={productItem.id} information={productItem} />
      ))}
    </div>
  );
};

export default ProductList;
