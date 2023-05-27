import { useState } from 'react';
import { FETCH_METHOD, MESSAGE } from '../constants';
import { MutationFetchMethod } from '../types';

interface UseMutationArg<BodyData, ResponseData> {
  onSuccess?: (data?: {
    response: ResponseData | string;
    headers: Headers;
    fetchInformation: FetchInformation<BodyData>;
  }) => void;
  onFailure?: (error?: string) => void;
  onSettled?: () => void;
}

interface FetchInformation<BodyData> {
  url: string;
  method: MutationFetchMethod;
  bodyData?: BodyData;
  headers?: HeadersInit;
  referenceData?: unknown;
}

const useMutation = <BodyData, ResponseData>({
  onSuccess,
  onFailure,
  onSettled,
}: UseMutationArg<BodyData, ResponseData>) => {
  const [loading, setLoading] = useState(false);

  const mutateQuery = async (fetchInformation: FetchInformation<BodyData>) => {
    setLoading(true);
    const { url, method, bodyData, headers } = fetchInformation;

    const body = bodyData ? JSON.stringify(bodyData) : null;

    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(MESSAGE.RESPONSE_NOT_OKAY);
      }

      if (method === FETCH_METHOD.DELETE || FETCH_METHOD.PATCH) {
        const data = await response.text();
        onSuccess?.({ response: data, headers: response.headers, fetchInformation });
        setLoading(false);
      } else {
        const data: ResponseData = await response.json();
        onSuccess?.({ response: data, headers: response.headers, fetchInformation });
        setLoading(false);
      }
    } catch (e) {
      if (e instanceof Error) {
        onFailure?.(e.message);
        setLoading(false);
      }
    } finally {
      onSettled?.();
      setLoading(false);
    }
  };

  return { mutateQuery, loading };
};
export default useMutation;
