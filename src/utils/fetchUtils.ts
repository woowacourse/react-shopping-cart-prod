import { CustomError } from 'types/error';

const username = 'pizza1@pizza.com';
const password = 'pizza';

const base64 = btoa(`${username}:${password}`);

export const fetchGet = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  try {
    const mergedOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64}`,
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('리소스를 찾을 수 없습니다');
      }

      throw new Error(`HTTP 오류! Status: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    const errorMessage = (error as CustomError).message;
    throw new Error(`Error: ${errorMessage}`);
  }
};

export const fetchPost = async <T>(
  url: string,
  body: T,
  options: RequestInit = {}
): Promise<Response> => {
  try {
    const mergedOptions = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64}`,
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      throw new Error(`POST 요청이 ${response.status} 상태로 실패했습니다.`);
    }

    return response;
  } catch (error) {
    const errorMessage = (error as CustomError).message;
    throw new Error(`Error: ${errorMessage}`);
  }
};

export const fetchPatch = async <T>(
  url: string,
  body: T,
  options: RequestInit = {}
): Promise<Response> => {
  try {
    const mergedOptions = {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64}`,
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      throw new Error(`PATCH 요청이 ${response.status} 상태로 실패했습니다.`);
    }

    return response;
  } catch (error) {
    const errorMessage = (error as CustomError).message;
    throw new Error(`Error: ${errorMessage}`);
  }
};

export const fetchDelete = async (url: string, options: RequestInit = {}): Promise<Response> => {
  try {
    const mergedOptions = {
      method: 'DELETE',
      Authorization: `Basic ${base64}`,
      ...options,
    };

    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      throw new Error(`DELETE 요청이 ${response.status} 상태로 실패했습니다.`);
    }

    return response;
  } catch (error) {
    const errorMessage = (error as CustomError).message;
    throw new Error(`Error: ${errorMessage}`);
  }
};
