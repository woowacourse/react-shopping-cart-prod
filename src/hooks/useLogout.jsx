import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from 'store/actions/user.action';

import { ROUTE } from 'constants/route';

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate(ROUTE.HOME);
  };

  return handleLogout;
};

export default useLogout;
