import useFetch from '../../useFetch';

import { API_URL_PATH } from 'constants/api';

function useValidateEmail() {
  const { fetchData: checkValidEmail } = useFetch({
    url: API_URL_PATH.EMAIL_VALIDATE,
    method: 'post',
    skip: true,
  });

  return { checkValidEmail };
}

export default useValidateEmail;
