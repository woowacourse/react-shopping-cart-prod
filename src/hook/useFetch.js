import {useCallback, useState} from 'react';
import axios from 'axios';

const getAccessToken = () => {
  const response = JSON.parse(localStorage.getItem('accessToken'));
  if (!response) {
    return;
  }

  const accessToken = response.accessToken;
  return accessToken;
};

export default function useFetch(method = 'get') {
  const [pending, setPending] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetch = useCallback(
    ({
      API_URL = '',
      auth = true,
      headers = auth ? {Authorization: `Bearer ${getAccessToken()}`} : null,
      body = null,
      onSuccess = () => void 0,
      onFail = (error) => {
        alert(error);
      },
    }) => {
      setPending(true);
      setData(null);
      setError(null);

      axios({
        method,
        url: API_URL,
        data: body,
        headers,
      })
        .then((response) => {
          setPending(false);
          response.data && setData(response.data);
          onSuccess(response.data);
        })
        .catch((error) => {
          setPending(false);
          setError(error.response.data.message);
          onFail(error.response.data.message);
        });
    },
    [method],
  );

  return {pending, data, error, fetch};
}
