import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { snackbar } from 'actions/snackbar';
import { 알림_메시지 } from 'constants/';
import { useEffect } from 'react';

const Auth = ({ element }) => {
  const dispatch = useDispatch();
  const { userId: isLogin } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLogin) {
      dispatch(snackbar.pushMessageSnackbar(알림_메시지.권한_없음));
    }
  }, [dispatch, isLogin]);

  if (isLogin) {
    return element;
  }

  return <Navigate replace to="/login" />;
};

export default Auth;
