import { ALERT_MESSAGE } from 'constants/index';
import useUser from 'hooks/useUser';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'Routers';

const withLoginOnly = (Component: React.ComponentType<unknown>) => {
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

export default withLoginOnly;
