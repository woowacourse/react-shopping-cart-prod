type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

interface FetcherQueryNoResponseJSON {
  url: string;
  method: Method;
  auth?: string;
  body?: string;
  errorMessages: Record<string, string>;
}

interface FetcherQuery<T> extends FetcherQueryNoResponseJSON {
  typeGuard: (value: unknown) => value is T;
}

interface Option {
  method: Method;
  headers?: {
    Authorization: string;
    'Content-Type': 'application/json';
  };
  body?: string;
}

interface FetchResult<T> {
  value: T;
  location: string | null;
}

interface LocationResult {
  location: string | null;
}

interface ErrorMessagesParams {
  errorMessages: Record<string, string>;
  status: number | 'UNKNOWN';
}

class FetcherError extends Error {
  constructor({ errorMessages, status }: ErrorMessagesParams) {
    super(
      errorMessages[status] || '죄송합니다. 알 수 없는 오류가 발생했습니다.',
    );
  }
}

const Fetcher = {
  fetch: async <T>({
    url,
    method,
    auth,
    body,
    typeGuard,
    errorMessages,
  }: FetcherQuery<T>): Promise<FetchResult<T>> => {
    const option: Option = { method };

    if (auth) {
      option.headers = {
        Authorization: auth,
        'Content-Type': 'application/json',
      };
    }

    if (body) {
      option.body = body;
    }

    console.log(url, '- try');

    try {
      const response = await fetch(url, option);
      console.log(url, '- fetch was success');
      const { ok, status } = response;

      if (!ok) {
        console.log('fail -', status);
        throw new FetcherError({ errorMessages, status });
      }

      const value = await response.json();
      console.log(url, '-', value);

      if (!typeGuard(value)) {
        console.log(url, '- It was a type guard fault.');
        throw new FetcherError({ errorMessages, status: 'UNKNOWN' });
      }

      const location = response.headers.get('Location');
      const fetchResult = { value, location };

      console.log(url, '- success');
      return fetchResult;
    } catch (e) {
      if (!(e instanceof FetcherError)) {
        throw new FetcherError({ errorMessages, status: 'UNKNOWN' });
      }

      throw Error(e.message);
    }
  },

  fetchNoResponseJSON: async ({
    url,
    method,
    auth,
    body,
    errorMessages,
  }: FetcherQueryNoResponseJSON): Promise<LocationResult> => {
    const option: Option = { method };
    console.log(url, ' - fetch start(no response)');

    if (auth) {
      option.headers = {
        Authorization: auth,
        'Content-Type': 'application/json',
      };
    }

    if (body) {
      option.body = body;
    }

    try {
      console.log('info', url, option, '(no response)');

      const response = await fetch(url, option);
      const { ok, status } = response;

      if (!ok) {
        throw new FetcherError({ errorMessages, status });
      }

      console.log(url, '- success (no response)');
      return { location: response.headers.get('Location') };
    } catch (e) {
      if (!(e instanceof FetcherError)) {
        throw new FetcherError({ errorMessages, status: 'UNKNOWN' });
      }

      throw Error(e.message);
    }
  },
};

export default Fetcher;
