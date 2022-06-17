import axios from 'axios';
import { useState, useEffect } from 'react';

import { LIMIT_SERVER_CONNECTION_TIME } from 'constants/index';

function useFetch({ url, method = 'get', headers, skip = false }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async body => {
    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), LIMIT_SERVER_CONNECTION_TIME);
      const { data } = await axios({
        url,
        method,
        headers: {
          'Access-Control-Allow-Origin': '*',
          ...headers,
        },
        data: body,
        signal: controller.signal,
      });

      setData(data);
      return data;
    } catch (error) {
      setError(error.message);
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (skip) {
      return;
    }

    fetchData();
  }, [url]);

  return {
    data,
    isLoading,
    error,
    fetchData,
  };
}

export default useFetch;
