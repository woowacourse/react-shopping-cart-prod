import useAuthFetch from '../../useAuthFetch';

import { API_URL_PATH } from 'constants/api';

function useDeleteCarts() {
  const { isLoading, fetchData: deleteCarts } = useAuthFetch({
    url: API_URL_PATH.CARTS,
    method: 'delete',
    skip: true,
  });

  return { isLoading, deleteCarts };
}

export default useDeleteCarts;
