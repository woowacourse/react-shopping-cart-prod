export const fetchData = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  const data: T = await response.json();
  return data;
};

export const postData = async (
  url: string,
  headers: HeadersInit,
  data: object
): Promise<string> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  const location = response.headers.get('location');

  if (location === null) {
    throw new Error('Location이 없습니다');
  }

  const lastSlashIndex = location.lastIndexOf('/');
  const id = location.slice(lastSlashIndex + 1);
  return id;
};

export const patchData = async (
  url: string,
  headers: HeadersInit,
  data: object
) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }
  return response;
};

export const deleteData = async (url: string, headers: HeadersInit) => {
  await fetch(url, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });
};
