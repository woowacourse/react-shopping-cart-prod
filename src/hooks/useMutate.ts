import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { serverAtom } from 'recoil/server';

export const useMutate = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ isError: false, errorMessage: '' });

  const server = useRecoilValue(serverAtom);

  const request = async <T>(callback: (server: string) => Promise<T>) => {
    try {
      const res = await callback(server);
      setError({ isError: false, errorMessage: '' });
      return res;
    } catch (error) {
      if (!(error instanceof Error)) return;
      setError({ isError: true, errorMessage: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return { request, isLoading, error };
};
