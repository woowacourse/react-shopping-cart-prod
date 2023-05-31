import { useState } from 'react';
import { fetchGet } from '@utils/fetchUtils';

export const useFetch = <T>(
  url: string,
  options?: RequestInit
): {
  isLoading: boolean;
  error: unknown | null;
  fetchData: () => Promise<T | null>;
} => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);

  const fetchData = async () => {
    try {
      const data = await fetchGet<T>(url, options);

      return data;
    } catch (error) {
      setError(error);
      setIsLoading(true);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, fetchData };
};
