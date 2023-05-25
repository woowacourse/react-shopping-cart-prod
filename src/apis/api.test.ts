import { fetchQuery } from './api';
import { FetchQueryInstance, Method } from './api.type';

const BASE = 'http://localhost:3000';
const PATH = '/test';

const RESOLVED_VALUE = { test: true };
const FETCH_CONFIG = { data: { quantity: 3 } };
const FETCH_RESPONSE = { data: RESOLVED_VALUE };

const createFetchConfig = (method: Method) =>
  Object.assign(FETCH_CONFIG, {
    baseURL: BASE,
    method,
  });

describe('fetchQuery', () => {
  let fetcher: FetchQueryInstance;
  beforeEach(() => {
    fetcher = fetchQuery.create({ baseURL: BASE });
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(RESOLVED_VALUE),
    });
  });
  test('get', async () => {
    const data = await fetcher.get(PATH);

    expect(data).toEqual(FETCH_RESPONSE);
    expect(fetch).toHaveBeenCalledWith(new URL(PATH, BASE), {
      baseURL: BASE,
      method: 'GET',
    });
  });

  test('post', async () => {
    const data = await fetcher.post(PATH, createFetchConfig('POST'));

    expect(data).toEqual(FETCH_RESPONSE);
    expect(fetch).toHaveBeenCalledWith(
      new URL(PATH, BASE),
      createFetchConfig('POST')
    );
  });
});
