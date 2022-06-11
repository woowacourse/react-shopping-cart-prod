import { useDispatch } from 'react-redux';
import { doHideSnackbar, doShowSnackbar } from 'modules/snackbar';
import { TIMER } from 'utils/constants';

const useSnackbar = () => {
  const dispatch = useDispatch();

  const renderSnackbar = (message, status) => {
    dispatch(doShowSnackbar({ message, status }));

    setTimeout(() => dispatch(doHideSnackbar()), TIMER.SNACKBAR_CLOSE_TIME);
  };

  return [renderSnackbar];
};

export default useSnackbar;
