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

        if (!response.ok) {
          throw new Error(
            JSON.stringify({
              message: `HTTP request failed: ${response.status}`,
              statusCode: response.status,
            })
          );
        }

        const location = response.headers.get('location');

        setState((prev) => ({ ...prev, data: { location } }));
      } catch ({ message }) {
        const jsonData = JSON.parse(message as string);
        setState((prev) => ({ ...prev, error: jsonData }));
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [method]
  );

  return { mutation, loading, data, error };
};
