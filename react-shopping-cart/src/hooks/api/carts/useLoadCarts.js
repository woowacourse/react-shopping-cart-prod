import useAuthFetch from '../../useAuthFetch';

import { API_URL_PATH } from 'constants/api';

function useLoadCarts() {
  const { data, isLoading, fetchData: loadCarts } = useAuthFetch({ url: API_URL_PATH.CARTS });

  return { carts: data?.carts, isLoading, loadCarts };
}

export default useLoadCarts;
