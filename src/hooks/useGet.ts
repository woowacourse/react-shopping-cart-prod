/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { base64 } from '../constants';
import useToast from './useToast';

const useGet = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `basic ${base64}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!navigator.onLine) {
          throw new Error('네트워크가 오프라인 상태입니다.');
        }

        if (!response.ok) {
          throw new Error('에러가 발생하였습니다.');
        }

        return response.json();
      })
      .then((responseData) => setData(responseData))
      .catch((error: Error) => {
        toast.error('목록 불러오기에 실패했습니다.');
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  }, [url]);

  return { data, isLoading, error };
};

export default useGet;
