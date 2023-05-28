import { rest as mswRest } from 'msw';
import type { ExtractPathFromRestAPI, RestAPI } from '../api/rest/RestAPI';
import type { ShoppingCartRestAPI } from '../api/rest/ShoppingCartRestAPI';
import { joinPath } from '../api/utils/http';
import { BASE_URL } from '../config/environment';
import type { HigherResolver, Resolver } from './types';
import { internalResponse } from './types';

type RestOptions = {
  baseUrl?: string;
};
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
      joinPath(this.options.baseUrl, path),
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
  baseUrl: joinPath(BASE_URL, 'api'),
});

export default rest;
