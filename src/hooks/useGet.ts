import { useEffect, useState } from 'react';
import { serverAtom } from 'recoil/server';
import { useRecoilValue } from 'recoil';

export const useGet = <T>(
  callback: (server: string) => Promise<T>,
  dependency?: unknown
) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const server = useRecoilValue(serverAtom);

  useEffect(() => {
    request();
    if (error) throw new Error(error);
  }, [server, dependency, error]);

  const request = async () => {
    try {
      const data = await callback(server);
      setData(data);
    } catch (error) {
      if (!(error instanceof Error)) return;
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading };
};
