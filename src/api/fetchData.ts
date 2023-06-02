interface OptionalProps {
  method?: string;
  headers?: HeadersInit;
  body?: object;
}

export const fetchData = async (url: string, optionalProps?: OptionalProps) => {
  const baseUrl = 'http://3.34.190.40:8080';

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
