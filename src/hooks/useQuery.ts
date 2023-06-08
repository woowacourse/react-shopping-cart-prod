import { useEffect, useState } from 'react';

interface State<T> {
  data?: T;
  error?: object;
}

export const useQuery = <T>(url: string, isAutorization: boolean) => {
  const [state, setState] = useState<State<T>>({});

  const { data, error } = state;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const fetchData = async () => {
    try {
      const requestOptions = {
        headers: {}
      };

      if (isAutorization) {
        requestOptions.headers = {
          Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
        };
      }

      const response = await fetch(url, requestOptions);

      const contentType = response.headers.get('content-type');

      if (response.ok && contentType === 'application/json') {
        const data = await response.json();

        setState((prev) => ({ ...prev, data }));
      }
    } catch {
      setState((prev) => ({ ...prev, error }));
    }
  };

  return { data, error };
};
