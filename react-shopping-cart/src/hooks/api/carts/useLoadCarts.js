import useAuthFetch from '../../useAuthFetch';

import { API_URL_PATH } from 'constants/api';

function useLoadCarts(skip) {
  const { data, isLoading, fetchData: loadCarts } = useAuthFetch({ url: API_URL_PATH.CARTS, skip });

  return { carts: data?.carts, isLoading, loadCarts };
}

export default useLoadCarts;
