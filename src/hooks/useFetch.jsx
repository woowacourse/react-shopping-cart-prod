import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleSnackbarOpen } from "@/redux/modules/snackbar";

import appClient from "@/utils/appClient";
import { MESSAGE, ERROR_CODE } from "@/constants";
import { getCookie } from "@/utils/auth";

const useFetch = (method, url, func, rest) => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const getData = async (payload = {}, successMessage = "") => {
    const accessToken = getCookie("accessToken");
    const headers = { Authorization: `Bearer ${accessToken}` };
    try {
      let response = "";
      if (method === "delete" || method === "get") {
        const { data } = await appClient[method](url, { headers });
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
