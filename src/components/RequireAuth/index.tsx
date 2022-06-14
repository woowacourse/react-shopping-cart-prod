// @ts-nocheck
import useAuth from 'hooks/domain/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { PATHNAME } from 'utils/constants';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={PATHNAME.TO_LOGIN} state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
