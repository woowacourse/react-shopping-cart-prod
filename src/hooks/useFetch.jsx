import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleSnackbarOpen } from "@/redux/modules/snackbar";

import appClient from "@/utils/appClient";
import { MESSAGE, ERROR_CODE } from "@/constants";
import { getCookie } from "@/utils/auth";

const useFetch = (method, url, initialData = {}) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const getData = async (payload = {}, successMessage = "") => {
    const accessToken = getCookie("accessToken");
    const headers = { Authorization: `Bearer ${accessToken}` };
    try {
      let response = "";
      if (method === "delete" || method === "get") {
        const { data } = await appClient[method](url, {
          headers,
        });
        response = data;
      } else {
        const { data } = await appClient[method](
          url,
          {
            ...payload,
          },
          { headers }
        );
        response = data;
      }
      setData(response);
      setIsLoading(false);
      setSuccess(true);
      if (successMessage) {
        dispatch(toggleSnackbarOpen(successMessage));
      }
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
