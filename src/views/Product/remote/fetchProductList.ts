import { BASE_URL, PRODUCT_PATH } from '@constants/urlConstants';
import { createApiRequests } from '@utils/createApiRequests';

const fetchProductList = (serverUrl: string) => {
  return fetch(`${serverUrl}/${PRODUCT_PATH}`);
};

export default fetchProductList;
