import useFetch from 'hooks/useFetch';
import { METHOD } from 'constants';
import { getCookie } from 'utils/cookie';

const useWithdrawal = () => {
  const { isSucceed, isError, fetchApi } = useFetch({
    method: METHOD.DELETE,
    url: '/api/members/me',
  });

  const handleWithdrawal = () => {
    const headers = {
      Authorization: `Bearer ${getCookie('userToken')}`,
    };
    fetchApi({ payload: headers });
  };

  return {
    isSucceed,
    isError,
    handleWithdrawal,
  };
};

export default useWithdrawal;
