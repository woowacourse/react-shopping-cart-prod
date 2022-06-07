import { ALERT_MESSAGE } from 'constants/index';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from 'redux/user/thunk';
import { PATH } from 'Routers';

const withPrivateRoute = (Component: React.ComponentType<unknown>) => {
  return function Wrapper({ ...props }) {
    const isLogin = useAppSelector(state => !!state.user.data);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      const accessToken = localStorage.getItem('access-token');

      if (!accessToken) {
        alert(ALERT_MESSAGE.WRONG_ACCESS);
        navigate(PATH.login);

        return;
      }

      if (isLogin) return;
      dispatch(getUser()).catch(() => {
        alert(ALERT_MESSAGE.WRONG_ACCESS);
        navigate(PATH.login);
      });
    }, []);

    if (!isLogin) return null;

    return <Component {...props} />;
  };
};

export default withPrivateRoute;
