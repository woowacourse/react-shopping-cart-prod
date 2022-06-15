import { ALERT_MESSAGE } from 'constants/index';
import useUser from 'hooks/useUser';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'Routers';

const withNonLoginOnly = (Component: React.ComponentType<unknown>) => {
  return function Wrapper({ ...props }) {
    const navigate = useNavigate();

    const { isLogin } = useUser({
      onSuccess: () => {
        alert(ALERT_MESSAGE.WRONG_ACCESS);
        navigate(PATH.home);
      },
    });

    if (isLogin) return null;

    return <Component {...props} />;
  };
};

export default withNonLoginOnly;
