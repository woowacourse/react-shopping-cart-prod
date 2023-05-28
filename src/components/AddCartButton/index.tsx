import { ReactComponent as ShopIcon } from 'src/assets/mini-shop-icon.svg';
import useUpdateCartItem from 'src/hooks/useUpdateCartItem';
import { Product } from 'src/types';
import CountButton from 'src/components/Common/CountButton';
import LoadingSpinner from 'src/components/Common/LoadingSpinner';
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
