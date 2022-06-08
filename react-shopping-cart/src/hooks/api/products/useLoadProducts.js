import useAuthFetch from '../../useAuthFetch';

import { API_URL_PATH } from 'constants/api';

function useLoadProducts() {
  const { data, isLoading, fetchData: loadProducts } = useAuthFetch({ url: API_URL_PATH.PRODUCTS });

  return { products: data?.products, isLoading, loadProducts };
}

export default useLoadProducts;
