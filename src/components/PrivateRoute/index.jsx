import { Navigate } from 'react-router-dom';
import { ROUTES } from 'utils/constants';

const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} />;
};

export default PrivateRoute;
