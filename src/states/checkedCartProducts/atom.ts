import { atomFamily, selectorFamily } from 'recoil';

import { cartProductState } from '../cartProducts';
import { ServerKey } from '../../constants/server';
import { CheckedState } from './type';

export const checkedState = atomFamily<CheckedState[], ServerKey>({
  key: 'checkedState',
  default: selectorFamily({
    key: 'checkedState/default',
    get:
      (name) =>
      ({ get }) =>
        get(cartProductState(name)).map((cartProduct) => ({
          id: cartProduct.id,
          isChecked: false,
        })),
  }),
});
