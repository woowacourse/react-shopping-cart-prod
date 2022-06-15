import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { doHideSnackbar, doShowSnackbar } from 'reducers/snackbarReducer';

const useSnackbar = () => {
  const dispatch = useDispatch();
  const renderSnackbar = useCallback(
    (message, status) => {
      dispatch(doShowSnackbar({ message, status }));

      setTimeout(() => dispatch(doHideSnackbar()), 3000);
    },
    [dispatch],
  );

  return [renderSnackbar];
};

export default useSnackbar;
