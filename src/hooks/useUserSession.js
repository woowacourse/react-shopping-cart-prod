import { ACCESS_TOKEN_COOKIE_NAME } from 'constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import userActions from 'store/user/action';
import userThunk from 'store/user/thunk';

import { getCookie } from 'lib/cookieUtils';

function useUserSession() {
  const isLogin = useSelector(({ user }) => user.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userThunk.getUserProfile());
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    if (isLogin === true && !getCookie(ACCESS_TOKEN_COOKIE_NAME)) {
      dispatch(userActions.removeInfo());
    }
  }, [isLogin, pathname]);
}

export default useUserSession;
