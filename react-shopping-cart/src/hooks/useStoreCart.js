import useFetch from './useFetch';
import { useSelector } from 'react-redux';

import { API_URL_PATH } from 'constants/api';

function useStoreCart(skip) {
  const { accessToken } = useSelector(state => state.auth);
  const headers = accessToken && { Authorization: `Bearer ${accessToken}` };
  const { isLoading, fetchData: storeCart } = useFetch({
    url: `${API_URL_PATH.CARTS}`,
    method: 'post',
    headers,
    skip,
  });

  return { isLoading, storeCart };
}

export default useStoreCart;
