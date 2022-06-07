import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleSnackbarOpen } from "@/redux/modules/snackbar";

import appClient from "@/utils/appClient";
import { MESSAGE, ERROR_CODE } from "@/constants";

const useFetch = (method, url, initialData = {}, func) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const getData = async (payload = {}, headers = {}) => {
    try {
      const { data } = await appClient[method](url, {
        ...payload,
        headers,
      });
      setData(data);
      setIsLoading(false);
      setSuccess(true);
    } catch (error) {
      const { errorCode } = error.response.data;
      dispatch(toggleSnackbarOpen(MESSAGE[ERROR_CODE[errorCode]]));
      setIsLoading(false);
      setError(true);
      setSuccess(false);
    }
  };

  return { data, isLoading, error, success, getData };
};

export default useFetch;
