/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';

interface UseGetQueryArgs<ResponseData> {
  fetcher: Promise<Response>;
  onSuccess?: (data: ResponseData) => void;
  onError?: (error?: string) => void;
  onSettled?: () => void;
}

const useGetQuery = <ResponseData>({ fetcher, onSuccess, onError, onSettled }: UseGetQueryArgs<ResponseData>) => {
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetcher;

      if (!response.ok) {
        setError(response.statusText);
      }

      const responseData = await response.json();
      setData(responseData);
      onSuccess?.(responseData);
    } catch (error) {
      if (error instanceof Error) {
        onError?.(error.message);
      } else {
        console.error(error);
      }
    } finally {
      onSettled?.();
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    loading,
    error,
    getData,
  };
};

export default useGetQuery;
