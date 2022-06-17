import useAuthFetch from '../../useAuthFetch';

import { API_URL_PATH } from 'constants/api';

function useModifyUserInfo() {
  const { fetchData: modifyUserInfo } = useAuthFetch({
    url: API_URL_PATH.CUSTOMERS,
    method: 'put',
    skip: true,
  });
  return { modifyUserInfo };
}

export default useModifyUserInfo;
