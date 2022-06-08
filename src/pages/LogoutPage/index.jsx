import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import userActions from 'store/user/action';

import { PAGE_LIST } from 'constants/';

export function LogoutPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.removeInfo());
  }, []);

  return <Navigate to={PAGE_LIST.HOME} />;
}
export default LogoutPage;
