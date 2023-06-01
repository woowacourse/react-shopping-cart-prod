// eslint-disable-next-line max-classes-per-file
import type { Authorization } from '../types/Authorization';
import RestClientRequest from './RestClientRequest';
import type {
  ExtractBodyFromRestAPI,
  ExtractPathFromRestAPI,
  ExtractResponseFromRestAPI,
  RestAPI,
} from './rest/RestAPI';
import PathGenerator from './utils/PathGenerator';
import type { HttpMethod } from './utils/http';
import { joinPath } from './utils/http';

type RestClientOptions = {
  base?: string;
  authorization?: Authorization | null;
};

class RestClient<TRestAPI extends RestAPI = RestAPI> {
  constructor(private readonly options: RestClientOptions = {}) {}

  private getUrl(path: string) {
    return joinPath(this.options.base ?? '', path);
  }

  private async parseResponseData(response: Response) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  toJSON() {
    return this.options;
  }

  clone(options?: Partial<RestClientOptions>): typeof this {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this, {
      options: {
        ...this.options,
        ...options,
      },
    });
  }

  withAuthorization(authorization: Authorization | null) {
    return this.clone({ authorization });
  }

  fetch<Method extends TRestAPI['request']['method'], Path extends TRestAPI['request']['path']>(
    method: Method,
    path: Path | PathGenerator<TRestAPI, 'GET', Path>,
    fetchInit?: RequestInit,
  ) {
    return new RestClientRequest<ExtractResponseFromRestAPI<TRestAPI, Method, Path>>(async () => {
      const { authorization } = this.options;

      const response = await fetch(this.getUrl(path.toString()), {
        method,
        ...fetchInit,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          ...(authorization
            ? {
                Authorization: `Basic ${btoa(
                  `${authorization.username}:${authorization.password}`,
                )}`,
              }
            : {}),
          ...fetchInit?.headers,
        },
      });

      return {
        statusCode: response.status,
        data: await this.parseResponseData(response),
        headers: Object.fromEntries(response.headers.entries()),
      };
    });
  }

  get<Path extends ExtractPathFromRestAPI<TRestAPI, 'GET'>>(
    path: Path | PathGenerator<TRestAPI, 'GET', Path>,
    fetchInit?: RequestInit,
  ) {
    return this.fetch('GET', path, fetchInit);
  }

  post<Path extends ExtractPathFromRestAPI<TRestAPI, 'POST'>>(
    path: Path | PathGenerator<TRestAPI, 'POST', Path>,
    body: ExtractBodyFromRestAPI<TRestAPI, 'POST', Path>,
    fetchInit?: RequestInit,
  ) {
    return this.fetch('POST', path, {
      ...fetchInit,
      headers: {
        'Content-Type': 'application/json',
        ...fetchInit?.headers,
      },
      body: JSON.stringify(body),
    });
  }

  patch<Path extends ExtractPathFromRestAPI<TRestAPI, 'PATCH'>>(
    path: Path | PathGenerator<TRestAPI, 'PATCH', Path>,
    body: ExtractBodyFromRestAPI<TRestAPI, 'PATCH', Path>,
    fetchInit?: RequestInit,
  ) {
    return this.fetch('PATCH', path, {
      headers: {
        'Content-Type': 'application/json',
        ...fetchInit?.headers,
      },
      body: JSON.stringify(body),
      ...fetchInit,
    });
  }

  delete<Path extends ExtractPathFromRestAPI<TRestAPI, 'DELETE'>>(
    path: Path | PathGenerator<TRestAPI, 'DELETE', Path>,
    fetchInit?: RequestInit,
  ) {
    return this.fetch('DELETE', path, fetchInit);
  }

  path<Method extends HttpMethod, Path extends TRestAPI['request']['path']>(
    path: Path,
    ...params: Extract<TRestAPI['request'], { method: Method; path: Path }>['params']
  ) {
    return new PathGenerator<TRestAPI, Method, Path>(path, ...params);
  }
}

export default RestClient;
