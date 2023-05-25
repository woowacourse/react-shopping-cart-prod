import { DuplicateKeys } from '../types/common';

export type FetchQueryInstance = {
  [m in Lowercase<Method>]: <T>(
    path: string,
    config?: ExternalConfig
  ) => FetchQueryRes<T>;
};

export type FetchQueryRes<T> = Promise<HTTPResponse<T>>;
export type HTTPResponse<T> = {
  headers: Headers;
  data: T;
};

export type ExternalConfigKeys = 'baseURL' | 'body';
export type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';
export type QueryParams = Parameters<FetchQueryInstance[Lowercase<Method>]>;
export type QueryParamsWith<Config extends RequestInit> = [
  QueryParams[0],
  Config
];
export type InternalConfig = Omit<ExternalConfig, 'body'> & RequestInit;
export type ExternalConfig = Omit<
  RequestInit,
  DuplicateKeys<RequestInit, ExternalConfigKeys>
> & {
  baseURL?: string;
  body?: unknown;
};
