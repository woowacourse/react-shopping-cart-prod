import { useRecoilCallback } from 'recoil';
import cartItemsState from '../recoil/atoms/cartItemsState';
import type { Product } from '../types/Product';

const useCartActions = () => {
  const setQuantity = useRecoilCallback(({ set }) => (product: Product, quantity: number) => {
    set(cartItemsState, (cartItems) => {
      const cartItem = cartItems.find((cartItem) => cartItem.product.id === product.id) ?? null;

      return cartItem === null
        ? [...cartItems, { product, quantity, checked: true }]
        : cartItems.map((it) => (it.product.id === cartItem.product.id ? { ...it, quantity } : it));
    });
  });

  const deleteCartItems = useRecoilCallback(({ set }) => (productIds: Array<Product['id']>) => {
    set(cartItemsState, (cartItems) =>
      cartItems.filter((cartItem) => !productIds.includes(cartItem.product.id)),
    );
  });

  const setChecked = useRecoilCallback(
    ({ set }) =>
      (productId: Product['id'], checked: boolean) =>
        set(cartItemsState, (cartItems) =>
          cartItems.map((cartItem) =>
            cartItem.product.id === productId ? { ...cartItem, checked } : cartItem,
          ),
        ),
  );

  return { setQuantity, deleteCartItems, setChecked };
};

export default useCartActions;
