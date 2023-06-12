/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_HEADER } from '../constants';

const useGetQuery = <DataType>(fetchUrl: string, headers: HeadersInit = DEFAULT_HEADER) => {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (fetchUrl.endsWith('?')) {
      setLoading(false);
      return;
    }

    fetch(fetchUrl, { headers })
      .then(res => res.json())
      .then(resData => {
        setData(resData);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [fetchUrl]);

  const refreshQuery = useCallback(async (url: string = fetchUrl) => {
    setLoading(true);
    setError(null);

    if (url.endsWith('?')) {
      setLoading(false);
      return;
    }

    await fetch(url, { headers })
      .then(res => res.json())
      .then(resData => {
        setData(resData);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error, refreshQuery };
};

export default useGetQuery;
