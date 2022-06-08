import useFetch from 'hooks/useFetch';
import { METHOD } from 'constants';
import { getAuthorizedHeaders } from 'api/auth';
import { deleteCookie } from 'utils/cookie';
import { useEffect } from 'react';
import { setAuthenticated } from 'reducers/user/user.actions';
import { useDispatch } from 'react-redux';

const useWithdrawal = () => {
  const dispatch = useDispatch();
  const { isSucceed, isError, fetchApi } = useFetch({
    method: METHOD.DELETE,
    url: '/api/members/me',
  });

  const handleWithdrawal = () => {
    const headers = getAuthorizedHeaders();
    fetchApi({ payload: headers });
  };

  useEffect(() => {
    deleteCookie();
    dispatch(setAuthenticated({ authenticated: false }));
  }, [isSucceed]);

  return {
    isSucceed,
    isError,
    handleWithdrawal,
  };
};

export default useWithdrawal;
