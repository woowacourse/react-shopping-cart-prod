import type {
  PathParams,
  ResponseResolver,
  ResponseTransformer,
  RestContext,
  RestRequest,
} from 'msw';
import { rest as mswRest } from 'msw';
import type { ExtractPathFromRestAPI, RestAPI } from '../api/rest/RestAPI';
import type { ShoppingCartRestAPI } from '../api/rest/ShoppingCartRestAPI';
import { joinPath } from '../api/utils/http';
import { BASE_URL } from '../config/environment';

type RestOptions = {
  baseUrl?: string;
};

type Resolver<
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

const internalResponse =
  <TResponse extends RestAPI['response']>() =>
  <StatusCode extends TResponse['statusCode'] = TResponse['statusCode']>(
    status: StatusCode,
    body: Extract<TResponse, { statusCode: StatusCode }>['data'] | undefined = undefined,
    headers: Extract<TResponse, { statusCode: StatusCode }>['headers'] = {},
  ): ResponseTransformer<TResponse['data']> => {
    return (res) => {
      res.status = status;
      if (body !== undefined) res.body = body;
      Object.entries(headers).forEach(([key, value]) => res.headers.set(key, value));
      return res;
    };
  };

type HigherResolver<
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

class Rest<TRestAPI extends RestAPI> {
  constructor(private readonly options: RestOptions = {}) {}

  handle<
    Method extends TRestAPI['request']['method'],
    Path extends ExtractPathFromRestAPI<TRestAPI, Method>,
  >(method: Method, path: Path, resolver: HigherResolver<TRestAPI, Method, Path>) {
    const wrappedResolver: Resolver<TRestAPI, Method, Path> = (req, res, ctx) => {
      const wrappedRes = Object.assign(res, {
        response:
          internalResponse<
            Extract<TRestAPI, { request: { method: Method; path: Path } }>['response']
          >(),
      });
      return resolver(req, wrappedRes, ctx);
    };

    return mswRest[method.toLowerCase() as Lowercase<Method>](
      joinPath(this.options.baseUrl, 'api', path),
      wrappedResolver,
    );
  }

  get<Path extends ExtractPathFromRestAPI<TRestAPI, 'GET'>>(
    path: Path,
    resolver: HigherResolver<TRestAPI, 'GET', Path>,
  ) {
    return this.handle('GET', path, resolver);
  }

  post<Path extends ExtractPathFromRestAPI<TRestAPI, 'POST'>>(
    path: Path,
    resolver: HigherResolver<TRestAPI, 'POST', Path>,
  ) {
    return this.handle('POST', path, resolver);
  }

  put<Path extends ExtractPathFromRestAPI<TRestAPI, 'PUT'>>(
    path: Path,
    resolver: HigherResolver<TRestAPI, 'PUT', Path>,
  ) {
    return this.handle('PUT', path, resolver);
  }

  patch<Path extends ExtractPathFromRestAPI<TRestAPI, 'PATCH'>>(
    path: Path,
    resolver: HigherResolver<TRestAPI, 'PATCH', Path>,
  ) {
    return this.handle('PATCH', path, resolver);
  }

  delete<Path extends ExtractPathFromRestAPI<TRestAPI, 'DELETE'>>(
    path: Path,
    resolver: HigherResolver<TRestAPI, 'DELETE', Path>,
  ) {
    return this.handle('DELETE', path, resolver);
  }
}

const rest = new Rest<ShoppingCartRestAPI>({
  baseUrl: BASE_URL,
});

export default rest;
