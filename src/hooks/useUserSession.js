import { ACCESS_TOKEN_COOKIE_NAME } from 'constants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as memberActions from 'actions/members/action';
import * as membersThunk from 'actions/members/thunk';

import { getCookie } from 'lib/cookieUtils';

function useUserSession() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(membersThunk.userProfile());
  }, []);

  if (!getCookie(ACCESS_TOKEN_COOKIE_NAME)) {
    dispatch(memberActions.userLogout());
  }
}

export default useUserSession;
