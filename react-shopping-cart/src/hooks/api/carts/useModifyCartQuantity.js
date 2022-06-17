import useAuthFetch from '../../useAuthFetch';

import { API_URL_PATH } from 'constants/api';

function useModifyCartQuantity() {
  const { fetchData: modifyCartQuantity } = useAuthFetch({
    url: `${API_URL_PATH.CARTS}`,
    method: 'patch',
    skip: true,
  });

  return { modifyCartQuantity };
}

export default useModifyCartQuantity;
