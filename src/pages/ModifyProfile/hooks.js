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

  const updatePassword = (oldPassword, newPassword) => {
    updatePasswordApi({ payload: { oldPassword, newPassword } });
  };

  return {
    isUpdatePasswordSucceed,
    isUpdatePasswordError,
    updatePassword,
  };
};

export default useModifyProfilePage;
