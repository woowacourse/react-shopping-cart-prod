const handleResponseError = (response: Response) => {
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
};

type FetchMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface FetchData<B> {
  url: string;
  method: FetchMethod;
  param?: string | number;
  headers?: HeadersInit;
  body?: B;
}

export const fetchData = async <B extends {} = {}>({
  url,
  method,
  param,
  headers,
  body,
}: FetchData<B>) => {
  const fetchUrl = param ? `${url}/${param}` : url;

  const response = await fetch(fetchUrl, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  handleResponseError(response);

  return response;
};
