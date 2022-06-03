import store from 'store/store';
import { doShowSnackbar, doHideSnackbar } from 'actions/actionCreator';

const useSnackbar = () => {
  const renderSnackbar = (message, status) => {
    store.dispatch(doShowSnackbar({ message, status }));

    setTimeout(() => store.dispatch(doHideSnackbar()), 3000);
  };

  return [renderSnackbar];
};

export default useSnackbar;
