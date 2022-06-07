import { ALERT_MESSAGE } from 'constants/index';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from 'redux/user/thunk';
import { PATH } from 'Routers';

const withPublicRoute = (Component: React.ComponentType<unknown>) => {
  return function Wrapper({ ...props }) {
    const isLogin = useAppSelector(state => !!state.user.data);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const accessToken = localStorage.getItem('access-token');

      if (!accessToken) {
        setIsLoading(false);

        return;
      }

      dispatch(getUser())
        .then(() => {
          alert(ALERT_MESSAGE.WRONG_ACCESS);
          navigate(PATH.home);
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));
    }, []);

    if (isLogin || isLoading) return null;

    return <Component {...props} />;
  };
};

export default withPublicRoute;
