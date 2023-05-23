import { useState } from 'react';
import { useToast } from 'components/@common/Toast/hooks/useToast';

export const useMutate = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const request = async (callback: Promise<void>) => {
    try {
      await callback;
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
