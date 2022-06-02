import { useSelector, useDispatch } from 'react-redux';
import useFetch from 'hooks/useFetch';
import { METHOD } from 'constants';
import { setCookie, getCookie, deleteCookie } from 'utils/cookie';
import { setUserInfo, setAuthenticated } from 'reducers/user/user.actions';
import { initializeUserInfo } from 'reducers/user/user.actions';

const useAuth = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const {
    isSucceed: isLoginSucceed,
    isError: isLoginError,
    fetchApi: loginApi,
  } = useFetch({
    method: METHOD.POST,
    url: '/api/auth',
    handler: (data) => {
      setCookie('userToken', data);
      dispatch(setAuthenticated({ authenticated: true }));
    },
  });

  const {
    isSucceed: isSignUpSucceed,
    isError: isSignUpError,
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
    const headers = {
      Authorization: `Bearer ${getCookie('userToken')}`,
    };
    getUserApi('', headers);
  };

  const login = (email, password) => {
    loginApi('', { email, password });
  };

  const signUp = (data) => {
    signUpApi('', data);
  };

  const logout = () => {
    deleteCookie('userToken');
    dispatch(initializeUserInfo());
  };

  return {
    user,
    isLoginSucceed,
    isLoginError,
    login,
    checkIsAuthenticated,
    isSignUpSucceed,
    isSignUpError,
    signUp,
    logout,
  };
};

export default useAuth;
