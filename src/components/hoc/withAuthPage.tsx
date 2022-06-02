import { ALERT_MESSAGE } from 'constants/index';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'Routers';

const withAuthPage = (Component: React.ComponentType<unknown>, canAccessOnLogin: boolean) => {
  return function Wrapper({ ...props }) {
    const isLogin = useAppSelector(state => !!state.user.data);
    const navigate = useNavigate();
    const canAccess = canAccessOnLogin ? !isLogin : isLogin;

    useEffect(() => {
      if (canAccess) {
        navigate(PATH.home);
        alert(ALERT_MESSAGE.WRONG_ACCESS);
      }
    }, [isLogin]);

    if (canAccess) return null;

    return <Component {...props} />;
  };
};

export default withAuthPage;
