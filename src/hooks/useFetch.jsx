import { useState } from "react";
import LocalStorage from "@utils/LocalStorage";
import ApiError from "@utils/ApiError";
import { FETCH_STATUS, REQUEST_METHOD } from "../constants";

const getResponseWithFetch = async (
  method,
  requestUrl = "",
  requestData = {}
) => {
  const accessToken = LocalStorage.getItem("accessToken");

  const fetchOption = { method };
  if (accessToken) {
    fetchOption.headers = { Authorization: `Bearer ${accessToken}` };
  }
  if (method !== REQUEST_METHOD.GET) {
    fetchOption.body = JSON.stringify(requestData);
  }

  const response = await fetch(requestUrl, fetchOption);

  if (!response.ok) {
    const { errorCode, message } = await response.json();
    throw new ApiError(errorCode, message);
  }

  return response;
};

export const useFetch = ({
  method,
  url = "",
  initialData = {},
  responseDataExist = true,
}) => {
  const [status, setStatus] = useState(FETCH_STATUS.PENDING);
  const [response, setResponse] = useState(null);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);

  const fetch = async (requestData = {}) => {
    setStatus(FETCH_STATUS.PENDING);
    setResponse(null);
    setData(initialData);
    setError(null);

    try {
      const response = await getResponseWithFetch(method, url, requestData);
      setResponse(response);

      if (responseDataExist) {
        const responseData = await response.json();
        if (!responseData) throw new ApiError(10000, "No Data");
        setData(responseData);
      }
    } catch (err) {
      setError(err);
      setStatus(FETCH_STATUS.FAIL);
      return;
    }
    setStatus(FETCH_STATUS.SUCCESS);
  };

  return { fetch, response, data, status, error };
};
