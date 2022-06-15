import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { hideSnackbar, showSnackbar } from 'reducers/snackbarReducer';

const useSnackbar = () => {
  const dispatch = useDispatch();
  const renderSnackbar = useCallback(
    (message: string, status: 'SUCCESS' | 'FAILED') => {
      dispatch(showSnackbar({ message, status }));

      setTimeout(() => dispatch(hideSnackbar()), 3000);
    },
    [dispatch],
  );

  return [renderSnackbar];
};

export default useSnackbar;
