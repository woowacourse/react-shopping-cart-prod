import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { onMessage } from 'reducers/snackbar';

import { SNACKBAR_MESSAGE, PATH } from 'constants';

const PrivateRoute = ({ children, path = PATH.LOGIN, showMessage = true }) => {
  const { accessToken } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const showRealMessage = () => {
      dispatch(onMessage(SNACKBAR_MESSAGE.noAuth()));
    };
    accessToken || (showMessage && showRealMessage());
  }, []);

  if (accessToken) {
    return children;
  }

  return <Navigate to={path} state={{ from: location }} replace />;
};

export default PrivateRoute;
