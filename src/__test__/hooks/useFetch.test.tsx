import { renderHook, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { rest } from 'msw';
import { useFetch } from '@hooks/useFetch';
import { MOCK_PRODUCT_LIST } from '@mocks/handlers';
import { SERVER_NAME, getProductPath } from '@constants/urlConstants';
import { CustomError } from '@type/error';
import { server } from '../setupTests';

fetchMock.enableMocks();

const fetchUrl = getProductPath(SERVER_NAME[0]);

describe('useFetch가 올바르게 작동하는 지 테스트', () => {
  beforeEach(() => {
    server.use(
      rest.get('api/error', (req, res, ctx) => {
        return res(ctx.set('Content-Type', 'application/json'), ctx.status(500));
      }),

      rest.get(fetchUrl, (req, res, ctx) => {
        return res(
          ctx.set('Content-Type', 'application/json'),
          ctx.status(200),
          ctx.json(MOCK_PRODUCT_LIST),
          ctx.delay(1200)
        );
      })
    );
  });
  test('데이터가 불러와지기 전 data가 undefined인지 테스트', () => {
    const { result } = renderHook(() => useFetch(fetchUrl));

    const { isLoading } = result.current;

    expect(isLoading).toBe(true);
  });

  test('데이터가 불러와진 후 data가 올바른 객체인지 테스트', async () => {
    const { result } = renderHook(() => useFetch(fetchUrl));

    await waitFor(
      () => {
        const { data } = result.current;

        expect(data).toEqual(MOCK_PRODUCT_LIST);
      },
      { timeout: 1500 }
    );
  });

  test('데이터가 불러와지기 전 로딩중이 false 인지 테스트', () => {
    const { result } = renderHook(() => useFetch(fetchUrl));

    const { isLoading } = result.current;

    expect(isLoading).toBe(true);
  });

  test('데이터가 불러와지면 로딩중이 true가 되는 지 테스트', async () => {
    const { result } = renderHook(() => useFetch(fetchUrl));

    await waitFor(
      () => {
        const { isLoading } = result.current;

        expect(isLoading).toBe(false);
      },
      { timeout: 1500 }
    );
  });

  test('데이터를 불러오기 전 에러가 false인지 테스트', () => {
    const { result } = renderHook(() => useFetch(fetchUrl));

    const { error } = result.current;

    expect(error).toBeNull();
  });
  test('fetch를 하던 중 에러가 없다면 에러가 false인지 테스트', async () => {
    const { result } = renderHook(() => useFetch(fetchUrl));

    await waitFor(
      () => {
        const { error } = result.current;

        expect(error).toBeNull();
      },
      { timeout: 1500 }
    );
  });

  test('fetch를 하던 중 에러가 있다면 에러가 작동하는 지  테스트', async () => {
    const { result } = renderHook(() => useFetch('api/error'));
    await waitFor(
      async () => {
        const { error } = result.current;

        expect((error as CustomError).message as string).toBe('Error: HTTP 오류! Status: 500');
      },
      { timeout: 1500 }
    );
  });
});
