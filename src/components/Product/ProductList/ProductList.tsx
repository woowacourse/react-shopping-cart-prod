import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import useProducts from '../../../hooks/useProducts';
import productListState from '../../../store/product';
import { ProductItemType } from '../../../types';
import ProductItem from '../ProductItem/ProductItem';
import styles from './styles.module.css';

const ProductList = () => {
  const productItems = useRecoilValue(productListState);
  const { fetchProductList } = useProducts();
  useQuery<ProductItemType[]>('productItemData', fetchProductList);

  return (
    <div className={styles.container}>
      {productItems?.map((productItem) => (
        <ProductItem key={productItem.id} information={productItem} />
      ))}
    </div>
  );
};

export default ProductList;
