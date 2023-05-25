// eslint-disable-next-line max-classes-per-file
import ClientResponse from './ClientResponse';
import type {
  ExtractBodyFromRestAPI,
  ExtractPathFromRestAPI,
  ExtractResponseFromRestAPI,
  RestAPI,
} from './rest/RestAPI';
import PathGenerator from './utils/PathGenerator';
import type { HttpMethod } from './utils/http';
import { joinPath } from './utils/http';

type ClientOptions = {
  origin?: string;
  baseUrl?: string;
};

class Client<TRestAPI extends RestAPI> {
  constructor(private readonly options: ClientOptions = {}) {}

  private getUrl(path: string) {
    return (this.options.origin ?? '') + joinPath(this.options.baseUrl ?? '', path);
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

  setOrigin(origin: string) {
    this.options.origin = origin;
  }

  setBaseUrl(baseUrl: string) {
    this.options.baseUrl = baseUrl;
  }

  fetch<Method extends TRestAPI['request']['method'], Path extends TRestAPI['request']['path']>(
    method: Method,
    path: Path | PathGenerator<TRestAPI, 'GET', Path>,
    init?: RequestInit,
  ) {
    return new ClientResponse<ExtractResponseFromRestAPI<TRestAPI, Method, Path>>(async () => {
      const response = await fetch(this.getUrl(path.toString()), {
        method,
        ...init,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Basic ${btoa('a@a.com:1234')}`,
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
  ) {
    return this.fetch('GET', path);
  }

  post<Path extends ExtractPathFromRestAPI<TRestAPI, 'POST'>>(
    path: Path | PathGenerator<TRestAPI, 'POST', Path>,
    body: ExtractBodyFromRestAPI<TRestAPI, 'POST'>,
  ) {
    return this.fetch('POST', path, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  patch<Path extends ExtractPathFromRestAPI<TRestAPI, 'PATCH'>>(
    path: Path | PathGenerator<TRestAPI, 'PATCH', Path>,
    body: ExtractBodyFromRestAPI<TRestAPI, 'PATCH'>,
  ) {
    return this.fetch('PATCH', path, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  delete<Path extends ExtractPathFromRestAPI<TRestAPI, 'DELETE'>>(
    path: Path | PathGenerator<TRestAPI, 'DELETE', Path>,
  ) {
    return this.fetch('DELETE', path);
  }

  path<Method extends HttpMethod, Path extends TRestAPI['request']['path']>(
    path: Path,
    ...params: Extract<TRestAPI['request'], { method: Method; path: Path }>['params']
  ) {
    return new PathGenerator<TRestAPI, Method, Path>(path, ...params);
  }
}

export default Client;
