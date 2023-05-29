import { useRecoilState, useRecoilValue } from 'recoil';

import { AddIcon } from '../../assets';
import { useFetch } from '../../hooks/useFetch';
import { useModal } from '../../hooks/useModal';
import { cartItemQuantityState, cartListState } from '../../store/cart';
import { originState } from '../../store/origin';
import { ProductItemType } from '../../types';
import { priceFormatter } from '../../utils/formatter';
import Modal from '../Modal/Modal';
import ProductAddition from '../ProductAddition/ProductAddition';
import styles from './style.module.css';

interface ProductItemProps {
  information: ProductItemType;
}

const ProductItem = ({ information }: ProductItemProps) => {
  const cartItemQuantity = useRecoilValue(cartItemQuantityState(information.id));

  const { isModalOpen, handleModalOpen, handleModalClose, handleModalClosePress } = useModal();
  const [cartList, setCartList] = useRecoilState(cartListState);
  const { fetchApi } = useFetch<ProductItemType[]>(setCartList);
  const origin = useRecoilValue(originState);

  const handleCartAdd = () => {
    const compareProductId = information.id;
    fetchApi.post(`${origin}cart-items`, { productId: compareProductId });

    const isExistItem = cartList.find((item) => item.product.id === compareProductId);

    if (isExistItem) {
      setCartList(
        cartList.map((item) => {
          if (item.product.id === compareProductId) {
            console.log({
              ...item,
              quantity: item.quantity + 1,
            });
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        })
      );
    } else {
      const newCartList = [
        ...cartList,
        {
          id: Number(new Date()),
          quantity: 1,
          product: information,
          isChecked: true,
        },
      ];
      setCartList(newCartList);
    }

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
