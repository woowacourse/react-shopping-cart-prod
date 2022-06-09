import { Navigate, Outlet } from 'react-router-dom';
import routes from '@/routes';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

function ProtectRoute() {
  const { isLoggedIn } = useSelector((state: RootState) => state.customer);

  if (!isLoggedIn) {
    return <Navigate to={routes.login} replace />;
  }

  return <Outlet />;
}

export default ProtectRoute;
