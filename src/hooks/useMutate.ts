import { useState } from 'react';
import { useToast } from 'components/@common/Toast/hooks/useToast';
import { useRecoilValue } from 'recoil';
import { serverAtom } from 'recoil/server';

export const useMutate = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const server = useRecoilValue(serverAtom);

  const request = async <T>(callback: (server: string) => Promise<T>) => {
    try {
      const res = await callback(server);
      return res;
    } catch (error) {
      if (!(error instanceof Error)) return;
      setIsLoading(false);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { request, isLoading };
};
