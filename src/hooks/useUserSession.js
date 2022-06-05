import { ACCESS_TOKEN_COOKIE_NAME } from 'constants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import userActions from 'store/user/action';
import userThunk from 'store/user/thunk';

import { getCookie } from 'lib/cookieUtils';

function useUserSession() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userThunk.getUserProfile());
  }, []);

  if (!getCookie(ACCESS_TOKEN_COOKIE_NAME)) {
    dispatch(userActions.removeInfo());
  }
}

export default useUserSession;
