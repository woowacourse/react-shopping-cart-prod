/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';

const useGetQuery = <DataType>(fetchUrl: string, headers?: HeadersInit) => {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(fetchUrl, { headers })
      .then(res => res.json())
      .then(resData => {
        setData(resData);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const refreshQuery = useCallback(async () => {
    setLoading(true);
    setError(null);

    await fetch(fetchUrl, { headers })
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
