import { useState } from 'react';
import { METHOD } from 'constants/index';
import apiClient from 'api';
import PropTypes from 'prop-types';

const useFetch = ({ method, url }) => {
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
      const { data } = await apiClient[method](`${url}/${params}`, payload);
      setData(data);
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

  return { isLoading, isSucceed, isError, errorMessage, data, fetchApi };
};

useFetch.propTypes = {
  method: PropTypes.oneOf(Object.values(METHOD)),
  url: PropTypes.string,
};

export default useFetch;
