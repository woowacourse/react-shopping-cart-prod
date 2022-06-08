import useFetch from './useFetch';
import { useSelector } from 'react-redux';

import { API_URL_PATH } from 'constants/api';

function useModifyCartQuantity(skip) {
  const { accessToken } = useSelector(state => state.auth);
  const headers = accessToken && { Authorization: `Bearer ${accessToken}` };
  const { fetchData: modifyCartQuantity } = useFetch({
    url: `${API_URL_PATH.CARTS}`,
    method: 'patch',
    headers,
    skip,
  });

  return { modifyCartQuantity };
}

export default useModifyCartQuantity;
