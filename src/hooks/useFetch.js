import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import appClient from "@/api/appClient";
import { ERROR_CODE, MESSAGE } from "@/constants";
import { toggleSnackbarOpen } from "@/redux/modules/snackbar";

const useFetch = (method, url, func, rest) => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const getData = async (payload = {}, successMessage = "") => {
    try {
      const { data } = await appClient[method](url, {
        ...payload,
      });
      setData(data);
      setSuccess(true);
      if (successMessage) {
        dispatch(toggleSnackbarOpen(successMessage));
      }
    } catch (error) {
      const { errorCode } = error.response.data;
      dispatch(toggleSnackbarOpen(MESSAGE[ERROR_CODE[errorCode]]));
      setError(true);
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (success && func) {
      if (!data) {
        dispatch(func(rest));
      } else {
        dispatch(func(data));
      }
    }
  }, [data, success]);

  return { data, error, success, getData };
};

export default useFetch;
