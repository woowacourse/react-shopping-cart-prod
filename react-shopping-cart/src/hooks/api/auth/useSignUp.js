import useFetch from '../../useFetch';

import { API_URL_PATH } from 'constants/api';

function useSignUp() {
  const { fetchData: signUp } = useFetch({
    method: 'post',
    url: API_URL_PATH.CUSTOMERS,
    skip: true,
  });

  return { signUp };
}

export default useSignUp;
