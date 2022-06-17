import useFetch from './useFetch';
import { useSelector } from 'react-redux';

function useAuthFetch({ url, method = 'get', headers, skip = false }) {
  const { accessToken } = useSelector(state => state.auth);
  const authedHeaders = accessToken && { Authorization: `Bearer ${accessToken}` };
  const { data, isLoading, error, fetchData } = useFetch({
    url,
    method,
    headers: { ...headers, ...authedHeaders },
    skip,
  });

  return { data, isLoading, error, fetchData };
}

export default useAuthFetch;
