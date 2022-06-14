import { useState, useEffect } from 'react';
import axios from 'axios';
import useUser from './useUser';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { accessToken } = useUser();

  const requestData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios({
        method: 'get',
        url,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setData(data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestData();
  }, []);

  return { data, isLoading, isError };
}

export default useFetch;
