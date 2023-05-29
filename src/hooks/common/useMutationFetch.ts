import { useCallback, useState } from 'react';

import HTTPError from '../../api/HTTPError';

type MutationFunction<T, V> = (variables: V) => Promise<T>;

interface MutationOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: HTTPError) => void;
}

interface MutationResult<V> {
  mutate: (variables: V) => void;
  state: {
    isLoading: boolean;
    error: Error | HTTPError | null;
  };
}

const useMutationFetch = <T, V = undefined>(
  mutationFn: MutationFunction<T, V>,
  { onSuccess, onError }: MutationOptions<T> = {}
): MutationResult<V> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | HTTPError | null>(null);

  const mutate = useCallback(
    (variables: V) => {
      setIsLoading(true);
      mutationFn(variables)
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
    [mutationFn, onSuccess, onError]
  );

  return { mutate, state: { isLoading, error } };
};

export { useMutationFetch };
