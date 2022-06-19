import { ACCESS_TOKEN_COOKIE_NAME } from 'constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import userThunk from 'store/user/thunk';

import { PAGE_LIST } from 'constants/';
import { getCookie } from 'lib/cookieUtils';

function useAuth() {
  const isLogin = useSelector(({ user }) => user.isLogin);
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userThunk.getUserProfile());
  }, []);

  useEffect(() => {
    if (isLogin === false) {
      return;
    }

    const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME);

    !accessToken && navigate(PAGE_LIST.LOGOUT);
  }, [isLogin, pathname]);

  return { isLogin };
}

export default useAuth;
