import { doShowSnackbar, doHideSnackbar } from 'actions/actionCreator';
import { useDispatch } from 'react-redux';

const useSnackbar = () => {
  const dispatch = useDispatch();
  const renderSnackbar = (message, status) => {
    dispatch(doShowSnackbar({ message, status }));

    setTimeout(() => dispatch(doHideSnackbar()), 3000);
  };

  return [renderSnackbar];
};

export default useSnackbar;
