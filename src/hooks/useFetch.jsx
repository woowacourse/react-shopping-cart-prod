import { useState } from "react";
import LocalStorage from "@utils/LocalStorage";
import ApiError from "@redux/utils/ApiError";
import { FETCH_STATUS, REQUEST_METHOD } from "../constants";

const fetchData = async (method, requestUrl = "", requestData = {}) => {
  const accessToken = LocalStorage.getItem("accessToken");

  const fetchInitOption = { method };
  if (accessToken) {
    fetchInitOption.headers = { Authorization: `Bearer ${accessToken}` };
  }
  if (method !== REQUEST_METHOD.GET) {
    fetchInitOption.body = JSON.stringify(requestData);
  }

  const response = await fetch(requestUrl, fetchInitOption);

  if (!response.ok) {
    const { errorCode, message } = await response.json();
    throw new ApiError(errorCode, message);
  }

  const data = await response.json();
  if (!data) throw new Error("No Data");

  return data;
};

export const useFetch = (
  method,
  requestUrl = "",
  initialData = {},
  requestData = {}
) => {
  const [status, setStatus] = useState(FETCH_STATUS.PENDING);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);

  const fetch = async () => {
    setStatus(FETCH_STATUS.PENDING);
    setData(initialData);
    setError(null);

    try {
      const fetchedData = await fetchData(method, requestUrl, requestData);
      setData(fetchedData);
    } catch (err) {
      setError(err);
      setStatus(FETCH_STATUS.FAIL);
      return;
    }
    setStatus(FETCH_STATUS.SUCCESS);
  };

  return { fetch, data, status, error };
};
