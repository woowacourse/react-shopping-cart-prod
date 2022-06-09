// @ts-nocheck
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';
import { MESSAGE, ROUTES } from 'utils/constants';

const useCheckAuth = isFulfilled => {
  const [renderSnackbar] = useSnackbar();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useSelector(state => state.authReducer);

  useEffect(() => {
    if (!isFulfilled && !isLoading && isAuthenticated) {
      renderSnackbar(MESSAGE.ALREADY_LOGIN, 'FAILED');
      navigate(ROUTES.HOME);
    }
  }, [isAuthenticated, isFulfilled, isLoading, navigate, renderSnackbar]);
};

export default useCheckAuth;
