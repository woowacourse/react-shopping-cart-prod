import useFetch from 'hooks/useFetch';
import { METHOD } from 'constants';
import { getAuthorizedHeaders } from 'api/auth';

const useModifyPassword = () => {
  const { isSucceed, isError, fetchApi } = useFetch({
    method: METHOD.PUT,
    url: '/api/members/me/password',
  });

  const modifyPassword = (oldPassword, newPassword) => {
    const headers = getAuthorizedHeaders();
    const data = { oldPassword, newPassword };

    fetchApi({ payload: { data, headers } });
  };

  return {
    isSucceed,
    isError,
    modifyPassword,
  };
};

export default useModifyPassword;
