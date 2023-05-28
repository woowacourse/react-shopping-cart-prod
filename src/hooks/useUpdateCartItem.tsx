import { Product } from '../types';
import useCart from './useCart';

interface UseUpdateCartItemProps {
  product: Product;
}

function useUpdateCartItem({ product }: UseUpdateCartItemProps) {
  const { cartList, addCartItem, mutateQuantity, deleteCartItem, loading } = useCart();
  const cart = cartList?.find(cartItem => cartItem.product.id === product.id) ?? null;

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

  return { cart, handleUpButton, handleDownButton, handleClick, loading };
}

export default useUpdateCartItem;
