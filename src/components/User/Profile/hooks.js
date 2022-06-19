import useFetch from 'hooks/useFetch';
import { METHOD } from 'constants';
import { getAuthorizedHeaders } from 'api/auth';

const useProfile = () => {
  const {
    isSucceed: isUpdateNameSucceed,
    isError: isUpdateNameError,
    fetchApi: updateNameApi,
  } = useFetch({
    method: METHOD.PUT,
    url: '/api/members/me/name',
  });

  const updateName = (name) => {
    const headers = getAuthorizedHeaders();
    updateNameApi({ payload: { headers, name } });
  };

  return { isUpdateNameSucceed, isUpdateNameError, updateName };
};

export default useProfile;
