import { Dispatch, SetStateAction, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { serverState } from '../store/ServerState';
import { base64 } from '../constants';
import useToast from './useToast';

type MutationMethod = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type PostBodyType = {
  productId: number;
};

type PatchBodyType = {
  quantity: number;
};
type DeleteBodyType = {
  id: number;
};

type OrderPostBodyType = {
  cartIds: number[];
  point: number;
  deliveryFee: number;
};

interface FetchInfo {
  url: string;
  method: MutationMethod;
  bodyData?: PostBodyType | PatchBodyType | DeleteBodyType | OrderPostBodyType;
  headers?: HeadersInit;
}

type SetDataType<T> = Dispatch<SetStateAction<T>>;

const useMutation = <T>(setRefetchData: SetDataType<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serverUrl = useRecoilValue(serverState);
  const { toast } = useToast();

  const mutate = async ({ url, method, bodyData, headers }: FetchInfo, baseUrl?: string) => {
    setIsLoading(true);

    const body = bodyData ? JSON.stringify(bodyData) : null;

    try {
      const response = await fetch(url, { method, body, headers });

      if (!navigator.onLine) {
        throw new Error('네트워크가 오프라인 상태입니다.');
      }

      if (!response.ok) {
        throw new Error('에러가 발생하였습니다.');
      }

      if (method === 'POST' || 'DELETE') {
        const refetchData = await fetch(`${serverUrl}${baseUrl}`, {
          method: 'GET',
          headers: {
            Authorization: `basic ${base64}`,
            'Content-Type': 'application/json',
          },
        });

        setRefetchData(await refetchData.json());
      }

      const responseData = await response.text();
      if (responseData) {
        const parsedData = JSON.parse(responseData);
        setData(parsedData);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
        setIsLoading(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { data, mutate, isLoading, error };
};

export default useMutation;
