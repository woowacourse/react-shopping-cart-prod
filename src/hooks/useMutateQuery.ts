import { useState } from 'react';

interface useMutateQueryArgs<ResponseData> {
  fetcher: Promise<Response>;
  onSuccess?: (data: { response: ResponseData; headers: Headers }) => void;
  onError?: (error?: string) => void;
  onSettled?: () => void;
}

const useMutateQuery = <ResponseData>({ fetcher, onSuccess, onError, onSettled }: useMutateQueryArgs<ResponseData>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const mutateQuery = async () => {
    setLoading(true);

    try {
      const response = await fetcher;

      if (!response.ok) {
        setError(response.statusText);
      }

      const responseData = await response.text();
      const jsonData = responseData === '' ? {} : JSON.parse(responseData);
      onSuccess?.({ response: jsonData, headers: response.headers });
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
  };

  return { mutateQuery, loading, error };
};
export default useMutateQuery;
