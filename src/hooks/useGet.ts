import { useEffect, useState } from 'react';
import { useToast } from 'components/@common/Toast/hooks/useToast';
import { serverAtom } from 'recoil/server';
import { useRecoilValue } from 'recoil';

export const useGet = <T>(callback: (server: string) => Promise<T>) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const server = useRecoilValue(serverAtom);

  useEffect(() => {
    request();
  }, [server]);

  const request = async () => {
    try {
      const data = await callback(server);
      setData(data);
      return data;
    } catch (error) {
      if (!(error instanceof Error)) return;
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { request, data, isLoading };
};
