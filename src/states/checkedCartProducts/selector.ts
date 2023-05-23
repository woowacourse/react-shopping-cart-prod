import { selectorFamily } from 'recoil';

import { checkedState } from './atom';
import { cartProductState } from '../cartProducts';
import {
  filterCartProductChecked,
  findTargetChecked,
  getCheckedPrice,
  updateCartProductChecked,
} from './utils';
import type { CartProductWithChecked } from './type';
import { ServerKey } from '../../constants/server';

export const checkedCartProductState = selectorFamily<
  CartProductWithChecked[],
  ServerKey
>({
  key: 'checkedCartProductState',
  get:
    (name) =>
    ({ get }) => {
      const checked = get(checkedState(name));
      return get(cartProductState(name)).map((cartProduct) =>
        updateCartProductChecked(
          cartProduct,
          findTargetChecked(checked, cartProduct.id)?.isChecked ?? false
        )
      );
    },
});

export const targetCheckedState = selectorFamily({
  key: 'targetCheckedState',
  get:
    ({ name, id }: { name: ServerKey; id: number }) =>
    ({ get }) =>
      findTargetChecked(get(checkedState(name)), id),
});

export const checkedCartProductCountState = selectorFamily({
  key: 'checkedCartProductCountState',
  get:
    (name: ServerKey) =>
    ({ get }) =>
      filterCartProductChecked(get(checkedCartProductState(name)), true).length,
});

export const checkedPriceState = selectorFamily({
  key: 'checkedPriceState',
  get:
    (name: ServerKey) =>
    ({ get }) =>
      getCheckedPrice(get(checkedCartProductState(name))),
});
