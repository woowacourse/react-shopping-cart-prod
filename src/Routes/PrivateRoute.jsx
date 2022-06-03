import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { onMessage } from 'reducers/snackbar';

import { SNACKBAR_MESSAGE, PATH } from 'constants';

const PrivateRoute = ({ children, path = PATH.LOGIN, showMessage = true }) => {
  const { accessToken } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();

  if (accessToken) {
    return children;
  }

  showMessage && dispatch(onMessage(SNACKBAR_MESSAGE.noAuth()));
  return <Navigate to={path} state={{ from: location }} replace />;
};

export default PrivateRoute;
