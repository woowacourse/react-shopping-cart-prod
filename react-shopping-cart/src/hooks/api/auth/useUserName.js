import useAuthFetch from '../../useAuthFetch';

import { API_URL_PATH } from 'constants/api';

function useUserName() {
  const { data } = useAuthFetch({
    url: `${API_URL_PATH.NAME}`,
  });

  return { name: data?.name };
}

export default useUserName;
