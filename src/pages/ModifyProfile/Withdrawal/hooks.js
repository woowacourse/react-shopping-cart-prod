import useFetch from 'hooks/useFetch';
import { METHOD } from 'constants';
import { getAuthorizedHeaders } from 'api/auth';

const useWithdrawal = () => {
  const { isSucceed, isError, fetchApi } = useFetch({
    method: METHOD.DELETE,
    url: '/api/members/me',
  });

  const handleWithdrawal = () => {
    const headers = getAuthorizedHeaders();
    fetchApi({ payload: headers });
  };

  return {
    isSucceed,
    isError,
    handleWithdrawal,
  };
};

export default useWithdrawal;
