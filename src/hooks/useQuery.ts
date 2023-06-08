import { useEffect, useState } from 'react';

interface State<T> {
  data?: T;
  error?: object;
}

export const useQuery = <T>(url: string, headers?: HeadersInit) => {
  const [state, setState] = useState<State<T>>({});

  const { data, error } = state;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        ...(headers && { headers }),
      });

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
