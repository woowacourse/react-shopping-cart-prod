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

interface FetchInformation<T> {
  url: string;
  method: MutationFetchMethod;
  bodyData?: T;
  headers?: HeadersInit;
}

const useMutation = <BodyData, ResponseData>({
  onSuccess,
  onFailure,
  onSettled,
}: UseMutationArg<BodyData, ResponseData>) => {
  const mutateQuery = async (fetchInformation: FetchInformation<BodyData>) => {
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
      } else {
        const data: ResponseData = await response.json();
        onSuccess?.({ response: data, headers: response.headers, fetchInformation });
      }
    } catch (e) {
      if (e instanceof Error) {
        onFailure?.(e.message);
      }
    } finally {
      onSettled?.();
    }
  };

  return mutateQuery;
};
export default useMutation;
