import { Navigate } from 'react-router-dom';
import { ROUTES } from 'utils/constants';

const PublicRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? <Navigate to={ROUTES.HOME} /> : children;
};

export default PublicRoute;
