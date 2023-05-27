import { PRODUCT_PATH } from '@constants/urlConstants';

const fetchProductList = (serverUrl: string) => {
  return fetch(`${serverUrl}/${PRODUCT_PATH}`);
};

export default fetchProductList;
