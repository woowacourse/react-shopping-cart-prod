import { ROUTE } from 'constants/route';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ condition, redirectPath = ROUTE.HOME }) => {
  if (!condition) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
