import { ACCESS_TOKEN_COOKIE_NAME } from 'constants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

<<<<<<< HEAD
import userActions from 'store/user/action';
=======
import * as memberActions from 'actions/members/action';
>>>>>>> 68aa226472f257aae4442d058ba944e087c68854

import { removeCookie } from 'lib/cookieUtils';

export function LogoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    removeCookie(ACCESS_TOKEN_COOKIE_NAME);

<<<<<<< HEAD
    dispatch(userActions.removeInfo());
=======
    dispatch(memberActions.userLogout());
>>>>>>> 68aa226472f257aae4442d058ba944e087c68854
    navigate('/');
  }, []);

  return <></>;
}
export default LogoutPage;
