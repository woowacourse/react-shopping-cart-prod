import { ENDPOINT } from '../constants/auth';
import { ERROR_CODE } from '../constants/errors';
import { getValidURL, handleStatusCode } from '../validation/errorHandler';
import { CustomError } from '../validation/errors';
import {
  ExternalConfig,
  FetchQueryInstance,
  FetchQueryRes,
  InternalConfig,
  Method,
  QueryParams,
  QueryParamsWith,
} from './api.type';

const base64 = 'YUBhLmNvbToxMjM0';

const BASE =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/react-shopping-cart/'
    : 'https://n0eyes.github.io/react-shopping-cart/';

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
    let body = {} as T;
    const url = getValidURL(
      path,
      config?.baseURL ?? this.defaultConfig.baseURL
    );

    const response = await fetch(url, config);
    const { headers } = response;

    try {
      body = await response.json();
    } catch (error) {}

    if (!response.ok) handleStatusCode(response.status);

    return { headers, body };
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
    'Content-Type': 'application/json',
  },
});
