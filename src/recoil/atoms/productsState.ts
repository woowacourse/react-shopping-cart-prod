import { atom, selector } from 'recoil';

import { Product } from '@Types/index';

import { fetchData } from '@Utils/api';

import { FETCH_METHOD, FETCH_URL } from '@Constants/index';

const productsStateSelector = selector({
  key: 'productsStateSelector',

  get: () => {
    return fetchData<Product[]>({ url: FETCH_URL.products, method: FETCH_METHOD.GET });
  },
});

const productsState = atom<Product[]>({
  key: 'productsState',
  default: productsStateSelector,
});

export default productsState;
