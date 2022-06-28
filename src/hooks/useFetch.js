import { useState, useEffect } from 'react';
import axios from 'axios';
import useUser from './useUser';

const initialState = {
  result: null,
  isLoading: true,
  isError: false,
};

function useFetch(url) {
  const [response, setResponse] = useState(initialState);
  const { accessToken } = useUser();

  const requestData = async () => {
    try {
      const { data } = await axios({
        method: 'get',
        url,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setResponse((prevState) => {
        return {
          ...prevState,
          result: data,
        };
      });
    } catch (error) {
      setResponse((prevState) => {
        return {
          ...prevState,
          isError: true,
        };
      });
    } finally {
      setResponse((prevState) => {
        return {
          ...prevState,
          isLoading: false,
        };
      });
    }
  };

  useEffect(() => {
    requestData();
  }, []);

  return response;
}

export default useFetch;
