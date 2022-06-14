import axios from 'axios';
import store from 'store';
import { doLogout } from 'modules/auth';
import { doInitializeCart } from 'modules/cart';
import { doShowSpinner, doHideSpinner } from 'modules/spinner';
import { doShowSnackbar, doHideSnackbar } from 'modules/snackbar';
import { TIMER, ERROR, SNACKBAR } from 'utils/constants';
import { deleteCookie } from 'utils/cookie';

const axiosInterceptors = () => {
  axios.interceptors.request.use(
    function (config) {
      store.dispatch(doShowSpinner());
      return config;
    },
    function (error) {
      store.dispatch(doShowSpinner());
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    function (response) {
      store.dispatch(doHideSpinner());
      return response;
    },
    function (error) {
      const { code } = error.response.data;

      store.dispatch(doShowSnackbar({ message: ERROR[code], status: SNACKBAR.FAILED }));
      setTimeout(() => store.dispatch(doHideSnackbar()), TIMER.SNACKBAR_CLOSE_TIME);

      if (code === 1003) {
        initializeAccount();
      }

      store.dispatch(doHideSpinner());
      return Promise.reject(error);
    },
  );
};

const initializeAccount = () => {
  store.dispatch(doLogout());
  deleteCookie('accessToken');
  store.dispatch(doInitializeCart());
};

export default axiosInterceptors;
