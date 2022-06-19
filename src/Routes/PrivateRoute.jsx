import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { onMessage } from 'reducers/snackbar';

import { SNACKBAR_MESSAGE, PATH } from 'constants';
import { clearToken, getUser } from 'service';
import { withdraw } from 'reducers/user';

const PrivateRoute = ({ children, path = PATH.LOGIN, showMessage = true }) => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    accessToken ||
      (showMessage && dispatch(onMessage(SNACKBAR_MESSAGE.noAuth())));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const verifyUser = async () => {
      try {
        accessToken && (await getUser());
      } catch (e) {
        dispatch(withdraw());
        clearToken();
        dispatch(onMessage(SNACKBAR_MESSAGE.expiredAuth()));
      }
    };
    verifyUser();
  }, []);

  if (accessToken) {
    return children;
  }

  return <Navigate to={path} state={{ from: location }} replace={true} />;
};

export default PrivateRoute;
