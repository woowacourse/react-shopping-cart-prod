// @ts-nocheck
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { PATHNAME } from 'utils/constants';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useSelector(state => state.authReducer);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={PATHNAME.TO_LOGIN} state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
