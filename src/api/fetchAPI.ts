interface OptionalProps {
  method?: string;
  headers?: HeadersInit;
  body?: object;
}

export const fetchAPI = async (url: string, optionalProps?: OptionalProps) => {
  console.log('1');
  const baseUrl = 'http://43.200.170.43:8080';

  const options: RequestInit & { Authorization?: string } = {
    method: optionalProps?.method,
    headers: optionalProps?.headers,
    body: optionalProps?.body ? JSON.stringify(optionalProps?.body) : undefined,
  };

  const response = await fetch(baseUrl + url, options);

  if (!response.ok) return;

  const contentType = response.headers.get('content-type');

  if (response.ok && contentType === 'application/json') {
    const data = await response.json();

    return data;
  }

  return;
};
