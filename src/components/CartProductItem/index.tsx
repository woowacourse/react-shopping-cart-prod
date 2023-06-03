// import { ReactComponent as TrashBox } from 'src/assets/trash-box.svg';
import CountButton from 'src/components/Common/CountButton';
import type { CartItem } from 'src/types';
import { RiDeleteBinLine } from 'react-icons/ri';
import styles from './index.module.scss';
import CheckBox from '../Common/CheckBox';

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

  const handleDeleteButton = () => {
    deleteCartItem(id);
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
    </div>
  );
}

export default CartProductItem;
