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
    (serverName) =>
    ({ get }) => {
      const checked = get(checkedState(serverName));
      return get(cartProductState(serverName)).map((cartProduct) =>
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
    ({ serverName, id }: { serverName: ServerKey; id: number }) =>
    ({ get }) =>
      findTargetChecked(get(checkedState(serverName)), id),
});

export const checkedCartProductCountState = selectorFamily({
  key: 'checkedCartProductCountState',
  get:
    (serverName: ServerKey) =>
    ({ get }) =>
      filterCartProductChecked(get(checkedCartProductState(serverName)), true)
        .length,
});

export const checkedPriceState = selectorFamily({
  key: 'checkedPriceState',
  get:
    (serverName: ServerKey) =>
    ({ get }) =>
      getCheckedPrice(get(checkedCartProductState(serverName))),
});
