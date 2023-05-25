import { useSetRecoilState } from 'recoil';
import cartItemsState from '../recoil/atoms/cartItemsState';
import type { Product } from '../type';

const useCartOrder = () => {
  const setCartItems = useSetRecoilState(cartItemsState);

  const selectForOrder = (productId: Product['id']) =>
    setCartItems((cartItems) =>
      cartItems.map((cartItem) =>
        cartItem.product.id === productId ? { ...cartItem, unselectedForOrder: false } : cartItem,
      ),
    );

  const toggleForOrder = (productId: Product['id']) => {
    setCartItems((cartItems) =>
      cartItems.map((cartItem) =>
        cartItem.product.id === productId
          ? { ...cartItem, unselectedForOrder: !cartItem.unselectedForOrder }
          : cartItem,
      ),
    );
  };

  const unselectAllForOrder = () => {
    setCartItems((cartItem) =>
      cartItem.map((cartItem) => ({ ...cartItem, unselectedForOrder: true })),
    );
  };

  return {
    selectForOrder,
    toggleForOrder,
    unselectAllForOrder,
  };
};

export default useCartOrder;
