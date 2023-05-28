import { ReactComponent as ShopIcon } from '../../assets/mini-shop-icon.svg';
import useUpdateCartItem from '../../hooks/useUpdateCartItem';
import { Product } from '../../types';
import CountButton from '../Common/CountButton';
import LoadingSpinner from '../Common/LoadingSpinner';
import styles from './index.module.scss';

interface AddCardButtonProps {
  product: Product;
}

function AddCartButton({ product }: AddCardButtonProps) {
  const { cart, handleUpButton, handleDownButton, handleClick, loading } = useUpdateCartItem({ product });

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className={styles.container}>
      {cart?.product.id === product.id ? (
        <CountButton
          count={cart ? cart.quantity : 0}
          handleUpButton={handleUpButton}
          handleDownButton={handleDownButton}
          size="medium"
        />
      ) : (
        <button type="button" onClick={handleClick}>
          <ShopIcon />
        </button>
      )}
    </div>
  );
}
export default AddCartButton;
