import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { ROUTES_PATH } from '../constants';

function RequireAuth({ children }) {
  const accessToken = useSelector(({ user }) => user.accessToken);

  if (!accessToken) {
    return <Navigate to={ROUTES_PATH.LOGIN} replace></Navigate>;
  }

  return children;
}

export default RequireAuth;
