import { ReactComponent as ShopIcon } from '../../assets/mini-shop-icon.svg';
import useCart from '../../hooks/useCart';
import { Product } from '../../types';
import CountButton from '../Common/CountButton';
import LoadingSpinner from '../Common/LoadingSpinner';
import styles from './index.module.scss';

interface AddCardButtonProps {
  product: Product;
}

function AddCartButton({ product }: AddCardButtonProps) {
  const { cartList, addCartItem, mutateQuantity, deleteCartItem, loading } = useCart();
  const cart = cartList?.find(cartItem => cartItem.product.id === product.id);

  const handleClick = async () => {
    await addCartItem(product);
  };

  const handleUpButton = async () => {
    if (cart) {
      await mutateQuantity(cart.id, cart.quantity + 1);
    }
  };

  const handleDownButton = async () => {
    if (cart) {
      if (cart.quantity <= 1) {
        await deleteCartItem(cart.id);
        return;
      }
      await mutateQuantity(cart.id, cart.quantity - 1);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
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
