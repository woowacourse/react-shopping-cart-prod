interface FetchParams {
  endpoint: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
}

export const createApiRequests = (baseUrl: string) => (resourcePath: string) => {
  const endpoint = `${baseUrl}/${resourcePath}`;

  return {
    GET: async (pathParameter?: string) => {
      const promise = await fetchRequest({
        endpoint: `${endpoint}${pathParameter ? `/${pathParameter}` : ''}`,
        method: 'GET',
      });
      const data = await promise.json();
      return data;
    },

    POST: ({ pathParameter, body }: { pathParameter?: string; body?: unknown }) => {
      return fetchRequest({
        endpoint: `${endpoint}${pathParameter ? `/${pathParameter}` : ''}`,
        method: 'POST',
        body,
      });
    },

    PATCH: ({ pathParameter, body }: { pathParameter?: string; body?: unknown }) => {
      return fetchRequest({
        endpoint: `${endpoint}${pathParameter ? `/${pathParameter}` : ''}`,
        method: 'PATCH',
        body,
      });
    },

    DELETE: (pathParameter?: string) => {
      return fetchRequest({
        endpoint: `${endpoint}${pathParameter ? `/${pathParameter}` : ''}`,
        method: 'DELETE',
      });
    },
  };
};

const username = 'pizza1@pizza.com';
const password = 'pizza';

const base64 = btoa(`${username}:${password}`);

export const fetchApi = async (url: string, options: RequestInit) => {
  const setOptions = {
    method: options.method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64}`,
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, setOptions);

  if (!response.ok) {
    throw new Error(`올바르지 않는 통신입니다. status: ${response.status}`);
  }

  return response;
};

const fetchRequest = async ({ endpoint, method, body }: FetchParams) => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64}`,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error(`Fetch Error: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error(`Fetch Utility Error: ${error}`);
    throw error;
  }
};
