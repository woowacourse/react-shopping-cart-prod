import { selector } from 'recoil';
import { LocalProduct } from '../types/domain';
import { localProductsState, selectedProductsState } from './atom';
import { MIN_QUANTITY } from '../constants';

export const localProductsSelector = selector<LocalProduct[]>({
  key: 'localProductsSelector',
  get: ({ get }) =>
    get(localProductsState).filter(
      (localProduct: LocalProduct) => localProduct.quantity !== MIN_QUANTITY,
    ),
});

export const totalPriceSelector = selector<number>({
  key: 'totalPriceSelector',
  get: ({ get }) =>
    get(selectedProductsState).reduce(
      (accumulator: number, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      0,
    ),
});
