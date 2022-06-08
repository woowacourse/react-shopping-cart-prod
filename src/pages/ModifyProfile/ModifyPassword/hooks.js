import useFetch from 'hooks/useFetch';
import { METHOD } from 'constants';

const useModifyPassword = () => {
  const { isSucceed, isError, fetchApi } = useFetch({
    method: METHOD.PUT,
    url: '/api/members/me/password',
  });

  const modifyPassword = (oldPassword, newPassword) => {
    const data = { oldPassword, newPassword };

    fetchApi({ payload: { ...data } });
  };

  return {
    isSucceed,
    isError,
    modifyPassword,
  };
};

export default useModifyPassword;
