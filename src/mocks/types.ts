import type {
  PathParams,
  ResponseResolver,
  ResponseTransformer,
  RestContext,
  RestRequest,
} from 'msw';
import type { RestAPI } from '../api/rest/RestAPI';

export type Resolver<
  TRestAPI extends RestAPI,
  Method extends TRestAPI['request']['method'] = TRestAPI['request']['method'],
  Path extends TRestAPI['request']['path'] = TRestAPI['request']['path'],
> = ResponseResolver<
  RestRequest<
    Extract<TRestAPI['request'], { method: Method; path: Path }>['body'],
    PathParams<string>
  >,
  RestContext,
  Extract<TRestAPI, { request: { method: Method; path: Path } }>['response']['data']
>;

export const internalResponse =
  <TResponse extends RestAPI['response']>() =>
  <StatusCode extends TResponse['statusCode'] = TResponse['statusCode']>(
    status: StatusCode,
    body: Extract<TResponse, { statusCode: StatusCode }>['data'] | undefined = undefined,
    headers: Extract<TResponse, { statusCode: StatusCode }>['headers'] = {},
  ): ResponseTransformer<TResponse['data']> => {
    return (res) => {
      res.status = status;
      if (body !== undefined) res.body = JSON.stringify(body);
      Object.entries(headers).forEach(([key, value]) => res.headers.set(key, value));
      return res;
    };
  };

export type HigherResolver<
  TRestAPI extends RestAPI,
  Method extends TRestAPI['request']['method'] = TRestAPI['request']['method'],
  Path extends TRestAPI['request']['path'] = TRestAPI['request']['path'],
> = (
  req: Parameters<Resolver<TRestAPI, Method, Path>>[0],
  res: Parameters<Resolver<TRestAPI, Method, Path>>[1] & {
    response: ReturnType<
      typeof internalResponse<
        Extract<TRestAPI, { request: { method: Method; path: Path } }>['response']
      >
    >;
  },
  ctx: Parameters<Resolver<TRestAPI, Method, Path>>[2],
) => ReturnType<Resolver<TRestAPI, Method, Path>>;
