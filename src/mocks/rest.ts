import { rest as mswRest } from 'msw';
import type { ExtractPathFromRestAPI, RestAPI } from '../api/rest/RestAPI';
import type { ShoppingCartRestAPI } from '../api/rest/ShoppingCartRestAPI';
import { joinPath } from '../api/utils/http';
import { BASE_URL } from '../config/environment';
import { MSWException } from './exceptions';
import type { HigherResolver, Resolver } from './types';
import { internalResponse } from './types';

type RestOptions = {
  baseUrl?: string;
};
class Rest<TRestAPI extends RestAPI> {
  constructor(private readonly options: RestOptions = {}) {}

  private createResolver<
    Method extends TRestAPI['request']['method'],
    Path extends ExtractPathFromRestAPI<TRestAPI, Method>,
  >(higherResolver: HigherResolver<TRestAPI, Method, Path>): Resolver<TRestAPI, Method, Path> {
    return (req, res, ctx) => {
      const wrappedRes = Object.assign(res, {
        response:
          internalResponse<
            Extract<TRestAPI, { request: { method: Method; path: Path } }>['response']
          >(),
      });

      const handleThrown = (thrown: unknown): any => {
        if (thrown instanceof Error) {
          return res(ctx.status(500), ctx.json({ message: thrown.message }));
        }
        if (thrown instanceof MSWException) {
          return res(ctx.status(thrown.status), ctx.json({ message: thrown.message }));
        }
        return thrown;
      };

      try {
        const resolverReturn = higherResolver(req, wrappedRes, ctx);
        if (resolverReturn instanceof Promise) {
          resolverReturn.then(handleThrown);
        }
        return resolverReturn;
      } catch (error) {
        return handleThrown(error);
      }
    };
  }

  handle<
    Method extends TRestAPI['request']['method'],
    Path extends ExtractPathFromRestAPI<TRestAPI, Method>,
  >(method: Method, path: Path, higherResolver: HigherResolver<TRestAPI, Method, Path>) {
    const resolver = this.createResolver(higherResolver);

    return mswRest[method.toLowerCase() as Lowercase<Method>](
      joinPath(this.options.baseUrl, path),
      resolver,
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
