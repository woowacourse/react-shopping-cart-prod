import { useCallback, useState } from 'react';

interface UseMutationState {
  loading: boolean;
  data?: any;
  error?: object;
}

export const useMutation = (method: string) => {
  const [state, setState] = useState<UseMutationState>({
    loading: false,
  });

  const { loading, data, error } = state;

  const mutation = useCallback(
    async (url: string, bodyData?: object) => {
      setState({ loading: true });

      try {
        const response = await fetch(url, {
          method,
          headers: {
            Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
            'Content-Type': 'application/json',
          },
          ...(bodyData && { body: JSON.stringify(bodyData) }),
        });

        if (response.ok && method === 'POST') {
          const body = await response.json();

          setState((prev) => ({ ...prev, data: body }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [method]
  );

  return { mutation, loading, data, error };
};
