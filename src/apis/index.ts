import BASE_URL from 'constants/apiBaseURL';
import { USER_1 } from 'constants/basicKey';
import { SERVER_OWNER } from 'constants/storeKey';
import type { ServerOwner } from 'types/serverOwner';
import ExtendedError from 'utils/ExtendError';
import getBasicKey from 'utils/getBasicKey';

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

    try {
      const response = await fetch(`${this.baseUrl}${url}`, options);

      if (response.status >= 500) {
        throw new ExtendedError(`서버문제로 HTTP 통신에 실패했습니다. 상태 코드:${response.status}`, response.status);
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

        throw new ExtendedError(errorResponse.message, response.status);
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

          throw new ExtendedError(errorResponse.message, response.status);
        }
      }

      return { data: data as T, headers };
    } catch (error) {

      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        // CORS 에러 처리
        throw new ExtendedError(`CORS Error: Unable to make the request due to CORS restrictions.`, 403);
      }

      throw error;
    }
  }

  async get<T>(url: string): Promise<FetchedData<T>> {
    return await this.fetcher<T>(url, 'GET');
  }

  async post<T>(url: string, body: T): Promise<FetchedData<T>> {
    return await this.fetcher<T>(url, 'POST', body);
  }

  async remove<T>(url: string, body: T): Promise<FetchedData<T>> {
    return await this.fetcher<T>(url, 'DELETE', body);
  }

  async patch<T>(url: string, body: T): Promise<FetchedData<T>> {
    return await this.fetcher<T>(url, 'PATCH', body);
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }
}

const serverOwner = (localStorage.getItem(SERVER_OWNER) ?? '다즐') as ServerOwner;
const api = new API(BASE_URL[serverOwner]);

export default api;
