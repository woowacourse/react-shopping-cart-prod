import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { onMessage } from 'reducers/snackbar';

import { SNACKBAR_MESSAGE, PATH } from 'constants';

const PrivateRoute = ({ children, path = PATH.LOGIN, showMessage = true }) => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const showRealMessage = async () => {
      await dispatch(onMessage(SNACKBAR_MESSAGE.noAuth()));
    };
    accessToken || (showMessage && showRealMessage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (accessToken) {
    return children;
  }

  return <Navigate to={path} state={{ from: location }} replace={true} />;
};

export default PrivateRoute;
