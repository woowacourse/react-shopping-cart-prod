// @ts-nocheck
import { useDispatch, useSelector } from 'react-redux';
import { doHideSnackbar, doShowSnackbar } from 'modules/snackbar';
import { TIMER } from 'utils/constants';

const useSnackbar = () => {
  const dispatch = useDispatch();
  const { isSnackbarVisible, message, status } = useSelector(state => state.snackbarReducer);

  const renderSnackbar = (message, status) => {
    dispatch(doShowSnackbar({ message, status }));

    setTimeout(() => dispatch(doHideSnackbar()), TIMER.SNACKBAR_CLOSE_TIME);
  };

  return { renderSnackbar, isSnackbarVisible, message, status };
};

export default useSnackbar;
