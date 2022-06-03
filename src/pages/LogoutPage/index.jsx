import { ACCESS_TOKEN_COOKIE_NAME } from 'constants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as memberActions from 'actions/members/action';

import { removeCookie } from 'lib/cookieUtils';

export function LogoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    removeCookie(ACCESS_TOKEN_COOKIE_NAME);

    dispatch(memberActions.userLogout());
    navigate('/');
  }, []);

  return <></>;
}
export default LogoutPage;
