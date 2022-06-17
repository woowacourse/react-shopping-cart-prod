import useFetch from '../../useFetch';

import { API_URL_PATH } from 'constants/api';

function useLogin() {
  const { fetchData: login, error } = useFetch({
    url: API_URL_PATH.LOGIN,
    method: 'post',
    skip: true,
  });

  return { login, error };
}

export default useLogin;
