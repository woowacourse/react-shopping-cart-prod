import AddCartButton from '../AddCartButton';
import styles from './index.module.scss';
import type { Product } from '../../types';

interface ProductItemProps {
  product: Product;
}

function ProductItem({ product }: ProductItemProps) {
  const { name, imageUrl, price } = product;

  return (
    <div className={styles.container}>
      <div className={styles['image-wrap']}>
        <img src={imageUrl} alt={name} className={styles.image} loading="lazy" />
      </div>
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
