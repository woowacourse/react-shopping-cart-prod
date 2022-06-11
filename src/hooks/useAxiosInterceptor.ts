// @ts-nocheck
import axios from 'axios';
import { useEffect } from 'react';
import useSnackbar from 'hooks/useSnackbar';
import { ERROR, SNACKBAR } from 'utils/constants';

const useAxiosInterceptor = () => {
  const [renderSnackbar] = useSnackbar();

  // before request
  const requestSuccessHandler = config => {
    return config;
  };

  const requestErrorHandler = error => {
    return Promise.reject(error);
  };

  const requestInterceptor = axios.interceptors.request.use(
    config => requestSuccessHandler(config),
    error => requestErrorHandler(error),
  );

  // before response
  const responseSuccessHandler = config => {
    return config;
  };

  const responseErrorHandler = error => {
    const { code, message } = error.response.data;

    if (code) {
      renderSnackbar(ERROR[code], SNACKBAR.FAILED);
    } else {
      renderSnackbar(message, SNACKBAR.FAILED);
    }

    return Promise.reject(error);
  };

  const responseInterceptor = axios.interceptors.response.use(
    config => responseSuccessHandler(config),
    error => responseErrorHandler(error),
  );

  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor, requestInterceptor]);
};

export default useAxiosInterceptor;
