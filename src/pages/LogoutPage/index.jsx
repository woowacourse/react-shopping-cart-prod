import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import userThunk from 'store/user/thunk';

import { PAGE_LIST } from 'constants/';

export function LogoutPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userThunk.userLogout());
  }, []);

  return <Navigate to={PAGE_LIST.HOME} />;
}
export default LogoutPage;
