import useFetch from 'hooks/useFetch';
import { METHOD } from 'constants';

const useModifyPassword = () => {
  const { isSucceed, isError, fetchApi } = useFetch({
    method: METHOD.PUT,
    url: '/api/members/me/password',
  });

  const modifyPassword = (oldPassword, newPassword) => {
    fetchApi({ payload: { oldPassword, newPassword } });
  };

  return {
    isSucceed,
    isError,
    modifyPassword,
  };
};

export default useModifyPassword;
