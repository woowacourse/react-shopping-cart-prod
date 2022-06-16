// @ts-nocheck
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';
import { MESSAGE, ROUTES } from 'utils/constants';

const useCheckAuth = () => {
  const [renderSnackbar] = useSnackbar();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useSelector(state => state.authReducer);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      renderSnackbar(MESSAGE.ALREADY_LOGIN, 'FAILED');
      navigate(ROUTES.HOME);
    }
  }, [isAuthenticated, isLoading, navigate, renderSnackbar]);
};

export default useCheckAuth;
