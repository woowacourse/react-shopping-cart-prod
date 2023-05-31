import { selectorFamily } from 'recoil';
import { Product, CartProduct } from '../../types/product';
import cartState from '../atoms/cartState';

const getCartStateController = selectorFamily<
  {
    add: (newCartItemId: string, quantity: number, product: Product) => void;
    set: (value: number) => void;
    delete: () => void;
  },
  string
>({
  key: 'getCartStateController',

  get:
    (cartItemId) =>
    ({ getCallback }) => {
      const addNewItem = getCallback(
        ({ set }) =>
          (newCartItemId: string, quantity: number, product: Product) => {
            const newItem: CartProduct = {
              quantity,
              product,
              id: newCartItemId,
            };

            set(cartState, (prevCart) => [...prevCart, newItem]);
          }
      );

      const setItemQuantity = getCallback(({ set }) => (newQuantity: number) => {
        set(cartState, (prevCart) => {
          const productIndex = prevCart.findIndex(({ id }) => id === cartItemId);

          if (productIndex === -1) return prevCart;

          const newCart = [...prevCart];
          newCart[productIndex] = { ...newCart[productIndex], quantity: newQuantity };

          return newCart;
        });
      });

      const deleteItem = getCallback(({ set }) => () => {
        set(cartState, (prevCart) => prevCart.filter(({ id }) => id !== cartItemId));
      });

      return {
        add: addNewItem,
        set: setItemQuantity,
        delete: deleteItem,
      };
    },
});

export default getCartStateController;
