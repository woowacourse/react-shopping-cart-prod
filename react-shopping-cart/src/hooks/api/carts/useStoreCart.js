import useAuthFetch from '../../useAuthFetch';

import { API_URL_PATH } from 'constants/api';

function useStoreCart() {
  const { isLoading, fetchData: storeCart } = useAuthFetch({
    url: `${API_URL_PATH.CARTS}`,
    method: 'post',
    skip: true,
  });

  return { isLoading, storeCart };
}

export default useStoreCart;
