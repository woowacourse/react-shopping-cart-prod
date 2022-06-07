import { useSelector, useDispatch } from 'react-redux';
import useFetch from 'hooks/useFetch';
import { METHOD } from 'constants';
import { setCookie, deleteCookie } from 'utils/cookie';
import { setUserInfo, setAuthenticated } from 'reducers/user/user.actions';
import { initializeUserInfo } from 'reducers/user/user.actions';
import { getAuthorizedHeaders } from 'api/auth';

const useAuthentication = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const {
    isSucceed: isLoginSucceed,
    isError: isLoginError,
    errorMessage: loginErrorMessage,
    fetchApi: loginApi,
  } = useFetch({
    method: METHOD.POST,
    url: '/api/auth',
    handler: (data) => {
      setCookie('userToken', data.accessToken);
      dispatch(setAuthenticated({ authenticated: true }));
    },
  });

  const {
    isSucceed: isSignUpSucceed,
    isError: isSignUpError,
    errorMessage: signUpErrorMessage,
    fetchApi: signUpApi,
  } = useFetch({
    method: METHOD.POST,
    url: '/api/members',
  });

  const { fetchApi: getUserApi } = useFetch({
    method: METHOD.GET,
    url: '/api/members/me',
    handler: (data) => dispatch(setUserInfo(data)),
  });

  const checkIsAuthenticated = () => {
    const headers = getAuthorizedHeaders();
    getUserApi({ payload: { headers } });
  };

  const login = (email, password) => {
    loginApi({ payload: { email, password } });
  };

  const signUp = (data) => {
    signUpApi({ payload: data });
  };

  const logout = () => {
    deleteCookie('userToken');
    dispatch(initializeUserInfo());
  };

  return {
    user,
    isLoginSucceed,
    isLoginError,
    loginErrorMessage,
    login,
    checkIsAuthenticated,
    isSignUpSucceed,
    isSignUpError,
    signUpErrorMessage,
    signUp,
    logout,
  };
};

export default useAuthentication;
