import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { AddIcon } from '../../../assets';
import useCartList from '../../../hooks/useCartList';
import { useModal } from '../../../hooks/useModal';
import { cartItemQuantityState } from '../../../store/cart';
import { ProductItemType } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import Modal from '../../utils/Modal/Modal';
import ProductAddition from '../ProductAddition/ProductAddition';
import styles from './style.module.css';

interface ProductItemProps {
  information: ProductItemType;
}

const ProductItem = ({ information }: ProductItemProps) => {
  const cartItemQuantity = useRecoilValue(cartItemQuantityState(information.id));

  const [addQuantity, setAddQuantity] = useState(1);
  const { fetchProductAddToCart } = useCartList();

  const { isModalOpen, handleModalOpen, handleModalClose, handleModalClosePress } = useModal();

  const handleCartAdd = () => {
    fetchProductAddToCart(information, addQuantity);
    handleModalClose();
  };

  return (
    <div className={styles.itemContainer}>
      <div className={styles.imageContainer}>
        <img src={information.imageUrl} alt={information.name} className={styles.image} />
        <button
          type="button"
          className={`${styles.itemButton} ${
            cartItemQuantity ? styles.quantityButton : styles.addButton
          }`}
          onClick={handleModalOpen}
        >
          {cartItemQuantity?.quantity ? (
            cartItemQuantity.quantity
          ) : (
            <AddIcon width={16} height={16} />
          )}
        </button>
      </div>
      <h4 className={styles.name}>{information.name}</h4>
      <h4 className={styles.price}>{priceFormatter(information.price)}원</h4>
      {isModalOpen && (
        <Modal closeModalByClick={handleModalClose} closeModalByPress={handleModalClosePress}>
          <ProductAddition
            quantity={addQuantity}
            setQuantity={setAddQuantity}
            closeModalByClick={handleModalClose}
            productInformation={information}
            submitEvent={handleCartAdd}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductItem;
