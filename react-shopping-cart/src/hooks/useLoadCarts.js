import useFetch from './useFetch';
import { useSelector } from 'react-redux';

import { API_URL_PATH } from 'constants/api';

function useLoadCarts(skip) {
  const { accessToken } = useSelector(state => state.auth);
  const headers = accessToken && { Authorization: `Bearer ${accessToken}` };
  const {
    data,
    isLoading,
    fetchData: loadCarts,
  } = useFetch({ url: API_URL_PATH.CARTS, headers, skip });

  return { carts: data?.carts, isLoading, loadCarts };
}

export default useLoadCarts;
