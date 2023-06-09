import type { ExtractHttpParams, HttpMethod } from '../utils/http';

export interface HttpRequest<
  Method extends HttpMethod,
  Path extends `/${string}` = '/',
  QueryParams extends Record<string, unknown> = Record<string, never>,
  Body extends object = object,
> {
  method: Method;
  path: Path;
  params: ExtractHttpParams<Path>;
  queryParams: QueryParams;
  body: Body;
}

export interface HttpResponse<
  StatusCode extends number = number,
  Data extends Record<string, unknown> | string | number | null | undefined | unknown = any,
  Headers extends Record<string, string> = Record<string, string>,
> {
  statusCode: StatusCode;
  data: Data;
  headers: Headers;
}

export interface HttpErrorResponse<
  StatusCode extends number = number,
  Data extends Record<string, unknown> | string | number | null | undefined | unknown = {
    message: string;
  },
  Headers extends Record<string, string> = Record<string, string>,
> {
  statusCode: StatusCode;
  data: Data;
  headers: Headers;
}

export interface RestAPI {
  request: HttpRequest<HttpMethod, `/${string}`>;
  response: HttpResponse;
}

export type ExtractPathFromRestAPI<
  TRestAPI extends RestAPI,
  Method extends TRestAPI['request']['method'] = TRestAPI['request']['method'],
> = Extract<TRestAPI['request'], { method: Method }>['path'];

export type ExtractBodyFromRestAPI<
  TRestAPI extends RestAPI,
  Method extends TRestAPI['request']['method'] = TRestAPI['request']['method'],
  Path extends TRestAPI['request']['path'] = TRestAPI['request']['path'],
> = Extract<TRestAPI['request'], { method: Method; path: Path }>['body'];

export type ExtractResponseFromRestAPI<
  TRestAPI extends RestAPI,
  Method extends TRestAPI['request']['method'] = TRestAPI['request']['method'],
  Path extends TRestAPI['request']['path'] = TRestAPI['request']['path'],
> = Extract<TRestAPI, { request: { method: Method; path: Path } }>['response'];
