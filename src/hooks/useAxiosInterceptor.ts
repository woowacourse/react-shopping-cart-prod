// @ts-nocheck
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useSnackbar from 'hooks/useSnackbar';
import useSpinner from 'hooks/useSpinner';
import { doLogout } from 'modules/auth';
import { doInitializeCart } from 'modules/cart';
import { deleteCookie } from 'utils/cookie';
import { ERROR, SNACKBAR } from 'utils/constants';

const useAxiosInterceptor = () => {
  const [renderSnackbar] = useSnackbar();
  const { showSpinner, hideSpinner } = useSpinner();
  const dispatch = useDispatch();

  // before request
  const requestSuccessHandler = config => {
    showSpinner();

    return config;
  };

  const requestErrorHandler = error => {
    showSpinner();

    return Promise.reject(error);
  };

  const requestInterceptor = axios.interceptors.request.use(
    config => requestSuccessHandler(config),
    error => requestErrorHandler(error),
  );

  // before response
  const responseSuccessHandler = config => {
    hideSpinner();

    return config;
  };

  const responseErrorHandler = error => {
    hideSpinner();

    const { code, message } = error.response.data;

    if (code) {
      renderSnackbar(ERROR[code], SNACKBAR.FAILED);
    } else {
      renderSnackbar(message, SNACKBAR.FAILED);
    }

    if (code === 1003) {
      initializeAccount();
    }

    return Promise.reject(error);
  };

  const responseInterceptor = axios.interceptors.response.use(
    config => responseSuccessHandler(config),
    error => responseErrorHandler(error),
  );

  const initializeAccount = () => {
    dispatch(doLogout());
    deleteCookie('accessToken');
    dispatch(doInitializeCart());
  };

  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor, requestInterceptor]);
};

export default useAxiosInterceptor;
