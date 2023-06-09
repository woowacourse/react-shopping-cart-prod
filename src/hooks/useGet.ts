import { useEffect, useState } from 'react';
import { serverAtom } from 'recoil/server';
import { useRecoilValue } from 'recoil';

export const useGet = <T>(callback: (server: string) => Promise<T>) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState({ isError: false, message: '' });
  const [isLoading, setIsLoading] = useState(true);
  const server = useRecoilValue(serverAtom);

  useEffect(() => {
    request();
  }, [server]);

  const request = async () => {
    try {
      const data = await callback(server);
      setError({ isError: false, message: '' });
      setData(data);
      return data;
    } catch (error) {
      if (!(error instanceof Error)) return;
      setError({ isError: true, message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return { request, data, isLoading, error };
};
