import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectUserState, UserState } from 'redux/modules/user';

function AuthRoute() {
  const { isLoggedIn }: UserState = useSelector(selectUserState);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export default AuthRoute;
