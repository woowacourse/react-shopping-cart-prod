import useFetch from './useFetch';
import { useSelector } from 'react-redux';

import { API_URL_PATH } from 'constants/api';

function useDeleteCarts(skip) {
  const { accessToken } = useSelector(state => state.auth);
  const headers = accessToken && { Authorization: `Bearer ${accessToken}` };
  const { isLoading, fetchData: deleteCarts } = useFetch({
    url: API_URL_PATH.CARTS,
    method: 'delete',
    headers,
    skip,
  });

  return { isLoading, deleteCarts };
}

export default useDeleteCarts;
