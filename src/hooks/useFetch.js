import { useEffect, useState } from 'react';
import { METHOD } from 'constants/index';
import apiClient from 'api';
import PropTypes from 'prop-types';
import { getAuthorizedHeaders } from 'api/auth';

const useFetch = ({ method, url, handler }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState(null);

  const fetchApi = async ({ params = '', payload = {} } = {}) => {
    setIsLoading(true);
    setIsError(false);
    setIsSucceed(false);
    setErrorMessage('');
    try {
      const headers = getAuthorizedHeaders();
      let response = { data: [] };
      if (method === METHOD.GET || method === METHOD.DELETE) {
        console.log('/...??');
        response = await apiClient[method](`${url}/${params}`, { headers });
      } else {
        response = await apiClient[method](
          `${url}/${params}`,
          { ...payload },
          {
            headers,
          },
        );
      }
      setData(response.data);
      setIsSucceed(true);
    } catch (error) {
      setIsError(true);
      setErrorMessage(
        error.response.data.message ?? '서버와의 통신이 불안정합니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data && handler) {
      handler(data);
    }
  }, [data]);

  return { isLoading, isSucceed, isError, errorMessage, data, fetchApi };
};

useFetch.propTypes = {
  method: PropTypes.oneOf(Object.values(METHOD)),
  url: PropTypes.string,
};

export default useFetch;
