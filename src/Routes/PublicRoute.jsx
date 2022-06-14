import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { onMessage } from 'reducers/snackbar';

import { PATH, SNACKBAR_MESSAGE } from 'constants';

const PublicRoute = ({ children }) => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    accessToken && dispatch(onMessage(SNACKBAR_MESSAGE.allReadyLogin()));
  }, []);

  if (accessToken) {
    return <Navigate to={PATH.HOME} state={{ from: location }} replace />;
  }

  return children;
};

export default PublicRoute;
