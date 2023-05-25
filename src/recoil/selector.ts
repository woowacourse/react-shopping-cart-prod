import { selectorFamily } from 'recoil';
import { $CartList, $CheckedCartIdList } from './atom';

const $CheckedCartTotalPrice = selectorFamily<number, string>({
  key: 'CheckedCartTotalPrice',
  get:
    server =>
    ({ get }) => {
      const checkedList = get($CheckedCartIdList(server));
      const cartList = get($CartList(server));

      const totalPrice = cartList.reduce((acc, { id, product, quantity }) => {
        if (checkedList.includes(id)) {
          return product.price * quantity + acc;
        }
        return acc;
      }, 0);

      return totalPrice;
    },
});

export default $CheckedCartTotalPrice;
