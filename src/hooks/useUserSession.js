import { ACCESS_TOKEN_COOKIE_NAME } from 'constants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

<<<<<<< HEAD
import userActions from 'store/user/action';
import userThunk from 'store/user/thunk';
=======
import * as memberActions from 'actions/members/action';
import * as membersThunk from 'actions/members/thunk';
>>>>>>> 68aa226472f257aae4442d058ba944e087c68854

import { getCookie } from 'lib/cookieUtils';

function useUserSession() {
  const dispatch = useDispatch();

  useEffect(() => {
<<<<<<< HEAD
    dispatch(userThunk.getUserProfile());
  }, []);

  if (!getCookie(ACCESS_TOKEN_COOKIE_NAME)) {
    dispatch(userActions.removeInfo());
=======
    dispatch(membersThunk.userProfile());
  }, []);

  if (!getCookie(ACCESS_TOKEN_COOKIE_NAME)) {
    dispatch(memberActions.userLogout());
>>>>>>> 68aa226472f257aae4442d058ba944e087c68854
  }
}

export default useUserSession;
