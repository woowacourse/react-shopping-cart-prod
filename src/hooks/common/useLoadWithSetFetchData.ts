import { useCallback, useState } from 'react';

import type HTTPError from '../../api/utils/HTTPError';

type SetDataFunction<T, V> = (variables: V) => Promise<T>;

interface SetDataOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: HTTPError) => void;
}

interface SetResult<V> {
  setData: (variables: V) => void;
  state: {
    isLoading: boolean;
    error: Error | HTTPError | null;
  };
}

const useLoadWithSetFetchData = <T, V = undefined>(
  setDataFn: SetDataFunction<T, V>,
  { onSuccess, onError }: SetDataOptions<T> = {}
): SetResult<V> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | HTTPError | null>(null);

  const setData = useCallback(
    (variables: V) => {
      setIsLoading(true);
      setDataFn(variables)
        .then((data) => {
          setError(null);
          onSuccess?.(data);
        })
        .catch((error) => {
          setError(error);
          onError?.(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [setDataFn, onSuccess, onError]
  );

  return { setData, state: { isLoading, error } };
};

export { useLoadWithSetFetchData };
