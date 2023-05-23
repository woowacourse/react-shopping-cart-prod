import { atom, selector } from 'recoil';

import { Product } from '@Types/index';

import { ERROR_MESSAGE, FETCH_URL } from '@Constants/index';

const fetchData = async (url: string) => {
  const response = await fetch(url);

  if (response.status === 400) throw new Error(ERROR_MESSAGE[400]);
  if (response.status === 401) throw new Error(ERROR_MESSAGE[401]);
  if (response.status === 403) throw new Error(ERROR_MESSAGE[403]);
  if (response.status === 404) throw new Error(ERROR_MESSAGE[404]);

  if (response.status === 500) throw new Error(ERROR_MESSAGE[500]);

  return await response.json();
};

const productsStateSelector = selector({
  key: 'productsStateSelector',

  get: () => {
    return fetchData(FETCH_URL.products);
  },
});

const productsState = atom<Product[]>({
  key: 'productsState',
  default: productsStateSelector,
});

export default productsState;
