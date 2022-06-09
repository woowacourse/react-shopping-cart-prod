import { ALERT_MESSAGE } from 'constants/index';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import useUser from 'hooks/useUser';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from 'redux/user/thunk';
import { PATH } from 'Routers';

const withPrivateRoute = (Component: React.ComponentType<unknown>) => {
  return function Wrapper({ ...props }) {
    const navigate = useNavigate();

    const { isLogin } = useUser({
      onFailure: () => {
        alert(ALERT_MESSAGE.WRONG_ACCESS);
        navigate(PATH.login);
      },
      withoutToken: () => {
        alert(ALERT_MESSAGE.WRONG_ACCESS);
        navigate(PATH.login);
      },
    });

    if (!isLogin) return null;

    return <Component {...props} />;
  };
};

export default withPrivateRoute;
