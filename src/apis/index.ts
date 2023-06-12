import BASE_URL from 'constants/apiBaseURL';
import { USER_1 } from 'constants/basicKey';
import { SERVER_OWNER } from 'constants/storeKey';
import type { ServerOwner } from 'types/serverOwner';
import getBasicKey from 'utils/getBasicKey';
import store from 'utils/storage';

export type ErrorResponse = {
  message: string;
};

type FetchedData<T> = {
  data: T;
  headers: Headers;
};
class API {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetcher<T>(url: string, method: string, body?: unknown): Promise<FetchedData<T>> {
    const options: RequestInit = {
      method: method,

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${getBasicKey(USER_1.id, USER_1.password)}`,
      },
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
          message: '에러 응답이 json 형식이 아닙니다.',
        };
      }

      throw errorResponse;
    }

    let data = null;
    const headers = response.headers;

    if (response.status === 204) {
      return { data: data as T, headers };
    }

    if (method === 'GET') {
      try {
        data = await response.json();
      } catch {
        const errorResponse: ErrorResponse = {
          message: '서버 응답 형식이 json 형식이 아닙니다.',
        };

        throw errorResponse;
      }
    }

    return { data: data as T, headers };
  }

  async get<T>(url: string): Promise<FetchedData<T>> {
    return await this.fetcher<T>(url, 'GET');
  }

  async post<T>(url: string, body: unknown): Promise<FetchedData<T>> {
    return await this.fetcher<T>(url, 'POST', body);
  }

  async remove<T>(url: string, body: unknown): Promise<FetchedData<T>> {
    return await this.fetcher<T>(url, 'DELETE', body);
  }

  async patch<T>(url: string, body: unknown): Promise<FetchedData<T>> {
    return await this.fetcher<T>(url, 'PATCH', body);
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }
}

const serverOwner = store.getStorage<ServerOwner>(SERVER_OWNER) ?? '헙크';
const api = new API(BASE_URL[serverOwner]);

export default api;
