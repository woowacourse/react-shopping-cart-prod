import { useSetRecoilState } from 'recoil';
import cartItemsState from '../recoil/atoms/cartItemsState';
import type { CartItem, Product } from '../type';

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

  const handleEnableAll = (cartItems: CartItem[], allSelected: boolean) => () => {
    if (allSelected) {
      unselectAllForOrder();
      return;
    }
    cartItems.forEach((cartItem) => selectForOrder(cartItem.product.id));
  };

  return {
    toggleForOrder,
    unselectAllForOrder,
    handleEnableAll,
  };
};

export default useCartOrder;
