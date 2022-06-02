import useFetch from 'hooks/useFetch';
import { METHOD } from 'constants';

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
    updateNameApi('', name);
  };

  return { isUpdateNameSucceed, isUpdateNameError, updateName };
};

export default useProfile;
