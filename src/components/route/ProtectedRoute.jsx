import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ condition, redirectPath = '/' }) => {
  if (!condition) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
