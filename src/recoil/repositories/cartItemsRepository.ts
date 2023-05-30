import { selector } from 'recoil';
import type { CartItem } from '../../types/CartItem';
import type { Product } from '../../types/Product';
import cartItemsState from '../atoms/cartItemsState';

type CartItemsRepository = {
  getCartItems(): CartItem[];
  getCheckedCartItems(): CartItem[];
  getCartItemByProductId(productId: Product['id']): CartItem | null;
  addCartItem(cartItem: CartItem): void;
  addCartItemByProduct(product: Product): void;
  setQuantity(product: Product, quantity: CartItem['quantity']): void;
  setChecked(cartItem: CartItem, checked: CartItem['checked']): void;
  removeCartItem(cartItem: CartItem): void;
  removeCartItemByProductId(productId: Product['id']): void;
  removeCheckedCartItem(): void;
};

const cartItemsRepository = selector<CartItemsRepository>({
  key: 'cartItemsRepository',
  get: ({ get, getCallback }) => {
    const cartItems = get(cartItemsState);

    return {
      getCartItems() {
        return cartItems;
      },
      getCheckedCartItems() {
        return cartItems.filter((cartItem) => cartItem.checked);
      },
      getCartItemByProductId(productId) {
        return cartItems.find((cartItem) => cartItem.product.id === productId) ?? null;
      },
      addCartItem: getCallback(({ set }) => (cartItem) => {
        set(cartItemsState, (cartItems) => [...cartItems, cartItem]);
      }),
      addCartItemByProduct: getCallback(({ set }) => (product) => {
        set(cartItemsState, (cartItems) => [
          ...cartItems,
          {
            checked: true,
            product,
            quantity: 1,
          },
        ]);
      }),
      setQuantity: getCallback(({ set }) => (product, quantity) => {
        set(cartItemsState, (cartItems) => {
          const cartItem = cartItems.find((cartItem) => cartItem.product.id === product.id) ?? null;

          return cartItem === null
            ? [...cartItems, { product, quantity, checked: true }]
            : cartItems.map((it) =>
                it.product.id === cartItem.product.id ? { ...it, quantity } : it,
              );
        });
      }),
      setChecked: getCallback(({ set }) => (cartItem, checked) => {
        set(cartItemsState, (cartItems) =>
          cartItems.map((it) => (it.product.id === cartItem.product.id ? { ...it, checked } : it)),
        );
      }),
      removeCartItem: getCallback(({ set }) => (cartItem) => {
        set(cartItemsState, (cartItems) =>
          cartItems.filter((it) => it.product.id !== cartItem.product.id),
        );
      }),
      removeCartItemByProductId: getCallback(({ set }) => (productId) => {
        set(cartItemsState, (cartItems) =>
          cartItems.filter((cartItem) => cartItem.product.id !== productId),
        );
      }),
      removeCheckedCartItem: getCallback(({ set }) => () => {
        set(cartItemsState, (cartItems) => cartItems.filter((cartItem) => cartItem.checked));
      }),
    };
  },
});

export default cartItemsRepository;
