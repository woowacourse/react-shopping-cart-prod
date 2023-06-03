/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import fetchData from 'src/api';

const useGetQuery = <DataType>(fetchUrl: string, headers?: HeadersInit) => {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchingData = async (url: string, fetchHeaders?: HeadersInit) => {
    setLoading(true);
    setError(null);
    try {
      const jsonData = await fetchData<DataType>({ url, options: { headers: fetchHeaders } });

      setData(jsonData);
    } catch (responseError) {
      if (responseError instanceof Error) {
        setError(responseError.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingData(fetchUrl, headers);
  }, [fetchUrl]);

  const refreshQuery = useCallback((url?: string, refreshHeaders?: HeadersInit) => {
    fetchingData(url ?? fetchUrl, refreshHeaders);
  }, []);

  return { data, loading, error, refreshQuery };
};

export default useGetQuery;
