import BASE_URL from 'constants/apiBaseURL';
import { SERVER_OWNER } from 'constants/storeKey';
import type { ServerOwner } from 'types/serverOwner';
import getBasicKey from 'utils/getBasicKey';

export type ErrorResponse = {
  timestamp: string;
  status: number;
  error: string;
  path: string;
};

type FetchedData<T> = {
  data: T;
  headers: Headers;
};

export class API {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetcher<T>(url: string, method: string, user?: { id: string, password: number }, body?: unknown,): Promise<FetchedData<T>> {
    let headers = new Headers({
      'Content-Type': 'application/json',
    });

    if (user) {
      headers.append('Authorization', `Basic ${getBasicKey(user.id, user.password)}`);
    }

    const options: RequestInit = {
      method: method,
      headers: headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseUrl}${url}`, options);

    if (response.status >= 500) {
      throw new Error(`서버문제로 HTTP 통신에 실패했습니다. 상태 코드:${response.status}`);
    }

    if (!response.ok) {
      let errorResponse: ErrorResponse;

      try {
        errorResponse = await response.json();
      } catch (error) {
        errorResponse = {
          timestamp: new Date().toISOString(),
          status: 500,
          error: '에러 응답이 json 형식이 아닙니다.',
          path: url,
        };
      }

      throw errorResponse;
    }

    let data = null;
    headers = response.headers;

    if (response.status === 204) {
      return { data: data as T, headers };
    }

    if (method === 'GET') {
      try {
        data = await response.json();
      } catch {
        const errorResponse: ErrorResponse = {
          timestamp: new Date().toISOString(),
          status: 500,
          error: '서버 응답 형식이 json 형식이 아닙니다.',
          path: url,
        };

        throw errorResponse;
      }
    }

    return { data: data as T, headers };
  }

  async get<T>(url: string, user?: { id: string, password: number }): Promise<FetchedData<T>> {
    if (user) return await this.fetcher<T>(url, 'GET', { id: user.id, password: user.password });
    return await this.fetcher<T>(url, 'GET');
  }

  async post<T>(url: string, user: { id: string, password: number }, body: unknown): Promise<FetchedData<T>> {
    return await this.fetcher<T>(url, 'POST', user, body);
  }

  async remove<T>(url: string, user: { id: string, password: number }): Promise<FetchedData<T>> {
    return await this.fetcher<T>(url, 'DELETE', user);
  }

  async patch<T>(url: string, user: { id: string, password: number }, body: unknown): Promise<FetchedData<T>> {
    return await this.fetcher<T>(url, 'PATCH', user, body);
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }
}

const serverOwner = (localStorage.getItem(SERVER_OWNER) ?? '솔로스타') as ServerOwner;
const api = new API(BASE_URL[serverOwner]);

export default api;
