import useAuthFetch from '../../useAuthFetch';

import { API_URL_PATH } from 'constants/api';

function useLoadUserInfo() {
  const { fetchData: loadUserInfo } = useAuthFetch({ url: API_URL_PATH.CUSTOMERS });

  return { loadUserInfo };
}

export default useLoadUserInfo;
