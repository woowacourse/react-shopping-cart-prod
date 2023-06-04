import { ReactComponent as TrashBox } from '../../assets/trash-box.svg';
import CountButton from '../Common/CountButton';
import styles from './index.module.scss';
import type { CartItem } from '../../types';

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

  const handleDeleteButton = () => deleteCartItem(id);

  const handleUpButton = () => mutateQuantity(id, quantity + 1);

  const handleDownButton = () => {
    if (quantity > 1) {
      mutateQuantity(id, quantity - 1);
    }
  };

  return (
    <div className={styles['cart-item']}>
      <input type="checkbox" className={styles['check-box']} onChange={toggleCheck} checked={checked} />
      <img src={imageUrl} alt={name} className={styles.image} />
      <div className={styles['item-info']}>
        <div>
          <div className={styles['product-title']}>{name}</div>
          <button type="button" onClick={handleDeleteButton}>
            <TrashBox size={24} />
          </button>
        </div>
        <div className={styles['count-detail']}>
          <p>단일 금액 : {price} 원</p>
          <CountButton
            size="large"
            count={quantity}
            handleUpButton={handleUpButton}
            handleDownButton={handleDownButton}
          />
        </div>
        <div className={styles['product-price']}>{(price * quantity).toLocaleString()} 원</div>
      </div>
    </div>
  );
}

export default CartProductItem;
