import { useSetRecoilState } from 'recoil';
import cartItemsState from '../recoil/atoms/cartItemsState';
import type { Product } from '../types/Product';

const useCartOrder = () => {
  const setCartItems = useSetRecoilState(cartItemsState);

  const selectForOrder = (productId: Product['id']) =>
    setCartItems((cartItems) =>
      cartItems.map((cartItem) =>
        cartItem.product.id === productId ? { ...cartItem, checked: true } : cartItem,
      ),
    );

  const toggleForOrder = (productId: Product['id']) => {
    setCartItems((cartItems) =>
      cartItems.map((cartItem) =>
        cartItem.product.id === productId ? { ...cartItem, checked: !cartItem.checked } : cartItem,
      ),
    );
  };

  const unselectAllForOrder = () => {
    setCartItems((cartItem) => cartItem.map((cartItem) => ({ ...cartItem, checked: false })));
  };

  return {
    selectForOrder,
    toggleForOrder,
    unselectAllForOrder,
  };
};

export default useCartOrder;
