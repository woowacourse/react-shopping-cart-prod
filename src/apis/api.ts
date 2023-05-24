import { ENDPOINT } from '../constants/auth';
import { ERROR_CODE } from '../constants/errors';
import { getValidURL, handleStatusCode } from '../validation/errorHandler';
import { CustomError } from '../validation/errors';

const base64 = 'YUBhLmNvbToxMjM0';

const BASE =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/react-shopping-cart/'
    : 'https://n0eyes.github.io/react-shopping-cart/';

export type FetchQueryInstance = {
  [m in Lowercase<Method>]: <T>(
    path: string,
    config?: ExternalConfig
  ) => FetchQueryRes<T>;
};

export type FetchQueryRes<T> = Promise<HTTPResponse<T>>;
export type HTTPResponse<T> = {
  headers: Headers;
  body: T;
};

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';
type QueryParams = Parameters<FetchQueryInstance[Lowercase<Method>]>;
type QueryParamsWith<Config extends RequestInit> = [QueryParams[0], Config];
type InternalConfig = Omit<ExternalConfig, 'body'> & RequestInit;
type ExternalConfig = Omit<RequestInit, 'body'> & {
  baseURL?: string;
  body?: unknown;
};

class FetchQuery implements FetchQueryInstance {
  defaultConfig: ExternalConfig = {};

  constructor(defaultConfig?: ExternalConfig) {
    this.defaultConfig = defaultConfig ?? {};
  }

  private getComposedConfigWithDefault(externalConfig?: ExternalConfig) {
    return { ...this.defaultConfig, ...externalConfig };
  }

  private getValidArgs(
    args: [Method, ...QueryParams]
  ): QueryParamsWith<InternalConfig> {
    const [method, path, config] = args;

    if (!config?.method || method === config.method) {
      const composedConfig = this.getComposedConfigWithDefault(config);

      return [
        path,
        {
          ...composedConfig,
          method,
          body: JSON.stringify(composedConfig.body),
        },
      ];
    }

    throw new CustomError({ code: ERROR_CODE.WRONG_METHOD });
  }

  private async fetchQuery<T>(
    path: string,
    config?: InternalConfig
  ): FetchQueryRes<T> {
    const url = getValidURL(
      path,
      config?.baseURL ?? this.defaultConfig.baseURL
    );

    const response = await fetch(url, config);
    const body = await response.json();

    if (!response.ok) handleStatusCode(response.status);

    return { headers: response.headers, body };
  }

  private request<T>(...args: [Method, ...QueryParams]): FetchQueryRes<T> {
    const validArgs = this.getValidArgs(args);

    return this.fetchQuery(...validArgs);
  }

  get<T>(...args: QueryParams): FetchQueryRes<T> {
    return this.request<T>('GET', ...args);
  }

  post<T>(...args: QueryParams): FetchQueryRes<T> {
    return this.request<T>('POST', ...args);
  }

  patch<T>(...args: QueryParams): FetchQueryRes<T> {
    return this.request<T>('PATCH', ...args);
  }

  delete<T>(...args: QueryParams): FetchQueryRes<T> {
    return this.request<T>('DELETE', ...args);
  }

  create(defaultConfig: ExternalConfig) {
    return new FetchQuery(defaultConfig);
  }

  updateDefaultConfig(newConfig?: ExternalConfig) {
    this.defaultConfig = {
      ...this.defaultConfig,
      ...newConfig,
    };
  }
}

export const fetchQuery = new FetchQuery({ baseURL: ENDPOINT['말랑'] });
export const authFetchQuery = new FetchQuery({
  baseURL: ENDPOINT['말랑'],
  headers: {
    Authorization: `Basic ${base64}`,
  },
});
