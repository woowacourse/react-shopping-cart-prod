export const fetchApi = async (url: string, options: RequestInit) => {
  if (!navigator.onLine) {
    throw new Error('네트워크 오프라인이 감지되었습니다');
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('api 요청 중에 오류가 발생했습니다.');
  }
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  return await response;
};

const username = 'a@a.com';
const password = '1234';
const base64 = btoa(username + ':' + password);

export const api = {
  get: async (url: string) => {
    const data = await fetchApi(url, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });
    return data;
  },
  post: async <T>(url: string, body: T) => {
    return await fetchApi(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
    });
  },
  patch: async <T>(url: string, body: T) => {
    return await fetchApi(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
    });
  },
  delete: async (url: string) => {
    return await fetchApi(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
    });
  },
};
