import useFetch from 'hooks/useFetch';
import { METHOD } from 'constants';

const useModifyProfilePage = () => {
  const {
    isSucceed: isUpdatePasswordSucceed,
    isError: isUpdatePasswordError,
    fetchApi: updatePasswordApi,
  } = useFetch({
    method: METHOD.PUT,
    url: '/api/members/me/password',
  });

  const {
    isSucceed: isUnregisterSucceed,
    isError: isUnregisterError,
    fetchApi: unregisterApi,
  } = useFetch({
    method: METHOD.DELETE,
    url: '/api/members/me',
  });

  const updatePassword = (oldPassword, newPassword) => {
    updatePasswordApi({ payload: { oldPassword, newPassword } });
  };

  const unregister = (password) => {
    unregisterApi({ payload: password });
  };
  return {
    isUpdatePasswordSucceed,
    isUpdatePasswordError,
    updatePassword,
    isUnregisterSucceed,
    isUnregisterError,
    unregister,
  };
};

export default useModifyProfilePage;
