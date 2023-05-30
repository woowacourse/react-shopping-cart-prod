const handleResponseError = (response: Response) => {
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
};

type MutateMethod = 'POST' | 'PATCH' | 'DELETE';

interface MutateData<B> {
  url: string;
  method: MutateMethod;
  param?: string | number;
  headers?: HeadersInit;
  body?: B;
}

type GetData<B> = Omit<MutateData<B>, 'method'>;

export const getData = async <D = any, B extends {} = {}>({
  url,
  param,
  headers,
  body,
}: GetData<B>): Promise<D> => {
  const fetchUrl = param ? `${url}/${param}` : url;

  const response = await fetch(fetchUrl, {
    method: 'GET',
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  handleResponseError(response);

  const data: D = await response.json();

  return data;
};

export const mutateData = async <B extends {}>({
  url,
  method,
  param,
  headers,
  body,
}: MutateData<B>) => {
  const fetchUrl = param ? `${url}/${param}` : url;

  const response = await fetch(fetchUrl, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  handleResponseError(response);

  return response;
};
