import { Navigate, Outlet } from 'react-router-dom';

import PATH from 'constants/path';
import { isLogin } from 'utils/auth';

function PrivateLayout() {
  return isLogin() ? <Outlet /> : <Navigate to={PATH.LOGIN} replace />;
}

export default PrivateLayout;
