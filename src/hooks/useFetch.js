import { useEffect, useState } from 'react';
import { METHOD } from 'constants/index';
import apiClient from 'api';
import PropTypes from 'prop-types';

const useFetch = ({ method, url, handler }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  const fetchApi = async ({ params = '', payload = {} } = {}) => {
    setIsLoading(true);
    setIsError(false);
    setIsSucceed(false);
    try {
      const { data } = await apiClient[method](`${url}/${params}`, payload);
      setData(data);
      setIsSucceed(true);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data && handler && isSucceed) {
      handler(data);
    }
  }, [data, isSucceed]);

  return { isLoading, isSucceed, isError, data, fetchApi };
};

useFetch.propTypes = {
  method: PropTypes.oneOf(Object.values(METHOD)),
  url: PropTypes.string,
};

export default useFetch;
