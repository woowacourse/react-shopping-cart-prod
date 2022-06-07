import { Navigate } from 'react-router-dom';
import { ROUTES_PATH, STORAGE_KEY } from '../constants';

function RequireAuth({ children }) {
  const accessToken = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!accessToken) {
    return <Navigate to={ROUTES_PATH.LOGIN} replace></Navigate>;
  }

  return children;
}

export default RequireAuth;
