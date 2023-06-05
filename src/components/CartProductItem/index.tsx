import { RiDeleteBinLine } from 'react-icons/ri';
import CheckBox from 'src/components/Common/CheckBox';
import CountButton from 'src/components/Common/CountButton';
import Modal from 'src/components/Common/Modal';
import ModalNotification from 'src/components/Common/ModalNotification';
import useModal from 'src/hooks/useModal';
import styles from './index.module.scss';
import type { CartItem } from 'src/types';

interface CartProductItemProps {
  cartItem: CartItem;

  toggleCheck: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  mutateQuantity: (cartId: number, quantity: number) => Promise<void>;
  deleteCartItem: (cartId: number) => Promise<void>;
}

function CartProductItem({ cartItem, toggleCheck, checked, mutateQuantity, deleteCartItem }: CartProductItemProps) {
  const { id, product, quantity } = cartItem;
  const { name, imageUrl, price } = product;

  const { isModalOpen, openModal, closeModal } = useModal();

  const handleDeleteButton = () => {
    openModal();
  };

  const handleUpButton = () => {
    mutateQuantity(id, quantity + 1);
  };

  const handleDownButton = () => {
    if (quantity > 1) {
      mutateQuantity(id, quantity - 1);
    }
  };

  return (
    <div className={styles.container}>
      <CheckBox changeHandler={toggleCheck} checked={checked} />
      <img src={imageUrl} alt={name} className={styles.image} />
      <div className={styles['item-info']}>
        <div className={styles['product-title']}>{name}</div>
        <div className={styles['handle-container']}>
          <button type="button" onClick={handleDeleteButton}>
            <RiDeleteBinLine />
          </button>
          <CountButton
            size="large"
            count={quantity}
            handleUpButton={handleUpButton}
            handleDownButton={handleDownButton}
          />
          <div className={styles['product-price']}>{(price * quantity).toLocaleString()} 원</div>
        </div>
      </div>
      {isModalOpen && (
        <Modal closeEvent={closeModal} direction="center">
          <ModalNotification
            message={{ title: '정말 삭제하시겠습니까?' }}
            cancelCallback={closeModal}
            assignCallback={() => deleteCartItem(id)}
          />
        </Modal>
      )}
    </div>
  );
}

export default CartProductItem;
