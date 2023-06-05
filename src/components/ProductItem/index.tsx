import AddCartButton from 'src/components/AddCartButton';
import styles from './index.module.scss';
import type { Product } from 'src/types';

interface ProductItemProps {
  product: Product;
}

function ProductItem({ product }: ProductItemProps) {
  const { name, imageUrl, price } = product;

  return (
    <div className={styles.container}>
      <img src={imageUrl} alt={name} className={styles.image} />
      <div className={styles['item-info']}>
        <div>
          <div className={styles.name}>{name}</div>
          <AddCartButton product={product} />
        </div>
        <div>{price.toLocaleString()} 원</div>
      </div>
    </div>
  );
}

export default ProductItem;
