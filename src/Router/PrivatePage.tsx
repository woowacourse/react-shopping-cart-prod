import { useAppSelector } from 'hooks/useAppSelector';
import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from 'Router';

export default function PrivatePage() {
  const { data: userData } = useAppSelector(state => state.userReducer);

  if (Object.keys(userData).length === 0) {
    return <Navigate to={PATH.signIn} replace />;
  }

  return <Outlet />;
}
