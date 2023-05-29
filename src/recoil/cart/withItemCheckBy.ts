import { selectorFamily } from 'recoil';
import { toggleSelectCartItem } from '@utils/cart/cart';
import cartState from './cartState';

const withItemCheckBy = selectorFamily<boolean, number>({
  key: 'cartItemCheckedState',
  get:
    (id) =>
    ({ get }) => {
      const cart = get(cartState);
      const cartItem = cart.find((cartItem) => cartItem.id === id);

      if (!cartItem) {
        throw new Error('장바구니 아이템을 찾을 수 없습니다. - withItemCheckBy');
      }

      return cartItem.isSelect;
    },

  set:
    (id) =>
    ({ get, set }) => {
      const cart = get(cartState);
      const updatedCart = toggleSelectCartItem({ cart, cartId: id });
      set(cartState, updatedCart);
    },
});

export default withItemCheckBy;
