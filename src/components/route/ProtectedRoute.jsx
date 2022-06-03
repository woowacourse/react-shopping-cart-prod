import { Navigate, Outlet } from 'react-router-dom';

import { ROUTE } from 'constants/route';

const ProtectedRoute = ({ condition, redirectPath = ROUTE.HOME }) => {
  if (!condition) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
