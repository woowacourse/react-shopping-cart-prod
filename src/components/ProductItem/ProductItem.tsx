import { useRecoilValue } from 'recoil';

import { AddIcon } from '../../assets';
import { useModal } from '../../hooks/useModal';
import { cartItemState } from '../../store/cart';
import { ProductItemType } from '../../types';
import { priceFormatter } from '../../utils/formatter';
import Modal from '../Modal/Modal';
import ProductAddition from '../ProductAddition/ProductAddition';
import styles from './style.module.css';

interface ProductItemProps {
  product: ProductItemType;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { isModalOpen, handleModalOpen, handleModalClose, handleModalClosePress } = useModal();
  const cartItem = useRecoilValue(cartItemState(product.id));

  return (
    <div className={styles.itemContainer}>
      <div className={styles.imageContainer}>
        <img src={product.imageUrl} alt={product.name} className={styles.image} />
        <button
          type="button"
          className={`${styles.itemButton} ${
            cartItem?.quantity ? styles.quantityButton : styles.addButton
          }`}
          onClick={handleModalOpen}
        >
          {cartItem?.quantity ? <>{cartItem?.quantity}</> : <AddIcon width={16} height={16} />}
        </button>
      </div>
      <h4 className={styles.name}>{product.name}</h4>
      <h4 className={styles.price}>{priceFormatter(product.price)}원</h4>
      {isModalOpen && (
        <Modal closeModalByClick={handleModalClose} closeModalByPress={handleModalClosePress}>
          <ProductAddition closeModalByClick={handleModalClose} product={product} />
        </Modal>
      )}
    </div>
  );
};

export default ProductItem;
