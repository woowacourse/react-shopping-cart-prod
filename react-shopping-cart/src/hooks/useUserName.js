import useFetch from './useFetch';
import { useSelector } from 'react-redux';

import { API_URL_PATH } from 'constants/api';

function useUserName() {
  const { accessToken } = useSelector(state => state.auth);
  const { data: name } = useFetch({
    url: `${API_URL_PATH.NAME}`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return name;
}

export default useUserName;
